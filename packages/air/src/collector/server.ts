/**
 * Starting the AIr server when it is not running: a health check, then a detached server from the
 * first install that can be found. The server outlives pi; nothing here waits on it beyond
 * `waitMs`.
 */
import { spawn as nodeSpawn, type SpawnOptions } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

/** One way to start the AIr server; `available` says whether it can be tried. */
export interface LaunchCandidate {
  cmd: string;
  args: string[];
  available: boolean;
}

const PROJECT_CLI = 'node_modules/@hydrotik/air/dist/server/cli.js';

/**
 * The ways to start the server, in the order they are tried:
 *
 * 1. the CLI of the package this collector was loaded from (`dist/collectors/pi/index.js` →
 *    `dist/server/cli.js`; from a clone, `src/collector` → `dist/server/cli.js`), so the server
 *    is the same version as the collector;
 * 2. the project's own install of `@hydrotik/air`;
 * 3. the global `air` bin.
 *
 * The JavaScript entry points run with `node` (the `.bin/air` of a pnpm install is a shell shim).
 */
export function launchCandidates(
  cwd: string,
  port: number,
  selfDir: string,
  exists: (file: string) => boolean = existsSync,
  node: string = process.execPath
): LaunchCandidate[] {
  const portArgs = ['--port', String(port)];
  const own = [
    path.resolve(selfDir, '../../server/cli.js'),
    path.resolve(selfDir, '../../dist/server/cli.js'),
  ].find((file) => exists(file));
  const project = path.resolve(cwd, PROJECT_CLI);
  const candidates: LaunchCandidate[] = [];
  if (own) candidates.push({ cmd: node, args: [own, ...portArgs], available: true });
  if (project !== own) {
    candidates.push({ cmd: node, args: [project, ...portArgs], available: exists(project) });
  }
  candidates.push({ cmd: 'air', args: portArgs, available: true });
  return candidates;
}

export interface ServerDeps {
  fetch: (url: string) => Promise<{ ok: boolean }>;
  spawn: (
    cmd: string,
    args: string[],
    options: SpawnOptions
  ) => { unref(): void; on(event: 'error', listener: (err: Error) => void): unknown };
  sleep: (ms: number) => Promise<void>;
}

const defaultDeps: ServerDeps = {
  fetch: (url) => fetch(url),
  spawn: nodeSpawn,
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export async function isServerRunning(
  port: number,
  deps: Pick<ServerDeps, 'fetch'> = defaultDeps
): Promise<boolean> {
  try {
    return (await deps.fetch(`http://localhost:${port}/api/health`)).ok;
  } catch {
    return false;
  }
}

export interface EnsureServerOptions {
  port: number;
  candidates: LaunchCandidate[];
  /** How long to wait for each candidate's server to answer. */
  waitMs?: number;
  pollMs?: number;
  /** Stops waiting (the session ended). */
  cancelled?: () => boolean;
}

/**
 * Resolves true once a server answers on `port`: the one already running, or one started from
 * the first candidate that comes up within `waitMs`. False when none did.
 */
export async function ensureServer(
  { port, candidates, waitMs = 3000, pollMs = 200, cancelled = () => false }: EnsureServerOptions,
  deps: ServerDeps = defaultDeps
): Promise<boolean> {
  if (await isServerRunning(port, deps)) return true;
  for (const { cmd, args, available } of candidates) {
    if (!available || cancelled()) continue;
    try {
      const child = deps.spawn(cmd, args, {
        detached: true,
        stdio: 'ignore',
        env: { ...process.env, AIR_PORT: String(port) },
      });
      // A missing command is reported as an 'error' event, which would otherwise be thrown.
      child.on('error', () => {});
      child.unref();
    } catch {
      continue;
    }
    for (let waited = 0; waited < waitMs && !cancelled(); waited += pollMs) {
      await deps.sleep(pollMs);
      if (await isServerRunning(port, deps)) return true;
    }
  }
  return false;
}
