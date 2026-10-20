/**
 * `air setup claude-code`: connects Claude Code to AIr.
 *
 * Two parts, written to two places:
 *
 * - **Telemetry** (`env`): Claude Code's OpenTelemetry export, pointed at AIr's OTLP receiver
 *   (tokens, cost, latency, tool durations, compaction). Always in the user settings,
 *   `~/.claude/settings.json`: Claude Code ignores these variables in a project's settings so
 *   that a repository cannot turn telemetry on or redirect it. Every Claude Code session on the
 *   machine then reports to AIr.
 * - **Integration** (`hooks`, `statusLine`), in the project's `.claude/settings.json`, or the
 *   user's with `--user`:
 *   - the SessionStart hook (the session's folder; starts the server when it is down). The
 *     PostToolUse hook from older installs is removed: telemetry reports every tool call, and
 *     both together count each call twice;
 *   - a status-line bridge that sends the exact context-window figures. A status line that was
 *     already configured keeps showing: the bridge runs it and prints its output.
 *
 * What was there before is kept in `<scope>/.claude/hooks/air-setup.json`, so `--uninstall` puts
 * it back. Planning is pure (settings in, settings out); `runSetup` does the file I/O.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// ─── Settings (the parts touched here) ─────────────────────────────────────

interface HookCommand {
  type: string;
  command?: string;
  [key: string]: unknown;
}

interface HookEntry {
  matcher?: string;
  hooks?: HookCommand[];
  [key: string]: unknown;
}

interface StatusLine {
  type: string;
  command?: string;
  [key: string]: unknown;
}

export interface ClaudeSettings {
  env?: Record<string, string>;
  hooks?: Record<string, HookEntry[]>;
  statusLine?: StatusLine;
  [key: string]: unknown;
}

/** What `--uninstall` needs to put back. */
export interface SetupState {
  version: 1;
  /** Env values AIr replaced (null: the key did not exist). */
  previous: { env: Record<string, string | null>; statusLine: StatusLine | null };
}

/** Which parts a plan covers in one settings file. */
export interface Parts {
  env: boolean;
  integration: boolean;
}

export interface SetupOptions {
  parts: Parts;
  port: number;
  statusLine: boolean;
  force: boolean;
  /** Folder holding the hook scripts, as written into commands. */
  hooksDir: string;
}

export interface Plan {
  settings: ClaudeSettings;
  state: SetupState | null;
  changes: string[];
  /** Hook scripts to copy into the hooks folder (install) or delete (uninstall). */
  files: string[];
}

export class SetupConflictError extends Error {}

const SESSION_HOOK = 'air-session-start.cjs';
const TOOL_HOOK = /air-post-tool-use\.c?js\b/;
const STATUS_SCRIPT = 'air-statusline.cjs';
const STATE_FILE = 'air-setup.json';
const ALL: Parts = { env: true, integration: true };

export function telemetryEnv(port: number): Record<string, string> {
  const env: Record<string, string> = {
    CLAUDE_CODE_ENABLE_TELEMETRY: '1',
    OTEL_LOGS_EXPORTER: 'otlp',
    OTEL_METRICS_EXPORTER: 'otlp',
    OTEL_EXPORTER_OTLP_PROTOCOL: 'http/json',
    OTEL_EXPORTER_OTLP_ENDPOINT: `http://localhost:${port}/otlp`,
    OTEL_LOGS_EXPORT_INTERVAL: '2000',
  };
  // The hooks and the status-line bridge default to 5200.
  if (port !== 5200) env.AIR_URL = `http://localhost:${port}`;
  return env;
}

/** `node .claude/hooks/x.cjs` in a project; `node "/abs/path/x.cjs"` for the user scope. */
const command = (hooksDir: string, script: string) => {
  const file = path.join(hooksDir, script);
  return path.isAbsolute(file) ? `node ${JSON.stringify(file)}` : `node ${file}`;
};

const isAirCommand = (c: string | undefined, script: string | RegExp) =>
  typeof c === 'string' && (typeof script === 'string' ? c.includes(script) : script.test(c));

