import type { FastifyInstance } from 'fastify';
import type {} from '@fastify/websocket'; // adds app.injectWS to FastifyInstance
import type { WebSocket } from 'ws';
import type { TelemetryEvent } from '../shared/events';
import { loadConfig } from '../shared/config';
import { loadServerModule } from './__testing__/load-server';
import MemoryDatabase from './__testing__/sqlite-memory';

// Real schema + TelemetryStore, backed by an in-memory database
jest.mock('better-sqlite3', () => jest.requireActual('./__testing__/sqlite-memory'));
// getDb() creates its directory under the home dir; point that at a temp dir
jest.mock('node:os', () => {
  const actual = jest.requireActual('node:os');
  const home = jest
    .requireActual('node:fs')
    .mkdtempSync(jest.requireActual('node:path').join(actual.tmpdir(), 'air-home-'));
  return { ...actual, homedir: () => home };
});
jest.mock('../shared/config', () => ({ loadConfig: jest.fn(() => ({})) }));

const { createServer } = loadServerModule();
const mockedLoadConfig = loadConfig as jest.MockedFunction<typeof loadConfig>;

type CreateOptions = Parameters<typeof createServer>[1];

let app: FastifyInstance;

/** A dashboard broadcast, read loosely. */
interface Broadcast {
  type: string;
  data: { type: string } & Record<string, unknown>;
}
const sockets: WebSocket[] = [];

async function boot(options: CreateOptions = { redaction: { level: 'none' }, config: {} }) {
  const server = await createServer(5200, options);
  app = server.app;
  await app.ready();
  return server;
}

let seq = 0;
function evt(type: string, fields: Record<string, unknown> = {}) {
  seq++;
  return { id: `e${seq}`, sessionId: 'sess-1', timestamp: 1_000 + seq, type, ...fields };
}

async function post(url: string, payload: unknown) {
  const res = await app.inject({ method: 'POST', url, payload: payload as object });
  return { status: res.statusCode, body: res.json() };
}

async function get(url: string) {
  const res = await app.inject({ method: 'GET', url });
  return { status: res.statusCode, body: res.json() };
}

/** Wait until a predicate holds, polling the event loop (WebSocket frames are async) */
async function until(predicate: () => boolean | Promise<boolean>, label: string) {
  for (let i = 0; i < 200; i++) {
    if (await predicate()) return;
    await new Promise((r) => setImmediate(r));
  }
  throw new Error(`timed out waiting for ${label}`);
}

async function connectDashboard() {
  const ws = await app.injectWS('/ws/dashboard');
  sockets.push(ws);
  const received: Broadcast[] = [];
  ws.on('message', (raw: Buffer) => received.push(JSON.parse(raw.toString())));
  return { ws, received };
}

