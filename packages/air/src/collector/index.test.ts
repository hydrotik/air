import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';
import airCollector from './index';
import { ensureServer } from './server';
import { FakeWebSocket } from '../sdk/__testing__/fake-ws';
import type { ContextSegment } from '../shared/events';
import { defined } from '../sdk/__testing__/defined';

jest.mock('ws', () => jest.requireActual('../sdk/__testing__/fake-ws').fakeWsModule);
jest.mock('./server', () => ({
  ...jest.requireActual('./server'),
  ensureServer: jest.fn(async () => true),
}));

const NOW = 1_700_000_000_000;
const ensureServerMock = jest.mocked(ensureServer);

type Handler = (event: unknown, ctx?: unknown) => Promise<void>;

/** Minimal stand-in for pi's ExtensionAPI: records handlers so tests can fire events */
function makePi() {
  const handlers = new Map<string, Handler>();
  const pi = {
    on: jest.fn((name: string, handler: Handler) => {
      handlers.set(name, handler);
    }),
  };
  const fire = async (name: string, event: unknown = {}, ctx: unknown = makeCtx()) => {
    const handler = handlers.get(name);
    if (!handler) throw new Error(`no handler registered for ${name}`);
    await handler(event, ctx);
  };
  return { pi, handlers, fire };
}

function makeCtx(overrides: Record<string, unknown> = {}) {
  return {
    cwd: '/work',
    model: { id: 'model-a', provider: 'prov-a', contextWindow: 100_000 },
    sessionManager: { getSessionId: () => 'pi-session', getBranch: () => [] },
    getContextUsage: () => undefined,
    getSystemPrompt: () => '',
    ...overrides,
  };
}

/** Lets the server check and the connect that follows it run. */
const flush = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve();
};

/** Loads the collector and starts a session; `connect: false` leaves the socket closed. */
async function begin(ctx: unknown = makeCtx(), { open = true } = {}) {
  const harness = makePi();
  airCollector(harness.pi as unknown as ExtensionAPI);
  await harness.fire('session_start', { reason: 'startup' }, ctx);
  await flush();
  const ws = FakeWebSocket.latest();
  if (open) ws.simulateOpen();
  return { ...harness, ws };
}

/** A started session with an open socket, its `session_start` already read off the wire. */
async function start() {
  const started = await begin();
  started.ws.sent.length = 0;
  return started;
}

const ofType = (ws: FakeWebSocket, type: string) => ws.messages().filter((m) => m.type === type);

beforeEach(() => {
  FakeWebSocket.reset();
  ensureServerMock.mockClear();
  ensureServerMock.mockImplementation(async () => true);
  jest.useFakeTimers({ now: NOW });
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
  for (const k of ['AIR_URL', 'AIR_ENABLED', 'AIR_PORT', 'AIR_AUTOSTART']) delete process.env[k];
});

