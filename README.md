# ⚡ AIr

**Real-time AI observability for coding agents.**

AIr monitors your AI coding sessions — context window usage, tool call performance, token costs, and compaction events — streaming everything to a live dashboard. Think New Relic, but for your LLM workflow.

![AIr Dashboard](https://img.shields.io/badge/status-beta-blue) ![Pi Compatible](https://img.shields.io/badge/pi-extension-green)

---

## Quick Start

### 1. Start the AIr server + dashboard

```bash
pnpm turbo run dev --filter=@hydrotik/air
```

Opens:
- **Dashboard** → [http://localhost:5201](http://localhost:5201)
- **API** → [http://localhost:5200/api/health](http://localhost:5200/api/health)

### 2. Install the collector extension

The collector is a [pi](https://github.com/mariozechner/pi-coding-agent) extension that hooks into your agent's event system — tool calls, turns, token usage, context breakdown, compaction, and model changes.

**Project-local** (auto-discovered when pi runs from this repo):

```
.pi/extensions/ai-rum-collector/
├── index.ts        ← Extension entry point
├── package.json    ← Declares ws dependency
└── node_modules/   ← npm install (gitignored)
```

Already set up if you cloned this repo. Just run:

```bash
cd .pi/extensions/ai-rum-collector && npm install
```

**Global** (available in all projects):

```bash
# Copy the extension directory to pi's global extensions
cp -r .pi/extensions/ai-rum-collector ~/.pi/agent/extensions/air-collector
cd ~/.pi/agent/extensions/air-collector && npm install
```

### 3. Reload pi

```
/reload
```

That's it. Every tool call, turn, and context change streams to the dashboard in real-time.

---

## What You See

### KPI Cards
Total tokens in context window, session cost, tool call count, turn count, compactions, and context utilization percentage — all updating live.

### Context Window Treemap
D3 treemap showing what fills your context — system prompt, user messages, assistant responses, tool results, thinking blocks. Like a webpack bundle analyzer for your LLM context.

### Context Utilization Over Time
Area chart tracking context window fill percentage with 80%/95% warning thresholds. Know when you're approaching compaction.

### Token Flow
Input / output / cache read tokens per turn. See cache efficiency and cost drivers.

### Tool Call Waterfall
DevTools-style timeline of tool executions with durations. Spot slow reads, long builds, and error patterns.

### Live Event Feed
Scrolling log of all telemetry events — color-coded by type, auto-scrolling, with inline summaries.

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `AIR_URL` | `ws://localhost:5200/ws/collector` | AIr server WebSocket endpoint |
| `AIR_ENABLED` | `true` | Set to `"false"` to disable collection |

### Database

Telemetry persists to SQLite at `~/.hydrotik/air/telemetry.db` (WAL mode). Delete the file to reset.

### Ports

| Port | Service |
|------|---------|
| 5200 | AIr server (Fastify + WebSocket + REST API) |
| 5201 | AIr dashboard (Vite dev server, proxies to 5200) |

Ports are configured in `@hydrotik/config` (`packages/hy-config/src/ports.ts`).

---

## REST API

All endpoints return JSON.

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Server uptime + connected clients |
| `GET /api/sessions` | List all sessions with summary stats |
| `GET /api/sessions/:id` | Single session summary |
| `GET /api/sessions/:id/events` | All events for a session |
| `GET /api/sessions/:id/tool-calls` | Tool call records with timing |
| `GET /api/sessions/:id/tool-stats` | Per-tool aggregate stats (count, avg/min/max ms, errors) |
| `GET /api/sessions/:id/context` | Context utilization snapshots over time |
| `GET /api/sessions/:id/context/latest` | Latest context breakdown with segments |
| `GET /api/events/recent` | Recent events across all sessions |

---

## Architecture

```
 ┌──────────────┐   WebSocket    ┌──────────────┐   WebSocket    ┌──────────────┐
 │  Pi Agent    │ ─────────────→ │  AIr Server  │ ─────────────→ │  Dashboard   │
 │  + Extension │  /ws/collector │  (Fastify)   │  /ws/dashboard │  (React+D3)  │
 └──────────────┘                └──────┬───────┘                └──────────────┘
                                        │
                                   SQLite DB
                                 ~/.hydrotik/air/
                                  telemetry.db
```

### Collector (Pi Extension)
Hooks into pi's event system via `ExtensionAPI`:
- `tool_execution_start` / `tool_execution_end` — tool call timing and I/O sizes
- `turn_start` / `turn_end` — LLM roundtrip tracking + token usage from response
- `agent_start` / `agent_end` — session lifecycle
- `session_compact` — compaction events
- `model_select` — model changes
- `ctx.getContextUsage()` — real token count from pi
- `ctx.sessionManager.getBranch()` — context breakdown by message category
- `ctx.getSystemPrompt()` — system prompt size

The collector is **silent and non-blocking** — if the AIr server isn't running, events are dropped without disrupting pi. Reconnects automatically every 5 seconds.

### Server (Fastify + SQLite)
- Ingests events via WebSocket, persists to SQLite with WAL mode
- Broadcasts events to connected dashboard clients in real-time
- Serves REST API for historical queries
- Four tables: `sessions`, `events`, `tool_calls`, `context_snapshots`

### Dashboard (React + Vite)
- Connects to server via WebSocket for live updates
- Falls back to REST API for historical data on session switch
- D3.js for treemap and waterfall visualizations
- Recharts for time-series charts
- Styled with `@hydrotik/tokens` via vanilla-extract (dark theme)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Server | Fastify 5, better-sqlite3, @fastify/websocket |
| Dashboard | React 19, Vite 6, D3.js 7, Recharts 2 |
| Styling | vanilla-extract, @hydrotik/tokens |
| Collector | Pi ExtensionAPI, WebSocket (ws) |
| Storage | SQLite 3 (WAL mode) |

---

## Troubleshooting

**Dashboard shows "Reconnecting…"**
The AIr server isn't running. Start it with `pnpm turbo run dev --filter=@hydrotik/air`.

**"0 sessions" after reload**
The collector connects to the server async. Send a message in pi — the first tool call or turn will create a session.

**Context % doesn't match pi footer**
Delete `~/.hydrotik/air/telemetry.db` to clear stale data, restart the server, then `/reload` in pi.

**Extension not loading**
Check that `npm install` was run inside `.pi/extensions/ai-rum-collector/` (the `ws` package must be in `node_modules`). Run `/reload` in pi after fixing.

---

## License

MIT — Part of the [Hydrotik](https://github.com/hydrotik/hydrotik) monorepo.
