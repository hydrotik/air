import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type Database from 'better-sqlite3';

type Row = Record<string, unknown>;
import { TelemetryStore } from './queries';
import type { TelemetryEvent } from '../shared/events';

// Each test gets a real, fully migrated SQLite db in a temp "home" dir.
// getDb() resolves its path from os.homedir() at module load, so the schema
// module is loaded in isolation after homedir is redirected.

let home: string;
let homedirSpy: jest.SpyInstance;
let db: Database.Database;
let store: TelemetryStore;
let seq = 0;

beforeEach(() => {
  home = fs.mkdtempSync(path.join(os.tmpdir(), 'air-queries-'));
  homedirSpy = jest.spyOn(os, 'homedir').mockReturnValue(home);
  jest.isolateModules(() => {
    db = require('./schema').getDb();
  });
  store = new TelemetryStore(db);
});

afterEach(() => {
  db.close();
  homedirSpy.mockRestore();
  fs.rmSync(home, { recursive: true, force: true });
});

/** Build and ingest an event; fields not given get sensible defaults. */
function ingest(type: string, fields: Record<string, unknown> = {}): TelemetryEvent {
  const event = {
    id: `e-${++seq}`,
    sessionId: 's-1',
    timestamp: 1_000,
    type,
    ...fields,
  } as unknown as TelemetryEvent;
  store.ingestEvent(event);
  return event;
}

function count(table: string): number {
  return (db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n;
}

const startSession = (fields: Record<string, unknown> = {}) =>
  ingest('session_start', {
    cwd: '/work/app',
    model: 'claude-4-sonnet',
    provider: 'anthropic',
    agent: 'claude-code',
    ...fields,
  });

// ─── Sessions ───────────────────────────────────────────────────────────

describe('sessions', () => {
  it('session_start creates a session and getSession maps it to a summary', () => {
    startSession({ timestamp: 500 });

    expect(store.getSession('s-1')).toEqual({
      sessionId: 's-1',
      startTime: 500,
      lastEventTime: 500,
      model: 'claude-4-sonnet',
      provider: 'anthropic',
      cwd: '/work/app',
      totalTokensIn: 0,
      totalTokensOut: 0,
      totalCost: 0,
      toolCallCount: 0,
      turnCount: 0,
      compactionCount: 0,
      avgToolDurationMs: 0,
      contextUtilizationPct: 0,
      agent: 'claude-code',
    });
  });

  it('defaults agent to "pi" when session_start omits it', () => {
    startSession({ agent: undefined });
    expect(store.getSession('s-1')!.agent).toBe('pi');
  });

  it('returns null for an unknown session', () => {
    expect(store.getSession('nope')).toBeNull();
  });

  it('auto-creates a placeholder session for events that arrive without session_start', () => {
    ingest('turn_start', { sessionId: 'orphan', timestamp: 42, turnIndex: 0 });

    expect(store.getSession('orphan')).toMatchObject({
      startTime: 42,
      lastEventTime: 42,
      cwd: '',
      model: '',
      provider: '',
      agent: 'unknown',
    });
  });

  it('advances last_event but keeps start_time on later events', () => {
    startSession({ timestamp: 100 });
    ingest('turn_start', { timestamp: 250, turnIndex: 0 });

    expect(store.getSession('s-1')).toMatchObject({ startTime: 100, lastEventTime: 250 });
  });

  // BUG (queries.ts:53-57): the upsert's ON CONFLICT clause only updates
  // last_event, so when any event beats session_start to the store (common with
  // HTTP + WS collectors), the session keeps the placeholder cwd/model/provider
  // and agent='unknown' forever.
  it.failing('fills session metadata when session_start arrives after another event', () => {
    ingest('turn_start', { timestamp: 90, turnIndex: 0 });
    startSession({ timestamp: 100 });

    expect(store.getSession('s-1')).toMatchObject({
      cwd: '/work/app',
      model: 'claude-4-sonnet',
      provider: 'anthropic',
      agent: 'claude-code',
    });
  });

  // BUG (queries.ts:56): last_event = excluded.last_event unconditionally, so an
  // out-of-order (older) event moves the session's last activity backwards and
  // reorders getSessions(). It should be MAX(last_event, excluded.last_event).
  it.failing('does not move last_event backwards on an out-of-order event', () => {
    startSession({ timestamp: 100 });
    ingest('turn_start', { timestamp: 500, turnIndex: 0 });
    ingest('turn_start', { timestamp: 300, turnIndex: 1 });

    expect(store.getSession('s-1')!.lastEventTime).toBe(500);
  });

  it('getSessions orders by most recent activity and honours the limit', () => {
    startSession({ sessionId: 'a', timestamp: 100 });
    startSession({ sessionId: 'b', timestamp: 300 });
    startSession({ sessionId: 'c', timestamp: 200 });

    expect(store.getSessions().map((s) => s.sessionId)).toEqual(['b', 'c', 'a']);
    expect(store.getSessions(2).map((s) => s.sessionId)).toEqual(['b', 'c']);
    expect(store.getSessions(0)).toEqual([]);
  });

  it('getSessions returns an empty list for an empty store', () => {
    expect(store.getSessions()).toEqual([]);
  });

  it('agent_start overwrites the session model and provider', () => {
    startSession();
    ingest('agent_start', { model: 'gpt-4o', provider: 'openai', thinkingLevel: 'off' });

    expect(store.getSession('s-1')).toMatchObject({ model: 'gpt-4o', provider: 'openai' });
  });

  it('turn_end and compaction increment their counters', () => {
    startSession();
    ingest('turn_end', { turnIndex: 0, toolCallCount: 0 });
    ingest('turn_end', { turnIndex: 1, toolCallCount: 0 });
    ingest('compaction', {
      tokensBefore: 100,
      tokensAfter: 10,
      summaryLength: 5,
      isAutomatic: true,
    });

    expect(store.getSession('s-1')).toMatchObject({ turnCount: 2, compactionCount: 1 });
  });

  it('token_usage accumulates tokens and cost across events', () => {
    startSession();
    const usage = (input: number, output: number, total: number) =>
      ingest('token_usage', {
        input,
        output,
        cacheRead: 0,
        cacheWrite: 0,
        totalTokens: input + output,
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total },
        model: 'm',
        provider: 'p',
      });
    usage(1000, 200, 0.01);
    usage(500, 50, 0.005);

    const s = store.getSession('s-1')!;
    expect(s.totalTokensIn).toBe(1500);
    expect(s.totalTokensOut).toBe(250);
    expect(s.totalCost).toBeCloseTo(0.015, 10);
  });

  // BUG (queries.ts:62 vs 204-406): events use INSERT OR REPLACE, so a
  // re-delivered event (same id) is de-duplicated in the events table, but
  // every counter side-effect (tokens, cost, turns, tool calls, snapshots) is
  // applied again, inflating session totals on any collector retry.
  it.failing('re-delivering the same event id does not double-count session totals', () => {
    startSession();
    const event = {
      id: 'dup',
      sessionId: 's-1',
      timestamp: 1_000,
      type: 'token_usage',
      input: 100,
      output: 10,
      cacheRead: 0,
      cacheWrite: 0,
      totalTokens: 110,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 1 },
      model: 'm',
      provider: 'p',
    } as unknown as TelemetryEvent;
    store.ingestEvent(event);
    store.ingestEvent(event);

    expect(count('events')).toBe(2); // session_start + one token_usage
    expect(store.getSession('s-1')).toMatchObject({ totalTokensIn: 100, totalCost: 1 });
  });
});

