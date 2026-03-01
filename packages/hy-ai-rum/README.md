# ⚡ AIr

**Real-time AI observability for coding agents.**

AIr monitors your AI coding sessions — context windows, tool calls, token costs, latency, output quality, prompt effectiveness, and drift detection — streaming everything to a live dashboard with built-in data redaction.

![AIr Dashboard](https://img.shields.io/badge/status-beta-blue) ![Pi Compatible](https://img.shields.io/badge/pi-extension-green) ![Security](https://img.shields.io/badge/data-redacted-green)

<p align="center">
  <img src="docs/dash.png" alt="AIr Dashboard — KPIs, drift detection, activity monitor, context treemap, token flow, tool waterfall, integrations, and session list" width="100%" />
</p>

---

## Install

```bash
npm install @hydrotik/air
```

This gives you:
- **`air` CLI** — starts the server + dashboard (single process)
- **SDK** — instrument MCP servers, RAG pipelines, and custom tools
- **Event types** — TypeScript definitions for all telemetry events

---

### 🔌 Integrate Your Own Services

> **Want to wire your RAG pipeline, MCP server, or custom tools into AIr?**
>
> 📖 **[Integration Guide](./INTEGRATION_PROMPT_README.md)** — everything you need:
> - **Copy-paste prompt** for AI coding agents (Claude Code, Codex, ChatGPT) to auto-instrument your services
> - **HTTP API reference** — just POST JSON, no SDK required
> - **Language examples** — JavaScript, Python, Go, and cURL
> - **Step-by-step walkthrough** — config file → verify → instrument → dashboard
>
> Most integrations take **under 5 minutes**. The only required field is `source`.

---

## Quick Start

### 1. Start the AIr server + dashboard

**Standalone** (installed via npm):

```bash
npx @hydrotik/air                    # default port 5200
npx @hydrotik/air --port 8080        # custom port
```

**Monorepo** (development):

```bash
pnpm turbo run dev --filter=@hydrotik/air
```

**Background / detached** (cross-platform — macOS, Linux, Windows):

```bash
# Start as a detached background process (survives terminal closure)
pnpm --filter @hydrotik/air start:detached

# Custom port
pnpm --filter @hydrotik/air start:detached -- --port 8080

# Stop the background server
pnpm --filter @hydrotik/air stop
```

> **⚠ Troubleshooting: Server won't start from AI agents / CI tools**
>
> AI coding agents (pi, Cursor, VS Code tasks) run commands in a process group
> that gets cleaned up when the shell exits. A simple `node cli.js &` will die
> when the parent tool finishes. Use `start:detached` instead — it spawns the
> server as a fully detached process with `child.unref()`, writes a PID file
> to `$TMPDIR/air-server.pid`, and exits cleanly. Works on all platforms.

Opens:
- **Dashboard** → [http://localhost:5200](http://localhost:5200) (production) or [http://localhost:5201](http://localhost:5201) (dev)
- **API** → [http://localhost:5200/api/health](http://localhost:5200/api/health)

### 2. Connect your coding agent

AIr works with multiple AI coding agents. Pick your setup:

#### Pi

```bash
cd .pi/extensions/ai-rum-collector && npm install
```

Then `/reload` in pi. The extension auto-discovers and streams tool calls, turns, token usage, context breakdown, and compaction events via WebSocket. See [Pi collector docs](src/collectors/pi/README.md).

#### Claude Code

One command installs the hooks:

```bash
npx air-install-claude-code
```

This copies two hook scripts into `.claude/hooks/` and wires them into `.claude/settings.json`:

```
.claude/hooks/
├── air-session-start.js     ← SessionStart hook
└── air-post-tool-use.js     ← PostToolUse hook
```

**What happens automatically:**
- When Claude Code starts a session, `air-session-start.js` checks if the AIr server is running and starts it if needed
- Every tool call triggers `air-post-tool-use.js`, which POSTs the event to AIr via HTTP
- Session IDs are persisted to a temp file so events from the same session are correlated

**Manual install** (if you prefer not to use the installer):

1. Copy `session-start.js` and `post-tool-use.js` from `src/collectors/claude-code/` into `.claude/hooks/`
2. Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "node .claude/hooks/air-session-start.js"
      }]
    }],
    "PostToolUse": [{
      "hooks": [{
        "type": "command",
        "command": "node .claude/hooks/air-post-tool-use.js"
      }]
    }]
  }
}
```

**Configuration:**

| Variable | Default | Description |
|----------|---------|-------------|
| `AIR_URL` | `http://localhost:5200` | AIr server HTTP endpoint |
| `AIR_PORT` | `5200` | Server port (used by auto-start) |
| `AIR_ENABLED` | `true` | Set to `"false"` to disable collection |
| `AIR_AUTOSTART` | `true` | Set to `"false"` to skip auto-starting the server |

