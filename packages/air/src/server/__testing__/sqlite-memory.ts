/**
 * A better-sqlite3-shaped in-memory database built on Node's own `node:sqlite`.
 *
 * Server tests mock `better-sqlite3` with this so the real schema and
 * TelemetryStore run against a throwaway database: nothing touches
 * ~/.hydrotik/air, and the tests do not depend on the native addon having been
 * compiled for the running Node version. Only the API surface the db layer
 * uses is provided (exec, pragma, prepare -> run/get/all, close).
 */

type SqliteModule = typeof import('node:sqlite');

// Jest's resolver does not know prefix-only builtins such as node:sqlite.
const { DatabaseSync } = process.getBuiltinModule('node:sqlite') as SqliteModule;

type Param = string | number | bigint | Buffer | null | undefined;

/** better-sqlite3 binds undefined as NULL; node:sqlite rejects it */
const toSqlite = (params: Param[]) => params.map((p) => (p === undefined ? null : p));

/** node:sqlite rows have a null prototype; hand back plain objects */
const plain = <T>(row: T): T => (row && typeof row === 'object' ? { ...row } : row);

class Statement {
  constructor(private readonly stmt: ReturnType<InstanceType<typeof DatabaseSync>['prepare']>) {}

  run(...params: Param[]) {
    return this.stmt.run(...(toSqlite(params) as never[]));
  }

  get(...params: Param[]) {
    return plain(this.stmt.get(...(toSqlite(params) as never[])));
  }

  all(...params: Param[]) {
    return this.stmt.all(...(toSqlite(params) as never[])).map(plain);
  }
}

export default class MemoryDatabase {
  /** Every database opened since the module loaded, for inspection and cleanup */
  static opened: MemoryDatabase[] = [];

  readonly db = new DatabaseSync(':memory:');

  constructor(_filename?: string, _options?: unknown) {
    MemoryDatabase.opened.push(this);
  }

  exec(sql: string): this {
    this.db.exec(sql);
    return this;
  }

  pragma(source: string): unknown[] {
    return this.db.prepare(`PRAGMA ${source}`).all().map(plain);
  }

  prepare(sql: string): Statement {
    return new Statement(this.db.prepare(sql));
  }

  close(): void {
    this.db.close();
  }
}