// ─── Raw events ─────────────────────────────────────────────────────────

describe('raw event storage', () => {
  it('stores every event, including unknown types, as JSON', () => {
    const e = ingest('something_new', { payload: { a: 1 } });

    expect(store.getEvents('s-1')).toEqual([e]);
  });

  it('getEvents returns events oldest-first for the session only', () => {
    ingest('turn_start', { timestamp: 300, turnIndex: 2 });
    ingest('turn_start', { timestamp: 100, turnIndex: 0 });
    ingest('turn_start', { sessionId: 'other', timestamp: 200, turnIndex: 1 });

    expect(store.getEvents('s-1').map((e) => e.timestamp)).toEqual([100, 300]);
    expect(store.getEvents('missing')).toEqual([]);
  });

  it('getRecentEvents returns the newest N, still in chronological order', () => {
    for (const ts of [10, 50, 20, 40, 30]) ingest('turn_start', { timestamp: ts, turnIndex: 0 });

    expect(store.getRecentEvents('s-1', 3).map((e) => e.timestamp)).toEqual([30, 40, 50]);
    expect(store.getRecentEvents('s-1').map((e) => e.timestamp)).toEqual([10, 20, 30, 40, 50]);
  });

  it('getAllRecentEvents spans sessions and keeps the newest N', () => {
    ingest('turn_start', { sessionId: 'a', timestamp: 1, turnIndex: 0 });
    ingest('turn_start', { sessionId: 'b', timestamp: 3, turnIndex: 0 });
    ingest('turn_start', { sessionId: 'a', timestamp: 2, turnIndex: 0 });

    expect(store.getAllRecentEvents(2).map((e) => [e.sessionId, e.timestamp])).toEqual([
      ['a', 2],
      ['b', 3],
    ]);
  });

  it('falls back to the raw string when stored event data is not valid JSON', () => {
    startSession();
    db.prepare(
      `INSERT INTO events (id, session_id, timestamp, type, data) VALUES (?, ?, ?, ?, ?)`
    ).run('bad', 's-1', 2_000, 'turn_start', '{not json');

    const events = store.getEvents('s-1');
    expect(events).toHaveLength(2);
    expect(events[1]).toBe('{not json');
  });

  it('getProviderSummary counts events per type with first/last seen', () => {
    ingest('mcp_response', { timestamp: 10 });
    ingest('mcp_response', { timestamp: 30 });
    ingest('rag_retrieval', { timestamp: 20 });

    expect(store.getProviderSummary('s-1')).toEqual([
      { type: 'mcp_response', event_count: 2, first_seen: 10, last_seen: 30 },
      { type: 'rag_retrieval', event_count: 1, first_seen: 20, last_seen: 20 },
    ]);
  });
});

