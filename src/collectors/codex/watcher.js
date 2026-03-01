#!/usr/bin/env node
/**
 * AIr Collector — Codex CLI History Watcher
 *
 * Tails Codex session files and emits telemetry events to the AIr server.
 * Watches ~/.codex/sessions/ for new and updated .jsonl files.
 *
 * Usage:
 *   npx air-codex-watcher                    # watch all sessions
 *   npx air-codex-watcher --session <id>     # watch specific session
 *   npx air-codex-watcher --replay <file>    # replay a session file
 *
 * Env:
 *   AIR_URL     — HTTP endpoint (default: http://localhost:5200)
 *   AIR_ENABLED — set to "false" to disable
 *   CODEX_HOME  — Codex home dir (default: ~/.codex)
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');

const AIR_URL = process.env.AIR_URL || 'http://localhost:5200';
const ENABLED = process.env.AIR_ENABLED !== 'false';
const CODEX_HOME = process.env.CODEX_HOME || path.join(os.homedir(), '.codex');
const SESSIONS_DIR = path.join(CODEX_HOME, 'sessions');

// Parse CLI args
const args = process.argv.slice(2);
const sessionFilter = args.includes('--session') ? args[args.indexOf('--session') + 1] : null;
const replayFile = args.includes('--replay') ? args[args.indexOf('--replay') + 1] : null;

if (!ENABLED) {
  console.log('[AIr Codex] Disabled via AIR_ENABLED=false');
  process.exit(0);
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

// ─── HTTP Transport ──────────────────────────────────────────────────────

function postEvents(events) {
  return new Promise((resolve) => {
    if (events.length === 0) { resolve(); return; }
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
    req.setTimeout(5000, () => { req.destroy(); resolve(); });
    req.write(payload);
    req.end();
  });
}

// ─── Event Mapping ───────────────────────────────────────────────────────
// Maps Codex JSONL events → AIr TelemetryEvents

class CodexSessionMapper {
  constructor(codexSessionId) {
    this.codexSessionId = codexSessionId;
    this.airSessionId = 'codex-' + codexSessionId.slice(0, 12);
    this.sessionStarted = false;
    this.turnIndex = 0;
    this.toolCallCount = 0;
    this.model = 'unknown';
    this.cwd = '';
    this.contextWindow = 200000;
  }

  /** Map a single Codex JSONL line → array of AIr events (0 or more) */
  map(entry) {
    const events = [];
    const ts = new Date(entry.timestamp).getTime() || Date.now();
    const type = entry.type;
    const payload = entry.payload || {};

    switch (type) {
      case 'session_meta': {
        this.model = payload.model_provider || 'openai';
        this.cwd = payload.cwd || '';
        this.sessionStarted = true;
        events.push({
          id: uid(),
          sessionId: this.airSessionId,
          timestamp: ts,
          type: 'session_start',
          cwd: this.cwd,
          model: this.model,
          provider: payload.model_provider || 'openai',
          agent: 'codex',
        });
        break;
      }

      case 'turn_context': {
        // Update model if changed
        if (payload.model) this.model = payload.model;
        if (payload.cwd) this.cwd = payload.cwd;
        this.contextWindow = payload.model_context_window || this.contextWindow;
        break;
      }

      case 'event_msg': {
        switch (payload.type) {
          case 'task_started': {
            this.turnIndex++;
            if (payload.model_context_window) {
              this.contextWindow = payload.model_context_window;
            }
            events.push({
              id: uid(),
              sessionId: this.airSessionId,
              timestamp: ts,
              type: 'turn_start',
              turnIndex: this.turnIndex,
            });
            break;
          }

          case 'task_complete': {
            events.push({
              id: uid(),
              sessionId: this.airSessionId,
              timestamp: ts,
              type: 'turn_end',
              turnIndex: this.turnIndex,
              toolCallCount: this.toolCallCount,
            });
            this.toolCallCount = 0;
            break;
          }

          case 'token_count': {
            // Codex token_count has rate limit info but not per-turn usage
            // We emit what we can
            if (payload.info) {
              const info = payload.info;
              events.push({
                id: uid(),
                sessionId: this.airSessionId,
                timestamp: ts,
                type: 'token_usage',
                input: info.input_tokens || 0,
                output: info.output_tokens || 0,
                cacheRead: info.input_tokens_details?.cached_tokens || 0,
                cacheWrite: 0,
                totalTokens: (info.input_tokens || 0) + (info.output_tokens || 0),
                cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
                model: this.model,
                provider: 'openai',
              });
            }
            break;
          }

          case 'user_message': {
            // Auto-create session if we haven't seen session_meta
            if (!this.sessionStarted) {
              this.sessionStarted = true;
              events.push({
                id: uid(),
                sessionId: this.airSessionId,
                timestamp: ts,
                type: 'session_start',
                cwd: this.cwd || process.cwd(),
                model: this.model,
                provider: 'openai',
                agent: 'codex',
              });
            }
            break;
          }

          default:
            break;
        }
        break;
      }

      case 'response_item': {
        switch (payload.type) {
          case 'function_call': {
            this.toolCallCount++;
            const toolCallId = payload.call_id || uid();
            const inputStr = payload.arguments || '';
            events.push({
              id: uid(),
              sessionId: this.airSessionId,
              timestamp: ts,
              type: 'tool_call_start',
              toolName: payload.name || 'unknown',
              toolCallId,
              inputSizeBytes: Buffer.byteLength(inputStr),
              inputPreview: inputStr.slice(0, 200),
            });
            break;
          }

          case 'function_call_output': {
            const toolCallId = payload.call_id || uid();
            const outputStr = payload.output || '';

            // Try to extract duration from output metadata
            let durationMs = 0;
            try {
              if (typeof outputStr === 'string' && outputStr.includes('Wall time:')) {
                const match = outputStr.match(/Wall time:\s*([\d.]+)\s*seconds/);
                if (match) durationMs = Math.round(parseFloat(match[1]) * 1000);
              }
            } catch { /* ignore */ }

            events.push({
              id: uid(),
              sessionId: this.airSessionId,
              timestamp: ts,
              type: 'tool_call_end',
              toolName: 'exec_command', // Codex doesn't include tool name in output
              toolCallId,
              durationMs,
              outputSizeBytes: Buffer.byteLength(outputStr),
              outputPreview: outputStr.slice(0, 200),
              isError: false,
            });
            break;
          }

          case 'custom_tool_call': {
            this.toolCallCount++;
            const toolCallId = payload.call_id || uid();
            const toolName = payload.name || 'unknown';
            const inputStr = payload.input || '';

            events.push({
              id: uid(),
              sessionId: this.airSessionId,
              timestamp: ts,
              type: 'tool_call_start',
              toolName,
              toolCallId,
              inputSizeBytes: Buffer.byteLength(inputStr),
              inputPreview: inputStr.slice(0, 200),
            });

            // If status is 'completed', also emit end
            if (payload.status === 'completed') {
              events.push({
                id: uid(),
                sessionId: this.airSessionId,
                timestamp: ts + 1,
                type: 'tool_call_end',
                toolName,
                toolCallId,
                durationMs: 0,
                outputSizeBytes: 0,
                outputPreview: '',
                isError: false,
              });
            }
            break;
          }

          case 'custom_tool_call_output': {
            const toolCallId = payload.call_id || uid();
            const outputStr = payload.output || '';

            // Try to extract duration + exit code from metadata
            let durationMs = 0;
            let isError = false;
            try {
              const parsed = JSON.parse(outputStr);
              if (parsed.metadata?.duration_seconds) {
                durationMs = Math.round(parsed.metadata.duration_seconds * 1000);
              }
              if (parsed.metadata?.exit_code !== 0 && parsed.metadata?.exit_code != null) {
                isError = true;
              }
            } catch { /* raw output */ }

            events.push({
              id: uid(),
              sessionId: this.airSessionId,
              timestamp: ts,
              type: 'tool_call_end',
              toolName: 'custom_tool',
              toolCallId,
              durationMs,
              outputSizeBytes: Buffer.byteLength(outputStr),
              outputPreview: outputStr.slice(0, 200),
              isError,
            });
            break;
          }

          default:
            break;
        }
        break;
      }

      case 'compacted': {
        events.push({
          id: uid(),
          sessionId: this.airSessionId,
          timestamp: ts,
          type: 'compaction',
          tokensBefore: 0, // Not available from Codex
          tokensAfter: 0,
          summaryLength: (payload.message || '').length,
          isAutomatic: true,
        });
        break;
      }

      default:
        break;
    }

    return events;
  }
}