describe('setup', () => {
  it('does nothing when AIR_ENABLED=false', () => {
    process.env.AIR_ENABLED = 'false';
    const { pi } = makePi();
    airCollector(pi as unknown as ExtensionAPI);
    expect(FakeWebSocket.instances).toHaveLength(0);
    expect(pi.on).not.toHaveBeenCalled();
  });

  it('registers a handler for each pi lifecycle event', () => {
    const { pi, handlers } = makePi();
    airCollector(pi as unknown as ExtensionAPI);
    expect([...handlers.keys()].sort()).toEqual(
      [
        'agent_end',
        'agent_start',
        'model_select',
        'session_compact',
        'session_shutdown',
        'session_start',
        'tool_execution_end',
        'tool_execution_start',
        'turn_end',
        'turn_start',
      ].sort()
    );
  });

  it('starts nothing when loaded: no server, socket or timer before a session', async () => {
    const { pi, fire } = makePi();
    airCollector(pi as unknown as ExtensionAPI);
    expect(jest.getTimerCount()).toBe(0);
    await fire('agent_start');
    await fire('turn_start', { turnIndex: 0 });
    jest.advanceTimersByTime(60_000);
    await flush();
    expect(ensureServerMock).not.toHaveBeenCalled();
    expect(FakeWebSocket.instances).toHaveLength(0);
  });

  it('connects to AIR_URL on session_start, defaulting to the collector path on 5200', async () => {
    expect((await begin()).ws.url).toBe('ws://localhost:5200/ws/collector');

    process.env.AIR_URL = 'ws://elsewhere/ws/collector';
    expect((await begin()).ws.url).toBe('ws://elsewhere/ws/collector');
  });

  it('derives the URL and the server port from AIR_PORT', async () => {
    process.env.AIR_PORT = '5300';
    expect((await begin()).ws.url).toBe('ws://localhost:5300/ws/collector');
    expect(ensureServerMock.mock.calls[0]?.[0]).toMatchObject({ port: 5300 });
  });

  it('warns about a malformed AIR_PORT and uses 5200', async () => {
    process.env.AIR_PORT = '52OO';
    expect((await begin()).ws.url).toBe('ws://localhost:5200/ws/collector');
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('AIR_PORT="52OO"'));
  });

  it('starts the server before connecting, from this package, the project, then `air`', async () => {
    let up: (ok: boolean) => void = () => {};
    ensureServerMock.mockImplementation(() => new Promise((resolve) => (up = resolve)));
    const { pi, fire } = makePi();
    airCollector(pi as unknown as ExtensionAPI);
    await fire('session_start', {}, makeCtx());
    await flush();
    expect(FakeWebSocket.instances).toHaveLength(0);

    const options = defined(ensureServerMock.mock.calls[0], 'ensureServer call')[0];
    expect(options.port).toBe(5200);
    expect(options.candidates.map((c) => c.args.slice(-2))).toEqual(
      options.candidates.map(() => ['--port', '5200'])
    );
    expect(options.candidates.at(-1)?.cmd).toBe('air');
    expect(options.cancelled?.()).toBe(false);

    up(true);
    await flush();
    expect(FakeWebSocket.instances).toHaveLength(1);
  });

  it('connects without starting a server when AIR_AUTOSTART=false', async () => {
    process.env.AIR_AUTOSTART = 'false';
    await begin();
    expect(ensureServerMock).not.toHaveBeenCalled();
    expect(FakeWebSocket.instances).toHaveLength(1);
  });

  it('never connects when the session ends while the server is starting', async () => {
    let up: (ok: boolean) => void = () => {};
    ensureServerMock.mockImplementation(() => new Promise((resolve) => (up = resolve)));
    const { pi, fire } = makePi();
    airCollector(pi as unknown as ExtensionAPI);
    await fire('session_start', {}, makeCtx());
    const done = fire('session_shutdown');
    await jest.advanceTimersByTimeAsync(200);
    await done;
    expect(defined(ensureServerMock.mock.calls[0], 'ensureServer call')[0].cancelled?.()).toBe(
      true
    );

    up(false);
    await flush();
    expect(FakeWebSocket.instances).toHaveLength(0);
  });

  it('queues events sent before the socket opens and sends them, session_start first', async () => {
    const { fire, ws } = await begin(makeCtx(), { open: false });
    await fire('agent_start');
    await fire('turn_start', { turnIndex: 0 });
    expect(ws.sent).toHaveLength(0);

    ws.simulateOpen();
    expect(ws.messages().map((m) => m.type)).toEqual([
      'session_start',
      'agent_start',
      'turn_start',
    ]);
  });

  it('sends a heartbeat every 10 seconds under the session id, dropped while offline', async () => {
    const { ws } = await start();
    jest.advanceTimersByTime(30_000);
    const beats = ofType(ws, 'heartbeat');
    expect(beats).toHaveLength(3);
    expect(beats[0]).toEqual({
      id: expect.stringMatching(/^[0-9a-f]{16}$/),
      sessionId: 'pi-session',
      timestamp: NOW + 10_000,
      type: 'heartbeat',
    });

    // Offline from 30s; the socket made at 35s is still connecting at the 40s heartbeat.
    ws.simulateClose();
    jest.advanceTimersByTime(5_000);
    const again = FakeWebSocket.latest();
    expect(again).not.toBe(ws);
    jest.advanceTimersByTime(5_000);
    again.simulateOpen();
    expect(again.messages().map((m) => m.type)).toEqual(['session_start']);
  });

  it('reconnects 5s after the socket drops, once even if error and close both fire', async () => {
    const { ws } = await start();
    ws.simulateError();
    ws.simulateClose();
    jest.advanceTimersByTime(5000);
    expect(FakeWebSocket.instances).toHaveLength(2);
  });

  it('greets every new connection with session_start', async () => {
    const { ws } = await start();
    ws.simulateClose();
    jest.advanceTimersByTime(5000);
    const again = FakeWebSocket.latest();
    again.simulateOpen();
    expect(again.messages()[0]).toMatchObject({ type: 'session_start', sessionId: 'pi-session' });
  });

  it('retries when the WebSocket constructor throws', async () => {
    FakeWebSocket.throwOnConstruct = true;
    const { pi, fire } = makePi();
    airCollector(pi as unknown as ExtensionAPI);
    await fire('session_start', {}, makeCtx());
    await flush();
    FakeWebSocket.throwOnConstruct = false;
    expect(FakeWebSocket.instances).toHaveLength(0);
    jest.advanceTimersByTime(5000);
    expect(FakeWebSocket.instances).toHaveLength(1);
  });
});