// ─── Tool calls ─────────────────────────────────────────────────────────

describe('tool calls', () => {
  const start = (toolCallId: string, toolName: string, timestamp: number, inputSizeBytes = 10) =>
    ingest('tool_call_start', {
      toolCallId,
      toolName,
      timestamp,
      inputSizeBytes,
      inputPreview: '',
    });
  const end = (toolCallId: string, durationMs: number, isError = false, timestamp = 2_000) =>
    ingest('tool_call_end', {
      toolCallId,
      toolName: 'x',
      timestamp,
      durationMs,
      outputSizeBytes: 99,
      outputPreview: '',
      isError,
    });

  it('pairs start and end into one completed row and counts it on the session', () => {
    start('c1', 'read', 1_000, 42);
    end('c1', 150, true, 1_150);

    expect(store.getToolCalls('s-1')).toEqual([
      {
        tool_call_id: 'c1',
        session_id: 's-1',
        tool_name: 'read',
        start_time: 1_000,
        end_time: 1_150,
        duration_ms: 150,
        input_bytes: 42,
        output_bytes: 99,
        is_error: 1,
      },
    ]);
    expect(store.getSession('s-1')!.toolCallCount).toBe(1);
  });

  it('a start without an end stays open and is not counted', () => {
    start('c1', 'read', 1_000);

    expect(store.getToolCalls('s-1')).toEqual([
      expect.objectContaining({ end_time: null, duration_ms: null, output_bytes: null }),
    ]);
    expect(store.getSession('s-1')!.toolCallCount).toBe(0);
    expect(store.getToolCallTimeseries('s-1')).toEqual([]);
  });

  it('an end without a matching start creates no row (but is still counted on the session)', () => {
    end('ghost', 10);

    expect(store.getToolCalls('s-1')).toEqual([]);
    expect(store.getSession('s-1')!.toolCallCount).toBe(1);
  });

  it('a single tool_call event records a complete call with back-computed start time', () => {
    ingest('tool_call', {
      toolCallId: 't1',
      toolName: 'search',
      timestamp: 5_000,
      durationMs: 1_200,
      inputTokens: 30,
      outputTokens: 70,
      isError: false,
    });

    expect(store.getToolCalls('s-1')).toEqual([
      expect.objectContaining({
        tool_call_id: 't1',
        tool_name: 'search',
        start_time: 3_800,
        end_time: 5_000,
        duration_ms: 1_200,
        input_bytes: 30,
        output_bytes: 70,
        is_error: 0,
      }),
    ]);
    expect(store.getSession('s-1')!.toolCallCount).toBe(1);
  });

  it('a tool_call event without duration or token counts defaults them to 0', () => {
    ingest('tool_call', { toolCallId: 't1', toolName: 'x', timestamp: 5_000, isError: true });

    expect(store.getToolCalls('s-1')[0]).toMatchObject({
      start_time: 5_000,
      duration_ms: 0,
      input_bytes: 0,
      output_bytes: 0,
      is_error: 1,
    });
  });

  it('getToolCalls orders by start time', () => {
    start('late', 'a', 300);
    start('early', 'a', 100);
    expect((store.getToolCalls('s-1') as Row[]).map((r) => r.tool_call_id)).toEqual([
      'early',
      'late',
    ]);
  });

  it('getToolStats aggregates count, duration and errors per tool, busiest first', () => {
    start('r1', 'read', 1);
    end('r1', 10);
    start('r2', 'read', 2);
    end('r2', 30, true);
    start('r3', 'read', 3);
    end('r3', 20);
    start('w1', 'write', 4);
    end('w1', 100, true);

    expect(store.getToolStats('s-1')).toEqual([
      { tool_name: 'read', count: 3, avg_ms: 20, min_ms: 10, max_ms: 30, errors: 1 },
      { tool_name: 'write', count: 1, avg_ms: 100, min_ms: 100, max_ms: 100, errors: 1 },
    ]);
  });

  it('getToolStats ignores open calls in duration maths but still counts them', () => {
    start('a', 'read', 1);
    end('a', 40);
    start('b', 'read', 2);

    expect(store.getToolStats('s-1')).toEqual([
      { tool_name: 'read', count: 2, avg_ms: 40, min_ms: 40, max_ms: 40, errors: 0 },
    ]);
  });

  it('getToolCallTimeseries lists completed calls by start time', () => {
    start('b', 'write', 200);
    end('b', 5, true);
    start('a', 'read', 100);
    end('a', 7);

    expect(store.getToolCallTimeseries('s-1')).toEqual([
      { timestamp: 100, tool_name: 'read', duration_ms: 7, is_error: 0, output_bytes: 99 },
      { timestamp: 200, tool_name: 'write', duration_ms: 5, is_error: 1, output_bytes: 99 },
    ]);
  });

  it('returns empty aggregates for a session with no tool calls', () => {
    expect(store.getToolCalls('none')).toEqual([]);
    expect(store.getToolStats('none')).toEqual([]);
  });
});

