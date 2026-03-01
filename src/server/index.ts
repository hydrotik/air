import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { WebSocket } from 'ws';
import { getDb, TelemetryStore } from '../db';
import type { TelemetryEvent, DashboardMessage, RedactionConfig } from '../shared/events';
import { redactEvent, createRedactionConfig } from '../shared/redaction';
import { DriftDetector } from '../shared/drift';
import { loadConfig, type AirConfig, type RagProviderConfig, type McpProviderConfig } from '../shared/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

export async function createServer(port = 5200, options?: { redaction?: RedactionConfig; config?: AirConfig }) {
  const app = Fastify({ logger: false });
  const db = getDb();
  const store = new TelemetryStore(db);
  const airConfig = options?.config ?? loadConfig();
  const redactionConfig = options?.redaction ?? createRedactionConfig();
  const driftDetector = new DriftDetector();

  // ─── Provider Registry ──────────────────────────────────────────────────
  // Tracks registered RAG/MCP providers from config + runtime registration
  const ragProviders = new Map<string, RagProviderConfig & { lastSeen?: number; eventCount: number }>();
  const mcpProviders = new Map<string, McpProviderConfig & { lastSeen?: number; eventCount: number }>();

  // Seed from config file
  for (const p of airConfig.providers?.rag ?? []) {
    ragProviders.set(p.name, { ...p, eventCount: 0 });
  }
  for (const p of airConfig.providers?.mcp ?? []) {
    mcpProviders.set(p.name, { ...p, eventCount: 0 });
  }
  if (ragProviders.size > 0) console.log(`[AIr] Registered RAG providers: ${[...ragProviders.keys()].join(', ')}`);

  // Track connected dashboard clients for live broadcast
  const dashboardClients = new Set<WebSocket>();

  await app.register(cors, { origin: true });
  await app.register(websocket);

  // ─── Serve dashboard static files (production) ────────────────────────────
  const candidatePaths = [
    path.resolve(__dirname, 'dashboard'),
    path.resolve(__dirname, '../dashboard'),
    path.resolve(__dirname, '../../dist/dashboard'),
    path.resolve(__dirname, '../../dist'),
  ];
  const fs = await import('node:fs');
  const staticRoot = candidatePaths.find((p) => fs.existsSync(path.join(p, 'index.html'))) ?? null;

  if (staticRoot) {
    console.log(`[AIr] Serving dashboard from: ${staticRoot}`);
    await app.register(fastifyStatic, {
      root: staticRoot,
      prefix: '/',
    });
  }

  // ─── Shared ingestion pipeline ────────────────────────────────────────────
  // All events (WebSocket + HTTP) flow through this. Handles:
  // 1. Redaction (strip sensitive content)
  // 2. Storage (SQLite)
  // 3. Drift detection (emit alerts)
  // 4. Broadcast to dashboard clients

  function ingestAndBroadcast(rawEvent: TelemetryEvent) {
    // Step 1: Redact before storage
    const event = redactEvent(rawEvent, redactionConfig);

    // Step 2: Persist
    store.ingestEvent(event);

    // Step 3: Check for drift — ingest any drift events too
    const driftAlerts = driftDetector.checkEvent(event);
    for (const drift of driftAlerts) {
      store.ingestEvent(drift);
      broadcast({ type: 'event', data: drift });
    }

    // Step 4: Track provider activity
    if (event.type === 'rag_retrieval' || event.type === 'rag_embedding' || event.type === 'rag_index') {
      const source = (event as any).source;
      if (source) {
        const existing = ragProviders.get(source);
        if (existing) {
          existing.lastSeen = Date.now();
          existing.eventCount++;
        } else {
          // Auto-register unknown RAG providers on first event
          ragProviders.set(source, {
            name: source,
            type: 'auto-detected',
            description: 'Auto-registered from incoming events',
            eventCount: 1,
            lastSeen: Date.now(),
          });
        }
      }
    }
    if (event.type === 'mcp_request' || event.type === 'mcp_response') {
      const serverName = (event as any).serverName;
      if (serverName) {
        const existing = mcpProviders.get(serverName);
        if (existing) {
          existing.lastSeen = Date.now();
          existing.eventCount++;
        } else {
          mcpProviders.set(serverName, {
            name: serverName,
            description: 'Auto-registered from incoming events',
            eventCount: 1,
            lastSeen: Date.now(),
          });
        }
      }
    }

    // Step 5: Broadcast to dashboard
    broadcast({ type: 'event', data: event });
  }

  function broadcast(msg: DashboardMessage) {
    const payload = JSON.stringify(msg);
    for (const client of dashboardClients) {
      if (client.readyState === 1) {
        client.send(payload);
      }
    }
  }

  // ─── Collector WebSocket (pi extension → server) ─────────────────────────
  app.register(async (fastify) => {
    fastify.get('/ws/collector', { websocket: true }, (socket) => {
      console.log('[AIr] Collector connected');

      socket.on('message', (raw) => {
        try {
          const event: TelemetryEvent = JSON.parse(raw.toString());
          ingestAndBroadcast(event);
        } catch (err) {
          console.error('[AIr] Failed to parse collector event:', err);
        }
      });

      socket.on('close', () => {
        console.log('[AIr] Collector disconnected');
      });
    });
  });

  // ─── Dashboard WebSocket (server → dashboard live feed) ──────────────────
  app.register(async (fastify) => {
    fastify.get('/ws/dashboard', { websocket: true }, (socket) => {
      console.log('[AIr] Dashboard client connected');
      dashboardClients.add(socket);

      socket.on('close', () => {
        dashboardClients.delete(socket);
        console.log('[AIr] Dashboard client disconnected');
      });
    });
  });

  // ─── REST API — Sessions ─────────────────────────────────────────────────
  app.get('/api/sessions', async (req) => {
    const limit = (req.query as any).limit ?? 50;
    return store.getSessions(Number(limit));
  });

  app.get('/api/sessions/:id', async (req) => {
    const { id } = req.params as { id: string };
    const session = store.getSession(id);
    if (!session) return { error: 'Session not found' };
    return session;
  });

  app.get('/api/sessions/:id/events', async (req) => {
    const { id } = req.params as { id: string };
    const limit = (req.query as any).limit;
    return limit
      ? store.getRecentEvents(id, Number(limit))
      : store.getEvents(id);
  });

  app.get('/api/sessions/:id/tool-calls', async (req) => {
    const { id } = req.params as { id: string };
    return store.getToolCalls(id);
  });

  app.get('/api/sessions/:id/tool-stats', async (req) => {
    const { id } = req.params as { id: string };
    return store.getToolStats(id);
  });

  app.get('/api/sessions/:id/context', async (req) => {
    const { id } = req.params as { id: string };
    return store.getContextSnapshots(id);
  });

  app.get('/api/sessions/:id/context/latest', async (req) => {
    const { id } = req.params as { id: string };
    return store.getLatestContextBreakdown(id) ?? { segments: [] };
  });

  app.get('/api/events/recent', async (req) => {
    const limit = (req.query as any).limit ?? 200;
    return store.getAllRecentEvents(Number(limit));
  });

  // ─── MCP Stats ──────────────────────────────────────────────────────────
  app.get('/api/sessions/:id/mcp-stats', async (req) => {
    const { id } = req.params as { id: string };
    return store.getMcpStats(id);
  });

  // ─── RAG Stats ─────────────────────────────────────────────────────────
  app.get('/api/sessions/:id/rag-stats', async (req) => {
    const { id } = req.params as { id: string };
    return store.getRagStats(id);
  });

  // ─── Provider Events ──────────────────────────────────────────────────
  app.get('/api/sessions/:id/providers', async (req) => {
    const { id } = req.params as { id: string };
    return store.getProviderSummary(id);
  });

  // ─── Latency Stats ────────────────────────────────────────────────────
  app.get('/api/sessions/:id/latency', async (req) => {
    const { id } = req.params as { id: string };
    return store.getLatencyStats(id);
  });

  app.get('/api/sessions/:id/latency/timeseries', async (req) => {
    const { id } = req.params as { id: string };
    const operation = (req.query as any).operation;
    return store.getLatencyTimeSeries(id, operation);
  });

  // ─── Cost Stats ───────────────────────────────────────────────────────
  app.get('/api/sessions/:id/cost', async (req) => {
    const { id } = req.params as { id: string };
    return store.getCostBreakdown(id);
  });

  app.get('/api/sessions/:id/cost/timeseries', async (req) => {
    const { id } = req.params as { id: string };
    return store.getCostTimeSeries(id);
  });

  // ─── Output Evaluation ────────────────────────────────────────────────
  app.get('/api/sessions/:id/evals', async (req) => {
    const { id } = req.params as { id: string };
    return store.getOutputEvalStats(id);
  });

  app.get('/api/sessions/:id/evals/timeseries', async (req) => {
    const { id } = req.params as { id: string };
    return store.getOutputEvalTimeSeries(id);
  });

  // ─── Prompt Ratings ───────────────────────────────────────────────────
  app.get('/api/prompts', async (req) => {
    const hash = (req.query as any).hash;
    return store.getPromptVariantComparison(hash);
  });

  app.get('/api/prompts/:variant', async (req) => {
    const { variant } = req.params as { variant: string };
    return store.getPromptRatings(variant);
  });

  // ─── Drift Detection ─────────────────────────────────────────────────
  app.get('/api/drift', async (req) => {
    const sessionId = (req.query as any).session;
    const limit = (req.query as any).limit ?? 50;
    return store.getDriftEvents(sessionId, Number(limit));
  });

  app.get('/api/drift/summary', async (req) => {
    const sessionId = (req.query as any).session;
    return store.getDriftSummary(sessionId);
  });

  // ─── Provider Registry ─────────────────────────────────────────────────
  // Shows all configured + auto-discovered RAG and MCP providers

  app.get('/api/providers', async () => ({
    rag: [...ragProviders.values()],
    mcp: [...mcpProviders.values()],
  }));

  app.get('/api/providers/rag', async () => [...ragProviders.values()]);
  app.get('/api/providers/mcp', async () => [...mcpProviders.values()]);

  // Register a new provider at runtime
  app.post('/api/providers/rag', async (req) => {
    const body = req.body as RagProviderConfig;
    if (!body.name) return { ok: false, error: 'name is required' };
    ragProviders.set(body.name, { ...body, eventCount: 0 });
    console.log(`[AIr] Registered RAG provider: ${body.name} (${body.type ?? 'custom'})`);
    return { ok: true, provider: body.name };
  });

  // ─── Simplified RAG Ingest ────────────────────────────────────────────
  // Language-agnostic HTTP endpoint. Your RAG (Python, Go, etc.) POSTs
  // simple JSON — no need to construct full TelemetryEvent objects.
  //
  // POST /api/rag/retrieval  — log a retrieval/search operation
  // POST /api/rag/embedding  — log an embedding generation
  // POST /api/rag/index      — log a document indexing operation
  //
  // All fields except 'source' are optional. AIr fills in defaults.

  app.post('/api/rag/retrieval', async (req) => {
    try {
      const body = req.body as {
        source: string;
        sessionId?: string;
        query?: string;
        resultCount?: number;
        topScore?: number;
        durationMs?: number;
        chunkSizes?: number[];
        metadata?: Record<string, unknown>;
      };
      if (!body.source) return { ok: false, error: 'source is required' };

      const event: TelemetryEvent = {
        id: uid(),
        sessionId: body.sessionId ?? `rag-${body.source}`,
        timestamp: Date.now(),
        type: 'rag_retrieval',
        source: body.source,
        query: body.query ?? '',
        resultCount: body.resultCount ?? 0,
        topScore: body.topScore,
        durationMs: body.durationMs ?? 0,
        chunkSizes: body.chunkSizes,
        totalChunkTokens: body.chunkSizes?.reduce((a, b) => a + b, 0),
        metadata: body.metadata,
      } as any;

      ingestAndBroadcast(event);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  });

  app.post('/api/rag/embedding', async (req) => {
    try {
      const body = req.body as {
        source: string;
        sessionId?: string;
        model?: string;
        inputTokens?: number;
        durationMs?: number;
        dimensions?: number;
        batchSize?: number;
      };
      if (!body.source) return { ok: false, error: 'source is required' };

      // Look up defaults from config
      const providerConfig = ragProviders.get(body.source);

      const event: TelemetryEvent = {
        id: uid(),
        sessionId: body.sessionId ?? `rag-${body.source}`,
        timestamp: Date.now(),
        type: 'rag_embedding',
        source: body.source,
        model: body.model ?? providerConfig?.embeddingModel ?? 'unknown',
        inputTokens: body.inputTokens ?? 0,
        durationMs: body.durationMs ?? 0,
        dimensions: body.dimensions ?? providerConfig?.dimensions,
        batchSize: body.batchSize,
      } as any;

      ingestAndBroadcast(event);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  });

  app.post('/api/rag/index', async (req) => {
    try {
      const body = req.body as {
        source: string;
        sessionId?: string;
        documentCount?: number;
        totalTokens?: number;
        durationMs?: number;
        metadata?: Record<string, unknown>;
      };
      if (!body.source) return { ok: false, error: 'source is required' };

      const event: TelemetryEvent = {
        id: uid(),
        sessionId: body.sessionId ?? `rag-${body.source}`,
        timestamp: Date.now(),
        type: 'rag_index',
        source: body.source,
        documentCount: body.documentCount ?? 0,
        totalTokens: body.totalTokens ?? 0,
        durationMs: body.durationMs ?? 0,
        metadata: body.metadata,
      } as any;

      ingestAndBroadcast(event);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  });

  // ─── HTTP Ingest (for short-lived hooks: Claude Code, Codex, etc.) ────
  app.post('/api/ingest', async (req) => {
    try {
      const event = req.body as TelemetryEvent;
      ingestAndBroadcast(event);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  });

  // ─── HTTP Batch Ingest (multiple events at once) ─────────────────────
  app.post('/api/ingest/batch', async (req) => {
    try {
      const events = req.body as TelemetryEvent[];
      for (const event of events) {
        ingestAndBroadcast(event);
      }
      return { ok: true, count: events.length };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  });

  // ─── Server Info ──────────────────────────────────────────────────────
  app.get('/api/health', async () => ({
    status: 'ok',
    uptime: process.uptime(),
    dashboardClients: dashboardClients.size,
    redactionLevel: redactionConfig.level,
  }));

  app.get('/api/config', async () => ({
    redactionLevel: redactionConfig.level,
    driftDetection: true,
    budgetLimit: airConfig.budgetLimit ?? null,
    providers: {
      rag: [...ragProviders.values()].map(({ eventCount, lastSeen, ...p }) => ({
        ...p, eventCount, lastSeen, active: lastSeen ? Date.now() - lastSeen < 300_000 : false,
      })),
      mcp: [...mcpProviders.values()].map(({ eventCount, lastSeen, ...p }) => ({
        ...p, eventCount, lastSeen, active: lastSeen ? Date.now() - lastSeen < 300_000 : false,
      })),
    },
    features: [
      'token_tracking',
      'cost_monitoring',
      'latency_monitoring',
      'output_evaluation',
      'prompt_rating',
      'drift_detection',
      'data_redaction',
      'provider_registry',
      'rag_http_api',
    ],
  }));

  return { app, port };
}
