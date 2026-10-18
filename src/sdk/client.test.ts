import { createHash } from 'node:crypto';
import { AirClient, hashPrompt } from './client';
import { FakeWebSocket } from './__testing__/fake-ws';

jest.mock('ws', () => jest.requireActual('./__testing__/fake-ws').fakeWsModule);

const NOW = 1_700_000_000_000;

/** A client whose socket is already open */
function openClient(opts: ConstructorParameters<typeof AirClient>[0] = {}) {
  const client = new AirClient({ url: 'ws://test/ws/collector', sessionId: 's1', ...opts });
  const ws = FakeWebSocket.latest();
  ws.simulateOpen();
  return { client, ws };
}

beforeEach(() => {
  FakeWebSocket.reset();
  jest.useFakeTimers({ now: NOW });
});

afterEach(() => {
  jest.useRealTimers();
  delete process.env.AIR_URL;
});

describe('hashPrompt', () => {
  it('returns the first 16 hex chars of the SHA-256 digest', () => {
    const expected = createHash('sha256').update('hello').digest('hex').slice(0, 16);
    expect(hashPrompt('hello')).toBe(expected);
    expect(hashPrompt('hello')).toMatch(/^[0-9a-f]{16}$/);
  });

  it('is deterministic and distinguishes different prompts', () => {
    expect(hashPrompt('a')).toBe(hashPrompt('a'));
    expect(hashPrompt('a')).not.toBe(hashPrompt('b'));
  });
});

describe('AirClient connection', () => {
  it('connects to the url option', () => {
    new AirClient({ url: 'ws://example:1/ws/collector' });
    expect(FakeWebSocket.latest().url).toBe('ws://example:1/ws/collector');
  });

  it('falls back to AIR_URL, then to the localhost default', () => {
    process.env.AIR_URL = 'ws://env-host:9/ws/collector';
    new AirClient();
    expect(FakeWebSocket.latest().url).toBe('ws://env-host:9/ws/collector');

    delete process.env.AIR_URL;
    new AirClient();
    expect(FakeWebSocket.latest().url).toBe('ws://localhost:5200/ws/collector');
  });

  it('generates a session id when none is given and lets it be switched', () => {
    const client = new AirClient();
    expect(client.getSessionId()).toMatch(/^[a-z0-9]+$/);
    client.setSessionId('other');
    expect(client.getSessionId()).toBe('other');
  });

  it('reconnects 5s after the socket closes', () => {
    new AirClient({ url: 'ws://test' });
    FakeWebSocket.latest().simulateClose();
    expect(FakeWebSocket.instances).toHaveLength(1);

    jest.advanceTimersByTime(4999);
    expect(FakeWebSocket.instances).toHaveLength(1);
    jest.advanceTimersByTime(1);
    expect(FakeWebSocket.instances).toHaveLength(2);
  });

  it('schedules only one reconnect when error and close both fire', () => {
    new AirClient({ url: 'ws://test' });
    const ws = FakeWebSocket.latest();
    ws.simulateError();
    ws.simulateClose();
    jest.advanceTimersByTime(5000);
    expect(FakeWebSocket.instances).toHaveLength(2);
  });

  it('retries when the WebSocket constructor throws', () => {
    FakeWebSocket.throwOnConstruct = true;
    new AirClient({ url: 'bad' });
    expect(FakeWebSocket.instances).toHaveLength(0);

    FakeWebSocket.throwOnConstruct = false;
    jest.advanceTimersByTime(5000);
    expect(FakeWebSocket.instances).toHaveLength(1);
  });

  it('does not reconnect when reconnect is false', () => {
    new AirClient({ url: 'ws://test', reconnect: false });
    FakeWebSocket.latest().simulateClose();
    jest.advanceTimersByTime(60_000);
    expect(FakeWebSocket.instances).toHaveLength(1);
  });

  it('close() closes the socket and cancels a pending reconnect', () => {
    const client = new AirClient({ url: 'ws://test' });
    const ws = FakeWebSocket.latest();
    ws.simulateError(); // reconnect now pending
    client.close();
    jest.advanceTimersByTime(60_000);
    expect(FakeWebSocket.instances).toHaveLength(1);
  });

  it('close() closes an open socket', () => {
    const { client, ws } = openClient();
    client.close();
    expect(ws.close).toHaveBeenCalledTimes(1);
  });
});