// ─── Context ────────────────────────────────────────────────────────────

describe('context tracking', () => {
  it('context_usage updates the session pct and records a snapshot without breakdown', () => {
    ingest('context_usage', {
      timestamp: 10,
      tokensUsed: 50_000,
      contextWindow: 200_000,
      utilizationPct: 25,
    });

    expect(store.getSession('s-1')!.contextUtilizationPct).toBe(25);
    expect(store.getContextSnapshots('s-1')).toEqual([
      expect.objectContaining({
        timestamp: 10,
        tokens_used: 50_000,
        context_window: 200_000,
        utilization: 25,
        breakdown: null,
      }),
    ]);
    expect(store.getLatestContextBreakdown('s-1')).toBeNull();
  });

  it('context_breakdown computes utilization and stores parsed segments', () => {
    const segments = [
      { category: 'sp_base', label: 'Base', estimatedTokens: 1_000, charCount: 4_000 },
      { category: 'tool_results', label: 'Tools', estimatedTokens: 3_000, charCount: 12_000 },
    ];
    ingest('context_breakdown', {
      timestamp: 20,
      segments,
      totalTokens: 4_000,
      contextWindow: 16_000,
    });

    expect(store.getSession('s-1')!.contextUtilizationPct).toBe(25);
    expect(store.getLatestContextBreakdown('s-1')).toMatchObject({
      tokens_used: 4_000,
      context_window: 16_000,
      utilization: 25,
      breakdown: segments,
    });
  });

  it('getLatestContextBreakdown uses the newest snapshot, even if it has no breakdown', () => {
    ingest('context_breakdown', {
      timestamp: 10,
      segments: [],
      totalTokens: 1,
      contextWindow: 10,
    });
    ingest('context_usage', {
      timestamp: 20,
      tokensUsed: 2,
      contextWindow: 10,
      utilizationPct: 20,
    });

    expect(store.getLatestContextBreakdown('s-1')).toBeNull();
  });

  it('getLatestContextBreakdown returns [] when stored breakdown JSON is corrupt', () => {
    startSession();
    db.prepare(
      `INSERT INTO context_snapshots (session_id, timestamp, tokens_used, context_window, utilization, breakdown)
       VALUES ('s-1', 99, 1, 2, 50, '[oops')`
    ).run();

    expect(store.getLatestContextBreakdown('s-1')!.breakdown).toEqual([]);
  });

  it('getContextSnapshots returns snapshots oldest-first', () => {
    for (const ts of [30, 10, 20]) {
      ingest('context_usage', {
        timestamp: ts,
        tokensUsed: ts,
        contextWindow: 100,
        utilizationPct: ts,
      });
    }
    expect(store.getContextSnapshots('s-1').map((r) => r.timestamp)).toEqual([10, 20, 30]);
  });

  // BUG (queries.ts:283-289): utilization is totalTokens / contextWindow * 100
  // with no guard, so a breakdown reporting contextWindow = 0 (unknown model)
  // with 0 tokens yields NaN, which SQLite binds as NULL; the NOT NULL
  // constraint on sessions.context_pct rejects it and ingestEvent throws
  // after the raw event row has already been written (no transaction).
  // (With tokens > 0 it stores Infinity instead.)
  it.failing('accepts a context_breakdown with an unknown (0) context window', () => {
    expect(() =>
      ingest('context_breakdown', { segments: [], totalTokens: 0, contextWindow: 0 })
    ).not.toThrow();
  });
});

