#!/usr/bin/env node
/**
 * AIr Collector — Claude Code SessionStart Hook
 *
 * Emits session_start event and auto-starts AIr server if needed.
 * Persists session_id to a temp file so PostToolUse hooks can correlate events.
 *
 * Install:
 *   Add to .claude/settings.json under hooks.SessionStart
 */

const http = require('http');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const AIR_PORT = process.env.AIR_PORT || '5200';
const AIR_URL = process.env.AIR_URL || `http://localhost:${AIR_PORT}`;
const ENABLED = process.env.AIR_ENABLED !== 'false';
const AUTOSTART = process.env.AIR_AUTOSTART !== 'false';

// Session file — shared with post-tool-use.js
const SESSION_DIR = path.join(os.tmpdir(), 'air-claude-code');
const SESSION_FILE = path.join(SESSION_DIR, 'session.json');

function uid() {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

function postEvent(event) {
  return new Promise((resolve) => {
    const url = new URL('/api/ingest', AIR_URL);
    const payload = JSON.stringify(event);
    const req = http.request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
    }, (res) => {
      res.resume();
      resolve();
    });
    req.on('error', () => resolve());
    req.setTimeout(2000, () => { req.destroy(); resolve(); });
    req.write(payload);
    req.end();
  });
}

async function isServerRunning() {
  return new Promise((resolve) => {
    const url = new URL('/api/health', AIR_URL);
    const req = http.get(url, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function startServer() {
  const candidates = [
    path.resolve(process.cwd(), 'node_modules/.bin/air'),
    path.resolve(process.cwd(), 'packages/hy-ai-rum/dist/server/cli.js'),
  ];

  // Try global air binary
  try {
    const whichAir = require('child_process').execSync('which air 2>/dev/null || true').toString().trim();
    if (whichAir) candidates.unshift(whichAir);
  } catch { /* ignore */ }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const child = spawn('node', [candidate, '--port', AIR_PORT], {
        detached: true,
        stdio: 'ignore',
      });
      child.unref();

      // Wait up to 3s
      for (let i = 0; i < 15; i++) {
        await new Promise(r => setTimeout(r, 200));
        if (await isServerRunning()) return true;
      }
    }
  }
  return false;
}

/**
 * Persist session info to temp file so PostToolUse hooks can read it.
 */
function persistSession(sessionId, data) {
  fs.mkdirSync(SESSION_DIR, { recursive: true });
  fs.writeFileSync(SESSION_FILE, JSON.stringify({
    sessionId,
    model: data.model?.name || 'claude',
    cwd: data.workspace?.current_dir || process.cwd(),
    startedAt: Date.now(),
  }));
}

/**
 * Read persisted session (returns null if missing/stale).
 */
function readSession() {
  try {
    if (!fs.existsSync(SESSION_FILE)) return null;
    const data = JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8'));
    // Expire after 24h
    if (Date.now() - data.startedAt > 86400000) return null;
    return data;
  } catch {
    return null;
  }
}

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', async () => {
  if (!ENABLED) process.exit(0);

  try {
    const data = JSON.parse(input);

    // Auto-start server
    if (AUTOSTART && !(await isServerRunning())) {
      await startServer();
    }

    const sessionId = data.session_id || 'claude-code-' + uid();

    // Persist for PostToolUse hooks
    persistSession(sessionId, data);

    await postEvent({
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'session_start',
      cwd: data.workspace?.current_dir || process.cwd(),
      model: data.model?.name || 'claude',
      provider: 'anthropic',
      agent: 'claude-code',
    });
  } catch { /* silent */ }

  process.exit(0);
});
