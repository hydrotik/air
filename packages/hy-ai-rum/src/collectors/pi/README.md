# AIr Collector — Pi Extension

Streams telemetry from your [pi](https://github.com/mariozechner/pi-coding-agent) coding agent sessions to the AIr dashboard for real-time observability.

**Auto-starts the AIr server** — no manual setup needed. Just `/reload` and go.

## Setup

```bash
# Install the ws dependency
npm install

# Reload pi to pick up the extension
# (run inside pi)
/reload
```

The extension auto-discovers when pi runs from a directory containing `.pi/extensions/ai-rum-collector/`.

## Global Install

To make AIr available in **all** your projects:

```bash
cp -r .pi/extensions/ai-rum-collector ~/.pi/agent/extensions/air-collector
cd ~/.pi/agent/extensions/air-collector && npm install
```

## How Auto-Start Works

When the extension activates, it:

1. Checks if the AIr server is already running (`GET /api/health`)
2. If not, spawns it as a **detached background process** (won't block pi)
3. Tries these paths in order:
   - `packages/hy-ai-rum/dist/server/cli.js` (monorepo built)
   - `packages/hy-ai-rum/src/server/start.ts` (monorepo dev via tsx)
   - `air` global bin (npm global install)
4. Waits up to 3 seconds for the server to be ready
5. Connects the WebSocket collector

The server persists after pi exits — it's a standalone process.

## Configuration

| Env Variable | Default | Description |
|-------------|---------|-------------|
| `AIR_URL` | `ws://localhost:5200/ws/collector` | Server WebSocket endpoint |
| `AIR_ENABLED` | `true` | Set to `"false"` to disable collection |
| `AIR_PORT` | `5200` | Server port (used by auto-start) |
| `AIR_AUTOSTART` | `true` | Set to `"false"` to disable auto-start |

## What It Collects

| Event | Source | Data |
|-------|--------|------|
| Tool calls | `tool_execution_start/end` | Name, duration, I/O size, errors |
| Turns | `turn_start/end` | Index, tool count per turn |
| Token usage | Assistant message `.usage` | Input, output, cache read/write, cost |
| Context usage | `ctx.getContextUsage()` | Real token count, utilization % |
| Context breakdown | `ctx.sessionManager.getBranch()` | Per-category token distribution |
| Compactions | `session_compact` | Tokens before, summary length |
| Model changes | `model_select` | Previous/new model, trigger source |

The collector is **non-blocking** — if the server isn't running or auto-start fails, events are silently dropped and it reconnects every 5 seconds.