// ─── MCP / RAG ──────────────────────────────────────────────────────────

describe('MCP and RAG stats', () => {
  const mcp = (fields: Record<string, unknown>) =>
    ingest('mcp_response', {
      serverName: 'design',
      method: 'tools/call',
      toolName: 'get',
      ...fields,
    });

  it('getMcpStats groups responses by server/method/tool with timing and error counts', () => {
    mcp({ durationMs: 10, isError: false });
    mcp({ durationMs: 30, isError: true });
    mcp({ durationMs: 50, isError: true, toolName: 'list' });
    ingest('mcp_request', { serverName: 'design', method: 'tools/call', toolName: 'get' });

    expect(store.getMcpStats('s-1')).toEqual([
      {
        server_name: 'design',
        method: 'tools/call',
        tool_name: 'get',
        call_count: 2,
        avg_ms: 20,
        min_ms: 10,
        max_ms: 30,
        errors: 1,
      },
      {
        server_name: 'design',
        method: 'tools/call',
        tool_name: 'list',
        call_count: 1,
        avg_ms: 50,
        min_ms: 50,
        max_ms: 50,
        errors: 1,
      },
    ]);
  });

  it('getMcpTimeseries lists responses chronologically', () => {
    mcp({ timestamp: 20, durationMs: 5, isError: true });
    mcp({ timestamp: 10, durationMs: 7, isError: false });

    expect(store.getMcpTimeseries('s-1')).toEqual([
      {
        timestamp: 10,
        server_name: 'design',
        method: 'tools/call',
        tool_name: 'get',
        duration_ms: 7,
        is_error: 0,
      },
      {
        timestamp: 20,
        server_name: 'design',
        method: 'tools/call',
        tool_name: 'get',
        duration_ms: 5,
        is_error: 1,
      },
    ]);
  });

  it('getRagStats groups by source and type with averages and token sums', () => {
    ingest('rag_retrieval', {
      source: 'docs',
      durationMs: 100,
      resultCount: 4,
      topScore: 0.9,
      totalChunkTokens: 400,
    });
    ingest('rag_retrieval', {
      source: 'docs',
      durationMs: 300,
      resultCount: 6,
      topScore: 0.7,
      totalChunkTokens: 600,
    });
    ingest('rag_embedding', { source: 'docs', durationMs: 20 });
    ingest('custom', { source: 'docs', durationMs: 999 });

    const stats = store.getRagStats('s-1') as Row[];
    expect(stats).toHaveLength(2);
    expect(stats[0]).toEqual({
      source: 'docs',
      type: 'rag_retrieval',
      call_count: 2,
      avg_ms: 200,
      min_ms: 100,
      max_ms: 300,
      avg_results: 5,
      avg_top_score: expect.closeTo(0.8, 10),
      total_chunk_tokens: 1_000,
    });
    expect(stats[1]).toMatchObject({
      type: 'rag_embedding',
      call_count: 1,
      avg_results: null,
      total_chunk_tokens: null,
    });
  });

  it('getRagTimeseries extracts type-specific fields in time order', () => {
    ingest('rag_index', { timestamp: 30, source: 'kb', durationMs: 900, documentCount: 12 });
    ingest('rag_embedding', { timestamp: 10, source: 'kb', durationMs: 5, inputTokens: 64 });

    expect(store.getRagTimeseries('s-1')).toEqual([
      expect.objectContaining({
        timestamp: 10,
        type: 'rag_embedding',
        input_tokens: 64,
        document_count: null,
      }),
      expect.objectContaining({
        timestamp: 30,
        type: 'rag_index',
        document_count: 12,
        input_tokens: null,
      }),
    ]);
  });

  it('returns empty lists when the session has no MCP or RAG traffic', () => {
    ingest('turn_start', { turnIndex: 0 });
    expect(store.getMcpStats('s-1')).toEqual([]);
    expect(store.getMcpTimeseries('s-1')).toEqual([]);
    expect(store.getRagStats('s-1')).toEqual([]);
    expect(store.getRagTimeseries('s-1')).toEqual([]);
  });
});

// ─── Latency ────────────────────────────────────────────────────────────