**What it collects vs Pi:**

| Feature | Pi | Claude Code |
|---------|-----|-------------|
| Tool call events | ✅ With precise timing | ✅ No duration (PostToolUse only) |
| Token usage per turn | ✅ From API response | ❌ Not exposed in hooks |
| Context breakdown | ✅ Full treemap | ⚠️ Total % only (via statusline bridge) |
| Compaction events | ✅ Direct hook | ❌ Not exposed |
| Connection | WebSocket (persistent) | HTTP POST (per-event) |

See [Claude Code collector docs](src/collectors/claude-code/README.md).

#### Codex CLI

Run the watcher alongside Codex — it tails session files in real time:

```bash
# Terminal 1: Start the AIr server
npx air

# Terminal 2: Start the Codex watcher
npx air-codex-watcher
```

The watcher monitors `~/.codex/sessions/` for new and updated `.jsonl` files, maps Codex events to AIr telemetry, and POSTs them to the server.

**Options:**

```bash
# Watch all sessions (live + new)
npx air-codex-watcher

# Watch a specific session ID
npx air-codex-watcher --session 019c7e7f

# Replay a past session into AIr (backfill)
npx air-codex-watcher --replay ~/.codex/sessions/2026/02/20/rollout-2026-02-20T23-39-53-019c7e7f.jsonl
```

**What it collects:**

| Codex Event | AIr Event | Data |
|-------------|-----------|------|
| `session_meta` | `session_start` | session_id, model, cwd |
| `event_msg:task_started` | `turn_start` | turn index |
| `event_msg:task_complete` | `turn_end` | tool call count |
| `event_msg:token_count` | `token_usage` | input/output tokens |
| `response_item:function_call` | `tool_call_start` | tool name, call_id, input preview |
| `response_item:function_call_output` | `tool_call_end` | call_id, output, duration, errors |
| `response_item:custom_tool_call` | `tool_call_start/end` | apply_patch, etc. |
| `compacted` | `compaction` | summary length |

**Configuration:**

| Variable | Default | Description |
|----------|---------|-------------|
| `AIR_URL` | `http://localhost:5200` | AIr server HTTP endpoint |
| `AIR_ENABLED` | `true` | Set to `"false"` to disable |
| `CODEX_HOME` | `~/.codex` | Codex home directory |

See [Codex collector docs](src/collectors/codex/README.md).

#### Any Agent (SDK)

```ts
import { AirClient } from '@hydrotik/air/sdk';

const air = new AirClient({ url: 'ws://localhost:5200/ws/collector' });
air.trace('my_tool', { input: 'data' }, async () => doWork());
```

### 3. Open the dashboard

That's it. Every tool call, turn, and context change streams to the dashboard in real-time.

Sessions from different agents are labeled — the dashboard shows whether each session came from Pi, Claude Code, or Codex.

---

## What You See

### KPI Cards
Total tokens in context window, session cost, tool call count, turn count, compactions, and context utilization percentage — all updating live. Context % changes color dynamically: **pink** (<80%), **yellow/amber** (≥80%), **red** (≥90%).

### Context Window Treemap
D3 treemap showing what fills your context — system prompt, user messages, assistant responses, tool results, thinking blocks. Like a webpack bundle analyzer for your LLM context. Hover any segment for a tooltip with token count and percentage.

### Context Utilization Over Time
Area chart tracking context window fill percentage with 80%/95% warning thresholds. Know when you're approaching compaction. Charts fill their full panel height via flex layout.

### Token Flow
Cache read / output / input tokens per turn as stacked area chart with gradient fills. See cache efficiency, cost drivers, and compaction sawtooth patterns. Auto-scales Y-axis, hidden X-axis labels for maximum data density.

### Tool Call Waterfall
DevTools-style timeline of tool executions with durations. Spot slow reads, long builds, and error patterns.

### Live Event Feed
Scrolling log of all telemetry events — color-coded by type, newest-first, with inline summaries.

