import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  SetupConflictError,
  collectorDir,
  parseSetupArgs,
  planInstall,
  planUninstall,
  runSetup,
  telemetryEnv,
  type ClaudeSettings,
  type SetupOptions,
} from './claude-code';

const opts: SetupOptions = {
  parts: { env: true, integration: true },
  port: 5200,
  statusLine: true,
  force: false,
  hooksDir: '.claude/hooks',
};

const legacyInstall: ClaudeSettings = {
  hooks: {
    SessionStart: [
      { hooks: [{ type: 'command', command: 'node .claude/hooks/air-session-start.cjs' }] },
    ],
    PostToolUse: [
      { hooks: [{ type: 'command', command: 'node .claude/hooks/air-post-tool-use.cjs' }] },
      { matcher: 'Edit', hooks: [{ type: 'command', command: 'npx oxfmt' }] },
    ],
  },
};

describe('telemetryEnv', () => {
  it('points the OTLP exporter at the receiver; AIR_URL only for another port', () => {
    expect(telemetryEnv(5200)).toEqual({
      CLAUDE_CODE_ENABLE_TELEMETRY: '1',
      OTEL_LOGS_EXPORTER: 'otlp',
      OTEL_METRICS_EXPORTER: 'otlp',
      OTEL_EXPORTER_OTLP_PROTOCOL: 'http/json',
      OTEL_EXPORTER_OTLP_ENDPOINT: 'http://localhost:5200/otlp',
      OTEL_LOGS_EXPORT_INTERVAL: '2000',
    });
    expect(telemetryEnv(6000)).toMatchObject({
      OTEL_EXPORTER_OTLP_ENDPOINT: 'http://localhost:6000/otlp',
      AIR_URL: 'http://localhost:6000',
    });
  });
});

describe('planInstall', () => {
  it('adds telemetry, the SessionStart hook and the status-line bridge to empty settings', () => {
    const plan = planInstall({}, null, opts);
    expect(plan.settings).toEqual({
      env: telemetryEnv(5200),
      hooks: {
        SessionStart: [
          { hooks: [{ type: 'command', command: 'node .claude/hooks/air-session-start.cjs' }] },
        ],
      },
      statusLine: { type: 'command', command: 'node .claude/hooks/air-statusline.cjs' },
    });
    expect(plan.files).toEqual(['air-session-start.cjs', 'air-statusline.cjs']);
    expect(plan.state?.previous).toEqual({
      env: Object.fromEntries(Object.keys(telemetryEnv(5200)).map((k) => [k, null])),
      statusLine: null,
    });
  });

  it('removes the PostToolUse hook of an older install and keeps other hooks', () => {
    const plan = planInstall(legacyInstall, null, opts);
    expect(plan.settings.hooks?.PostToolUse).toEqual([
      { matcher: 'Edit', hooks: [{ type: 'command', command: 'npx oxfmt' }] },
    ]);
    expect(plan.settings.hooks?.SessionStart).toHaveLength(1);
    expect(plan.changes).toContain(
      'hook PostToolUse air-post-tool-use removed (telemetry reports tool calls)'
    );
    expect(plan.changes.some((c) => c.startsWith('hook SessionStart'))).toBe(false);
  });

  it('drops an empty PostToolUse list entirely', () => {
    const only = {
      hooks: {
        PostToolUse: [
          { hooks: [{ type: 'command', command: 'node .claude/hooks/air-post-tool-use.js' }] },
        ],
      },
    };
    expect(planInstall(only, null, opts).settings.hooks).not.toHaveProperty('PostToolUse');
  });

  it('wraps an existing status line and records it for uninstall', () => {
    const plan = planInstall(
      { statusLine: { type: 'command', command: '~/bin/line.sh', padding: 1 } },
      null,
      opts
    );
    expect(plan.settings.statusLine).toEqual({
      type: 'command',
      command: 'node .claude/hooks/air-statusline.cjs',
      padding: 1,
    });
    expect(plan.state?.previous.statusLine).toEqual({
      type: 'command',
      command: '~/bin/line.sh',
      padding: 1,
    });
    expect(plan.changes).toContain(
      'statusLine node .claude/hooks/air-statusline.cjs (runs the previous status line: ~/bin/line.sh)'
    );
  });

  it('leaves the status line alone with --no-statusline', () => {
    const plan = planInstall({ statusLine: { type: 'command', command: 'x' } }, null, {
      ...opts,
      statusLine: false,
    });
    expect(plan.settings.statusLine).toEqual({ type: 'command', command: 'x' });
    expect(plan.files).toEqual(['air-session-start.cjs']);
  });

  it('refuses to replace other telemetry settings without --force', () => {
    const own = { env: { OTEL_EXPORTER_OTLP_ENDPOINT: 'https://collector.example:4318' } };
    expect(() => planInstall(own, null, opts)).toThrow(SetupConflictError);
    expect(() => planInstall(own, null, opts)).toThrow(
      /OTEL_EXPORTER_OTLP_ENDPOINT=https:\/\/collector\.example:4318/
    );

    const forced = planInstall(own, null, { ...opts, force: true });
    expect(forced.settings.env?.OTEL_EXPORTER_OTLP_ENDPOINT).toBe('http://localhost:5200/otlp');
    expect(forced.state?.previous.env.OTEL_EXPORTER_OTLP_ENDPOINT).toBe(
      'https://collector.example:4318'
    );
  });

  it('is idempotent: running it again changes nothing and keeps the first state', () => {
    const first = planInstall({ statusLine: { type: 'command', command: 'mine' } }, null, opts);
    const second = planInstall(first.settings, first.state, opts);
    expect(second.settings).toEqual(first.settings);
    expect(second.changes).toEqual([]);
    expect(second.state).toEqual(first.state);
  });

  it('writes absolute, quoted commands for the user scope', () => {
    const plan = planInstall({}, null, {
      ...opts,
      hooksDir: '/opt/air test/My Files/.claude/hooks',
    });
    expect(plan.settings.statusLine?.command).toBe(
      'node "/opt/air test/My Files/.claude/hooks/air-statusline.cjs"'
    );
  });
});

