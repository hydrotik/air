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
}
