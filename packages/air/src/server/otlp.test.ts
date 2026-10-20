import { ClaudeCodeOtlpMapper, contextWindowFor } from './otlp';
import { IDENTITY, apiRequest, ccEvent, logsRequest, toolResult } from './__testing__/otlp-fixture';

import type { TelemetryEvent } from '../shared/events';

const byType = <T extends TelemetryEvent['type']>(events: TelemetryEvent[], type: T) =>
  events.filter((e): e is Extract<TelemetryEvent, { type: T }> => e.type === type);

describe('ClaudeCodeOtlpMapper', () => {
  it('opens the session once, as a claude-code session', () => {
    const m = new ClaudeCodeOtlpMapper();
    const first = m.mapLogs(logsRequest([apiRequest()])).events;
    const second = m.mapLogs(logsRequest([apiRequest()])).events;

    expect(byType(first, 'session_start')).toEqual([
      expect.objectContaining({
        sessionId: 'cc-session-1',
        agent: 'claude-code',
        provider: 'anthropic',
      }),
    ]);
    expect(byType(second, 'session_start')).toEqual([]);
  });

  it('maps api_request to tokens, cost, latency, context and a turn', () => {
    const { events } = new ClaudeCodeOtlpMapper().mapLogs(logsRequest([apiRequest()]));

    expect(byType(events, 'token_usage')[0]).toMatchObject({
      input: 2,
      output: 123,
      cacheRead: 14242,
      cacheWrite: 7651,
      totalTokens: 2 + 123 + 14242 + 7651,
      model: 'claude-opus-5-5',
      cost: { total: 0.0665244 },
    });
    expect(byType(events, 'cost')[0]).toMatchObject({
      totalCost: 0.0665244,
      cumulativeCost: 0.0665244,
      currency: 'USD',
    });
    expect(byType(events, 'latency')[0]).toMatchObject({
      operation: 'api_call',
      totalMs: 4573,
      ttftMs: 3823,
    });
    expect(byType(events, 'context_usage')[0]).toMatchObject({
      tokensUsed: 2 + 14242 + 7651,
      contextWindow: 200_000,
    });
    expect(byType(events, 'agent_start')[0]).toMatchObject({
      model: 'claude-opus-5-5',
      thinkingLevel: 'medium',
    });
    const [start] = byType(events, 'turn_start');
    const [end] = byType(events, 'turn_end');
    expect(start).toMatchObject({
      turnIndex: 1,
      timestamp: Date.parse('2026-10-20T00:36:04.765Z') - 4573,
    });
    expect(end).toMatchObject({ turnIndex: 1 });
  });

  it('keeps a running cost and only re-announces the model when it changes', () => {
    const m = new ClaudeCodeOtlpMapper();
    const { events } = m.mapLogs(
      logsRequest([
        apiRequest({ cost_usd: 0.5 }),
        apiRequest({ cost_usd: 0.25 }),
        apiRequest({ cost_usd: 0.25, model: 'claude-haiku-5-5' }),
      ])
    );

    expect(byType(events, 'cost').map((e) => e.cumulativeCost)).toEqual([0.5, 0.75, 1]);
    expect(byType(events, 'agent_start').map((e) => e.model)).toEqual([
      'claude-opus-5-5',
      'claude-haiku-5-5',
    ]);
  });

  it('maps tool_result to a start/end pair with the real duration, reading string numbers', () => {
    const { events } = new ClaudeCodeOtlpMapper().mapLogs(logsRequest([toolResult()]));
    const at = Date.parse('2026-10-20T00:36:04.765Z');

    expect(byType(events, 'tool_call_start')[0]).toMatchObject({
      toolName: 'Read',
      toolCallId: 'toolu_1',
      timestamp: at - 11,
      inputSizeBytes: 146,
    });
    expect(byType(events, 'tool_call_end')[0]).toMatchObject({
      toolCallId: 'toolu_1',
      timestamp: at,
      durationMs: 11,
      outputSizeBytes: 534,
      isError: false,
    });
  });

  it('marks a failed tool and records its error type', () => {
    const { events } = new ClaudeCodeOtlpMapper().mapLogs(
      logsRequest([toolResult({ success: 'false', error_type: 'ShellError' })])
    );
    expect(byType(events, 'tool_call_end')[0]).toMatchObject({
      isError: true,
      outputPreview: 'ShellError',
    });
  });

  it('records a rejected tool decision and ignores accepted ones', () => {
    const { events } = new ClaudeCodeOtlpMapper().mapLogs(
      logsRequest([
        ccEvent('tool_decision', {
          decision: 'accept',
          source: 'config',
          tool_name: 'Read',
          tool_use_id: 'toolu_a',
        }),
        ccEvent('tool_decision', {
          decision: 'reject',
          source: 'config',
          tool_name: 'Bash',
          tool_use_id: 'toolu_b',
        }),
      ])
    );
    expect(byType(events, 'tool_call')).toEqual([
      expect.objectContaining({
        toolName: 'Bash',
        toolCallId: 'toolu_b',
        isError: true,
        errorMessage: 'Rejected (config)',
      }),
    ]);
  });

  it('maps compaction with tokens before and after; skips a failed one', () => {
    const { events } = new ClaudeCodeOtlpMapper().mapLogs(
      logsRequest([
        ccEvent('compaction', {
          trigger: 'auto',
          success: 'true',
          pre_tokens: 180000,
          post_tokens: 22000,
        }),
        ccEvent('compaction', {
          trigger: 'manual',
          success: 'true',
          pre_tokens: 90000,
          post_tokens: 9000,
        }),
        ccEvent('compaction', { trigger: 'auto', success: 'false', error: 'boom' }),
      ])
    );
    expect(byType(events, 'compaction')).toEqual([
      expect.objectContaining({ tokensBefore: 180000, tokensAfter: 22000, isAutomatic: true }),
      expect.objectContaining({ tokensBefore: 90000, tokensAfter: 9000, isAutomatic: false }),
    ]);
  });

  it('maps api_error to an error custom event', () => {
    const { events } = new ClaudeCodeOtlpMapper().mapLogs(
      logsRequest([
        ccEvent('api_error', {
          model: 'claude-opus-5-5',
          error: 'Overloaded',
          status_code: 529,
          attempt: 2,
          duration_ms: 1200,
        }),
      ])
    );
    expect(byType(events, 'custom')[0]).toMatchObject({
      eventName: 'api_error',
      isError: true,
      errorMessage: 'Overloaded',
      data: { model: 'claude-opus-5-5', statusCode: 529, attempt: 2 },
    });
  });

  it('never copies identity attributes into events', () => {
    const { events } = new ClaudeCodeOtlpMapper().mapLogs(
      logsRequest([
        apiRequest(),
        toolResult(),
        ccEvent('api_error', { error: 'x' }),
        ccEvent('compaction', { pre_tokens: 1, post_tokens: 1 }),
        ccEvent('tool_decision', { decision: 'reject', tool_name: 'Bash' }),
      ])
    );
    const json = JSON.stringify(events);
    for (const value of Object.values(IDENTITY)) expect(json).not.toContain(value);
  });

  it('derives ids from session and sequence, so a retried batch maps to the same ids', () => {
    const batch = logsRequest([apiRequest({}, { sequence: 12 }), toolResult({}, { sequence: 13 })]);
    const a = new ClaudeCodeOtlpMapper().mapLogs(batch).events.map((e) => e.id);
    const b = new ClaudeCodeOtlpMapper().mapLogs(batch).events.map((e) => e.id);
    expect(a).toEqual(b);
    expect(new Set(a).size).toBe(a.length);
  });

  it('counts but ignores other events and other services', () => {
    const m = new ClaudeCodeOtlpMapper();
    expect(
      m.mapLogs(logsRequest([ccEvent('plugin_loaded', {}), ccEvent('assistant_response', {})]))
    ).toEqual({
      events: [],
      records: 2,
      mapped: 0,
    });
    expect(m.mapLogs(logsRequest([apiRequest()], 'some-other-service'))).toEqual({
      events: [],
      records: 1,
      mapped: 0,
    });
    expect(m.mapLogs({})).toEqual({ events: [], records: 0, mapped: 0 });
  });

  it('skips records without a session id or event name, and falls back to the record time', () => {
    const m = new ClaudeCodeOtlpMapper();
    const noSession = {
      timeUnixNano: '0',
      body: { stringValue: 'claude_code.api_request' },
      attributes: [],
    };
    expect(m.mapLogs(logsRequest([noSession as never])).events).toEqual([]);

    const fromBody = {
      timeUnixNano: String(1_700_000_000_000n * 1_000_000n),
      body: { stringValue: 'claude_code.tool_result' },
      attributes: [
        { key: 'session.id', value: { stringValue: 's2' } },
        { key: 'tool_name', value: { stringValue: 'Glob' } },
        { key: 'duration_ms', value: { intValue: '7' } },
      ],
    };
    const end = byType(m.mapLogs(logsRequest([fromBody as never])).events, 'tool_call_end')[0];
    expect(end).toMatchObject({ timestamp: 1_700_000_000_000, durationMs: 7, toolName: 'Glob' });
  });
});