describe('AirClient.emit', () => {
  it('sends the event immediately when the socket is open, stamped with id/session/time', () => {
    const { client, ws } = openClient();
    client.emit({ type: 'custom', eventName: 'x' });

    const [msg] = ws.messages();
    expect(msg).toEqual({
      id: expect.stringMatching(/^[a-z0-9]+$/),
      sessionId: 's1',
      timestamp: NOW,
      type: 'custom',
      eventName: 'x',
    });
  });

  it('gives every event a distinct id', () => {
    const { client, ws } = openClient();
    client.emit({ type: 'a' });
    client.emit({ type: 'b' });
    const [a, b] = ws.messages();
    expect(a.id).not.toBe(b.id);
  });

  it('queues events while connecting and flushes them in order on open', () => {
    const client = new AirClient({ url: 'ws://test', sessionId: 's1' });
    const ws = FakeWebSocket.latest();
    client.emit({ type: 'first' });
    client.emit({ type: 'second' });
    expect(ws.sent).toHaveLength(0);

    ws.simulateOpen();
    expect(ws.messages().map((m) => m.type)).toEqual(['first', 'second']);

    // The queue is drained, so a later open does not resend
    ws.simulateOpen();
    expect(ws.sent).toHaveLength(2);
  });

  it('caps the offline queue at 200 events and drops the rest', () => {
    const client = new AirClient({ url: 'ws://test' });
    const ws = FakeWebSocket.latest();
    for (let i = 0; i < 205; i++) client.emit({ type: 'custom', n: i });
    ws.simulateOpen();

    const sent = ws.messages();
    expect(sent).toHaveLength(200);
    expect(sent[0].n).toBe(0);
    expect(sent[199].n).toBe(199);
  });

  it('delivers events emitted while disconnected to the reconnected socket', () => {
    const { client, ws } = openClient();
    ws.simulateClose();
    client.emit({ type: 'while_down' });

    jest.advanceTimersByTime(5000);
    const next = FakeWebSocket.latest();
    expect(next).not.toBe(ws);
    next.simulateOpen();
    expect(next.messages().map((m) => m.type)).toEqual(['while_down']);
  });

  it('uses the current session id at emit time', () => {
    const { client, ws } = openClient();
    client.setSessionId('s2');
    client.emit({ type: 'x' });
    expect(ws.messages()[0].sessionId).toBe('s2');
  });
});

describe('AirClient latency', () => {
  it('recordLatency emits a latency event with the breakdown', () => {
    const { client, ws } = openClient();
    client.recordLatency('turn', 1500, {
      ttftMs: 200,
      phases: [{ name: 'thinking', durationMs: 800 }],
      model: 'm',
      provider: 'p',
    });
    expect(ws.messages()[0]).toMatchObject({
      type: 'latency',
      operation: 'turn',
      totalMs: 1500,
      ttftMs: 200,
      phases: [{ name: 'thinking', durationMs: 800 }],
      model: 'm',
      provider: 'p',
    });
  });

  it('measureLatency times the operation and returns its result', async () => {
    const { client, ws } = openClient();
    const result = await client.measureLatency('api_call', async () => {
      jest.advanceTimersByTime(250);
      return 42;
    });
    expect(result).toBe(42);
    expect(ws.messages()[0]).toMatchObject({
      type: 'latency',
      operation: 'api_call',
      totalMs: 250,
    });
  });

  it('measureLatency records nothing when the operation rejects', async () => {
    const { client, ws } = openClient();
    await expect(
      client.measureLatency('api_call', async () => {
        throw new Error('nope');
      })
    ).rejects.toThrow('nope');
    expect(ws.sent).toHaveLength(0);
  });
});