describe('session and agent events', () => {
  it('session_start adopts pi session id and sends cwd/model', async () => {
    const { fire, ws } = await begin();
    await fire('agent_end', { messages: [1, 2, 3] });

    const [startEvt, endEvt] = ws.messages();
    expect(startEvt).toMatchObject({
      type: 'session_start',
      sessionId: 'pi-session',
      cwd: '/work',
      model: 'model-a',
      provider: 'prov-a',
      agent: 'pi',
      timestamp: NOW,
    });
    expect(endEvt).toMatchObject({ type: 'agent_end', sessionId: 'pi-session', messageCount: 3 });
  });

  it('falls back to a generated session id and unknown model', async () => {
    const { ws } = await begin(makeCtx({ sessionManager: {}, model: undefined }));
    expect(ws.messages()[0]).toMatchObject({
      sessionId: expect.stringMatching(/^[0-9a-f]{16}$/),
      model: 'unknown',
      provider: 'unknown',
    });
  });

  it('starts once: a second session_start changes nothing', async () => {
    const { fire, ws } = await start();
    await fire('session_start', {}, makeCtx({ sessionManager: { getSessionId: () => 'other' } }));
    await flush();
    await fire('agent_end', {});
    expect(ensureServerMock).toHaveBeenCalledTimes(1);
    expect(FakeWebSocket.instances).toHaveLength(1);
    expect(ws.messages()).toEqual([expect.objectContaining({ sessionId: 'pi-session' })]);
  });

  it('agent_start reports the model; agent_end defaults messageCount to 0', async () => {
    const { fire, ws } = await start();
    await fire('agent_start');
    await fire('agent_end', {});
    expect(ws.messages()[0]).toMatchObject({
      type: 'agent_start',
      model: 'model-a',
      provider: 'prov-a',
      thinkingLevel: 'off',
    });
    expect(ws.messages()[1]?.messageCount).toBe(0);
  });

  it('session_shutdown sends session_end, stops the heartbeat, and closes after 200ms', async () => {
    const { fire, ws } = await start();
    const done = fire('session_shutdown');
    expect(ofType(ws, 'session_end')).toHaveLength(1);
    expect(ws.close).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(200);
    await done;
    expect(ws.close).toHaveBeenCalledTimes(1);

    const sentBefore = ws.sent.length;
    jest.advanceTimersByTime(60_000);
    expect(ws.sent).toHaveLength(sentBefore); // no more heartbeats
    expect(jest.getTimerCount()).toBe(0);
  });

  it('does not reconnect after session_shutdown closes the socket', async () => {
    const { fire, ws } = await start();
    const done = fire('session_shutdown');
    await jest.advanceTimersByTimeAsync(200);
    await done;

    ws.simulateClose(); // what the real socket does once close() completes
    jest.advanceTimersByTime(5000);
    expect(FakeWebSocket.instances).toHaveLength(1);
  });

  it('sends nothing after session_shutdown', async () => {
    const { fire, ws } = await start();
    const done = fire('session_shutdown');
    await fire('turn_start', { turnIndex: 0 });
    await jest.advanceTimersByTimeAsync(200);
    await done;
    expect(ws.messages().map((m) => m.type)).toEqual(['session_end']);
  });
});