describe('ClaudeCodeOtlpMapper with sparse records', () => {
  // Only session.id and the event name, the way a future or trimmed export might look.
  const sparse = (name: string, extra: { key: string; value: object }[] = []) => ({
    observedTimeUnixNano: String(1_700_000_000_000n * 1_000_000n),
    body: { stringValue: `claude_code.${name}` },
    attributes: [
      { key: 'session.id', value: { stringValue: 'sparse' } },
      { key: 'empty', value: {} },
      { key: 'no-value' },
      ...extra,
    ],
  });

  it('falls back to defaults for every missing attribute', () => {
    const { events } = new ClaudeCodeOtlpMapper().mapLogs(
      logsRequest([
        sparse('api_request') as never,
        sparse('tool_result', [{ key: 'success', value: { boolValue: false } }]) as never,
        sparse('tool_decision', [{ key: 'decision', value: { stringValue: 'reject' } }]) as never,
        sparse('api_error') as never,
      ])
    );
    const at = 1_700_000_000_000;
    expect(byType(events, 'token_usage')[0]).toMatchObject({
      model: 'unknown',
      totalTokens: 0,
      timestamp: at,
    });
    expect(byType(events, 'agent_start')[0]).toMatchObject({ thinkingLevel: '' });
    expect(byType(events, 'latency')[0]).not.toHaveProperty('ttftMs');
    expect(byType(events, 'tool_call_end')[0]).toMatchObject({
      toolName: 'unknown',
      isError: true,
    });
    expect(byType(events, 'tool_call')[0]).toMatchObject({
      toolName: 'unknown',
      errorMessage: 'Rejected (permission)',
    });
    expect(byType(events, 'custom')[0]).toMatchObject({
      errorMessage: 'API error',
      data: { error: '' },
    });
  });

  it('tolerates batches without scopes, records or attributes', () => {
    const m = new ClaudeCodeOtlpMapper();
    expect(m.mapLogs({ resourceLogs: [{}] })).toEqual({ events: [], records: 0, mapped: 0 });
    expect(m.mapLogs({ resourceLogs: [{ resource: {}, scopeLogs: [{}] }] })).toEqual({
      events: [],
      records: 0,
      mapped: 0,
    });
    expect(
      m.mapLogs({
        resourceLogs: [
          { resource: { attributes: [{ key: 'service.name', value: { stringValue: 'x' } }] } },
        ],
      })
    ).toEqual({
      events: [],
      records: 0,
      mapped: 0,
    });
    expect(m.mapLogs(logsRequest([{ body: {} } as never])).events).toEqual([]);
  });
});

describe('contextWindowFor', () => {
  it('is 1M for [1m] model ids and 200k otherwise', () => {
    expect(contextWindowFor('claude-opus-5-5[1m]')).toBe(1_000_000);
    expect(contextWindowFor('claude-opus-5-5')).toBe(200_000);
  });
});