// Console stays silenced for the whole file: socket close handlers log after a test ends
let logSpy: jest.SpyInstance;
let errorSpy: jest.SpyInstance;
beforeAll(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

beforeEach(() => {
  errorSpy.mockClear();
  mockedLoadConfig.mockReset().mockReturnValue({});
});

afterEach(async () => {
  for (const ws of sockets.splice(0)) ws.terminate();
  await app?.close();
});

afterAll(() => {
  logSpy.mockRestore();
  errorSpy.mockRestore();
  // The temp home dir handed out by the node:os mock above
  const tempHome: string = jest.requireMock('node:os').homedir();
  if (tempHome.includes('air-home-')) {
    jest.requireActual('node:fs').rmSync(tempHome, { recursive: true, force: true });
  }
  for (const db of MemoryDatabase.opened) {
    try {
      db.close();
    } catch {
      // already closed
    }
  }
});

describe('createServer setup', () => {
  it('opens its own database and reads .air.json when no config is passed', async () => {
    mockedLoadConfig.mockReturnValue({ budgetLimit: 5, providers: { mcp: [{ name: 'm1' }] } });
    const before = MemoryDatabase.opened.length;
    const { port } = await boot({ redaction: { level: 'preview' } });

    expect(port).toBe(5200);
    expect(MemoryDatabase.opened.length).toBe(before + 1);
    expect(mockedLoadConfig).toHaveBeenCalledTimes(1);
    const { body } = await get('/api/config');
    expect(body.budgetLimit).toBe(5);
    expect(body.providers.mcp).toEqual([{ name: 'm1', eventCount: 0, active: false }]);
  });

  it('takes the redaction level from AIR_REDACTION_LEVEL when none is passed', async () => {
    process.env.AIR_REDACTION_LEVEL = 'full';
    try {
      await boot({ config: {} });
    } finally {
      delete process.env.AIR_REDACTION_LEVEL;
    }
    expect((await get('/api/health')).body.redactionLevel).toBe('full');
  });
});

describe('GET /api/health and /api/config', () => {
  it('reports status, redaction level and connected dashboards', async () => {
    await boot({ redaction: { level: 'preview' }, config: {} });
    const { status, body } = await get('/api/health');
    expect(status).toBe(200);
    expect(body).toEqual({
      status: 'ok',
      uptime: expect.any(Number),
      dashboardClients: 0,
      redactionLevel: 'preview',
    });
  });

  it('lists features, budget and seeded providers', async () => {
    await boot({
      redaction: { level: 'none' },
      config: {
        budgetLimit: 12.5,
        providers: { rag: [{ name: 'kb', type: 'qdrant', dimensions: 384 }], mcp: [] },
      },
    });
    const { body } = await get('/api/config');
    expect(body).toMatchObject({
      redactionLevel: 'none',
      driftDetection: true,
      budgetLimit: 12.5,
      providers: {
        rag: [{ name: 'kb', type: 'qdrant', dimensions: 384, eventCount: 0, active: false }],
        mcp: [],
      },
    });
    expect(body.features).toEqual(
      expect.arrayContaining(['drift_detection', 'data_redaction', 'rag_http_api'])
    );
  });

  it('defaults budgetLimit to null', async () => {
    await boot();
    expect((await get('/api/config')).body.budgetLimit).toBeNull();
  });
});

describe('ingest and session queries', () => {
  it('stores events posted to /api/ingest and exposes the session', async () => {
    await boot();
    expect(
      await post(
        '/api/ingest',
        evt('session_start', { cwd: '/repo', model: 'm', provider: 'p', agent: 'pi' })
      )
    ).toEqual({ status: 200, body: { ok: true } });
    await post('/api/ingest', evt('turn_end', { turnIndex: 0, toolCallCount: 0 }));

    const sessions = (await get('/api/sessions')).body;
    expect(sessions).toHaveLength(1);
    expect(sessions[0]).toMatchObject({ sessionId: 'sess-1', cwd: '/repo', model: 'm' });

    expect((await get('/api/sessions/sess-1')).body).toMatchObject({ sessionId: 'sess-1' });
    const events = (await get('/api/sessions/sess-1/events')).body;
    expect(events.map((e: TelemetryEvent) => e.type)).toEqual(['session_start', 'turn_end']);
  });

  it('returns only the most recent events when a limit is given', async () => {
    await boot();
    await post('/api/ingest/batch', [evt('heartbeat'), evt('heartbeat'), evt('agent_end')]);
    const { body } = await get('/api/sessions/sess-1/events?limit=1');
    expect(body.map((e: TelemetryEvent) => e.type)).toEqual(['agent_end']);
    const recent = (await get('/api/events/recent?limit=2')).body;
    expect(recent).toHaveLength(2);
  });

  it('answers an unknown session with an error body (HTTP 200)', async () => {
    await boot();
    const res = await get('/api/sessions/nope');
    expect(res).toEqual({ status: 200, body: { error: 'Session not found' } });
  });

  it('batch ingest stores every event and returns the count', async () => {
    await boot();
    const res = await post('/api/ingest/batch', [
      evt('tool_call_start', { toolName: 'bash', toolCallId: 'tc1', inputSizeBytes: 10 }),
      evt('tool_call_end', {
        toolName: 'bash',
        toolCallId: 'tc1',
        durationMs: 40,
        outputSizeBytes: 20,
        isError: false,
      }),
    ]);
    expect(res.body).toEqual({ ok: true, count: 2 });

    const calls = (await get('/api/sessions/sess-1/tool-calls')).body;
    expect(calls).toEqual([
      expect.objectContaining({ tool_call_id: 'tc1', tool_name: 'bash', duration_ms: 40 }),
    ]);
    expect((await get('/api/sessions/sess-1/tool-stats')).body[0]).toMatchObject({
      tool_name: 'bash',
    });
  });

  it('reports a failure, not a crash, for a non-array batch body', async () => {
    await boot();
    const res = await post('/api/ingest/batch', { not: 'an array' });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/not iterable/);
  });

  it('reports a failure for an event the store rejects', async () => {
    await boot();
    const { timestamp: _omit, ...noTimestamp } = evt('heartbeat');
    const res = await post('/api/ingest', noTimestamp);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toMatch(/NOT NULL constraint failed: sessions\.start_time/);
  });

  it('accepts an event with no id (no validation; events.id is a nullable TEXT key)', async () => {
    await boot();
    const { id: _a, ...first } = evt('heartbeat');
    const { id: _b, ...second } = evt('heartbeat');
    expect((await post('/api/ingest/batch', [first, second])).body).toEqual({ ok: true, count: 2 });
    expect((await get('/api/sessions/sess-1/events')).body).toHaveLength(2);
  });

  it('serves cost, latency and prompt-rating aggregates from ingested events', async () => {
    await boot();
    await post('/api/ingest/batch', [
      evt('cost', {
        model: 'm',
        provider: 'p',
        inputCost: 0.1,
        outputCost: 0.2,
        cacheReadCost: 0,
        cacheWriteCost: 0,
        totalCost: 0.3,
        cumulativeCost: 0.3,
        currency: 'USD',
      }),
      evt('latency', { operation: 'turn', totalMs: 1200 }),
      evt('prompt_rating', {
        promptHash: 'h1',
        variant: 'v1',
        category: 'system',
        model: 'm',
        provider: 'p',
        metrics: {
          goalAchieved: true,
          turnsToComplete: 2,
          totalTokens: 100,
          totalCost: 0.01,
          totalLatencyMs: 10,
          toolErrorRate: 0,
          requiredCompaction: false,
        },
        rating: 5,
      }),
    ]);

    const cost = (await get('/api/sessions/sess-1/cost')).body;
    expect(cost[0]).toMatchObject({ model: 'm' });
    const latency = (await get('/api/sessions/sess-1/latency')).body;
    expect(latency[0]).toMatchObject({ operation: 'turn' });
    expect((await get('/api/prompts?hash=h1')).body[0]).toMatchObject({
      variant: 'v1',
      sample_count: 1,
    });
    expect((await get('/api/prompts/v1')).body).toHaveLength(1);
  });
});