describe('planUninstall', () => {
  it('restores the settings that were there before install', () => {
    const before: ClaudeSettings = {
      env: { OTEL_EXPORTER_OTLP_ENDPOINT: 'https://collector.example:4318', KEEP: 'me' },
      statusLine: { type: 'command', command: 'mine' },
      hooks: { Stop: [{ hooks: [{ type: 'command', command: 'say done' }] }] },
      model: 'opus',
    };
    const installed = planInstall(before, null, { ...opts, force: true });
    const removed = planUninstall(installed.settings, installed.state);
    expect(removed.settings).toEqual(before);
    expect(removed.state).toBeNull();
  });

  it('without a state file, removes only values that are AIr’s own', () => {
    const handWritten: ClaudeSettings = {
      env: { ...telemetryEnv(5300), OTEL_LOGS_EXPORTER: 'console' },
      ...legacyInstall,
    };
    const { settings } = planUninstall(handWritten, null);
    expect(settings.env).toEqual({ OTEL_LOGS_EXPORTER: 'console' });
    expect(settings.hooks).toEqual({
      PostToolUse: [{ matcher: 'Edit', hooks: [{ type: 'command', command: 'npx oxfmt' }] }],
    });
  });

  it('removes a bridge status line that wrapped nothing', () => {
    const installed = planInstall({}, null, opts);
    const { settings, changes } = planUninstall(installed.settings, installed.state);
    expect(settings).toEqual({});
    expect(changes).toContain('statusLine removed');
  });
});

describe('parseSetupArgs', () => {
  it('reads flags with defaults', () => {
    expect(parseSetupArgs([])).toEqual({
      uninstall: false,
      dryRun: false,
      scope: 'project',
      port: 5200,
      statusLine: true,
      force: false,
    });
    expect(
      parseSetupArgs([
        '--user',
        '--port',
        '6000',
        '--no-statusline',
        '--force',
        '--dry-run',
        '--uninstall',
      ])
    ).toEqual({
      uninstall: true,
      dryRun: true,
      scope: 'user',
      port: 6000,
      statusLine: false,
      force: true,
    });
    expect(() => parseSetupArgs(['--port', 'x'])).toThrow('--port');
  });
});