describe('AirClient.recordCost', () => {
  it('totals the parts and accumulates across calls', () => {
    const { client, ws } = openClient();
    client.recordCost('m', 'p', { inputCost: 0.1, outputCost: 0.2 });
    client.recordCost('m', 'p', {
      inputCost: 0.1,
      outputCost: 0.1,
      cacheReadCost: 0.05,
      cacheWriteCost: 0.05,
    });
    const [a, b] = ws.messages();
    expect(a).toMatchObject({
      type: 'cost',
      model: 'm',
      provider: 'p',
      cacheReadCost: 0,
      cacheWriteCost: 0,
      currency: 'USD',
      budgetExceeded: false,
    });
    expect(a.totalCost).toBeCloseTo(0.3);
    expect(a.cumulativeCost).toBeCloseTo(0.3);
    expect(a).not.toHaveProperty('budgetLimit');
    expect(b.totalCost).toBeCloseTo(0.3);
    expect(b.cumulativeCost).toBeCloseTo(0.6);
  });

  it('flags budgetExceeded only once cumulative cost goes over the limit', () => {
    const { client, ws } = openClient({ budgetLimit: 1 });
    client.recordCost('m', 'p', { inputCost: 0.5, outputCost: 0.5 }); // exactly 1.00
    client.recordCost('m', 'p', { inputCost: 0.01, outputCost: 0 });
    const [atLimit, over] = ws.messages();
    expect(atLimit).toMatchObject({ budgetLimit: 1, budgetExceeded: false });
    expect(over).toMatchObject({ budgetLimit: 1, budgetExceeded: true });
  });
});

describe('AirClient.recordOutputEval', () => {
  it('derives the tool success rate, rounded to 3 places, and fills defaults', () => {
    const { client, ws } = openClient();
    client.recordOutputEval(
      3,
      'm',
      'p',
      { responseTokens: 100, toolCallCount: 3, toolErrorCount: 1, responseLatencyMs: 900 },
      { userRating: 4, tags: ['t'] }
    );
    expect(ws.messages()[0]).toEqual(
      expect.objectContaining({
        type: 'output_eval',
        turnIndex: 3,
        model: 'm',
        provider: 'p',
        userRating: 4,
        tags: ['t'],
        metrics: {
          responseTokens: 100,
          toolCallCount: 3,
          toolErrorCount: 1,
          toolSuccessRate: 0.667,
          hadRetry: false,
          hadImmediateFollowUp: false,
          responseLatencyMs: 900,
          cacheHitRate: 0,
        },
      })
    );
  });

  it('reports a success rate of 1 when no tools were called', () => {
    const { client, ws } = openClient();
    client.recordOutputEval(0, 'm', 'p', {
      responseTokens: 1,
      toolCallCount: 0,
      toolErrorCount: 0,
      responseLatencyMs: 1,
    });
    expect(ws.messages()[0].metrics.toolSuccessRate).toBe(1);
  });
});

describe('AirClient prompt rating', () => {
  const metrics = {
    goalAchieved: true,
    turnsToComplete: 3,
    totalTokens: 5000,
    totalCost: 0.02,
    totalLatencyMs: 15000,
    toolErrorRate: 0,
    requiredCompaction: false,
  };

  it('ratePrompt sends only a hash of the prompt, never the text', () => {
    const { client, ws } = openClient({ provider: 'acme' });
    const secretPrompt = 'You are a helpful assistant. SECRET-INSTRUCTIONS';
    client.ratePrompt('v2', 'system', secretPrompt, metrics, 4, 'short');

    expect(ws.sent[0]).not.toContain('SECRET-INSTRUCTIONS');
    expect(ws.messages()[0]).toMatchObject({
      type: 'prompt_rating',
      promptHash: hashPrompt(secretPrompt),
      variant: 'v2',
      category: 'system',
      provider: 'acme',
      // No model is available here, so the provider is reported in its place
      model: 'acme',
      metrics,
      rating: 4,
      notes: 'short',
    });
  });

  it('ratePromptByHash passes the hash and model through untouched', () => {
    const { client, ws } = openClient();
    client.ratePromptByHash('abc123', 'base', 'few_shot', 'model-x', 'prov', metrics);
    expect(ws.messages()[0]).toMatchObject({
      type: 'prompt_rating',
      promptHash: 'abc123',
      variant: 'base',
      category: 'few_shot',
      model: 'model-x',
      provider: 'prov',
    });
  });
});