describe('turn events', () => {
  const assistantMessage = (usage: Record<string, unknown>, model = 'gpt-4o') => ({
    role: 'assistant',
    model,
    provider: 'openai',
    usage: {
      input: 1_000_000,
      output: 100_000,
      cacheRead: 0,
      cacheWrite: 0,
      totalTokens: 1_100_000,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
      ...usage,
    },
  });

  it('emits turn_start, then turn_end with a turn latency', async () => {
    const { fire, ws } = await start();
    await fire('turn_start', { turnIndex: 0 });
    jest.advanceTimersByTime(1500);
    await fire('turn_end', { turnIndex: 0, toolResults: [{}, {}] });

    expect(ws.messages().map((m) => m.type)).toEqual([
      'turn_start',
      'turn_end',
      'latency',
      'context_breakdown',
    ]);
    expect(ofType(ws, 'turn_end')[0]).toMatchObject({ turnIndex: 0, toolCallCount: 2 });
    expect(ofType(ws, 'latency')[0]).toMatchObject({
      operation: 'turn',
      totalMs: 1500,
      model: 'model-a',
      provider: 'prov-a',
    });
  });

  it('skips the latency event for a turn that never started', async () => {
    const { fire, ws } = await start();
    await fire('turn_end', { turnIndex: 7 });
    expect(ofType(ws, 'latency')).toHaveLength(0);
    expect(ofType(ws, 'turn_end')[0]?.toolCallCount).toBe(0);
  });

  it('records token usage and uses the provider-reported cost when present', async () => {
    const { fire, ws } = await start();
    const cost = { input: 0.3, output: 0.2, cacheRead: 0, cacheWrite: 0, total: 0.5 };
    await fire('turn_end', { turnIndex: 0, message: assistantMessage({ cost }) });

    expect(ofType(ws, 'token_usage')[0]).toMatchObject({
      input: 1_000_000,
      output: 100_000,
      totalTokens: 1_100_000,
      cost,
      model: 'gpt-4o',
      provider: 'openai',
    });
    expect(ofType(ws, 'cost')[0]).toMatchObject({
      inputCost: 0.3,
      outputCost: 0.2,
      totalCost: 0.5,
      cumulativeCost: 0.5,
      currency: 'USD',
    });
  });

  it('computes cost from the pricing table when the API reports none, and accumulates it', async () => {
    const { fire, ws } = await start();
    await fire('turn_end', { turnIndex: 0, message: assistantMessage({}) });
    await fire('turn_end', { turnIndex: 1, message: assistantMessage({}) });

    const costs = ofType(ws, 'cost');
    // gpt-4o: $2.50 / 1M input, $10 / 1M output
    expect(costs[0]?.inputCost).toBeCloseTo(2.5);
    expect(costs[0]?.outputCost).toBeCloseTo(1);
    expect(costs[0]?.totalCost).toBeCloseTo(3.5);
    expect(costs[1]?.cumulativeCost).toBeCloseTo(7);
  });

  it('emits no cost event for an unpriced model with no reported cost', async () => {
    const { fire, ws } = await start();
    await fire('turn_end', { turnIndex: 0, message: assistantMessage({}, 'no-such-model') });
    expect(ofType(ws, 'token_usage')).toHaveLength(1);
    expect(ofType(ws, 'cost')).toHaveLength(0);
  });

  it('ignores usage on non-assistant messages', async () => {
    const { fire, ws } = await start();
    await fire('turn_end', { turnIndex: 0, message: { role: 'user', usage: { input: 1 } } });
    expect(ofType(ws, 'token_usage')).toHaveLength(0);
    expect(ofType(ws, 'output_eval')).toHaveLength(0);
  });

  it('builds an output evaluation from the tool results seen during the turn', async () => {
    const { fire, ws } = await start();
    await fire('turn_start', { turnIndex: 2 });
    await fire('tool_execution_end', { toolCallId: 'a', toolName: 'read', isError: false });
    await fire('tool_execution_end', { toolCallId: 'b', toolName: 'bash', isError: true });
    jest.advanceTimersByTime(800);
    await fire('turn_end', {
      turnIndex: 2,
      toolResults: [{}, {}],
      message: assistantMessage({ cacheRead: 550_000 }),
    });

    expect(ofType(ws, 'output_eval')[0]).toMatchObject({
      turnIndex: 2,
      model: 'gpt-4o',
      provider: 'openai',
      metrics: {
        responseTokens: 100_000,
        toolCallCount: 2,
        toolErrorCount: 1,
        toolSuccessRate: 0.5,
        hadRetry: false,
        hadImmediateFollowUp: false,
        responseLatencyMs: 800,
        cacheHitRate: 0.5,
      },
    });
  });

  it('resets the per-turn tool error count on turn_start', async () => {
    const { fire, ws } = await start();
    await fire('turn_start', { turnIndex: 0 });
    await fire('tool_execution_end', { toolCallId: 'a', toolName: 't', isError: true });
    await fire('turn_start', { turnIndex: 1 });
    await fire('turn_end', { turnIndex: 1, toolResults: [{}], message: assistantMessage({}) });
    expect(ofType(ws, 'output_eval')[0]?.metrics.toolErrorCount).toBe(0);
  });

  it('reports context usage against the model context window', async () => {
    const { fire, ws } = await start();
    await fire(
      'turn_end',
      { turnIndex: 0 },
      makeCtx({ getContextUsage: () => ({ tokens: 25_000 }) })
    );
    expect(ofType(ws, 'context_usage')[0]).toMatchObject({
      tokensUsed: 25_000,
      contextWindow: 100_000,
      utilizationPct: 25,
    });
  });

  it('assumes a 200k window when the model does not say, and skips null usage', async () => {
    const { fire, ws } = await start();
    await fire(
      'turn_end',
      { turnIndex: 0 },
      makeCtx({ model: { id: 'm', provider: 'p' }, getContextUsage: () => ({ tokens: 50_000 }) })
    );
    expect(ofType(ws, 'context_usage')[0]).toMatchObject({
      contextWindow: 200_000,
      utilizationPct: 25,
    });

    await fire(
      'turn_end',
      { turnIndex: 1 },
      makeCtx({ getContextUsage: () => ({ tokens: null }) })
    );
    expect(ofType(ws, 'context_usage')).toHaveLength(1);
  });

  it('breaks the context down by message role, separating thinking from assistant text', async () => {
    const { fire, ws } = await start();
    const branch = [
      { type: 'message', message: { role: 'user', content: 'u'.repeat(40) } },
      {
        type: 'message',
        message: {
          role: 'assistant',
          content: [
            { type: 'thinking', thinking: 't'.repeat(20) },
            { type: 'text', text: 'a'.repeat(30) },
          ],
        },
      },
      { type: 'message', message: { role: 'toolResult', content: [{ type: 'image' }] } },
      { type: 'message', message: { role: 'compactionSummary', content: 'c'.repeat(9) } },
      { type: 'message', message: { role: 'custom', content: { any: 'thing' } } },
      { type: 'model_change', message: { role: 'user', content: 'ignored' } },
    ];
    await fire(
      'turn_end',
      { turnIndex: 0 },
      makeCtx({
        sessionManager: { getBranch: () => branch },
        getSystemPrompt: () => 's'.repeat(100),
      })
    );

    const bd = defined(ofType(ws, 'context_breakdown')[0], 'context_breakdown');
    const byCategory = Object.fromEntries(
      bd.segments.map((s: ContextSegment) => [s.category, [s.charCount, s.estimatedTokens]])
    );
    expect(byCategory).toEqual({
      sp_base: [100, 25],
      user_messages: [40, 10],
      // 20 thinking + '\n' + 30 text = 51 chars, minus the 20 thinking chars
      assistant_messages: [31, 8],
      tool_results: ['[image]'.length, 2],
      thinking: [20, 5],
      compaction_summary: [9, 3],
      custom_messages: ['{"any":"thing"}'.length, 4],
    });
    expect(bd.totalTokens).toBe(25 + 10 + 8 + 2 + 5 + 3 + 4);
    expect(bd.contextWindow).toBe(100_000);
  });

  it('skips the breakdown without failing the turn when the branch cannot be read', async () => {
    const { fire, ws } = await start();
    await expect(
      fire(
        'turn_end',
        { turnIndex: 0 },
        makeCtx({
          sessionManager: {
            getBranch: () => {
              throw new Error('corrupt');
            },
          },
        })
      )
    ).resolves.toBeUndefined();
    expect(ofType(ws, 'turn_end')).toHaveLength(1);
    expect(ofType(ws, 'context_breakdown')).toHaveLength(0);
  });
});

