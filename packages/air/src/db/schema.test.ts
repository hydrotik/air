import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type Database from 'better-sqlite3';

type Row = Record<string, unknown>;

// getDb() resolves its path from os.homedir() at module load, so every test
// points homedir at a fresh temp dir and loads the module in isolation.

let home: string;
let homedirSpy: jest.SpyInstance;
const opened: Database.Database[] = [];

function loadGetDb(): () => Database.Database {
  let getDb!: () => Database.Database;
  jest.isolateModules(() => {
    getDb = require('./schema').getDb;
  });
  return () => {
    const db = getDb();
    opened.push(db);
    return db;
  };
}

function tableNames(db: Database.Database): string[] {
  return (
    db
      .prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'`)
      .all() as { name: string }[]
  )
    .map((r) => r.name)
    .sort();
}

function indexNames(db: Database.Database): string[] {
  return (
    db
      .prepare(`SELECT name FROM sqlite_master WHERE type = 'index' AND name LIKE 'idx_%'`)
      .all() as { name: string }[]
  )
    .map((r) => r.name)
    .sort();
}

function columns(db: Database.Database, table: string) {
  return db.prepare(`PRAGMA table_info(${table})`).all() as {
    name: string;
    notnull: number;
    dflt_value: string | null;
    pk: number;
  }[];
}

beforeEach(() => {
  home = fs.mkdtempSync(path.join(os.tmpdir(), 'air-schema-'));
  homedirSpy = jest.spyOn(os, 'homedir').mockReturnValue(home);
});

afterEach(() => {
  while (opened.length) opened.pop()!.close();
  homedirSpy.mockRestore();
  fs.rmSync(home, { recursive: true, force: true });
});