describe('AirClient.traceMcp', () => {
  it('emits request, response and latency events around a successful call', async () => {
    const { client, ws } = openClient();
    const result = await client.traceMcp(
      'srv',
      'tools/call',
      { toolName: 'search', input: { q: 'é' } },
      async () => {
        jest.advanceTimersByTime(120);
        return { hits: [1, 2] };
      }
    );

    expect(result).toEqual({ hits: [1, 2] });
    const [req, res, lat] = ws.messages();
    expect(req).toMatchObject({
      type: 'mcp_request',
      method: 'tools/call',
      toolName: 'search',
      serverName: 'srv',
      inputPreview: '{"q":"é"}',
      // byte length, not character length: é is two bytes in UTF-8
      inputSizeBytes: 10,
    });
    expect(res).toMatchObject({
      type: 'mcp_response',
      method: 'tools/call',
      toolName: 'search',
      serverName: 'srv',
      durationMs: 120,
      outputSizeBytes: Buffer.byteLength('{"hits":[1,2]}'),
      outputPreview: '{"hits":[1,2]}',
      isError: false,
    });
    expect(lat).toMatchObject({
      type: 'latency',
      operation: 'api_call',
      totalMs: 120,
      model: 'srv',
    });
  });

  it('truncates input and output previews to 200 characters', async () => {
    const { client, ws } = openClient();
    const big = 'x'.repeat(1000);
    await client.traceMcp('srv', 'tools/call', { input: big }, async () => big);
    const [req, res] = ws.messages();
    expect(req.inputPreview).toHaveLength(200);
    expect(req.inputSizeBytes).toBe(1002);
    expect(res.outputPreview).toHaveLength(200);
    expect(res.outputSizeBytes).toBe(1002);
  });

  it('reports zero input bytes when there is no input', async () => {
    const { client, ws } = openClient();
    await client.traceMcp('srv', 'resources/read', { resourceUri: 'file://a' }, async () => 'ok');
    expect(ws.messages()[0]).toMatchObject({
      resourceUri: 'file://a',
      inputSizeBytes: 0,
      inputPreview: '',
    });
  });

  it('emits an error response and rethrows when the call fails', async () => {
    const { client, ws } = openClient();
    const err = new Error('tool exploded');
    await expect(
      client.traceMcp('srv', 'tools/call', { toolName: 't' }, async () => {
        jest.advanceTimersByTime(30);
        throw err;
      })
    ).rejects.toBe(err);

    const sent = ws.messages();
    expect(sent.map((m) => m.type)).toEqual(['mcp_request', 'mcp_response']);
    expect(sent[1]).toMatchObject({ isError: true, errorMessage: 'tool exploded', durationMs: 30 });
  });

  it('stringifies non-Error rejections for the error message', async () => {
    const { client, ws } = openClient();
    await expect(
      client.traceMcp('srv', 'tools/call', {}, () => Promise.reject('plain string'))
    ).rejects.toBe('plain string');
    expect(ws.messages()[1].errorMessage).toBe('plain string');
  });

  // BUG (client.ts:381/391): JSON.stringify(undefined) returns undefined, and
  // Buffer.byteLength(undefined) throws. A call that resolves with no value is
  // therefore reported as a failed MCP call and the TypeError is thrown to the
  // caller, even though the wrapped operation succeeded.
  it.failing('treats an operation that resolves with undefined as a success', async () => {
    const { client, ws } = openClient();
    await expect(client.traceMcp('srv', 'tools/call', {}, async () => undefined)).resolves.toBe(
      undefined
    );
    expect(ws.messages()[1]).toMatchObject({ type: 'mcp_response', isError: false });
  });
});

