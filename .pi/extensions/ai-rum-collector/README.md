# AIr Collector — Pi Extension

Streams telemetry from your [pi](https://github.com/mariozechner/pi-coding-agent) coding agent sessions to the AIr dashboard for real-time observability.

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

## Requirements

- AIr server running on `ws://localhost:5200` (start with `pnpm turbo run dev --filter=@hydrotik/air`)
- Pi coding agent with extension support

## Configuration

| Env Variable | Default | Description |
|-------------|---------|-------------|
| `AIR_URL` | `ws://localhost:5200/ws/collector` | Server WebSocket endpoint |
| `AIR_ENABLED` | `true` | Set to `"false"` to disable |

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

The collector is **non-blocking** — if the server isn't running, events are silently dropped and it reconnects every 5 seconds.