describe('latency', () => {
  const latency = (fields: Record<string, unknown>) =>
    ingest('latency', { operation: 'turn', totalMs: 100, model: 'm1', provider: 'p', ...fields });

  it('stores phases as JSON and optional fields as null', () => {
    latency({ ttftMs: 40, phases: [{ name: 'network', durationMs: 60 }] });
    latency({ model: undefined, provider: undefined });

    const rows = db.prepare(`SELECT * FROM latency_snapshots ORDER BY id`).all() as Row[];
    expect(JSON.parse(rows[0]?.phases as string)).toEqual([{ name: 'network', durationMs: 60 }]);
    expect(rows[0]?.ttft_ms).toBe(40);
    expect(rows[1]).toMatchObject({ ttft_ms: null, phases: null, model: null, provider: null });
  });

  it('getLatencyStats aggregates per operation and model, slowest first', () => {
    latency({ totalMs: 100, ttftMs: 10 });
    latency({ totalMs: 300, ttftMs: 30 });
    latency({ totalMs: 50 });
    latency({ operation: 'tool_call', totalMs: 1_000 });
    latency({ totalMs: 20, model: 'm2' });

    expect(store.getLatencyStats('s-1')).toEqual([
      {
        operation: 'tool_call',
        sample_count: 1,
        avg_ms: 1_000,
        min_ms: 1_000,
        max_ms: 1_000,
        avg_ttft_ms: null,
        model: 'm1',
        provider: 'p',
      },
      {
        operation: 'turn',
        sample_count: 3,
        avg_ms: 150,
        min_ms: 50,
        max_ms: 300,
        avg_ttft_ms: 20, // AVG ignores the sample without ttft
        model: 'm1',
        provider: 'p',
      },
      {
        operation: 'turn',
        sample_count: 1,
        avg_ms: 20,
        min_ms: 20,
        max_ms: 20,
        avg_ttft_ms: null,
        model: 'm2',
        provider: 'p',
      },
    ]);
  });

  it('getLatencyTimeSeries returns all operations or filters to one', () => {
    latency({ timestamp: 20, operation: 'api_call', totalMs: 2 });
    latency({ timestamp: 10, operation: 'turn', totalMs: 1 });

    expect((store.getLatencyTimeSeries('s-1') as Row[]).map((r) => r.operation)).toEqual([
      'turn',
      'api_call',
    ]);
    expect(store.getLatencyTimeSeries('s-1', 'api_call')).toEqual([
      { timestamp: 20, total_ms: 2, ttft_ms: null, operation: 'api_call', model: 'm1' },
    ]);
    expect(store.getLatencyTimeSeries('s-1', 'ttft')).toEqual([]);
  });
});

// ─── Cost ───────────────────────────────────────────────────────────────

describe('cost', () => {
  const cost = (fields: Record<string, unknown>) =>
    ingest('cost', {
      model: 'm1',
      provider: 'p',
      inputCost: 0.1,
      outputCost: 0.2,
      cacheReadCost: 0.01,
      cacheWriteCost: 0.02,
      totalCost: 0.33,
      cumulativeCost: 0.33,
      currency: 'USD',
      ...fields,
    });

  it('records a snapshot and adds totalCost to the session (on top of token_usage cost)', () => {
    ingest('token_usage', {
      input: 1,
      output: 1,
      cacheRead: 0,
      cacheWrite: 0,
      totalTokens: 2,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 1 },
      model: 'm1',
      provider: 'p',
    });
    cost({ budgetLimit: 5, budgetExceeded: true });

    expect(store.getSession('s-1')!.totalCost).toBeCloseTo(1.33, 10);
    expect(db.prepare(`SELECT budget_limit, budget_exceeded FROM cost_snapshots`).get()).toEqual({
      budget_limit: 5,
      budget_exceeded: 1,
    });
  });

  it('stores a missing budget as null / not exceeded', () => {
    cost({});
    expect(db.prepare(`SELECT budget_limit, budget_exceeded FROM cost_snapshots`).get()).toEqual({
      budget_limit: null,
      budget_exceeded: 0,
    });
  });

  it('getCumulativeCost returns the max cumulative cost, or 0 with no snapshots', () => {
    expect(store.getCumulativeCost('s-1')).toBe(0);
    cost({ timestamp: 1, cumulativeCost: 0.5 });
    cost({ timestamp: 3, cumulativeCost: 1.5 });
    cost({ timestamp: 2, cumulativeCost: 1.0 });
    expect(store.getCumulativeCost('s-1')).toBe(1.5);
  });

  it('getCostBreakdown sums components per model, most expensive first', () => {
    cost({ cumulativeCost: 0.33 });
    cost({ cumulativeCost: 0.66, budgetLimit: 1 });
    cost({ model: 'm2', totalCost: 5, cumulativeCost: 5.66, budgetExceeded: true });

    const rows = store.getCostBreakdown('s-1') as Row[];
    expect(rows.map((r) => r.model)).toEqual(['m2', 'm1']);
    expect(rows[1]).toEqual({
      model: 'm1',
      provider: 'p',
      event_count: 2,
      total_input_cost: expect.closeTo(0.2, 10),
      total_output_cost: expect.closeTo(0.4, 10),
      total_cache_read_cost: expect.closeTo(0.02, 10),
      total_cache_write_cost: expect.closeTo(0.04, 10),
      total_cost: expect.closeTo(0.66, 10),
      cumulative_cost: 0.66,
      budget_limit: 1,
      budget_exceeded: 0,
    });
    expect(rows[0]).toMatchObject({ budget_exceeded: 1, budget_limit: null });
  });

  it('getCostTimeSeries is chronological', () => {
    cost({ timestamp: 20, cumulativeCost: 2 });
    cost({ timestamp: 10, cumulativeCost: 1 });
    expect((store.getCostTimeSeries('s-1') as Row[]).map((r) => r.cumulative_cost)).toEqual([1, 2]);
  });
});