---

## Data Security & Redaction

AIr is designed to store **metadata only** — sizes, durations, counts, rates — not your prompts, code, or conversations.

### Redaction Levels

Set via `--redaction` flag or `AIR_REDACTION_LEVEL` env var:

| Level | What's stored | Use case |
|-------|--------------|----------|
| `preview` **(default)** | Content truncated to 50 chars, sensitive patterns scrubbed | Production — safe observability |
| `full` | ALL content fields stripped, only numeric metadata remains | Strict compliance environments |
| `none` | Everything stored as-is | Local development only |

```bash
npx air --redaction full    # maximum privacy
npx air --redaction preview # balanced (default)
npx air --redaction none    # development only ⚠️
```

### What Gets Scrubbed

At `preview` and `full` levels, the server automatically detects and redacts:
- API keys and tokens (`sk-...`, `Bearer ...`, `AKIA...`)
- JWT tokens
- Email addresses
- Private key blocks
- Database connection strings with credentials
- `.env`-style `KEY=VALUE` patterns

### Security Principles

1. **No raw prompts stored** — prompt tracking uses one-way SHA-256 hashes
2. **No code content stored** — tool I/O stores byte sizes, not actual content
3. **Redaction at ingestion** — data is sanitized before it hits SQLite
4. **Local-only by default** — server binds to localhost, no external network calls
5. **No telemetry about telemetry** — AIr itself sends nothing to external services

---

## Latency Monitoring

AIr tracks timing at multiple granularities:

### Automatic (from collectors)
- **Turn latency** — time from user message to final response (Pi collector)
- **Tool call duration** — per-tool execution time with waterfall visualization
- **API call latency** — MCP and RAG operation timing (SDK)

### Manual (via SDK)
```ts
import { AirClient } from '@hydrotik/air/sdk';
const air = new AirClient({ sessionId: 'my-session' });

// Auto-measure an operation
const result = await air.measureLatency('api_call', async () => {
  return await fetch('https://api.example.com/data');
}, { model: 'gpt-4o' });

// Record with phase breakdown
air.recordLatency('turn', 1500, {
  ttftMs: 200,
  phases: [
    { name: 'thinking', durationMs: 800 },
    { name: 'tool_execution', durationMs: 500 },
    { name: 'response_generation', durationMs: 200 },
  ],
});
```

### API
| Endpoint | Description |
|----------|-------------|
| `GET /api/sessions/:id/latency` | Latency stats by operation (avg/min/max) |
| `GET /api/sessions/:id/latency/timeseries?operation=turn` | Time series |

---

## Cost Monitoring

AIr tracks costs automatically using a built-in pricing table for common models (Claude, GPT-4o, Gemini, Codex, etc.) and supports manual cost recording.

### Automatic Cost Calculation
When a `token_usage` event arrives with zero cost, AIr auto-computes it from the model pricing table. The Pi collector emits cost events automatically.

### Budget Alerts
```ts
const air = new AirClient({
  sessionId: 'my-session',
  budgetLimit: 5.00, // Alert when session cost exceeds $5
});
```

When cumulative cost crosses the budget limit, a `cost` event with `budgetExceeded: true` is emitted and stored.

### Built-in Model Pricing
Prices per 1M tokens (USD). Override via custom events if your pricing differs.

| Model | Input | Output | Cache Read |
|-------|-------|--------|------------|
| claude-4-sonnet | $3.00 | $15.00 | $0.30 |
| claude-4-opus | $15.00 | $75.00 | $1.50 |
| gpt-4o | $2.50 | $10.00 | $1.25 |
| gpt-4.1 | $2.00 | $8.00 | $0.50 |
| gpt-4.1-mini | $0.40 | $1.60 | $0.10 |
| gemini-2.5-pro | $1.25 | $10.00 | — |

### API
| Endpoint | Description |
|----------|-------------|
| `GET /api/sessions/:id/cost` | Cost breakdown by model |
| `GET /api/sessions/:id/cost/timeseries` | Cumulative cost over time |

---

## Output Evaluation

AIr tracks quality signals for every LLM turn — no content stored, only metrics:

- **Tool success rate** — what % of tool calls succeeded
- **Response token count** — verbosity tracking
- **Cache hit rate** — context efficiency
- **Retry detection** — did the turn need a correction?
- **Response latency** — time from prompt to response
- **User rating** — optional 1-5 star rating via SDK

