# @hydrotik/ai-rum

**Real-time AI Observability** — like New Relic for your AI development workflow.

Monitor coding agents, context window usage, tool call performance, MCP servers, and token costs in real-time with a live dashboard built on the Hydrotik design system.

## Architecture

```
┌─────────────────────┐     WebSocket      ┌─────────────────────┐     WebSocket      ┌─────────────────────┐
│   Pi Extension      │ ─────────────────→ │   RUM Server        │ ─────────────────→ │   Dashboard         │
│   (Collector)       │   :5200/ws/collector│   (Fastify + SQLite)│   :5200/ws/dashboard│   (React + D3)      │
│                     │                    │                     │                    │                     │
│ • Tool calls        │                    │ • Event ingestion   │                    │ • Context treemap   │
│ • Token usage       │                    │ • SQLite storage    │                    │ • Tool waterfall    │
│ • Context breakdown │                    │ • REST API          │                    │ • Token flow chart  │
│ • Compaction events │                    │ • Live broadcast    │                    │ • Live event feed   │
│ • Model changes     │                    │                     │                    │ • Session KPIs      │
└─────────────────────┘                    └─────────────────────┘                    └─────────────────────┘
```

## Quick Start

### 1. Start the RUM server

```bash
pnpm turbo run dev --filter=@hydrotik/ai-rum
```

This starts:
- **Server** on `http://localhost:5200` (Fastify + WebSocket + SQLite)
- **Dashboard** on `http://localhost:5201` (Vite dev server, proxies API to :5200)

### 2. Install the pi collector extension

The collector extension is auto-discovered from `.pi/extensions/ai-rum-collector.ts`.

Or copy to global extensions for all projects:
```bash
cp .pi/extensions/ai-rum-collector.ts ~/.pi/agent/extensions/
```

### 3. Use pi normally

The collector hooks into pi's event system transparently. No workflow changes needed.

## Dashboard Visualizations

### Context Window Treemap
D3 treemap showing what's consuming the context window — system prompt, user messages, assistant responses, tool results, compaction summaries. Like a bundle analyzer but for your LLM context.

### Tool Call Waterfall
D3 timeline visualization of tool executions (read, bash, edit, write) with durations — like Chrome DevTools network waterfall.

### Token Flow Chart
Recharts area chart showing input/output/cache token usage per turn, with cost tracking.

### Context Utilization Over Time
Real-time chart of context window utilization percentage with 80%/95% warning lines.

### Live Event Feed
Scrolling log of all telemetry events with color-coded type badges and auto-scroll.

### Session KPI Cards
Total tokens, cost, tool calls, turns, compactions, context utilization.

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `AI_RUM_URL` | `ws://localhost:5200/ws/collector` | RUM server WebSocket endpoint |
| `AI_RUM_ENABLED` | `true` | Set to `false` to disable collection |

### SQLite Database

Telemetry data is stored in `~/.hydrotik/ai-rum/telemetry.db` (WAL mode for concurrent access).

## REST API

| Endpoint | Description |
|----------|-------------|
| `GET /api/sessions` | List all sessions |
| `GET /api/sessions/:id` | Session summary |
| `GET /api/sessions/:id/events` | All events for session |
| `GET /api/sessions/:id/tool-calls` | Tool call records |
| `GET /api/sessions/:id/tool-stats` | Tool statistics (avg/min/max duration) |
| `GET /api/sessions/:id/context` | Context usage snapshots |
| `GET /api/sessions/:id/context/latest` | Latest context breakdown |
| `GET /api/events/recent` | Recent events across all sessions |
| `GET /api/health` | Server health check |

## Ports

- **5200** — RUM server (Fastify + WebSocket)
- **5201** — Dashboard dev server (Vite, proxies to 5200)

## Tech Stack

- **Server**: Fastify, better-sqlite3, @fastify/websocket
- **Dashboard**: React, Vite, vanilla-extract, D3.js, Recharts
- **Collector**: Pi extension API, WebSocket client
- **Design**: @hydrotik/design-system tokens and conventions
