import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';

// The bridge is CommonJS (it runs as a status-line command in any project).
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { heartbeat, run, readInput } = require('./statusline.cjs') as {
  readInput: (fd?: number) => string;
  heartbeat: (data: unknown) => Record<string, unknown> | null;
  run: (
    input: string,
    write: (s: string) => void,
    opts?: { dir?: string; airUrl?: string; enabled?: boolean }
  ) => Promise<void>;
};

const SCRIPT = path.join(__dirname, 'statusline.cjs');

const snapshot = {
  session_id: 'cc-1',
  model: { id: 'claude-opus-5-5', display_name: 'Opus' },
  context_window: {
    context_window_size: 200000,
    used_percentage: 12.9,
    current_usage: {
      input_tokens: 4,
      output_tokens: 300,
      cache_creation_input_tokens: 1000,
      cache_read_input_tokens: 24800,
    },
  },
};

describe('statusline bridge: heartbeat', () => {
  it('reports input + cache tokens against the exact window, with the figures in the id', () => {
    expect(heartbeat(snapshot)).toEqual({
      id: 'statusline:cc-1:25804:200000',
      sessionId: 'cc-1',
      timestamp: expect.any(Number),
      type: 'heartbeat',
      contextTokens: 25804,
      contextWindow: 200000,
    });
  });

  it('sends nothing before the first API call or without a session', () => {
    expect(
      heartbeat({
        ...snapshot,
        context_window: { ...snapshot.context_window, current_usage: null },
      })
    ).toBeNull();
    expect(heartbeat({ context_window: snapshot.context_window })).toBeNull();
    expect(heartbeat({})).toBeNull();
  });
});

describe('statusline bridge: script', () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'air-statusline-'));
    fs.copyFileSync(SCRIPT, path.join(dir, 'air-statusline.cjs'));
  });
  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

  const run = (input: string, env: Record<string, string> = {}) =>
    spawnSync(process.execPath, [path.join(dir, 'air-statusline.cjs')], {
      input,
      encoding: 'utf8',
      env: { ...process.env, AIR_URL: 'http://127.0.0.1:9', ...env },
    });

  it('prints a short AIr line and survives an unreachable server', () => {
    const out = run(JSON.stringify(snapshot));
    expect(out.status).toBe(0);
    expect(out.stdout).toBe('AIr · 13% context\n');
  });

  it('prints a line for unreadable input', () => {
    expect(run('not json').stdout).toBe('AIr\n');
  });

  it('runs the previous status line with the same input and prints its output', () => {
    fs.writeFileSync(
      path.join(dir, 'air-setup.json'),
      JSON.stringify({
        version: 1,
        previous: { env: {}, statusLine: { type: 'command', command: 'cat | wc -c' } },
      })
    );
    const input = JSON.stringify(snapshot);
    expect(run(input).stdout.trim()).toBe(String(Buffer.byteLength(input)));
  });

  it('posts the heartbeat to AIr', async () => {
    const received: unknown[] = [];
    const server = http.createServer((req, res) => {
      let body = '';
      req.on('data', (c: Buffer) => (body += c.toString()));
      req.on('end', () => {
        received.push({ url: req.url, body: JSON.parse(body) });
        res.end('{}');
      });
    });
    await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
    const { port } = server.address() as { port: number };
    const child = await new Promise<number>((resolve) => {
      const { spawn } =
        jest.requireActual<typeof import('node:child_process')>('node:child_process');
      const p = spawn(process.execPath, [path.join(dir, 'air-statusline.cjs')], {
        env: { ...process.env, AIR_URL: `http://127.0.0.1:${port}` },
      });
      p.stdin.end(JSON.stringify(snapshot));
      p.on('close', (code) => resolve(code ?? -1));
    });
    await new Promise<void>((r) => server.close(() => r()));
    expect(child).toBe(0);
    expect(received).toEqual([
      {
        url: '/api/ingest',
        body: expect.objectContaining({ type: 'heartbeat', contextTokens: 25804 }),
      },
    ]);
  });

  it('sends nothing with AIR_ENABLED=false', () => {
    expect(run(JSON.stringify(snapshot), { AIR_ENABLED: 'false' }).status).toBe(0);
  });
});