### Automatic (Pi collector)
The Pi collector emits `output_eval` events automatically on every turn with tool success rate, cache hit rate, response latency, and token counts.

### Manual (SDK)
```ts
air.recordOutputEval(3, 'claude-4-sonnet', 'anthropic', {
  responseTokens: 450,
  toolCallCount: 5,
  toolErrorCount: 1,
  responseLatencyMs: 3200,
  cacheHitRate: 0.65,
}, { userRating: 4, tags: ['accurate', 'concise'] });
```

### API
| Endpoint | Description |
|----------|-------------|
| `GET /api/sessions/:id/evals` | Aggregate quality metrics by model |
| `GET /api/sessions/:id/evals/timeseries` | Quality signals over time |

---

## Prompt Rating & Comparison

Track which prompt variants work best — without storing prompt content.

### How It Works
1. Prompts are identified by a **SHA-256 hash** (first 16 chars) — the raw text never leaves your machine
2. Each prompt gets a **variant label** (`baseline`, `v2-concise`, `v3-cot`, etc.)
3. After a task completes, record effectiveness metrics
4. Query the API to compare variants by goal achievement, cost, latency, and error rates

### SDK Usage
```ts
import { AirClient, hashPrompt } from '@hydrotik/air/sdk';
const air = new AirClient({ sessionId: 'my-session' });

// Rate after a successful interaction
air.ratePrompt('v2-concise', 'system', systemPromptText, {
  goalAchieved: true,
  turnsToComplete: 3,
  totalTokens: 5000,
  totalCost: 0.02,
  totalLatencyMs: 15000,
  toolErrorRate: 0,
  requiredCompaction: false,
}, 4); // 4/5 stars

// Compare variants via API
// GET /api/prompts → all variants ranked by goal rate
// GET /api/prompts?hash=abc123 → variants for specific prompt
```

### API
| Endpoint | Description |
|----------|-------------|
| `GET /api/prompts` | All prompt variants ranked by effectiveness |
| `GET /api/prompts?hash=<hash>` | Compare variants of a specific prompt |
| `GET /api/prompts/:variant` | All ratings for a specific variant |

---

## Drift Detection

AIr automatically detects when model behavior changes — latency spikes, cost increases, error rate jumps, or token usage shifts.

### How It Works
1. The server maintains **rolling baselines** for key metrics (window of 50 samples)
2. When a new value deviates beyond the threshold, a `drift` event is emitted
3. Drift events are stored and queryable for post-mortem analysis

### Monitored Metrics
| Metric | What it tracks |
|--------|---------------|
| `latency` | Tool call and turn duration |
| `cost` | Per-turn cost |
| `token_usage` | Total tokens per turn |
| `output_tokens` | Response verbosity |
| `error_rate` | Tool failure rate |
| `cache_hit_rate` | Context cache efficiency |

### Severity Thresholds
| Severity | Default Deviation |
|----------|------------------|
| `info` | ≥25% from baseline |
| `warning` | ≥50% from baseline |
| `critical` | ≥100% from baseline |

### API
| Endpoint | Description |
|----------|-------------|
| `GET /api/drift` | Recent drift events (all sessions) |
| `GET /api/drift?session=<id>` | Drift events for a session |
| `GET /api/drift/summary` | Drift counts by metric and severity |

---

## Bring Your Own RAG

> 🚀 **Quick integration?** See the **[Integration Guide](./INTEGRATION_PROMPT_README.md)** for step-by-step instructions and a prompt you can paste into any AI coding agent to auto-instrument your services.

AIr supports any RAG system through **three integration paths** — from zero-code config to full SDK instrumentation.

### 1. Configuration File (`.air.json`)

Drop a `.air.json` in your project root to register your RAG providers. The dashboard shows them immediately — even before data flows.

```json
{
  "providers": {
    "rag": [
      {
        "name": "product-search",
        "type": "qdrant",
        "description": "Product catalog vector search",
        "embeddingModel": "text-embedding-3-small",
        "dimensions": 1536
      },
      {
        "name": "docs-kb",
        "type": "pinecone",
        "description": "Documentation knowledge base"
      }
    ],
    "mcp": [
      { "name": "design-mcp", "description": "Design system MCP server" }
    ]
  },
  "redaction": "preview",
  "budgetLimit": 10.00
}
```