describe('planInstall / planUninstall by part', () => {
  it('env only: telemetry, nothing else', () => {
    const plan = planInstall(legacyInstall, null, {
      ...opts,
      parts: { env: true, integration: false },
    });
    expect(plan.settings.env).toEqual(telemetryEnv(5200));
    expect(plan.settings.hooks).toEqual(legacyInstall.hooks);
    expect(plan.settings).not.toHaveProperty('statusLine');
    expect(plan.files).toEqual([]);
  });

  it('integration only: hooks and status line, no env', () => {
    const plan = planInstall({}, null, { ...opts, parts: { env: false, integration: true } });
    expect(plan.settings).not.toHaveProperty('env');
    expect(plan.files).toEqual(['air-session-start.cjs', 'air-statusline.cjs']);
  });

  it('a partial uninstall keeps the state the other part needs', () => {
    const installed = planInstall({ statusLine: { type: 'command', command: 'mine' } }, null, opts);
    const integrationOut = planUninstall(installed.settings, installed.state, {
      env: false,
      integration: true,
    });
    expect(integrationOut.settings.env).toEqual(telemetryEnv(5200));
    expect(integrationOut.state?.previous.statusLine).toBeNull();
    expect(Object.keys(integrationOut.state?.previous.env ?? {})).toHaveLength(6);

    const envOut = planUninstall(installed.settings, installed.state, {
      env: true,
      integration: false,
    });
    expect(envOut.settings).not.toHaveProperty('env');
    expect(envOut.state?.previous).toEqual({
      env: {},
      statusLine: { type: 'command', command: 'mine' },
    });
  });
});