describe('getDb', () => {
  it('creates the db directory and file under ~/.hydrotik/air', () => {
    const getDb = loadGetDb();
    const dbDir = path.join(home, '.hydrotik', 'air');
    expect(fs.existsSync(dbDir)).toBe(false);

    getDb();

    expect(fs.existsSync(path.join(dbDir, 'telemetry.db'))).toBe(true);
  });

  it('enables WAL journal mode and foreign keys', () => {
    const db = loadGetDb()();
    expect(db.pragma('journal_mode', { simple: true })).toBe('wal');
    expect(db.pragma('foreign_keys', { simple: true })).toBe(1);
  });

  it('creates every telemetry table', () => {
    const db = loadGetDb()();
    expect(tableNames(db)).toEqual([
      'context_snapshots',
      'cost_snapshots',
      'drift_events',
      'events',
      'latency_snapshots',
      'output_evals',
      'prompt_ratings',
      'sessions',
      'tool_calls',
    ]);
  });

  it('creates the lookup indexes', () => {
    const db = loadGetDb()();
    expect(indexNames(db)).toEqual([
      'idx_cost_session',
      'idx_ctx_session',
      'idx_drift_session',
      'idx_drift_severity',
      'idx_evals_model',
      'idx_evals_session',
      'idx_events_session',
      'idx_events_ts',
      'idx_events_type',
      'idx_latency_op',
      'idx_latency_session',
      'idx_prompt_hash',
      'idx_prompt_session',
      'idx_prompt_variant',
      'idx_tool_calls_name',
      'idx_tool_calls_session',
    ]);
  });

  it('adds the agent column to sessions with a "pi" default', () => {
    const db = loadGetDb()();
    const agent = columns(db, 'sessions').find((c) => c.name === 'agent');
    expect(agent).toBeDefined();
    expect(agent!.notnull).toBe(1);
    expect(agent!.dflt_value).toBe("'pi'");

    db.prepare(
      `INSERT INTO sessions (session_id, start_time, last_event) VALUES ('s', 1, 1)`
    ).run();
    const row = db.prepare(`SELECT * FROM sessions WHERE session_id = 's'`).get() as Row;
    expect(row).toMatchObject({
      agent: 'pi',
      cwd: '',
      model: '',
      provider: '',
      total_in: 0,
      total_out: 0,
      total_cost: 0,
      tool_calls: 0,
      turns: 0,
      compactions: 0,
      context_pct: 0,
    });
  });

  it('is idempotent: reopening an existing db re-runs migrations without error or data loss', () => {
    const first = loadGetDb()();
    first
      .prepare(
        `INSERT INTO sessions (session_id, start_time, last_event, agent) VALUES ('s', 1, 2, 'codex')`
      )
      .run();
    first.close();
    opened.length = 0;

    const second = loadGetDb()();
    expect(columns(second, 'sessions').filter((c) => c.name === 'agent')).toHaveLength(1);
    expect(second.prepare(`SELECT agent, last_event FROM sessions`).get()).toEqual({
      agent: 'codex',
      last_event: 2,
    });
  });

  it('adds the agent column to a pre-existing db created before that migration', () => {
    const dbDir = path.join(home, '.hydrotik', 'air');
    fs.mkdirSync(dbDir, { recursive: true });
    const BetterSqlite = require('better-sqlite3');
    const legacy = new BetterSqlite(path.join(dbDir, 'telemetry.db'));
    legacy.exec(`
      CREATE TABLE sessions (
        session_id TEXT PRIMARY KEY, start_time INTEGER NOT NULL, last_event INTEGER NOT NULL,
        cwd TEXT NOT NULL DEFAULT '', model TEXT NOT NULL DEFAULT '', provider TEXT NOT NULL DEFAULT '',
        total_in INTEGER NOT NULL DEFAULT 0, total_out INTEGER NOT NULL DEFAULT 0,
        total_cost REAL NOT NULL DEFAULT 0, tool_calls INTEGER NOT NULL DEFAULT 0,
        turns INTEGER NOT NULL DEFAULT 0, compactions INTEGER NOT NULL DEFAULT 0,
        context_pct REAL NOT NULL DEFAULT 0
      );
      INSERT INTO sessions (session_id, start_time, last_event) VALUES ('old', 1, 1);
    `);
    legacy.close();

    const db = loadGetDb()();
    expect(db.prepare(`SELECT agent FROM sessions WHERE session_id = 'old'`).get()).toEqual({
      agent: 'pi',
    });
  });

  it('enforces the session foreign key on child tables', () => {
    const db = loadGetDb()();
    expect(() =>
      db
        .prepare(
          `INSERT INTO events (id, session_id, timestamp, type, data) VALUES ('e', 'missing', 1, 't', '{}')`
        )
        .run()
    ).toThrow(/FOREIGN KEY/);
  });

  it('cascades session deletes to every child table', () => {
    const db = loadGetDb()();
    db.exec(`
      INSERT INTO sessions (session_id, start_time, last_event) VALUES ('s', 1, 1);
      INSERT INTO events (id, session_id, timestamp, type, data) VALUES ('e', 's', 1, 't', '{}');
      INSERT INTO tool_calls (tool_call_id, session_id, tool_name, start_time) VALUES ('c', 's', 'read', 1);
      INSERT INTO context_snapshots (session_id, timestamp, tokens_used, context_window, utilization)
        VALUES ('s', 1, 10, 100, 10);
      INSERT INTO latency_snapshots (session_id, timestamp, operation, total_ms) VALUES ('s', 1, 'turn', 5);
      INSERT INTO cost_snapshots (session_id, timestamp, model, provider) VALUES ('s', 1, 'm', 'p');
      INSERT INTO output_evals (session_id, timestamp, turn_index, model, provider) VALUES ('s', 1, 0, 'm', 'p');
      INSERT INTO prompt_ratings (session_id, timestamp, prompt_hash, variant, model, provider)
        VALUES ('s', 1, 'h', 'v', 'm', 'p');
      INSERT INTO drift_events (session_id, timestamp, metric, model, provider, baseline, current_val,
        deviation_pct, direction, severity, window_size, threshold)
        VALUES ('s', 1, 'latency', 'm', 'p', 1, 2, 100, 'increase', 'critical', 10, 50);
    `);

    db.prepare(`DELETE FROM sessions WHERE session_id = 's'`).run();

    for (const table of tableNames(db).filter((t) => t !== 'sessions')) {
      const { n } = db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number };
      expect({ table, n }).toEqual({ table, n: 0 });
    }
  });

  it('applies column defaults for output_evals and prompt_ratings', () => {
    const db = loadGetDb()();
    db.exec(`
      INSERT INTO sessions (session_id, start_time, last_event) VALUES ('s', 1, 1);
      INSERT INTO output_evals (session_id, timestamp, turn_index, model, provider) VALUES ('s', 1, 0, 'm', 'p');
      INSERT INTO prompt_ratings (session_id, timestamp, prompt_hash, variant, model, provider)
        VALUES ('s', 1, 'h', 'v', 'm', 'p');
    `);
    expect(db.prepare(`SELECT * FROM output_evals`).get()).toMatchObject({
      tool_success_rate: 1,
      had_retry: 0,
      user_rating: null,
      tags: null,
    });
    expect(db.prepare(`SELECT * FROM prompt_ratings`).get()).toMatchObject({
      category: 'system',
      goal_achieved: 0,
      turns_to_complete: 1,
      rating: null,
    });
  });
});