describe('tool events', () => {
  it('pairs start and end to compute duration, sizes and previews', async () => {
    const { fire, ws } = await start();
    await fire('tool_execution_start', {
      toolCallId: 'tc1',
      toolName: 'bash',
      args: { command: 'x'.repeat(500) },
    });
    jest.advanceTimersByTime(250);
    await fire('tool_execution_end', {
      toolCallId: 'tc1',
      toolName: 'bash',
      result: { out: 'é' },
      isError: false,
    });

    const startEvt = defined(ofType(ws, 'tool_call_start')[0], 'tool_call_start');
    expect(startEvt).toMatchObject({ toolName: 'bash', toolCallId: 'tc1', timestamp: NOW });
    expect(startEvt.inputSizeBytes).toBe(JSON.stringify({ command: 'x'.repeat(500) }).length);
    expect(startEvt.inputPreview).toHaveLength(200);

    expect(ofType(ws, 'tool_call_end')[0]).toMatchObject({
      toolCallId: 'tc1',
      durationMs: 250,
      timestamp: NOW + 250,
      outputPreview: '{"out":"é"}',
      outputSizeBytes: Buffer.byteLength('{"out":"é"}'),
      isError: false,
    });
  });

  it('handles missing args/result and an end with no matching start', async () => {
    const { fire, ws } = await start();
    await fire('tool_execution_start', { toolCallId: 'a', toolName: 't' });
    await fire('tool_execution_end', { toolCallId: 'orphan', toolName: 't', isError: true });

    expect(ofType(ws, 'tool_call_start')[0]).toMatchObject({
      inputPreview: '{}',
      inputSizeBytes: 2,
    });
    expect(ofType(ws, 'tool_call_end')[0]).toMatchObject({
      durationMs: 0,
      outputSizeBytes: 0,
      outputPreview: '',
      isError: true,
    });
  });
});