describe('redaction on ingest', () => {
  const SECRET_PREVIEW =
    'token_abcdefghijklmnopqrstuvwxyz0123 mail me at someone@example.com please';
  const secretEvent = () =>
    evt('tool_call_start', {
      toolName: 'bash',
      toolCallId: 'tc',
      inputSizeBytes: 1,
      inputPreview: SECRET_PREVIEW,
    });

  async function storedPreview() {
    const [stored] = (await get('/api/sessions/sess-1/events')).body;
    return stored.inputPreview;
  }

  it('preview: truncates and scrubs secrets before storage', async () => {
    await boot({ redaction: { level: 'preview' }, config: {} });
    await post('/api/ingest', secretEvent());
    const preview = await storedPreview();
    expect(preview).toContain('[REDACTED]');
    expect(preview).not.toContain('abcdefghijklmnop');
    expect(preview.endsWith('…')).toBe(true);
  });

  it('full: replaces content fields entirely', async () => {
    await boot({ redaction: { level: 'full' }, config: {} });
    await post('/api/ingest', secretEvent());
    expect(await storedPreview()).toBe('[REDACTED]');
  });

  it('none: stores content as sent', async () => {
    await boot({ redaction: { level: 'none' }, config: {} });
    await post('/api/ingest', secretEvent());
    expect(await storedPreview()).toBe(SECRET_PREVIEW);
  });
});