The server reads this config on startup and registers providers in the dashboard's **Integrations** panel with status indicators (active/inactive/never seen).

### 2. HTTP API (Language-Agnostic)

Your RAG system — Python, Go, Rust, whatever — POSTs simple JSON to dedicated endpoints. No SDK needed, no full event schema required. Only `source` is mandatory.

**Log a retrieval:**
```bash
curl -X POST http://localhost:5200/api/rag/retrieval \
  -H 'Content-Type: application/json' \
  -d '{
    "source": "product-search",
    "query": "red running shoes",
    "resultCount": 10,
    "topScore": 0.92,
    "durationMs": 45
  }'
```

**Log an embedding:**
```bash
curl -X POST http://localhost:5200/api/rag/embedding \
  -H 'Content-Type: application/json' \
  -d '{
    "source": "product-search",
    "model": "text-embedding-3-small",
    "inputTokens": 150,
    "durationMs": 12,
    "dimensions": 1536
  }'
```

**Log an indexing operation:**
```bash
curl -X POST http://localhost:5200/api/rag/index \
  -H 'Content-Type: application/json' \
  -d '{
    "source": "docs-kb",
    "documentCount": 500,
    "totalTokens": 250000,
    "durationMs": 3200
  }'
```

**Register a provider at runtime:**
```bash
curl -X POST http://localhost:5200/api/providers/rag \
  -H 'Content-Type: application/json' \
  -d '{ "name": "my-rag", "type": "custom", "description": "My RAG pipeline" }'
```

The server auto-fills defaults from `.air.json` config (e.g., embedding model, dimensions) and applies redaction before storage.

### 3. SDK (TypeScript)

For TypeScript/Node.js RAG systems, use the SDK for automatic tracing with `async`/`await` wrappers.

**Config-driven (reads `.air.json`):**
```ts
import { createRagTracersFromConfig } from '@hydrotik/air/sdk';

// Creates a tracer for each provider in .air.json
const rag = createRagTracersFromConfig({ sessionId: 'my-session' });

// Use by provider name
const results = await rag['product-search'].traceRetrieval('red shoes', async () => {
  return await qdrant.search({ vector, limit: 10 });
}, {
  extractResults: (r) => ({
    count: r.length,
    topScore: r[0]?.score,
    chunkSizes: r.map(doc => doc.tokenCount),
  }),
});
```

**Manual setup:**
```ts
import { createRagTracer } from '@hydrotik/air/sdk';

const rag = createRagTracer('product-search', {
  sessionId: 'my-session',
  defaultEmbeddingModel: 'text-embedding-3-small',
  defaultDimensions: 1536,
});

await rag.traceRetrieval('query', fetchFn);
await rag.traceEmbedding('text-embedding-3-small', 150, embedFn);
await rag.traceIndex(500, 250000, indexFn);
```

### What Shows Up in the Dashboard

| Panel | What it shows |
|-------|--------------|
| **Integrations** | All registered providers with status (active/idle/never seen), type, event count, last seen |
| **RAG Pipeline** | Stats table: source, type, call count, avg latency, avg results, relevance scores, token volumes |
| **Live Event Feed** | Real-time stream of `rag_retrieval`, `rag_embedding`, `rag_index` events |
| **Drift Detection** | Alerts when RAG latency, error rate, or result quality shifts from baseline |

### Supported Vector DB Types

The `type` field in `.air.json` is for display only — AIr works with any backend:

| Type | Icon |
|------|------|
| `pinecone` | 🌲 |
| `qdrant` | 🔷 |
| `weaviate` | 🕸 |
| `chroma` | 🎨 |
| `pgvector` | 🐘 |
| `milvus` | 🔬 |
| `custom` | ⚙️ |

### Provider API

| Endpoint | Description |
|----------|-------------|
| `GET /api/providers` | All registered RAG + MCP providers with status |
| `GET /api/providers/rag` | RAG providers only |
| `POST /api/providers/rag` | Register a new RAG provider at runtime |
| `POST /api/rag/retrieval` | Log a retrieval (simplified — only `source` required) |
| `POST /api/rag/embedding` | Log an embedding generation |
| `POST /api/rag/index` | Log a document indexing operation |

---

## Configuration

### Configuration File

Create `.air.json` or `air.config.json` in your project root. AIr searches up to 5 parent directories.