// ─── File Watcher ────────────────────────────────────────────────────────

// Track byte offsets per file to avoid re-processing
const fileOffsets = new Map();
const sessionMappers = new Map();

function getMapper(codexSessionId) {
  if (!sessionMappers.has(codexSessionId)) {
    sessionMappers.set(codexSessionId, new CodexSessionMapper(codexSessionId));
  }
  return sessionMappers.get(codexSessionId);
}

/** Extract Codex session ID from filename */
function extractSessionId(filename) {
  // Format: rollout-YYYY-MM-DDTHH-MM-SS-<session-id>.jsonl
  const match = filename.match(/rollout-[\d-]+T[\d-]+-(.+)\.jsonl$/);
  return match ? match[1] : null;
}

/** Process new lines from a session file */
async function processFile(filePath) {
  const stat = fs.statSync(filePath);
  const currentOffset = fileOffsets.get(filePath) || 0;

  if (stat.size <= currentOffset) return;

  const sessionId = extractSessionId(path.basename(filePath));
  if (!sessionId) return;
  if (sessionFilter && !sessionId.startsWith(sessionFilter)) return;

  const mapper = getMapper(sessionId);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.slice(currentOffset).split('\n').filter(Boolean);

  const batch = [];
  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      const events = mapper.map(entry);
      batch.push(...events);
    } catch {
      // Skip malformed lines
    }
  }

  if (batch.length > 0) {
    await postEvents(batch);
    console.log(`[AIr Codex] Sent ${batch.length} events from session ${sessionId.slice(0, 12)}`);
  }

  fileOffsets.set(filePath, stat.size);
}

