import Database from 'better-sqlite3';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

const DB_DIR = path.join(os.homedir(), '.hydrotik', 'air');
const DB_PATH = path.join(DB_DIR, 'telemetry.db');

export function getDb(): Database.Database {
  fs.mkdirSync(DB_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  migrate(db);
  return db;
}

function migrate(db: Database.Database): void {
  // ─── Core tables ──────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      session_id    TEXT PRIMARY KEY,
      start_time    INTEGER NOT NULL,
      last_event    INTEGER NOT NULL,
      cwd           TEXT NOT NULL DEFAULT '',
      model         TEXT NOT NULL DEFAULT '',
      provider      TEXT NOT NULL DEFAULT '',
      total_in      INTEGER NOT NULL DEFAULT 0,
      total_out     INTEGER NOT NULL DEFAULT 0,
      total_cost    REAL NOT NULL DEFAULT 0,
      tool_calls    INTEGER NOT NULL DEFAULT 0,
      turns         INTEGER NOT NULL DEFAULT 0,
      compactions   INTEGER NOT NULL DEFAULT 0,
      context_pct   REAL NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS events (
      id            TEXT PRIMARY KEY,
      session_id    TEXT NOT NULL,
      timestamp     INTEGER NOT NULL,
      type          TEXT NOT NULL,
      data          TEXT NOT NULL,
      FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id, timestamp);
    CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
    CREATE INDEX IF NOT EXISTS idx_events_ts ON events(timestamp);

    CREATE TABLE IF NOT EXISTS tool_calls (
      tool_call_id  TEXT PRIMARY KEY,
      session_id    TEXT NOT NULL,
      tool_name     TEXT NOT NULL,
      start_time    INTEGER NOT NULL,
      end_time      INTEGER,
      duration_ms   INTEGER,
      input_bytes   INTEGER NOT NULL DEFAULT 0,
      output_bytes  INTEGER,
      is_error      INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_tool_calls_session ON tool_calls(session_id);
    CREATE INDEX IF NOT EXISTS idx_tool_calls_name ON tool_calls(tool_name);

    CREATE TABLE IF NOT EXISTS context_snapshots (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id    TEXT NOT NULL,
      timestamp     INTEGER NOT NULL,
      tokens_used   INTEGER NOT NULL,
      context_window INTEGER NOT NULL,
      utilization   REAL NOT NULL,
      breakdown     TEXT, -- JSON array of ContextSegment
      FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_ctx_session ON context_snapshots(session_id, timestamp);
  `);

  // ─── Additive migrations (safe for existing DBs) ─────────────────────

  // Add agent column — defaults to 'pi' for backward compat
  safeAlter(db, `ALTER TABLE sessions ADD COLUMN agent TEXT NOT NULL DEFAULT 'pi'`);

  // ─── Latency tracking ────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS latency_snapshots (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id    TEXT NOT NULL,
      timestamp     INTEGER NOT NULL,
      operation     TEXT NOT NULL,
      total_ms      REAL NOT NULL,
      ttft_ms       REAL,
      phases        TEXT, -- JSON array of LatencyPhase
      model         TEXT,
      provider      TEXT,
      FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_latency_session ON latency_snapshots(session_id, timestamp);
    CREATE INDEX IF NOT EXISTS idx_latency_op ON latency_snapshots(operation);
  `);

  // ─── Cost tracking ──────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS cost_snapshots (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id    TEXT NOT NULL,
      timestamp     INTEGER NOT NULL,
      model         TEXT NOT NULL,
      provider      TEXT NOT NULL,
      input_cost    REAL NOT NULL DEFAULT 0,
      output_cost   REAL NOT NULL DEFAULT 0,
      cache_read_cost REAL NOT NULL DEFAULT 0,
      cache_write_cost REAL NOT NULL DEFAULT 0,
      total_cost    REAL NOT NULL DEFAULT 0,
      cumulative_cost REAL NOT NULL DEFAULT 0,
      budget_limit  REAL,
      budget_exceeded INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_cost_session ON cost_snapshots(session_id, timestamp);
  `);

  // ─── Output evaluation ──────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS output_evals (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id    TEXT NOT NULL,
      timestamp     INTEGER NOT NULL,
      turn_index    INTEGER NOT NULL,
      model         TEXT NOT NULL,
      provider      TEXT NOT NULL,
      response_tokens INTEGER NOT NULL DEFAULT 0,
      tool_call_count INTEGER NOT NULL DEFAULT 0,
      tool_error_count INTEGER NOT NULL DEFAULT 0,
      tool_success_rate REAL NOT NULL DEFAULT 1.0,
      had_retry     INTEGER NOT NULL DEFAULT 0,
      had_immediate_follow_up INTEGER NOT NULL DEFAULT 0,
      response_latency_ms INTEGER NOT NULL DEFAULT 0,
      cache_hit_rate REAL NOT NULL DEFAULT 0,
      user_rating   INTEGER,
      tags          TEXT, -- JSON array of strings
      FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_evals_session ON output_evals(session_id, timestamp);
    CREATE INDEX IF NOT EXISTS idx_evals_model ON output_evals(model);
  `);

  // ─── Prompt rating ──────────────────────────────────────────────────
  // SECURITY: Only stores prompt hash (SHA-256 first 16 chars), never raw content
  db.exec(`
    CREATE TABLE IF NOT EXISTS prompt_ratings (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id    TEXT NOT NULL,
      timestamp     INTEGER NOT NULL,
      prompt_hash   TEXT NOT NULL,
      variant       TEXT NOT NULL,
      category      TEXT NOT NULL DEFAULT 'system',
      model         TEXT NOT NULL,
      provider      TEXT NOT NULL,
      goal_achieved INTEGER NOT NULL DEFAULT 0,
      turns_to_complete INTEGER NOT NULL DEFAULT 1,
      total_tokens  INTEGER NOT NULL DEFAULT 0,
      total_cost    REAL NOT NULL DEFAULT 0,
      total_latency_ms INTEGER NOT NULL DEFAULT 0,
      tool_error_rate REAL NOT NULL DEFAULT 0,
      required_compaction INTEGER NOT NULL DEFAULT 0,
      rating        INTEGER,
      notes         TEXT, -- Brief notes, no sensitive data
      FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_prompt_hash ON prompt_ratings(prompt_hash);
    CREATE INDEX IF NOT EXISTS idx_prompt_variant ON prompt_ratings(variant);
    CREATE INDEX IF NOT EXISTS idx_prompt_session ON prompt_ratings(session_id);
  `);

  // ─── Drift events ──────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS drift_events (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id    TEXT NOT NULL,
      timestamp     INTEGER NOT NULL,
      metric        TEXT NOT NULL,
      model         TEXT NOT NULL,
      provider      TEXT NOT NULL,
      baseline      REAL NOT NULL,
      current_val   REAL NOT NULL,
      deviation_pct REAL NOT NULL,
      direction     TEXT NOT NULL,
      severity      TEXT NOT NULL,
      window_size   INTEGER NOT NULL,
      threshold     REAL NOT NULL,
      FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_drift_session ON drift_events(session_id, timestamp);
    CREATE INDEX IF NOT EXISTS idx_drift_severity ON drift_events(severity);
  `);
}

/** Safely run an ALTER TABLE — ignores "duplicate column" errors */
function safeAlter(db: Database.Database, sql: string): void {
  try {
    db.exec(sql);
  } catch {
    // Column/table already exists — ignore
  }
}