```json
{
  "providers": {
    "rag": [{ "name": "my-rag", "type": "qdrant" }],
    "mcp": [{ "name": "my-mcp" }]
  },
  "redaction": "preview",
  "budgetLimit": 10.00,
  "port": 5200
}
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `AIR_URL` | `ws://localhost:5200/ws/collector` | AIr server WebSocket endpoint |
| `AIR_ENABLED` | `true` | Set to `"false"` to disable collection |
| `AIR_REDACTION_LEVEL` | `preview` | Data redaction: `none`, `preview`, `full` |

### Database

Telemetry persists to SQLite at `~/.hydrotik/air/telemetry.db` (WAL mode). Delete the file to reset.

### Ports

| Port | Service |
|------|---------|
| 5200 | AIr server (Fastify + WebSocket + REST API) |
| 5201 | AIr dashboard (Vite dev server, proxies to 5200) |

Ports are configured in `@hydrotik/config` (`packages/hy-config/src/ports.ts`).

---

## SDK — Instrument MCP, RAG, and Custom Tools

AIr ships a lightweight SDK for instrumenting anything that talks to an LLM — MCP servers, RAG pipelines, custom tools, or your own agent framework.

### MCP Instrumentation

Wrap an MCP client to auto-instrument all `callTool`, `readResource`, and `getPrompt` calls:

```ts
import { Client } from '@modelcontextprotocol/sdk/client';
import { instrumentMcp } from '@hydrotik/air/sdk';

const client = new Client({ name: 'my-app', version: '1.0' });

// Proxy wraps all MCP methods with telemetry
const instrumented = instrumentMcp(client, 'my-mcp-server', {
  sessionId: 'my-session',
});

// All calls are now auto-traced in the AIr dashboard
const result = await instrumented.callTool('search', { query: 'hello' });
```

Or use the manual tracer for more control:

```ts
import { createMcpTracer } from '@hydrotik/air/sdk';

const mcp = createMcpTracer('my-server');
const result = await mcp.traceToolCall('search', { query: 'hello' }, async () => {
  return await myMcpClient.callTool('search', { query: 'hello' });
});
```

### RAG Instrumentation

Instrument vector DB queries, embedding generation, and document indexing:

```ts
import { createRagTracer } from '@hydrotik/air/sdk';

const rag = createRagTracer('pinecone', { sessionId: 'my-session' });

// Trace a retrieval with result extraction
const results = await rag.traceRetrieval('search query', async () => {
  return await pinecone.query({ vector, topK: 5 });
}, {
  extractResults: (r) => ({
    count: r.matches.length,
    topScore: r.matches[0]?.score,
    chunkSizes: r.matches.map(m => m.metadata.tokenCount),
  }),
});

// Trace embedding generation
const embedding = await rag.traceEmbedding('text-embedding-3-small', 150, async () => {
  return await openai.embeddings.create({ model: 'text-embedding-3-small', input: text });
}, { dimensions: 1536 });

// Trace document indexing
await rag.traceIndex(100, 50000, async () => {
  return await pinecone.upsert(vectors);
});
```

### Generic Client — Any Custom Tool

For anything not covered by MCP or RAG helpers, use the base `AirClient`:

```ts
import { AirClient } from '@hydrotik/air/sdk';

const air = new AirClient({
  sessionId: 'my-session',
  provider: 'my-custom-tool',
});

// Trace any async operation
const result = await air.trace('database_query', { table: 'users', filter: 'active' }, async () => {
  return await db.query('SELECT * FROM users WHERE active = true');
});

// Or emit raw events
air.emit({
  type: 'custom',
  provider: 'my-tool',
  eventName: 'cache_hit',
  data: { key: 'user:123', ttl: 300 },
});
```

### Dashboard Auto-Detection

MCP and RAG panels appear automatically in the dashboard when data from those providers flows in. No configuration needed — the dashboard detects event types and renders the appropriate panels:

- **MCP Servers** — table of server/method/tool stats with call counts, avg/min/max latency, error rates
- **RAG Pipeline** — table of source/type stats with retrieval counts, avg relevance scores, token volumes

---

## REST API

All endpoints return JSON. All ingested data is subject to server-side redaction.

