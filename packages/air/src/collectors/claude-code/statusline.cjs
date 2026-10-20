#!/usr/bin/env node
/**
 * AIr — Claude Code status-line bridge
 *
 * Claude Code runs the status-line command after each update (debounced at 300 ms) with a JSON
 * snapshot of the session on stdin. This bridge sends the exact context-window figures to AIr as
 * a heartbeat, then prints a status line: the output of the status-line command that was
 * configured before AIr (kept in air-setup.json by `air setup claude-code`), or a short AIr line.
 *
 * It must never break the status line: the line is printed first, the POST is fire-and-forget
 * with a short timeout, and every failure is silent.
 *
 * Env:
 *   AIR_URL     — AIr server (default: http://localhost:5200)
 *   AIR_ENABLED — set to "false" to disable sending
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const AIR_URL = process.env.AIR_URL || 'http://localhost:5200';
const ENABLED = process.env.AIR_ENABLED !== 'false';

function readInput(fd = 0) {
  try {
    return fs.readFileSync(fd, 'utf8');
  } catch {
    return '';
  }
}

/** The status-line command configured before AIr, if any (written by `air setup`). */
function previousCommand(dir) {
  try {
    const state = JSON.parse(fs.readFileSync(path.join(dir, 'air-setup.json'), 'utf8'));
    const prev = state && state.previous && state.previous.statusLine;
    return prev && typeof prev.command === 'string' ? prev.command : null;
  } catch {
    return null;
  }
}

/** The heartbeat AIr turns into an exact context reading; null when the snapshot has none. */
function heartbeat(data) {
  const cw = data && data.context_window;
  const usage = cw && cw.current_usage;
  const size = cw && Number(cw.context_window_size);
  if (!data.session_id || !usage || !size) return null;
  const tokens =
    Number(usage.input_tokens || 0) +
    Number(usage.cache_creation_input_tokens || 0) +
    Number(usage.cache_read_input_tokens || 0);
  return {
    // The id carries the figures: a re-render with the same numbers is stored once.
    id: `statusline:${data.session_id}:${tokens}:${size}`,
    sessionId: data.session_id,
    timestamp: Date.now(),
    type: 'heartbeat',
    contextTokens: tokens,
    contextWindow: size,
  };
}

function send(event, airUrl) {
  return new Promise((resolve) => {
    let url;
    try {
      url = new URL('/api/ingest', airUrl);
    } catch {
      resolve();
      return;
    }
    const payload = JSON.stringify(event);
    const req = http.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        res.resume();
        resolve();
      }
    );
    req.on('error', () => resolve());
    req.setTimeout(250, () => {
      req.destroy();
      resolve();
    });
    req.write(payload);
    req.end();
  });
}

function line(data, input, dir) {
  const prev = previousCommand(dir);
  if (prev) {
    const out = spawnSync(prev, { input, shell: true, encoding: 'utf8', timeout: 2000 });
    return out.stdout || '';
  }
  const pct = data && data.context_window && data.context_window.used_percentage;
  return typeof pct === 'number' ? `AIr · ${Math.round(pct)}% context\n` : 'AIr\n';
}

/** One status-line run: print the line, then send the heartbeat. */
async function run(input, write, opts = {}) {
  const dir = opts.dir ?? __dirname;
  const airUrl = opts.airUrl ?? AIR_URL;
  const enabled = opts.enabled ?? ENABLED;
  let data = {};
  try {
    data = JSON.parse(input);
  } catch {
    /* print the line anyway */
  }
  write(line(data, input, dir));
  const event = enabled ? heartbeat(data) : null;
  if (event) await send(event, airUrl);
}

module.exports = { heartbeat, run, readInput };

// The entry point runs only as a script: statusline.test.ts runs it in a child process, which
// coverage cannot see.
/* istanbul ignore next */
if (require.main === module) {
  run(readInput(), (s) => process.stdout.write(s)).catch(() => {});
}