describe('file reads in the context breakdown', () => {
  it('splits tool results by the kind of file each `read` returned', async () => {
    const { fire, ws } = await start();
    await fire('tool_execution_start', {
      toolCallId: 'r1',
      toolName: 'read',
      args: { path: '/w/a.ts' },
    });
    await fire('tool_execution_end', {
      toolCallId: 'r1',
      toolName: 'read',
      result: 'x'.repeat(98),
    });
    await fire('tool_execution_start', {
      toolCallId: 'b1',
      toolName: 'bash',
      args: { path: '/w/b.md' },
    });
    await fire('tool_execution_end', { toolCallId: 'b1', toolName: 'bash', result: 'y' });
    const branch = [{ type: 'message', message: { role: 'toolResult', content: 'r'.repeat(100) } }];
    await fire(
      'turn_end',
      { turnIndex: 0 },
      makeCtx({ sessionManager: { getBranch: () => branch } })
    );

    const bd = defined(ofType(ws, 'context_breakdown')[0], 'context_breakdown');
    expect(bd.segments.map((s: ContextSegment) => [s.category, s.label, s.charCount])).toEqual([
      ['tr_source_code', 'Source Code', 100],
    ]);
  });
});

describe('compaction and model events', () => {
  it('session_compact reports tokens before, summary length and whether it was automatic', async () => {
    const { fire, ws } = await start();
    await fire('session_compact', {
      compactionEntry: { tokensBefore: 180_000, summary: 'abcde' },
      fromExtension: false,
    });
    await fire('session_compact', { fromExtension: true });

    const [auto, manual] = ofType(ws, 'compaction');
    expect(auto).toMatchObject({
      tokensBefore: 180_000,
      tokensAfter: 0,
      summaryLength: 5,
      isAutomatic: true,
    });
    expect(manual).toMatchObject({ tokensBefore: 0, summaryLength: 0, isAutomatic: false });
  });

  it('model_select reports the previous and new model', async () => {
    const { fire, ws } = await start();
    await fire('model_select', {
      previousModel: { id: 'old', provider: 'p1' },
      model: { id: 'new', provider: 'p2' },
      source: 'set',
    });
    await fire('model_select', { model: { id: 'first', provider: 'p' }, source: 'restore' });

    const [change, initial] = ofType(ws, 'model_change');
    expect(change).toMatchObject({
      previousModel: 'old',
      previousProvider: 'p1',
      newModel: 'new',
      newProvider: 'p2',
      source: 'set',
    });
    expect(defined(initial, 'initial model_change').previousModel).toBeUndefined();
  });
});