/** Removes AIr's command from every entry of one hook event; drops entries left empty. */
function withoutAirHook(entries: HookEntry[] | undefined, script: string | RegExp) {
  let removed = 0;
  const kept: HookEntry[] = [];
  for (const entry of entries ?? []) {
    const hooks = (entry.hooks ?? []).filter((h) => {
      const air = isAirCommand(h.command, script);
      if (air) removed++;
      return !air;
    });
    if (hooks.length || !entry.hooks) kept.push({ ...entry, hooks });
  }
  return { kept, removed };
}

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v ?? {})) as T;

export function planInstall(
  current: ClaudeSettings,
  existingState: SetupState | null,
  opts: SetupOptions
): Plan {
  const settings = clone(current);
  const changes: string[] = [];
  const files: string[] = [];
  const state: SetupState = clone(existingState) ?? {
    version: 1,
    previous: { env: {}, statusLine: null },
  };
  state.version = 1;
  state.previous ??= { env: {}, statusLine: null };

  if (opts.parts.env) {
    const wanted = telemetryEnv(opts.port);
    const env = { ...(settings.env ?? {}) };
    const conflicts = Object.entries(wanted).filter(
      ([k, v]) => env[k] !== undefined && env[k] !== v && !(k in state.previous.env)
    );
    if (conflicts.length && !opts.force) {
      throw new SetupConflictError(
        `Already set to other values: ${conflicts.map(([k]) => `${k}=${env[k]}`).join(', ')}. ` +
          'Run with --force to replace them (they are restored by --uninstall).'
      );
    }
    for (const [k, v] of Object.entries(wanted)) {
      if (env[k] === v) continue;
      if (!(k in state.previous.env)) state.previous.env[k] = env[k] ?? null;
      env[k] = v;
      changes.push(`env ${k}=${v}`);
    }
    settings.env = env;
  }

  if (opts.parts.integration) {
    const hooks = { ...(settings.hooks ?? {}) };
    const tool = withoutAirHook(hooks.PostToolUse, TOOL_HOOK);
    if (tool.removed) {
      changes.push('hook PostToolUse air-post-tool-use removed (telemetry reports tool calls)');
      if (tool.kept.length) hooks.PostToolUse = tool.kept;
      else delete hooks.PostToolUse;
    }
    const sessionCommand = command(opts.hooksDir, SESSION_HOOK);
    const session = withoutAirHook(hooks.SessionStart, SESSION_HOOK);
    hooks.SessionStart = [
      ...session.kept,
      { hooks: [{ type: 'command', command: sessionCommand }] },
    ];
    if (!session.removed) changes.push(`hook SessionStart ${sessionCommand}`);
    settings.hooks = hooks;
    files.push(SESSION_HOOK);

    if (opts.statusLine) {
      const bridge = command(opts.hooksDir, STATUS_SCRIPT);
      const existing = settings.statusLine;
      if (!isAirCommand(existing?.command, STATUS_SCRIPT)) {
        state.previous.statusLine = existing ?? null;
        settings.statusLine = { ...(existing ?? {}), type: 'command', command: bridge };
        changes.push(
          existing?.command
            ? `statusLine ${bridge} (runs the previous status line: ${existing.command})`
            : `statusLine ${bridge}`
        );
      }
      files.push(STATUS_SCRIPT);
    }
  }

  return { settings, state, changes, files };
}