describe('runSetup (files)', () => {
  let home: string;
  let project: string;
  const lines: string[] = [];
  const io = () => ({
    cwd: project,
    home,
    sourceDir: collectorDir(path.join(__dirname, '..', 'server')),
    log: (l: string) => lines.push(l),
  });
  const settingsOf = (root: string) => path.join(root, '.claude', 'settings.json');
  const read = (root: string) =>
    JSON.parse(fs.readFileSync(settingsOf(root), 'utf8')) as ClaudeSettings;
  const hook = (root: string, f: string) => path.join(root, '.claude', 'hooks', f);

  beforeEach(() => {
    home = fs.mkdtempSync(path.join(os.tmpdir(), 'air-setup-home-'));
    project = fs.mkdtempSync(path.join(os.tmpdir(), 'air-setup-project-'));
    lines.length = 0;
  });
  afterEach(() => {
    fs.rmSync(home, { recursive: true, force: true });
    fs.rmSync(project, { recursive: true, force: true });
  });

  it('project install: telemetry in the user settings, hooks and status line in the project', () => {
    fs.mkdirSync(path.join(project, '.claude', 'hooks'), { recursive: true });
    const original = { statusLine: { type: 'command', command: 'mine' }, ...legacyInstall };
    fs.writeFileSync(settingsOf(project), JSON.stringify(original));
    fs.writeFileSync(hook(project, 'air-post-tool-use.cjs'), '// old');
    fs.mkdirSync(path.join(home, '.claude'), { recursive: true });
    fs.writeFileSync(settingsOf(home), JSON.stringify({ model: 'opus' }));

    expect(runSetup([], io())).toBe(0);
    expect(read(home)).toEqual({ model: 'opus', env: telemetryEnv(5200) });
    expect(read(project)).not.toHaveProperty('env');
    expect(read(project).statusLine?.command).toBe('node .claude/hooks/air-statusline.cjs');
    expect(fs.existsSync(hook(project, 'air-session-start.cjs'))).toBe(true);
    expect(fs.existsSync(hook(project, 'air-statusline.cjs'))).toBe(true);
    expect(fs.existsSync(hook(project, 'air-post-tool-use.cjs'))).toBe(false);
    expect(fs.existsSync(hook(home, 'air-session-start.cjs'))).toBe(false);
    expect(lines.join('\n')).toContain('every Claude Code session on this machine reports to AIr');

    // project uninstall: the project is restored, the user telemetry stays
    expect(runSetup(['--uninstall'], io())).toBe(0);
    expect(read(project)).toEqual({
      statusLine: { type: 'command', command: 'mine' },
      hooks: {
        PostToolUse: [{ matcher: 'Edit', hooks: [{ type: 'command', command: 'npx oxfmt' }] }],
      },
    });
    expect(read(home).env).toEqual(telemetryEnv(5200));
    expect(fs.existsSync(hook(project, 'air-statusline.cjs'))).toBe(false);
    expect(lines.join('\n')).toContain('--uninstall --user');

    // user uninstall: telemetry removed, the user's own settings intact
    expect(runSetup(['--uninstall', '--user'], io())).toBe(0);
    expect(read(home)).toEqual({ model: 'opus' });
    expect(fs.existsSync(hook(home, 'air-setup.json'))).toBe(false);
  });

  it('user install puts everything in the user settings with absolute commands', () => {
    expect(runSetup(['--user', '--no-statusline'], io())).toBe(0);
    const s = read(home);
    expect(s.env).toEqual(telemetryEnv(5200));
    expect(s.hooks?.SessionStart?.[0]?.hooks?.[0]?.command).toBe(
      `node ${JSON.stringify(hook(home, 'air-session-start.cjs'))}`
    );
    expect(s).not.toHaveProperty('statusLine');
    expect(fs.existsSync(settingsOf(project))).toBe(false);
  });

  it('writes nothing on a dry run and lists the changes for both files', () => {
    expect(runSetup(['--dry-run'], io())).toBe(0);
    expect(fs.existsSync(settingsOf(home))).toBe(false);
    expect(fs.existsSync(settingsOf(project))).toBe(false);
    expect(lines.filter((l) => l.endsWith('(dry run, nothing written)'))).toHaveLength(2);
    expect(lines).toContain('  env OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:5200/otlp');
    expect(lines).toContain('  statusLine node .claude/hooks/air-statusline.cjs');
  });

  it('exits 1 on a telemetry conflict and writes neither file', () => {
    fs.mkdirSync(path.join(home, '.claude'), { recursive: true });
    const own = JSON.stringify({ env: { OTEL_LOGS_EXPORTER: 'console' } });
    fs.writeFileSync(settingsOf(home), own);
    expect(runSetup([], io())).toBe(1);
    expect(fs.readFileSync(settingsOf(home), 'utf8')).toBe(own);
    expect(fs.existsSync(settingsOf(project))).toBe(false);
    expect(lines.join('\n')).toContain('--force');
  });

  it('exits 2 on a bad port', () => {
    expect(runSetup(['--port', '0'], io())).toBe(2);
  });

  it('says so when there is nothing to change', () => {
    runSetup([], io());
    lines.length = 0;
    runSetup([], io());
    expect(lines.filter((l) => l === '  No changes')).toHaveLength(2);
  });

  it('refuses to install without the hook scripts folder', () => {
    expect(() => runSetup([], { cwd: project, home, log: () => {} })).toThrow('sourceDir');
  });
});

describe('collectorDir and the default log', () => {
  it('finds the scripts from src/server and fails clearly elsewhere', () => {
    expect(
      fs.existsSync(path.join(collectorDir(path.join(__dirname, '..', 'server')), 'statusline.cjs'))
    ).toBe(true);
    expect(() => collectorDir(os.tmpdir())).toThrow('Claude Code hook scripts not found');
  });

  it('logs to the console when no logger is given', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      expect(runSetup(['--port', 'nope'])).toBe(2);
      expect(spy).toHaveBeenCalledWith('--port: not a port number');
    } finally {
      spy.mockRestore();
    }
  });
});