describe('statusline bridge: run (in process)', () => {
  let dir: string;
  let server: http.Server;
  let port: number;
  const received: { url: string | undefined; body: Record<string, unknown> }[] = [];

  beforeEach(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'air-statusline-run-'));
    received.length = 0;
    server = http.createServer((req, res) => {
      let body = '';
      req.on('data', (c: Buffer) => (body += c.toString()));
      req.on('end', () => {
        received.push({ url: req.url, body: JSON.parse(body) as Record<string, unknown> });
        res.end('{}');
      });
    });
    await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
    port = (server.address() as { port: number }).port;
  });
  afterEach(async () => {
    await new Promise<void>((r) => server.close(() => r()));
    fs.rmSync(dir, { recursive: true, force: true });
  });

  const go = async (input: string, opts: { enabled?: boolean; airUrl?: string } = {}) => {
    let out = '';
    await run(input, (s) => (out += s), { dir, airUrl: `http://127.0.0.1:${port}`, ...opts });
    return out;
  };

  it('prints the AIr line and posts the heartbeat', async () => {
    expect(await go(JSON.stringify(snapshot))).toBe('AIr · 13% context\n');
    expect(received).toEqual([
      {
        url: '/api/ingest',
        body: expect.objectContaining({ type: 'heartbeat', contextWindow: 200000 }),
      },
    ]);
  });

  it('prints the previous status line instead when one was configured', async () => {
    fs.writeFileSync(
      path.join(dir, 'air-setup.json'),
      JSON.stringify({
        version: 1,
        previous: { env: {}, statusLine: { type: 'command', command: 'echo mine' } },
      })
    );
    expect(await go(JSON.stringify(snapshot))).toBe('mine\n');
  });

  it('ignores a state file without a previous command', async () => {
    fs.writeFileSync(
      path.join(dir, 'air-setup.json'),
      JSON.stringify({ version: 1, previous: { statusLine: null } })
    );
    expect(await go('{}')).toBe('AIr\n');
  });

  it('sends nothing when disabled, for unreadable input, or before the first API call', async () => {
    await go(JSON.stringify(snapshot), { enabled: false });
    await go('not json');
    await go(JSON.stringify({ session_id: 'x', context_window: { context_window_size: 1 } }));
    expect(received).toEqual([]);
  });

  it('gives up on a server that does not answer within 250 ms', async () => {
    const silent = http.createServer(() => {
      /* never responds */
    });
    await new Promise<void>((r) => silent.listen(0, '127.0.0.1', r));
    const silentPort = (silent.address() as { port: number }).port;
    const started = Date.now();
    await go(JSON.stringify(snapshot), { airUrl: `http://127.0.0.1:${silentPort}` });
    expect(Date.now() - started).toBeLessThan(2000);
    silent.closeAllConnections();
    await new Promise<void>((r) => silent.close(() => r()));
  });

  it('survives an unreachable server and an invalid AIR_URL', async () => {
    await expect(go(JSON.stringify(snapshot), { airUrl: 'http://127.0.0.1:9' })).resolves.toBe(
      'AIr · 13% context\n'
    );
    await expect(go(JSON.stringify(snapshot), { airUrl: 'not a url' })).resolves.toBe(
      'AIr · 13% context\n'
    );
  });
});

describe('statusline bridge: readInput', () => {
  it('reads the snapshot from a descriptor, and returns nothing for an unreadable one', () => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'air-in-')), 'in.json');
    fs.writeFileSync(file, '{"session_id":"x"}');
    const fd = fs.openSync(file, 'r');
    try {
      expect(readInput(fd)).toBe('{"session_id":"x"}');
    } finally {
      fs.closeSync(fd);
    }
    expect(readInput(987654)).toBe('');
  });
});