describe('drift detection', () => {
  it('stores a drift alert when a metric jumps away from its baseline', async () => {
    await boot();
    const steady = Array.from({ length: 9 }, () =>
      evt('latency', { operation: 'turn', totalMs: 100 })
    );
    await post('/api/ingest/batch', steady);
    expect((await get('/api/drift')).body).toEqual([]);

    await post('/api/ingest', evt('latency', { operation: 'turn', totalMs: 1000 }));
    const drift = (await get('/api/drift?session=sess-1')).body;
    expect(drift).toHaveLength(1);
    expect(drift[0]).toMatchObject({ metric: 'latency', severity: 'critical' });

    const summary = (await get('/api/drift/summary')).body;
    expect(summary).toEqual([
      expect.objectContaining({ metric: 'latency', severity: 'critical', event_count: 1 }),
    ]);
  });
});

describe('provider registry', () => {
  it('auto-registers RAG and MCP providers from incoming events and counts activity', async () => {
    await boot({
      redaction: { level: 'none' },
      config: { providers: { rag: [{ name: 'kb', type: 'qdrant' }] } },
    });
    await post('/api/ingest/batch', [
      evt('rag_retrieval', { source: 'kb', query: 'q', resultCount: 1, durationMs: 1 }),
      evt('rag_retrieval', { source: 'kb', query: 'q', resultCount: 1, durationMs: 1 }),
      evt('rag_index', { source: 'new-src', documentCount: 1, totalTokens: 1, durationMs: 1 }),
      evt('mcp_request', { method: 'tools/call', serverName: 'srv', inputSizeBytes: 0 }),
    ]);

    const { body } = await get('/api/providers');
    expect(body.rag).toEqual([
      expect.objectContaining({
        name: 'kb',
        type: 'qdrant',
        eventCount: 2,
        lastSeen: expect.any(Number),
      }),
      expect.objectContaining({ name: 'new-src', type: 'auto-detected', eventCount: 1 }),
    ]);
    expect(body.mcp).toEqual([expect.objectContaining({ name: 'srv', eventCount: 1 })]);
    expect((await get('/api/providers/mcp')).body).toEqual(body.mcp);

    const config = (await get('/api/config')).body;
    expect(config.providers.rag.find((p: { name: string }) => p.name === 'kb').active).toBe(true);
  });

  it('registers a RAG provider at runtime and requires a name', async () => {
    await boot();
    expect((await post('/api/providers/rag', { type: 'chroma' })).body).toEqual({
      ok: false,
      error: 'name is required',
    });
    expect((await post('/api/providers/rag', { name: 'late', type: 'chroma' })).body).toEqual({
      ok: true,
      provider: 'late',
    });
    expect((await get('/api/providers/rag')).body).toEqual([
      { name: 'late', type: 'chroma', eventCount: 0 },
    ]);
  });

  // BUG (server/index.ts:338-339): this handler has no try/catch and reads
  // `body.name` directly, so a POST with no body throws a TypeError and returns
  // HTTP 500 instead of the { ok: false, error } shape the sibling RAG routes use.
  it.failing('answers a body-less registration with ok:false rather than a 500', async () => {
    await boot();
    const res = await app.inject({ method: 'POST', url: '/api/providers/rag' });
    expect(res.statusCode).toBe(200);
    expect(res.json().ok).toBe(false);
  });
});