export function planUninstall(
  current: ClaudeSettings,
  state: SetupState | null,
  parts: Parts = ALL
): Plan {
  const settings = clone(current);
  const changes: string[] = [];

  if (parts.env) {
    const env = { ...(settings.env ?? {}) };
    // With a state file: exactly the keys setup changed. Without one (settings written by hand
    // from the README): only values that are AIr's own.
    const isOurs = (k: string, v: string | undefined) =>
      v !== undefined &&
      (k === 'OTEL_EXPORTER_OTLP_ENDPOINT'
        ? /^http:\/\/localhost:\d+\/otlp$/.test(v)
        : k === 'AIR_URL'
          ? /^http:\/\/localhost:\d+$/.test(v)
          : telemetryEnv(5200)[k] === v);
    const keys = state
      ? Object.keys(state.previous.env)
      : [...Object.keys(telemetryEnv(5200)), 'AIR_URL'];
    for (const k of keys) {
      const prev = state?.previous.env[k];
      if (prev !== undefined && prev !== null) {
        env[k] = prev;
        changes.push(`env ${k} restored`);
      } else if (k in env && (state || isOurs(k, env[k]))) {
        delete env[k];
        changes.push(`env ${k} removed`);
      }
    }
    if (Object.keys(env).length) settings.env = env;
    else delete settings.env;
  }

  const files: string[] = [];
  if (parts.integration) {
    const hooks = { ...(settings.hooks ?? {}) };
    for (const [event, script] of [
      ['SessionStart', SESSION_HOOK],
      ['PostToolUse', TOOL_HOOK],
    ] as const) {
      const { kept, removed } = withoutAirHook(hooks[event], script);
      if (!removed) continue;
      changes.push(`hook ${event} AIr entry removed`);
      if (kept.length) hooks[event] = kept;
      else delete hooks[event];
    }
    if (Object.keys(hooks).length) settings.hooks = hooks;
    else delete settings.hooks;

    if (isAirCommand(settings.statusLine?.command, STATUS_SCRIPT)) {
      const prev = state?.previous.statusLine;
      if (prev) {
        settings.statusLine = prev;
        changes.push(`statusLine restored: ${prev.command ?? prev.type}`);
      } else {
        delete settings.statusLine;
        changes.push('statusLine removed');
      }
    }
    files.push(SESSION_HOOK, STATUS_SCRIPT, 'air-post-tool-use.cjs');
  }

  // A partial uninstall keeps what the other part still needs from the state.
  let rest: SetupState | null = null;
  if (state && !(parts.env && parts.integration)) {
    rest = clone(state);
    if (parts.env) rest.previous.env = {};
    if (parts.integration) rest.previous.statusLine = null;
  }
  return { settings, state: rest, changes, files };
}

// ─── File I/O ───────────────────────────────────────────────────────────────

export interface SetupArgs {
  uninstall: boolean;
  dryRun: boolean;
  scope: 'project' | 'user';
  port: number;
  statusLine: boolean;
  force: boolean;
}

export function parseSetupArgs(argv: string[]): SetupArgs {
  const value = (name: string) => {
    const i = argv.indexOf(`--${name}`);
    return i === -1 ? undefined : argv[i + 1];
  };
  const port = Number(value('port') ?? 5200);
  if (!Number.isInteger(port) || port <= 0) throw new Error(`--port: not a port number`);
  return {
    uninstall: argv.includes('--uninstall'),
    dryRun: argv.includes('--dry-run'),
    scope: argv.includes('--user') ? 'user' : 'project',
    port,
    statusLine: !argv.includes('--no-statusline'),
    force: argv.includes('--force'),
  };
}

/**
 * Folder of the shipped Claude Code hook scripts, from the folder of the running CLI (dist/server
 * in the package, src/server from a clone).
 */
export function collectorDir(from: string): string {
  for (const rel of ['../../src/collectors/claude-code', '../collectors/claude-code']) {
    const dir = path.resolve(from, rel);
    if (fs.existsSync(path.join(dir, 'session-start.cjs'))) return dir;
  }
  throw new Error('Claude Code hook scripts not found in this install');
}

function readJson<T>(file: string): T | null {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
}

export interface SetupIo {
  cwd: string;
  home: string;
  sourceDir: string;
  log: (line: string) => void;
}

interface Target {
  root: string;
  parts: Parts;
  /** Hooks folder as written into commands: relative in a project, absolute for the user. */
  hooksDir: string;
}