// ─── Output evaluation ──────────────────────────────────────────────────

describe('output evaluation', () => {
  const evalEvent = (fields: Record<string, unknown> = {}, metrics: Record<string, unknown> = {}) =>
    ingest('output_eval', {
      turnIndex: 0,
      model: 'm1',
      provider: 'p',
      metrics: {
        responseTokens: 100,
        toolCallCount: 2,
        toolErrorCount: 0,
        toolSuccessRate: 1,
        hadRetry: false,
        hadImmediateFollowUp: false,
        responseLatencyMs: 1_000,
        cacheHitRate: 0.5,
        ...metrics,
      },
      ...fields,
    });

  it('stores booleans as 0/1 and tags as JSON', () => {
    evalEvent({ tags: ['accurate', 'verbose'], userRating: 4 }, { hadRetry: true });

    expect(
      db
        .prepare(`SELECT had_retry, had_immediate_follow_up, tags, user_rating FROM output_evals`)
        .get()
    ).toEqual({
      had_retry: 1,
      had_immediate_follow_up: 0,
      tags: '["accurate","verbose"]',
      user_rating: 4,
    });
  });

  it('getOutputEvalStats averages metrics, ignores unrated turns in the rating average', () => {
    evalEvent({ userRating: 5 }, { responseTokens: 100, toolSuccessRate: 1, hadRetry: true });
    evalEvent(
      { userRating: 3 },
      { responseTokens: 300, toolSuccessRate: 0.5, hadImmediateFollowUp: true }
    );
    evalEvent(
      {},
      { responseTokens: 200, toolSuccessRate: 0, cacheHitRate: 0.2, responseLatencyMs: 4_000 }
    );
    evalEvent({ model: 'm2' });

    const rows = store.getOutputEvalStats('s-1') as Row[];
    const m1 = rows.find((r) => r.model === 'm1');
    expect(m1).toEqual({
      model: 'm1',
      provider: 'p',
      eval_count: 3,
      avg_response_tokens: 200,
      avg_tool_success_rate: 0.5,
      total_retries: 1,
      total_follow_ups: 1,
      avg_response_latency_ms: 2_000,
      avg_cache_hit_rate: expect.closeTo(0.4, 10),
      avg_user_rating: 4,
      rated_count: 2,
    });
    expect(rows.find((r) => r.model === 'm2')).toMatchObject({
      avg_user_rating: null,
      rated_count: 0,
    });
  });

  it('getOutputEvalTimeSeries is chronological', () => {
    evalEvent({ timestamp: 20, turnIndex: 1 });
    evalEvent({ timestamp: 10, turnIndex: 0 });
    expect((store.getOutputEvalTimeSeries('s-1') as Row[]).map((r) => r.turn_index)).toEqual([
      0, 1,
    ]);
  });

  it('returns empty stats for a session without evals', () => {
    expect(store.getOutputEvalStats('s-1')).toEqual([]);
  });
});

// ─── Prompt ratings ─────────────────────────────────────────────────────