| Endpoint | Description |
|----------|-------------|
| **Server** | |
| `GET /api/health` | Server uptime, connected clients, redaction level |
| `GET /api/config` | Server configuration and enabled features |
| **Sessions** | |
| `GET /api/sessions` | List all sessions with summary stats |
| `GET /api/sessions/:id` | Single session summary |
| `GET /api/sessions/:id/events` | All events for a session |
| `GET /api/events/recent` | Recent events across all sessions |
| **Tools** | |
| `GET /api/sessions/:id/tool-calls` | Tool call records with timing |
| `GET /api/sessions/:id/tool-stats` | Per-tool aggregate stats (count, avg/min/max ms, errors) |
| **Context** | |
| `GET /api/sessions/:id/context` | Context utilization snapshots over time |
| `GET /api/sessions/:id/context/latest` | Latest context breakdown with segments |
| **Latency** | |
| `GET /api/sessions/:id/latency` | Latency stats by operation |
| `GET /api/sessions/:id/latency/timeseries` | Latency time series (optional `?operation=`) |
| **Cost** | |
| `GET /api/sessions/:id/cost` | Cost breakdown by model |
| `GET /api/sessions/:id/cost/timeseries` | Cumulative cost over time |
| **Quality** | |
| `GET /api/sessions/:id/evals` | Output evaluation stats by model |
| `GET /api/sessions/:id/evals/timeseries` | Quality signals over time |
| **Prompts** | |
| `GET /api/prompts` | All prompt variants ranked by effectiveness |
| `GET /api/prompts?hash=<hash>` | Compare variants of a specific prompt |
| `GET /api/prompts/:variant` | All ratings for a variant |
| **Drift** | |
| `GET /api/drift` | Recent drift events (optional `?session=`) |
| `GET /api/drift/summary` | Drift counts by metric and severity |
| **Integrations** | |
| `GET /api/sessions/:id/mcp-stats` | MCP call stats grouped by server/method/tool |
| `GET /api/sessions/:id/rag-stats` | RAG stats grouped by source/type |
| `GET /api/sessions/:id/providers` | Event type summary for all providers |
| `GET /api/providers` | Registered RAG + MCP providers with status |
| `GET /api/providers/rag` | RAG providers only |
| `POST /api/providers/rag` | Register a new RAG provider at runtime |
| **RAG Ingest (simplified)** | |
| `POST /api/rag/retrieval` | Log a retrieval — only `source` required |
| `POST /api/rag/embedding` | Log an embedding — only `source` required |
| `POST /api/rag/index` | Log an indexing op — only `source` required |
| **Ingestion (full events)** | |
| `POST /api/ingest` | Ingest a single event (redacted before storage) |
| `POST /api/ingest/batch` | Ingest multiple events at once |

---

## Architecture

```
 ┌──────────────┐   WebSocket    ┌──────────────┐   WebSocket    ┌──────────────┐
 │  Pi Agent    │ ─────────────→ │              │ ─────────────→ │              │
 │  + Extension │  /ws/collector │              │  /ws/dashboard │              │
 └──────────────┘                │              │                │              │
 ┌──────────────┐   HTTP POST    │  AIr Server  │                │  Dashboard   │
 │  Claude Code │ ─────────────→ │  (Fastify)   │                │  (React+D3)  │
 │  + Hooks     │  /api/ingest   │              │                │              │
 └──────────────┘                │              │                │              │
 ┌──────────────┐   HTTP POST    │              │                │              │
 │  Codex CLI   │ ─────────────→ │              │                │              │
 │  + Watcher   │  /api/ingest   └──────┬───────┘                └──────────────┘
 └──────────────┘                       │
                                   SQLite DB
                                 ~/.hydrotik/air/
                                  telemetry.db
```

### Ingestion Paths

AIr accepts telemetry via two protocols:
- **WebSocket** (`/ws/collector`) — persistent connection for long-lived processes (Pi extension, SDK clients)
- **HTTP POST** (`/api/ingest`, `/api/ingest/batch`) — fire-and-forget for short-lived processes (Claude Code hooks, Codex watcher)

Both paths go through the same `TelemetryStore.ingestEvent()` — same DB, same broadcast to dashboard clients.

### Pi Collector (WebSocket)
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

### Claude Code Collector (HTTP)
Two Node.js hook scripts that run as short-lived processes on each Claude Code event:
- **SessionStart** — auto-starts AIr server, emits `session_start`, persists session ID to temp file
- **PostToolUse** — emits `tool_call_start` + `tool_call_end` with correlated IDs, reads context metrics from statusline bridge