describe('simplified RAG HTTP API', () => {
  it.each(['/api/rag/retrieval', '/api/rag/embedding', '/api/rag/index'])(
    '%s requires a source',
    async (url) => {
      await boot();
      expect((await post(url, { query: 'x' })).body).toEqual({
        ok: false,
        error: 'source is required',
      });
    }
  );

  it('retrieval fills defaults and sums chunk tokens', async () => {
    await boot();
    expect(
      (await post('/api/rag/retrieval', { source: 'kb', chunkSizes: [10, 20, 5] })).body
    ).toEqual({
      ok: true,
    });
    const [stored] = (await get('/api/sessions/rag-kb/events')).body;
    expect(stored).toMatchObject({
      type: 'rag_retrieval',
      sessionId: 'rag-kb',
      source: 'kb',
      query: '',
      resultCount: 0,
      durationMs: 0,
      totalChunkTokens: 35,
    });
    expect((await get('/api/sessions/rag-kb/rag-stats')).body).not.toEqual([]);
  });

  it('embedding takes model and dimensions from the provider config', async () => {
    await boot({
      redaction: { level: 'none' },
      config: {
        providers: { rag: [{ name: 'kb', type: 'q', embeddingModel: 'emb-3', dimensions: 1536 }] },
      },
    });
    await post('/api/rag/embedding', { source: 'kb', sessionId: 's9', inputTokens: 42 });
    await post('/api/rag/embedding', {
      source: 'kb',
      sessionId: 's9',
      model: 'override',
      dimensions: 8,
    });
    const events = (await get('/api/sessions/s9/events')).body;
    expect(events[0]).toMatchObject({ model: 'emb-3', dimensions: 1536, inputTokens: 42 });
    expect(events[1]).toMatchObject({ model: 'override', dimensions: 8, inputTokens: 0 });
  });

  it('embedding falls back to "unknown" for an unconfigured source', async () => {
    await boot();
    await post('/api/rag/embedding', { source: 'x' });
    expect((await get('/api/sessions/rag-x/events')).body[0].model).toBe('unknown');
  });

  it('index records document counts', async () => {
    await boot();
    await post('/api/rag/index', {
      source: 'kb',
      documentCount: 3,
      totalTokens: 900,
      metadata: { a: 1 },
    });
    expect((await get('/api/sessions/rag-kb/events')).body[0]).toMatchObject({
      type: 'rag_index',
      documentCount: 3,
      totalTokens: 900,
      metadata: { a: 1 },
    });
  });
});

describe('WebSockets', () => {
  it('broadcasts redacted events from the collector socket to dashboards', async () => {
    await boot({ redaction: { level: 'full' }, config: {} });
    const { received } = await connectDashboard();
    expect((await get('/api/health')).body.dashboardClients).toBe(1);

    const collector = await app.injectWS('/ws/collector');
    sockets.push(collector);
    collector.send(
      JSON.stringify(
        evt('tool_call_start', {
          toolName: 't',
          toolCallId: 'c',
          inputSizeBytes: 1,
          inputPreview: 'secret',
        })
      )
    );

    await until(() => received.length > 0, 'dashboard broadcast');
    expect(received[0]).toMatchObject({
      type: 'event',
      data: { type: 'tool_call_start', inputPreview: '[REDACTED]' },
    });
    expect((await get('/api/sessions/sess-1/events')).body).toHaveLength(1);
  });

  it('broadcasts HTTP-ingested events and drift alerts too', async () => {
    await boot();
    const { received } = await connectDashboard();
    const steady = Array.from({ length: 9 }, () =>
      evt('latency', { operation: 'api_call', totalMs: 10 })
    );
    await post('/api/ingest/batch', [
      ...steady,
      evt('latency', { operation: 'api_call', totalMs: 500 }),
    ]);

    await until(() => received.length >= 11, 'eleven broadcasts');
    const types = received.map((m) => m.data.type);
    expect(types.filter((t) => t === 'latency')).toHaveLength(10);
    expect(types).toContain('drift');
  });

  it('ignores malformed collector frames and keeps the connection usable', async () => {
    await boot();
    const collector = await app.injectWS('/ws/collector');
    sockets.push(collector);
    collector.send('{not json');
    collector.send(JSON.stringify(evt('heartbeat')));

    await until(
      async () => (await get('/api/sessions/sess-1/events')).body.length === 1,
      'stored heartbeat'
    );
    expect(errorSpy).toHaveBeenCalledWith(
      '[AIr] Failed to parse collector event:',
      expect.any(SyntaxError)
    );
  });

  it('stops counting a dashboard once it disconnects', async () => {
    await boot();
    const { ws } = await connectDashboard();
    expect((await get('/api/health')).body.dashboardClients).toBe(1);
    ws.terminate();
    await until(
      async () => (await get('/api/health')).body.dashboardClients === 0,
      'dashboard disconnect'
    );
    expect((await get('/api/health')).body.dashboardClients).toBe(0);
  });
});
