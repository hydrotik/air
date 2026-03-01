# AIr Collector — Codex CLI

Watches Codex CLI session files and streams telemetry to the AIr dashboard.

## Quick Start

```bash
# Start the AIr server
npx air

# In another terminal — start watching Codex sessions
npx air-codex-watcher
```

The watcher tails `~/.codex/sessions/` for new and updated `.jsonl` files and maps
Codex events to AIr telemetry events in real time.

## Usage

```bash
# Watch all sessions (live + new)
npx air-codex-watcher

# Watch a specific session
npx air-codex-watcher --session 019c7e7f

# Replay a past session file (backfill into AIr)
npx air-codex-watcher --replay ~/.codex/sessions/2026/02/20/rollout-2026-02-20T23-39-53-019c7e7f.jsonl
```

## What It Collects

| Codex Event | AIr Event | Data |
|-------------|-----------|------|
| `session_meta` | `session_start` | session_id, model, cwd, agent=codex |
| `event_msg:task_started` | `turn_start` | turn index |
| `event_msg:task_complete` | `turn_end` | tool call count |
| `event_msg:token_count` | `token_usage` | input/output tokens (when available) |
| `response_item:function_call` | `tool_call_start` | tool name, call_id, input preview |
| `response_item:function_call_output` | `tool_call_end` | call_id, output preview, duration, errors |
| `response_item:custom_tool_call` | `tool_call_start` | apply_patch etc. |
| `response_item:custom_tool_call_output` | `tool_call_end` | duration from metadata |
| `compacted` | `compaction` | summary length |

## Alternative: SDK Instrumentation

For custom Codex workflows, use the AIr SDK directly:

```ts
import { AirClient } from '@hydrotik/air/sdk';

const air = new AirClient({ sessionId: 'codex-session', provider: 'codex' });

const result = await air.trace('my_tool', { input: 'data' }, async () => {
  return await doWork();
});

air.close();
```

## Alternative: MCP Instrumentation

If your Codex project uses MCP servers, wrap them with `instrumentMcp`:

```ts
import { instrumentMcp } from '@hydrotik/air/sdk';

const traced = instrumentMcp(mcpClient, 'my-mcp-server');
```

## Configuration

| Env Variable | Default | Description |
|-------------|---------|-------------|
| `AIR_URL` | `http://localhost:5200` | AIr server HTTP endpoint |
| `AIR_ENABLED` | `true` | Set to `"false"` to disable |
| `CODEX_HOME` | `~/.codex` | Codex home directory |

## How It Works

1. Watches `~/.codex/sessions/` recursively for `.jsonl` file changes
2. Tracks byte offsets per file to avoid re-sending events
3. Maps Codex JSONL entries to AIr telemetry events
4. Batches and POSTs to `/api/ingest/batch` on the AIr server
5. On startup, processes the 3 most recent session files
6. Falls back to 2s polling if `fs.watch` isn't available
