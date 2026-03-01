#!/usr/bin/env node
/**
 * AIr Collector — Claude Code PostToolUse Hook
 *
 * Emits tool_call_end and context_usage events to the AIr server
 * after every tool execution in Claude Code.
 *
 * Reads session_id from temp file persisted by session-start.js.
 * Uses a deterministic toolCallId derived from session + tool + timestamp
 * so start/end events can be correlated in the waterfall view.
 *
 * Install:
 *   1. Copy this file to .claude/hooks/air-post-tool-use.js
 *   2. Add to .claude/settings.json:
 *      {
 *        "hooks": {
 *          "PostToolUse": [{
 *            "hooks": [{ "type": "command", "command": "node .claude/hooks/air-post-tool-use.js" }]
 *          }]
 *        }
 *      }
 *   3. Start AIr server: npx air
 *
 * Env:
 *   AIR_URL     — HTTP endpoint (default: http://localhost:5200)
 *   AIR_ENABLED — set to "false" to disable
 */

const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const AIR_URL = process.env.AIR_URL || 'http://localhost:5200';
const ENABLED = process.env.AIR_ENABLED !== 'false';

// Session file — shared with session-start.js
const SESSION_DIR = path.join(os.tmpdir(), 'air-claude-code');
const SESSION_FILE = path.join(SESSION_DIR, 'session.json');

function uid() {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

/**
 * Deterministic tool call ID so start+end events match.
 * Based on session + tool name + a counter stored in temp dir.
 */
function deterministicToolCallId(sessionId, toolName) {
  const counterFile = path.join(SESSION_DIR, 'tool-counter.json');
  let counters = {};
  try {
    if (fs.existsSync(counterFile)) {
      counters = JSON.parse(fs.readFileSync(counterFile, 'utf8'));
    }
  } catch { /* fresh start */ }

  const key = `${sessionId}:${toolName}`;
  counters[key] = (counters[key] || 0) + 1;

  try {
    fs.writeFileSync(counterFile, JSON.stringify(counters));
  } catch { /* ignore */ }

  // Hash to a stable ID
  return crypto.createHash('md5').update(`${key}:${counters[key]}`).digest('hex').slice(0, 16);
}

/**
 * Read persisted session from session-start.js.
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

function postEvents(events) {
  return new Promise((resolve) => {
    const url = new URL('/api/ingest/batch', AIR_URL);
    const payload = JSON.stringify(events);
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

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', async () => {
  if (!ENABLED) { process.exit(0); return; }

  try {
    const data = JSON.parse(input);

    // Read persisted session — fall back to data.session_id or generate one
    const session = readSession();
    const sessionId = session?.sessionId || data.session_id || 'claude-code-' + uid();
    const now = Date.now();
    const batch = [];

    // ─── Tool call events ─────────────────────────────────────────
    if (data.tool_name) {
      const outputStr = typeof data.tool_output === 'string'
        ? data.tool_output
        : JSON.stringify(data.tool_output || '');
      const inputStr = typeof data.tool_input === 'string'
        ? data.tool_input
        : JSON.stringify(data.tool_input || '');

      const toolCallId = deterministicToolCallId(sessionId, data.tool_name);

      // Emit start event (1ms before end for ordering)
      batch.push({
        id: uid(),
        sessionId,
        timestamp: now - 1,
        type: 'tool_call_start',
        toolName: data.tool_name,
        toolCallId,
        inputSizeBytes: Buffer.byteLength(inputStr),
        inputPreview: inputStr.slice(0, 200),
      });

      // Emit end event
      batch.push({
        id: uid(),
        sessionId,
        timestamp: now,
        type: 'tool_call_end',
        toolName: data.tool_name,
        toolCallId,
        durationMs: 0, // Not available from PostToolUse hook
        outputSizeBytes: Buffer.byteLength(outputStr),
        outputPreview: outputStr.slice(0, 200),
        isError: data.tool_error === true,
      });
    }

    // ─── Context usage from statusline bridge ─────────────────────
    const metricsPath = path.join(os.tmpdir(), `claude-ctx-${data.session_id || sessionId}.json`);
    if (fs.existsSync(metricsPath)) {
      try {
        const metrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
        if (metrics.remaining_percentage != null) {
          const used = Math.max(0, 100 - metrics.remaining_percentage);
          const contextWindow = metrics.context_window || 200000;
          const tokensUsed = Math.round(contextWindow * (used / 100));

          batch.push({
            id: uid(),
            sessionId,
            timestamp: now,
            type: 'context_usage',
            tokensUsed,
            contextWindow,
            utilizationPct: Math.round(used * 10) / 10,
          });
        }
      } catch { /* ignore stale metrics */ }
    }

    if (batch.length > 0) {
      await postEvents(batch);
    }
  } catch {
    // Silently exit on parse errors
  }

  process.exit(0);
});