describe('prompt ratings', () => {
  const rating = (fields: Record<string, unknown> = {}, metrics: Record<string, unknown> = {}) =>
    ingest('prompt_rating', {
      promptHash: 'h1',
      variant: 'baseline',
      category: 'system',
      model: 'm1',
      provider: 'p',
      metrics: {
        goalAchieved: true,
        turnsToComplete: 2,
        totalTokens: 1_000,
        totalCost: 0.1,
        totalLatencyMs: 500,
        toolErrorRate: 0,
        requiredCompaction: false,
        ...metrics,
      },
      ...fields,
    });

  it('getPromptVariantComparison computes rates per variant and ranks by goal rate then cost', () => {
    // baseline: goal 1/2, cost avg 0.1
    rating({ rating: 4 }, { goalAchieved: true });
    rating({}, { goalAchieved: false, requiredCompaction: true, turnsToComplete: 4 });
    // concise: goal 2/2, cost avg 0.3
    rating({ variant: 'concise' }, { totalCost: 0.2 });
    rating({ variant: 'concise' }, { totalCost: 0.4 });
    // cheap: goal 2/2, cost avg 0.05 -> ranks above concise
    rating({ variant: 'cheap' }, { totalCost: 0.05 });
    // other prompt
    rating({ promptHash: 'h2', variant: 'x' }, { goalAchieved: false });

    const rows = store.getPromptVariantComparison('h1') as Row[];
    expect(rows.map((r) => r.variant)).toEqual(['cheap', 'concise', 'baseline']);
    expect(rows[2]).toMatchObject({
      prompt_hash: 'h1',
      sample_count: 2,
      goal_rate: 0.5,
      avg_turns: 3,
      compaction_rate: 0.5,
      avg_rating: 4,
      rated_count: 1,
    });
    expect(rows[1]?.avg_cost).toBeCloseTo(0.3, 10);
  });

  it('without a hash, compares variants across all prompts', () => {
    rating();
    rating({ promptHash: 'h2', variant: 'baseline' }, { goalAchieved: false });

    const rows = store.getPromptVariantComparison() as Row[];
    expect(rows.map((r) => [r.prompt_hash, r.goal_rate])).toEqual([
      ['h1', 1],
      ['h2', 0],
    ]);
  });

  it('returns [] for an unknown prompt hash', () => {
    rating();
    expect(store.getPromptVariantComparison('nope')).toEqual([]);
  });

  it('getPromptRatings returns a variant newest-first with booleans as 0/1', () => {
    rating({ timestamp: 10, notes: 'first' });
    rating({ timestamp: 20 }, { requiredCompaction: true });
    rating({ timestamp: 30, variant: 'other' });

    const rows = store.getPromptRatings('baseline') as Row[];
    expect(rows.map((r) => r.timestamp)).toEqual([20, 10]);
    expect(rows[0]).toMatchObject({
      required_compaction: 1,
      goal_achieved: 1,
      rating: null,
      notes: null,
    });
    expect(rows[1]?.notes).toBe('first');
  });
});

// ─── Drift ──────────────────────────────────────────────────────────────

describe('drift', () => {
  const drift = (fields: Record<string, unknown> = {}) =>
    ingest('drift', {
      metric: 'latency',
      model: 'm1',
      provider: 'p',
      baseline: 100,
      current: 150,
      deviationPct: 50,
      direction: 'increase',
      severity: 'warning',
      windowSize: 20,
      threshold: 25,
      ...fields,
    });

  it('stores the event with current mapped to current_val', () => {
    drift();
    expect(store.getDriftEvents('s-1')).toEqual([
      expect.objectContaining({
        metric: 'latency',
        baseline: 100,
        current_val: 150,
        deviation_pct: 50,
      }),
    ]);
  });

  it('getDriftEvents is newest-first, filterable by session and limited', () => {
    drift({ timestamp: 10 });
    drift({ timestamp: 30 });
    drift({ timestamp: 20, sessionId: 's-2' });

    expect((store.getDriftEvents() as Row[]).map((r) => r.timestamp)).toEqual([30, 20, 10]);
    expect((store.getDriftEvents(undefined, 2) as Row[]).map((r) => r.timestamp)).toEqual([30, 20]);
    expect((store.getDriftEvents('s-1') as Row[]).map((r) => r.timestamp)).toEqual([30, 10]);
    expect((store.getDriftEvents('s-1', 1) as Row[]).map((r) => r.timestamp)).toEqual([30]);
  });

  it('getDriftSummary averages signed deviation but reports max absolute deviation', () => {
    drift({ timestamp: 10, deviationPct: 40, severity: 'warning' });
    drift({ timestamp: 20, deviationPct: -60, direction: 'decrease', severity: 'warning' });
    drift({ timestamp: 30, metric: 'cost', deviationPct: 200, severity: 'critical' });
    drift({ timestamp: 40, sessionId: 's-2', deviationPct: 10, severity: 'info' });

    expect(store.getDriftSummary('s-1')).toEqual([
      {
        metric: 'latency',
        severity: 'warning',
        event_count: 2,
        avg_deviation_pct: -10,
        max_deviation_pct: 60,
        first_seen: 10,
        last_seen: 20,
      },
      {
        metric: 'cost',
        severity: 'critical',
        event_count: 1,
        avg_deviation_pct: 200,
        max_deviation_pct: 200,
        first_seen: 30,
        last_seen: 30,
      },
    ]);
    expect(store.getDriftSummary()).toHaveLength(3);
  });

  it('returns empty results with no drift recorded', () => {
    expect(store.getDriftEvents()).toEqual([]);
    expect(store.getDriftSummary()).toEqual([]);
  });
});