/** Recursively find all .jsonl files */
function findJsonlFiles(dir) {
  const files = [];
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findJsonlFiles(full));
      } else if (entry.name.endsWith('.jsonl')) {
        files.push(full);
      }
    }
  } catch { /* dir might not exist yet */ }
  return files;
}

/** Watch for new/changed session files */
function startWatching() {
  console.log(`[AIr Codex] Watching ${SESSIONS_DIR}`);
  console.log(`[AIr Codex] Sending events to ${AIR_URL}`);
  if (sessionFilter) console.log(`[AIr Codex] Filtering to session: ${sessionFilter}`);

  // Initial scan — process only the most recent file(s) to avoid flooding
  const allFiles = findJsonlFiles(SESSIONS_DIR);
  const recentFiles = allFiles
    .map(f => ({ path: f, mtime: fs.statSync(f).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)
    .slice(0, 3);

  for (const f of recentFiles) {
    processFile(f.path).catch(() => {});
  }

  // Watch for changes
  try {
    fs.watch(SESSIONS_DIR, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.jsonl')) return;
      const fullPath = path.join(SESSIONS_DIR, filename);
      if (fs.existsSync(fullPath)) {
        processFile(fullPath).catch(() => {});
      }
    });
  } catch (err) {
    console.error(`[AIr Codex] Watch error: ${err.message}`);
    // Fallback: poll every 2s
    console.log('[AIr Codex] Falling back to polling mode (2s interval)');
    setInterval(() => {
      const files = findJsonlFiles(SESSIONS_DIR);
      for (const f of files) {
        processFile(f).catch(() => {});
      }
    }, 2000);
  }
}

/** Replay a single session file (for testing / backfill) */
async function replaySession(filePath) {
  console.log(`[AIr Codex] Replaying ${filePath}`);
  const sessionId = extractSessionId(path.basename(filePath));
  if (!sessionId) {
    console.error('[AIr Codex] Could not extract session ID from filename');
    process.exit(1);
  }

  const mapper = getMapper(sessionId);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter(Boolean);

  const batch = [];
  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      const events = mapper.map(entry);
      batch.push(...events);
    } catch { /* skip */ }
  }

  if (batch.length > 0) {
    // Send in chunks of 50 to avoid overwhelming the server
    for (let i = 0; i < batch.length; i += 50) {
      const chunk = batch.slice(i, i + 50);
      await postEvents(chunk);
      console.log(`[AIr Codex] Sent ${Math.min(i + 50, batch.length)}/${batch.length} events`);
    }
  }

  console.log(`[AIr Codex] Replay complete: ${batch.length} events from session ${sessionId.slice(0, 12)}`);
}

// ─── Main ────────────────────────────────────────────────────────────────

if (replayFile) {
  replaySession(replayFile).then(() => process.exit(0));
} else {
  startWatching();
}