Hooks use HTTP POST because they're ephemeral processes — no time to establish a WebSocket.

### Codex CLI Collector (HTTP)
A long-running watcher that tails `~/.codex/sessions/*.jsonl`:
- Watches for file changes via `fs.watch` (falls back to 2s polling)
- Tracks byte offsets per file to avoid re-processing
- Maps Codex JSONL entries (`session_meta`, `function_call`, `task_started`, etc.) to AIr events
- Extracts wall-time duration from Codex output metadata
- Supports `--replay` mode for backfilling historical sessions

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

## Package Exports

```
@hydrotik/air          → Event types, MODEL_PRICING, computeCost, DriftDetector, redaction utils
@hydrotik/air/sdk      → AirClient, hashPrompt, instrumentMcp, createRagTracer
@hydrotik/air/server   → createServer() for programmatic use
```

**bin:**
- `air` → starts server + serves built dashboard on a single port
- `air-install-claude-code` → installs Claude Code hooks into `.claude/`
- `air-codex-watcher` → tails Codex session files and streams to AIr

---

## What Ships in the Package

```
dist/
├── server/          ← Fastify server + CLI (ESM)
│   ├── cli.js       ← npx entry point
│   └── index.js     ← createServer() export
├── sdk/             ← SDK for instrumentation (ESM + CJS + DTS)
│   ├── index.js
│   ├── index.cjs
│   └── index.d.ts
├── shared/          ← Event type definitions (ESM + CJS + DTS)
│   ├── index.js
│   ├── index.cjs
│   └── index.d.ts
└── dashboard/       ← Pre-built React SPA
    ├── index.html
    └── assets/      ← JS + CSS bundles (~650KB gzip: ~190KB)
```

Runtime dependencies: `fastify`, `better-sqlite3`, `ws`, `@fastify/cors`, `@fastify/static`, `@fastify/websocket`

Dashboard (React, D3, Recharts, vanilla-extract) is pre-built at publish time — **zero React dependency at runtime**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Server | Fastify 5, better-sqlite3, @fastify/websocket, data redaction, drift detection |
| Dashboard | React 19, Vite 6, D3.js 7, Recharts 2 (pre-built) |
| Styling | vanilla-extract, @hydrotik/tokens (compiled to CSS) |
| Collectors | Pi ExtensionAPI (WebSocket), Claude Code hooks (HTTP), Codex watcher (HTTP) |
| SDK | WebSocket (ws), crypto (prompt hashing), zero external deps |
| Storage | SQLite 3 (WAL mode), `~/.hydrotik/air/telemetry.db` |
| Security | 3-level content redaction, SHA-256 prompt hashing, sensitive pattern scrubbing |

---

## Troubleshooting

**Dashboard shows "Reconnecting…"**
The AIr server isn't running. Start it with `npx @hydrotik/air` or `pnpm turbo run dev --filter=@hydrotik/air`.

**"0 sessions" after reload**
The collector connects to the server async. Send a message in pi — the first tool call or turn will create a session.

**Context % doesn't match pi footer**
Delete `~/.hydrotik/air/telemetry.db` to clear stale data, restart the server, then `/reload` in pi.

**Pi extension not loading**
Check that `npm install` was run inside `.pi/extensions/ai-rum-collector/` (the `ws` package must be in `node_modules`). Run `/reload` in pi after fixing.

**Claude Code hooks not firing**
Verify `.claude/settings.json` has the hook entries under `hooks.SessionStart` and `hooks.PostToolUse`. Run `npx air-install-claude-code` again to re-install. Check that the hook scripts exist at `.claude/hooks/air-session-start.js` and `.claude/hooks/air-post-tool-use.js`.

**Claude Code sessions not correlating**
The SessionStart hook persists a session ID to `$TMPDIR/air-claude-code/session.json`. If PostToolUse events show up as separate sessions, check that the temp directory is writable and both hooks run in the same OS user context.

**Codex watcher not seeing sessions**
Verify `~/.codex/sessions/` exists and contains `.jsonl` files. Run `npx air-codex-watcher --replay <file>` on a specific file to test the pipeline. Check `AIR_URL` if the server is on a non-default port.

**Codex watcher missing events**
The watcher processes the 3 most recent files on startup. Older sessions need `--replay` to backfill. If `fs.watch` isn't working (some network filesystems), the watcher falls back to 2s polling automatically.

---

## License

MIT