/** Runs `air setup claude-code`. Returns the process exit code. */
export function runSetup(argv: string[], io?: Partial<SetupIo>): number {
  const log = io?.log ?? ((l: string) => console.log(l));
  let args: SetupArgs;
  try {
    args = parseSetupArgs(argv);
  } catch (err) {
    log(String((err as Error).message));
    return 2;
  }
  const home = io?.home ?? os.homedir();
  const userHooks = path.join(home, '.claude', 'hooks');
  const targets: Target[] =
    args.scope === 'user'
      ? [{ root: home, parts: ALL, hooksDir: userHooks }]
      : [
          { root: home, parts: { env: !args.uninstall, integration: false }, hooksDir: userHooks },
          {
            root: io?.cwd ?? process.cwd(),
            parts: { env: false, integration: true },
            hooksDir: path.join('.claude', 'hooks'),
          },
        ];

  // Plan everything before writing anything: a conflict leaves every file as it was.
  const planned: { target: Target; plan: Plan; settingsFile: string; hooksAbs: string }[] = [];
  for (const target of targets) {
    if (!target.parts.env && !target.parts.integration) continue;
    const hooksAbs = path.join(target.root, '.claude', 'hooks');
    const settingsFile = path.join(target.root, '.claude', 'settings.json');
    const current = readJson<ClaudeSettings>(settingsFile) ?? {};
    const state = readJson<SetupState>(path.join(hooksAbs, STATE_FILE));
    try {
      const plan = args.uninstall
        ? planUninstall(current, state, target.parts)
        : planInstall(current, state, {
            parts: target.parts,
            port: args.port,
            statusLine: args.statusLine,
            force: args.force,
            hooksDir: target.hooksDir,
          });
      planned.push({ target, plan, settingsFile, hooksAbs });
    } catch (err) {
      if (err instanceof SetupConflictError) {
        log(`${settingsFile}: ${err.message}`);
        return 1;
      }
      throw err;
    }
  }

  for (const { plan, settingsFile } of planned) {
    log(`${settingsFile}${args.dryRun ? ' (dry run, nothing written)' : ''}`);
    if (!plan.changes.length) log('  No changes');
    for (const c of plan.changes) log(`  ${c}`);
  }
  if (args.scope === 'project') {
    log(
      args.uninstall
        ? 'Telemetry settings in ~/.claude/settings.json are kept (other projects may use them). Remove them with: air setup claude-code --uninstall --user'
        : 'Telemetry is in ~/.claude/settings.json (Claude Code reads it from user settings only): every Claude Code session on this machine reports to AIr.'
    );
  }
  if (args.dryRun) return 0;

  for (const { target, plan, settingsFile, hooksAbs } of planned) {
    const stateFile = path.join(hooksAbs, STATE_FILE);
    fs.mkdirSync(hooksAbs, { recursive: true });
    fs.writeFileSync(settingsFile, `${JSON.stringify(plan.settings, null, 2)}\n`);
    if (args.uninstall) {
      for (const f of plan.files) fs.rmSync(path.join(hooksAbs, f), { force: true });
      if (plan.state) fs.writeFileSync(stateFile, `${JSON.stringify(plan.state, null, 2)}\n`);
      else fs.rmSync(stateFile, { force: true });
      continue;
    }
    if (target.parts.integration) {
      if (!io?.sourceDir) throw new Error('runSetup: sourceDir is required to install');
      const fromName: Record<string, string> = {
        [SESSION_HOOK]: 'session-start.cjs',
        [STATUS_SCRIPT]: 'statusline.cjs',
      };
      for (const f of plan.files)
        fs.copyFileSync(path.join(io.sourceDir, fromName[f] ?? f), path.join(hooksAbs, f));
      fs.rmSync(path.join(hooksAbs, 'air-post-tool-use.cjs'), { force: true });
    }
    fs.writeFileSync(stateFile, `${JSON.stringify(plan.state, null, 2)}\n`);
  }
  if (!args.uninstall) {
    log(`Start a new Claude Code session to apply. Dashboard: http://localhost:${args.port}`);
  }
  return 0;
}