describe('AirClient RAG helpers', () => {
  it('traceRetrieval records the extracted results and chunk token total', async () => {
    const { client, ws } = openClient();
    const out = await client.traceRetrieval(
      'pinecone',
      'q'.repeat(600),
      async () => {
        jest.advanceTimersByTime(80);
        return [0.9, 0.5];
      },
      { extractResults: (r) => ({ count: r.length, topScore: r[0], chunkSizes: [100, 50] }) }
    );

    expect(out).toEqual([0.9, 0.5]);
    const [ret, lat] = ws.messages();
    expect(ret).toMatchObject({
      type: 'rag_retrieval',
      source: 'pinecone',
      resultCount: 2,
      topScore: 0.9,
      durationMs: 80,
      chunkSizes: [100, 50],
      totalChunkTokens: 150,
    });
    expect(ret.query).toHaveLength(500);
    expect(lat).toMatchObject({
      type: 'latency',
      operation: 'api_call',
      totalMs: 80,
      model: 'pinecone',
    });
  });

  it('traceRetrieval defaults to a zero count without an extractor', async () => {
    const { client, ws } = openClient();
    await client.traceRetrieval('src', 'q', async () => 'r');
    const [ret] = ws.messages();
    expect(ret.resultCount).toBe(0);
    expect(ret).not.toHaveProperty('totalChunkTokens');
  });

  it('traceRetrieval emits a custom error event and rethrows on failure', async () => {
    const { client, ws } = openClient({ provider: 'rag:src' });
    await expect(
      client.traceRetrieval('src', 'find me', async () => {
        throw new Error('index offline');
      })
    ).rejects.toThrow('index offline');

    const sent = ws.messages();
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({
      type: 'custom',
      provider: 'rag:src',
      eventName: 'rag_retrieval_error',
      data: { source: 'src', query: 'find me', error: 'index offline' },
      isError: true,
      errorMessage: 'index offline',
    });
  });

  it('traceEmbedding records model, tokens, timing and options', async () => {
    const { client, ws } = openClient();
    const out = await client.traceEmbedding(
      'src',
      'emb-small',
      150,
      async () => {
        jest.advanceTimersByTime(40);
        return 'vec';
      },
      { dimensions: 1536, batchSize: 8 }
    );
    expect(out).toBe('vec');
    expect(ws.messages()[0]).toEqual(
      expect.objectContaining({
        type: 'rag_embedding',
        source: 'src',
        model: 'emb-small',
        inputTokens: 150,
        durationMs: 40,
        dimensions: 1536,
        batchSize: 8,
      })
    );
  });

  it('traceIndex records document counts and metadata', async () => {
    const { client, ws } = openClient();
    await client.traceIndex('src', 12, 3400, async () => undefined, { shard: 2 });
    expect(ws.messages()[0]).toMatchObject({
      type: 'rag_index',
      source: 'src',
      documentCount: 12,
      totalTokens: 3400,
      durationMs: 0,
      metadata: { shard: 2 },
    });
  });

  it('traceEmbedding and traceIndex emit nothing when the operation fails', async () => {
    const { client, ws } = openClient();
    await expect(
      client.traceEmbedding('s', 'm', 1, () => Promise.reject(new Error('x')))
    ).rejects.toThrow('x');
    await expect(
      client.traceIndex('s', 1, 1, () => Promise.reject(new Error('y')))
    ).rejects.toThrow('y');
    expect(ws.sent).toHaveLength(0);
  });
});

describe('AirClient.trace', () => {
  it('emits a custom event with the provider and duration on success', async () => {
    const { client, ws } = openClient({ provider: 'mine' });
    const out = await client.trace('step', { k: 1 }, async () => {
      jest.advanceTimersByTime(15);
      return 'done';
    });
    expect(out).toBe('done');
    expect(ws.messages()[0]).toMatchObject({
      type: 'custom',
      provider: 'mine',
      eventName: 'step',
      data: { k: 1 },
      durationMs: 15,
      isError: false,
    });
  });

  it('defaults the provider to "custom"', async () => {
    const { client, ws } = openClient();
    await client.trace('step', {}, async () => null);
    expect(ws.messages()[0].provider).toBe('custom');
  });

  it('adds the error to the data and rethrows on failure', async () => {
    const { client, ws } = openClient();
    await expect(
      client.trace('step', { k: 1 }, async () => {
        throw new Error('bad');
      })
    ).rejects.toThrow('bad');
    expect(ws.messages()[0]).toMatchObject({
      eventName: 'step',
      data: { k: 1, error: 'bad' },
      isError: true,
      errorMessage: 'bad',
    });
  });
});
