#!/usr/bin/env node

/**
 * Start the AIr server as a fully detached background process.
 *
 * Works on macOS, Linux, and Windows. The server survives terminal closure
 * and CI tool process-group cleanup (e.g. pi, Cursor, VS Code tasks).
 *
 * Usage:
 *   node scripts/start-detached.mjs              # default port 5200
 *   node scripts/start-detached.mjs --port 8080  # custom port
 *   node scripts/start-detached.mjs --stop       # kill running instance
 *
 * Logs:  /tmp/air-server.log  (macOS/Linux)
 *        %TEMP%\air-server.log  (Windows)
 */

import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const pkgRoot = join(__dirname, '..');
const pidFile = join(tmpdir(), 'air-server.pid');
const logFile = join(tmpdir(), 'air-server.log');

const args = process.argv.slice(2);

// ─── Stop mode ──────────────────────────────────────────────────────────────

if (args.includes('--stop')) {
  if (existsSync(pidFile)) {
    const pid = Number(readFileSync(pidFile, 'utf-8').trim());
    try {
      process.kill(pid, 'SIGTERM');
      unlinkSync(pidFile);
      console.log(`⚡ AIr stopped (PID ${pid})`);
    } catch {
      console.log(`⚡ AIr was not running (stale PID ${pid})`);
      unlinkSync(pidFile);
    }
  } else {
    console.log('⚡ AIr is not running (no PID file)');
  }
  process.exit(0);
}

// ─── Kill any existing instance ─────────────────────────────────────────────

if (existsSync(pidFile)) {
  const oldPid = Number(readFileSync(pidFile, 'utf-8').trim());
  try {
    process.kill(oldPid, 'SIGTERM');
    console.log(`⚡ Stopped previous AIr instance (PID ${oldPid})`);
    // Give it a moment to release the port
    await new Promise((r) => setTimeout(r, 1000));
  } catch {
    // Already dead — clean up
  }
  try { unlinkSync(pidFile); } catch {}
}

// ─── Start detached ─────────────────────────────────────────────────────────

const cliPath = join(pkgRoot, 'dist', 'server', 'cli.js');

// Pass through any args (--port, --host, --redaction)
const child = spawn(process.execPath, [cliPath, ...args], {
  cwd: pkgRoot,
  detached: true,
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env },
});

// Capture initial output to confirm startup
let startupOutput = '';
const onData = (chunk) => { startupOutput += chunk.toString(); };
child.stdout.on('data', onData);
child.stderr.on('data', onData);

// Write PID file
writeFileSync(pidFile, String(child.pid));
child.unref();

// Wait for server to emit its banner (up to 5s)
const started = await new Promise((resolve) => {
  const timeout = setTimeout(() => resolve(false), 5000);
  const check = setInterval(() => {
    if (startupOutput.includes('Dashboard:') || startupOutput.includes('AIr')) {
      clearInterval(check);
      clearTimeout(timeout);
      resolve(true);
    }
  }, 200);
});

// Detach stdout/stderr listeners and redirect to log file
child.stdout.removeListener('data', onData);
child.stderr.removeListener('data', onData);

if (started) {
  // Print the captured banner
  const bannerLines = startupOutput.trim().split('\n');
  for (const line of bannerLines) {
    console.log(line);
  }
  console.log(`  PID:        ${child.pid}`);
  console.log(`  PID file:   ${pidFile}`);
  console.log(`  Log file:   ${logFile}`);
  console.log('');
} else {
  console.error('⚠ AIr may not have started correctly. Check logs:');
  console.error(`  ${logFile}`);
  if (startupOutput) console.error(startupOutput);
}
