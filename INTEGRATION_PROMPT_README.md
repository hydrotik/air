# AIr Integration Guide

> **Get your AI tooling ecosystem wired into AIr observability in minutes.**
>
> This guide walks you through connecting any RAG pipeline, MCP server, or custom AI service to AIr's telemetry dashboard. No SDK required — just HTTP POST.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Integration Prompt](#integration-prompt)
- [Step-by-Step Integration](#step-by-step-integration)
  - [1. Start the AIr Server](#1-start-the-air-server)
  - [2. Create a Config File](#2-create-a-config-file)
  - [3. Verify Your Setup](#3-verify-your-setup)
  - [4. Add Telemetry to Your Services](#4-add-telemetry-to-your-services)
- [API Reference](#api-reference)
  - [RAG Endpoints](#rag-endpoints)
  - [MCP / Tool Call Events](#mcp--tool-call-events)
  - [Latency Events](#latency-events)
  - [Provider Registry](#provider-registry)
  - [Validation Endpoints](#validation-endpoints)
- [Language Examples](#language-examples)
- [What Shows Up in the Dashboard](#what-shows-up-in-the-dashboard)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# 1. Start AIr
cd packages/hy-ai-rum && node dist/server/cli.js

# 2. Drop a config file in your project root
cat > .air.json << 'EOF'
{
  "providers": {
    "rag": [{ "name": "my-rag", "type": "custom", "description": "My RAG pipeline" }]
  },
  "redaction": "preview"
}
EOF

# 3. Send a test event
curl -X POST http://localhost:5200/api/rag/retrieval \
  -H 'Content-Type: application/json' \
  -d '{"source":"my-rag","query":"test query","resultCount":5,"durationMs":42}'

# 4. Open the dashboard
open http://localhost:5200
```

---

## Integration Prompt

**Copy this prompt into your AI coding agent** (Claude Code, Codex, ChatGPT, etc.) to have it instrument your services automatically:

````markdown
## AIr Telemetry Integration Task

I need you to add AIr observability telemetry to my service. AIr is an HTTP-based
telemetry system running at `http://localhost:5200`. All reporting is fire-and-forget
(never block the main request). No SDK is needed — just HTTP POST with JSON.

### What to instrument

For each operation in my service, add a lightweight HTTP POST that reports:
1. **What happened** (retrieval, embedding, indexing, tool call)
2. **How long it took** (durationMs)
3. **Whether it succeeded** (success/failure + error message)
4. **How much data** (input/output sizes, result counts)

### Telemetry helper pattern

Add this fire-and-forget helper (adapt for your language):

```javascript
const AIR_URL = process.env.AIR_URL ?? 'http://localhost:5200';
const AIR_ENABLED = process.env.AIR_ENABLED !== 'false';

function airPost(path, data) {
  if (!AIR_ENABLED) return;
  fetch(`${AIR_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(2000),
  }).catch(() => {});
}
```

### Endpoints to use

**For RAG/search operations:**
```
POST /api/rag/retrieval
{
  "source": "<service-name>",        // required — identifies your service
  "sessionId": "<optional-session>",  // groups events together
  "query": "<truncated-query>",       // first 50 chars only (privacy)
  "resultCount": 10,
  "topScore": 0.92,
  "durationMs": 45,
  "chunkSizes": [150, 200, 180],
  "metadata": { "category": "docs", "corpusSize": 500 }
}
```

**For embedding generation:**
```
POST /api/rag/embedding
{
  "source": "<service-name>",
  "model": "text-embedding-3-small",
  "inputTokens": 150,
  "durationMs": 12,
  "dimensions": 1536,
  "batchSize": 1
}
```

**For document indexing:**
```
POST /api/rag/index
{
  "source": "<service-name>",
  "documentCount": 500,
  "totalTokens": 250000,
  "durationMs": 3200,
  "metadata": { "added": 50, "updated": 10 }
}
```

**For any tool/function call (MCP tools, API calls, etc.):**
```
POST /api/ingest
{
  "id": "<unique-id>",
  "sessionId": "<service-session-id>",
  "timestamp": 1709312345000,
  "type": "tool_call",
  "toolName": "<function-name>",
  "toolCallId": "<unique-call-id>",
  "provider": "<service-name>",
  "durationMs": 42,
  "isError": false,
  "inputTokens": 100,
  "outputTokens": 2400,
  "metadata": { "key": "value" }
}
```

**For latency tracking (charted over time):**
```
POST /api/ingest
{
  "id": "<unique-id>",
  "sessionId": "<service-session-id>",
  "timestamp": 1709312345000,
  "type": "latency",
  "operation": "<operation-name>",
  "totalMs": 42,
  "model": "<service-name>"
}
```

### Rules
- **Never store sensitive data** — truncate queries to 50 chars, no API keys, no PII
- **Fire and forget** — use a 2-second timeout, catch and ignore errors
- **Controllable** — respect `AIR_ENABLED=false` environment variable
- **Non-blocking** — telemetry must never slow down the main operation
- **Unique IDs** — use `Date.now().toString(36) + Math.random().toString(36).slice(2,8)`
- **Session ID** — use a stable ID per service instance (e.g., `my-service-${Date.now().toString(36)}`)

### Instrument every public function/endpoint in the service with:
1. `const t0 = Date.now()` at the start
2. The operation logic
3. `const durationMs = Date.now() - t0` after
4. Fire-and-forget POST to the appropriate endpoint
````

---

## Step-by-Step Integration

### 1. Start the AIr Server

```bash
# From the AIr package
cd packages/hy-ai-rum && node dist/server/cli.js

# Or with options
node dist/server/cli.js --port 5200 --redaction preview
```

You should see:
```
⚡ AIr — Real-time AI Observability
────────────────────────────────────
Dashboard:  http://localhost:5200
RAG API:    http://localhost:5200/api/rag/*
Redaction:  🛡️  PREVIEW
────────────────────────────────────
```

### 2. Create a Config File

Create `.air.json` in your project root. This registers your services so the dashboard knows about them before any data flows.

```json
{
  "providers": {
    "rag": [
      {
        "name": "my-vector-search",
        "type": "qdrant",
        "description": "Product catalog semantic search",
        "embeddingModel": "text-embedding-3-small",
        "dimensions": 1536
      },
      {
        "name": "docs-kb",
        "type": "pinecone",
        "description": "Internal documentation knowledge base"
      }
    ],
    "mcp": [
      {
        "name": "my-mcp-server",
        "description": "Custom MCP server for domain tools"
      }
    ]
  },
  "redaction": "preview",
  "budgetLimit": 10.00
}
```

**Supported `type` values** (for display — AIr works with any backend):

| Type | Icon | Examples |
|------|------|----------|
| `pinecone` | 🌲 | Pinecone |
| `qdrant` | 🔷 | Qdrant |
| `weaviate` | 🕸 | Weaviate |
| `chroma` | 🎨 | ChromaDB |
| `pgvector` | 🐘 | PostgreSQL + pgvector |
| `milvus` | 🔬 | Milvus |
| `custom` | ⚙️ | Anything else |

### 3. Verify Your Setup

```bash
# Check server health
curl http://localhost:5200/api/health

# Check your providers are registered
curl http://localhost:5200/api/providers

# Check full config
curl http://localhost:5200/api/config
```

Expected response from `/api/providers`:
```json
{
  "rag": [
    {
      "name": "my-vector-search",
      "type": "qdrant",
      "description": "Product catalog semantic search",
      "eventCount": 0,
      "active": false
    }
  ],
  "mcp": []
}
```

### 4. Add Telemetry to Your Services

Pick the approach that fits your stack:

#### Option A: HTTP POST (Any Language)

Just POST JSON to the AIr endpoints. See the [API Reference](#api-reference) below.

#### Option B: TypeScript SDK

```typescript
import { createRagTracersFromConfig } from '@hydrotik/air/sdk';

// Auto-creates tracers for all providers in .air.json
const rag = createRagTracersFromConfig({ sessionId: 'my-session' });

// Wrap your operations
const results = await rag['my-vector-search'].traceRetrieval('search query', async () => {
  return await qdrant.search({ vector, limit: 10 });
});
```

#### Option C: Runtime Registration

Register providers dynamically (no config file needed):

```bash
curl -X POST http://localhost:5200/api/providers/rag \
  -H 'Content-Type: application/json' \
  -d '{"name":"my-service","type":"custom","description":"Registered at runtime"}'
```

---

## API Reference

### RAG Endpoints

These accept simplified payloads — only `source` is required. AIr fills in defaults from `.air.json`.

#### `POST /api/rag/retrieval`

Log a search/retrieval operation.

```json
{
  "source": "my-rag",
  "sessionId": "optional-session-id",
  "query": "search terms (truncated for privacy)",
  "resultCount": 10,
  "topScore": 0.92,
  "durationMs": 45,
  "chunkSizes": [150, 200, 180],
  "metadata": {}
}
```

#### `POST /api/rag/embedding`

Log an embedding generation.

```json
{
  "source": "my-rag",
  "sessionId": "optional-session-id",
  "model": "text-embedding-3-small",
  "inputTokens": 150,
  "durationMs": 12,
  "dimensions": 1536,
  "batchSize": 1
}
```

#### `POST /api/rag/index`

Log a document indexing/upsert operation.

```json
{
  "source": "my-rag",
  "sessionId": "optional-session-id",
  "documentCount": 500,
  "totalTokens": 250000,
  "durationMs": 3200,
  "metadata": { "added": 50, "updated": 10 }
}
```

### MCP / Tool Call Events

For any function invocation — MCP tools, API calls, internal operations.

#### `POST /api/ingest`

```json
{
  "id": "unique-event-id",
  "sessionId": "my-service-session",
  "timestamp": 1709312345000,
  "type": "tool_call",
  "toolName": "search_products",
  "toolCallId": "unique-call-id",
  "provider": "my-service",
  "durationMs": 42,
  "isError": false,
  "errorMessage": null,
  "inputTokens": 100,
  "outputTokens": 2400,
  "metadata": { "resultCount": 10 }
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique event ID |
| `sessionId` | Yes | Groups events — auto-creates session if new |
| `timestamp` | Yes | Unix epoch milliseconds |
| `type` | Yes | `"tool_call"` |
| `toolName` | Yes | Function/tool name |
| `toolCallId` | Yes | Unique per invocation |
| `provider` | No | Service name (shown in dashboard) |
| `durationMs` | No | Execution time in ms |
| `isError` | No | `true` if the call failed |
| `errorMessage` | No | Error description (redacted by server) |
| `inputTokens` | No | Input size (bytes or tokens) |
| `outputTokens` | No | Output size (bytes or tokens) |
| `metadata` | No | Arbitrary JSON metadata |

### Latency Events

Tracked over time and charted in the Latency Panel.

#### `POST /api/ingest`

```json
{
  "id": "unique-event-id",
  "sessionId": "my-service-session",
  "timestamp": 1709312345000,
  "type": "latency",
  "operation": "vector_search",
  "totalMs": 42,
  "ttftMs": 8,
  "model": "my-service",
  "provider": "my-service",
  "metadata": { "corpusSize": 50000 }
}
```

### Provider Registry

#### `GET /api/providers`

Returns all registered providers with live status.

```json
{
  "rag": [
    {
      "name": "my-rag",
      "type": "qdrant",
      "description": "...",
      "eventCount": 142,
      "lastSeen": 1709312345000,
      "active": true
    }
  ],
  "mcp": [...]
}
```

#### `POST /api/providers/rag`

Register a provider at runtime.

```json
{
  "name": "my-new-rag",
  "type": "pinecone",
  "description": "Added dynamically"
}
```

### Validation Endpoints

Use these to verify your integration is working:

```bash
# Server alive?
curl http://localhost:5200/api/health

# Config + providers loaded?
curl http://localhost:5200/api/config

# Providers registered?
curl http://localhost:5200/api/providers

# Sessions created?
curl http://localhost:5200/api/sessions

# Events flowing?
curl http://localhost:5200/api/events/recent?limit=10

# Tool call stats for a session?
curl http://localhost:5200/api/sessions/<session-id>/tool-stats

# Latency stats?
curl http://localhost:5200/api/sessions/<session-id>/latency

# RAG stats?
curl http://localhost:5200/api/sessions/<session-id>/rag-stats
```

---

## Language Examples

### JavaScript / Node.js (No SDK)

```javascript
const AIR_URL = process.env.AIR_URL ?? 'http://localhost:5200';
const AIR_ENABLED = process.env.AIR_ENABLED !== 'false';
const SESSION_ID = `my-service-${Date.now().toString(36)}`;

function airPost(path, data) {
  if (!AIR_ENABLED) return;
  fetch(`${AIR_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(2000),
  }).catch(() => {});
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Instrument a search function
async function search(query) {
  const t0 = Date.now();
  try {
    const results = await vectorDb.search(query);
    const durationMs = Date.now() - t0;

    airPost('/api/rag/retrieval', {
      source: 'my-service',
      sessionId: SESSION_ID,
      query: query.slice(0, 50),
      resultCount: results.length,
      topScore: results[0]?.score,
      durationMs,
    });
    airPost('/api/ingest', {
      id: uid(), sessionId: SESSION_ID, timestamp: Date.now(),
      type: 'latency', operation: 'search', totalMs: durationMs, model: 'my-service',
    });

    return results;
  } catch (err) {
    const durationMs = Date.now() - t0;
    airPost('/api/ingest', {
      id: uid(), sessionId: SESSION_ID, timestamp: Date.now(),
      type: 'tool_call', toolName: 'search', toolCallId: uid(),
      provider: 'my-service', durationMs, isError: true,
      errorMessage: err.message?.slice(0, 100),
    });
    throw err;
  }
}
```

### Python

```python
import os, time, json, threading
from urllib.request import Request, urlopen
from urllib.error import URLError

AIR_URL = os.environ.get("AIR_URL", "http://localhost:5200")
AIR_ENABLED = os.environ.get("AIR_ENABLED", "true") != "false"
SESSION_ID = f"my-service-{int(time.time())}"

def air_post(path: str, data: dict):
    if not AIR_ENABLED:
        return
    def _send():
        try:
            req = Request(
                f"{AIR_URL}{path}",
                data=json.dumps(data).encode(),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            urlopen(req, timeout=2)
        except (URLError, OSError):
            pass
    threading.Thread(target=_send, daemon=True).start()

def search(query: str):
    t0 = time.time()
    results = vector_db.search(query)
    duration_ms = int((time.time() - t0) * 1000)

    air_post("/api/rag/retrieval", {
        "source": "my-service",
        "sessionId": SESSION_ID,
        "query": query[:50],
        "resultCount": len(results),
        "topScore": results[0].score if results else 0,
        "durationMs": duration_ms,
    })
    return results
```

### Go

```go
package air

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
    "time"
)

var (
    airURL     = envOr("AIR_URL", "http://localhost:5200")
    airEnabled = os.Getenv("AIR_ENABLED") != "false"
    sessionID  = fmt.Sprintf("my-service-%d", time.Now().Unix())
    client     = &http.Client{Timeout: 2 * time.Second}
)

func envOr(key, fallback string) string {
    if v := os.Getenv(key); v != "" {
        return v
    }
    return fallback
}

func AirPost(path string, data map[string]interface{}) {
    if !airEnabled {
        return
    }
    go func() {
        body, _ := json.Marshal(data)
        req, _ := http.NewRequest("POST", airURL+path, bytes.NewReader(body))
        req.Header.Set("Content-Type", "application/json")
        resp, err := client.Do(req)
        if err == nil {
            resp.Body.Close()
        }
    }()
}
```

### cURL (Testing / Shell Scripts)

```bash
# Quick test — does AIr receive events?
curl -X POST http://localhost:5200/api/rag/retrieval \
  -H 'Content-Type: application/json' \
  -d '{"source":"test","query":"hello","resultCount":3,"durationMs":10}'

# Verify it landed
curl http://localhost:5200/api/events/recent?limit=1
```

---

## What Shows Up in the Dashboard

Once events flow, the AIr dashboard at `http://localhost:5200` shows:

| Panel | What You'll See |
|-------|----------------|
| **Integrations** | Your providers with status dots (🟢 active / 🟡 seen / ⚫ registered), type icons, event counts |
| **RAG Pipeline** | Stats table — source, operation type, call count, avg latency, result counts, relevance scores |
| **Tool Waterfall** | Timeline of all tool/function calls with duration bars, success/failure coloring |
| **Latency Panel** | Stats table + time series chart for operation latency over time |
| **Cost Panel** | Cost breakdown by model + cumulative cost chart (if token costs reported) |
| **Quality Panel** | Success rates, cache hit rates, retry counts |
| **Drift Detection** | Alerts when latency or quality shifts significantly from baseline |
| **Live Event Feed** | Real-time stream of all events with human-readable summaries |
| **KPI Cards** | Tokens, tool calls, errors, avg latency at a glance |

---

## Troubleshooting

### Server won't start
```bash
# Check if port is in use
lsof -i :5200

# Start on a different port
node dist/server/cli.js --port 8080
```

### Events not appearing
```bash
# Verify server is receiving events
curl http://localhost:5200/api/events/recent?limit=5

# Check provider status
curl http://localhost:5200/api/providers

# Test with a minimal event
curl -X POST http://localhost:5200/api/rag/retrieval \
  -H 'Content-Type: application/json' \
  -d '{"source":"debug-test","durationMs":1}'
```

### Provider shows "never seen"
Your service is registered in `.air.json` but hasn't sent any events yet. The `source` field in your events must match the `name` in `.air.json`.

### Dashboard blank
- Check WebSocket connection: open browser DevTools → Network → WS
- Verify sessions exist: `curl http://localhost:5200/api/sessions`
- Select a session in the dropdown

### Telemetry slowing down my service
The telemetry helper uses fire-and-forget with a 2-second timeout. If it's still too slow:
1. Increase the timeout: `AbortSignal.timeout(5000)`
2. Batch events: collect and POST to `/api/ingest/batch` periodically
3. Disable entirely: `AIR_ENABLED=false`

---

## Security Notes

- **Redaction**: AIr applies server-side redaction before storing anything. Set `--redaction full` to strip all content.
- **No raw prompts**: Queries are truncated to 50 chars by convention. The server scrubs API keys, tokens, and PII patterns.
- **SHA-256 hashing**: Prompt tracking uses one-way hashes — raw prompt text never leaves the client.
- **Local only**: AIr runs on localhost. No data leaves your machine unless you configure it otherwise.
- **Kill switch**: Set `AIR_ENABLED=false` in any service to disable all telemetry.

---

*See the main [AIr README](./README.md) for full documentation on all features, collectors, and the SDK.*
