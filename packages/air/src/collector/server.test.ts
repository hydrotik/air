import path from 'node:path';
import { ensureServer, isServerRunning, launchCandidates, type ServerDeps } from './server';
import { defined } from '../sdk/__testing__/defined';

const NODE = '/bin/node';
const PROJECT_CLI = path.resolve('/repo', 'node_modules/@hydrotik/air/dist/server/cli.js');

describe('launchCandidates', () => {
  it("tries this package's CLI (built copy), the project's install, then the global bin", () => {
    const self = '/pkg/dist/collectors/pi';
    const own = path.resolve('/pkg/dist/server/cli.js');
    expect(launchCandidates('/repo', 5300, self, (f) => f === own, NODE)).toEqual([
      { cmd: NODE, args: [own, '--port', '5300'], available: true },
      { cmd: NODE, args: [PROJECT_CLI, '--port', '5300'], available: false },
      { cmd: 'air', args: ['--port', '5300'], available: true },
    ]);
  });

  it("finds the package's CLI from the sources in a clone", () => {
    const own = path.resolve('/clone/packages/air/dist/server/cli.js');
    const [first] = launchCandidates(
      '/repo',
      5200,
      '/clone/packages/air/src/collector',
      (f) => f === own,
      NODE
    );
    expect(first).toEqual({ cmd: NODE, args: [own, '--port', '5200'], available: true });
  });

  it('lists the project install once when the collector is loaded from it', () => {
    const self = '/repo/node_modules/@hydrotik/air/dist/collectors/pi';
    expect(launchCandidates('/repo', 5200, self, () => true, NODE)).toEqual([
      { cmd: NODE, args: [PROJECT_CLI, '--port', '5200'], available: true },
      { cmd: 'air', args: ['--port', '5200'], available: true },
    ]);
  });

  it('falls back to the project install and the global bin when no CLI is found', () => {
    const candidates = launchCandidates('/repo', 5200, '/elsewhere/a/b', () => false);
    expect(candidates.map((c) => [c.args[0], c.available])).toEqual([
      [PROJECT_CLI, false],
      ['--port', true],
    ]);
    expect(candidates[0]?.cmd).toBe(process.execPath);
  });
});

/** Fakes for the network, the process table and the clock; `upAfter` health checks succeed. */
function fakes(upAfter = Infinity) {
  let checks = 0;
  const children: Array<{ unref: jest.Mock; on: jest.Mock }> = [];
  const deps: ServerDeps = {
    fetch: jest.fn(async () => ({ ok: ++checks > upAfter })),
    spawn: jest.fn(() => {
      const child = { unref: jest.fn(), on: jest.fn() };
      children.push(child);
      return child;
    }),
    sleep: jest.fn(async () => {}),
  };
  return { deps, children, checks: () => checks };
}

const candidate = (cmd: string, available = true) => ({ cmd, args: ['--port', '5200'], available });

describe('isServerRunning', () => {
  it('asks the health endpoint on the port', async () => {
    const { deps } = fakes(0);
    expect(await isServerRunning(5300, deps)).toBe(true);
    expect(deps.fetch).toHaveBeenCalledWith('http://localhost:5300/api/health');
  });

  it('is false when the request fails or is not ok', async () => {
    expect(await isServerRunning(5200, fakes().deps)).toBe(false);
    expect(await isServerRunning(5200, { fetch: () => Promise.reject(new Error('refused')) })).toBe(
      false
    );
  });
});

describe('ensureServer', () => {
  it('starts nothing when a server already answers', async () => {
    const { deps } = fakes(0);
    expect(await ensureServer({ port: 5200, candidates: [candidate('a')] }, deps)).toBe(true);
    expect(deps.spawn).not.toHaveBeenCalled();
  });

  it('spawns the first available candidate detached, and waits for it to answer', async () => {
    const { deps, children } = fakes(3);
    const ok = await ensureServer(
      { port: 5300, candidates: [candidate('missing', false), candidate('a'), candidate('b')] },
      deps
    );
    expect(ok).toBe(true);
    expect(deps.spawn).toHaveBeenCalledTimes(1);
    expect(deps.spawn).toHaveBeenCalledWith(
      'a',
      ['--port', '5200'],
      expect.objectContaining({
        detached: true,
        stdio: 'ignore',
        env: expect.objectContaining({ AIR_PORT: '5300' }),
      })
    );
    const child = defined(children[0], 'spawned child');
    expect(child.unref).toHaveBeenCalled();
    // A command that cannot be found is an 'error' event: it must have a listener.
    expect(child.on).toHaveBeenCalledWith('error', expect.any(Function));
    const onError = defined(child.on.mock.calls[0], "on('error') call")[1] as () => void;
    expect(onError).not.toThrow();
    expect(deps.sleep).toHaveBeenCalledTimes(3);
  });

  it('tries the next candidate when one does not answer within waitMs, then gives up', async () => {
    const { deps } = fakes();
    const ok = await ensureServer(
      { port: 5200, candidates: [candidate('a'), candidate('b')], waitMs: 1000, pollMs: 250 },
      deps
    );
    expect(ok).toBe(false);
    expect(jest.mocked(deps.spawn).mock.calls.map((c) => c[0])).toEqual(['a', 'b']);
    expect(deps.sleep).toHaveBeenCalledTimes(8);
  });

  it('moves on when spawning throws', async () => {
    const { deps } = fakes(1);
    jest.mocked(deps.spawn).mockImplementationOnce(() => {
      throw new Error('EACCES');
    });
    expect(
      await ensureServer({ port: 5200, candidates: [candidate('a'), candidate('b')] }, deps)
    ).toBe(true);
    expect(deps.spawn).toHaveBeenCalledTimes(2);
  });

  it('stops waiting and spawning once cancelled', async () => {
    const { deps } = fakes();
    let cancelled = false;
    jest.mocked(deps.sleep).mockImplementation(async () => {
      cancelled = true;
    });
    const ok = await ensureServer(
      { port: 5200, candidates: [candidate('a'), candidate('b')], cancelled: () => cancelled },
      deps
    );
    expect(ok).toBe(false);
    expect(deps.spawn).toHaveBeenCalledTimes(1);
    expect(deps.sleep).toHaveBeenCalledTimes(1);
  });

  it('uses fetch, spawn and timers by default', async () => {
    const fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValue(new Response(null, { status: 200 }));
    try {
      // A real child that exits at once; the second health check answers.
      const noop = { cmd: process.execPath, args: ['-e', ''], available: true };
      expect(await ensureServer({ port: 5999, candidates: [noop], pollMs: 10 })).toBe(true);
      expect(fetchSpy).toHaveBeenCalledWith('http://localhost:5999/api/health');
      expect(await isServerRunning(5999)).toBe(true);
    } finally {
      fetchSpy.mockRestore();
    }
  });
});
