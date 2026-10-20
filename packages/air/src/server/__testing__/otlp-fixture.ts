/**
 * Builds OTLP/HTTP JSON log batches shaped like Claude Code's export (checked against
 * Claude Code 2.1.304): one record per event, everything in the record's attributes, some
 * numbers sent as strings. The identity attributes Claude Code attaches to every event are
 * included with synthetic values so tests can show they never reach storage.
 */
import type { OtlpAnyValue, OtlpKeyValue, OtlpLogsRequest } from '../otlp';

export const IDENTITY = {
  'user.id': 'f00dfeed',
  'user.email': 'someone@example.test',
  'user.account_uuid': 'acct-uuid-0001',
  'user.account_id': 'user_0001',
  'organization.id': 'org-0001',
  'terminal.type': 'non-interactive',
};

type Value = string | number | boolean;

function anyValue(v: Value): OtlpAnyValue {
  if (typeof v === 'boolean') return { boolValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { intValue: v } : { doubleValue: v };
  return { stringValue: v };
}

const kvs = (o: Record<string, Value>): OtlpKeyValue[] =>
  Object.entries(o).map(([key, v]) => ({ key, value: anyValue(v) }));

let sequence = 0;

/** One Claude Code event record. */
export function ccEvent(
  name: string,
  attrs: Record<string, Value>,
  opts: { sessionId?: string; at?: string; sequence?: number } = {}
) {
  const at = opts.at ?? '2026-10-20T00:36:04.765Z';
  return {
    timeUnixNano: String(BigInt(Date.parse(at)) * 1_000_000n),
    observedTimeUnixNano: String(BigInt(Date.parse(at)) * 1_000_000n),
    body: { stringValue: `claude_code.${name}` },
    attributes: kvs({
      ...IDENTITY,
      'session.id': opts.sessionId ?? 'cc-session-1',
      'event.name': name,
      'event.timestamp': at,
      'event.sequence': opts.sequence ?? ++sequence,
      'prompt.id': 'prompt-1',
      ...attrs,
    }),
  };
}

/** A logs request carrying the given records, from Claude Code (or another service). */
export function logsRequest(
  records: ReturnType<typeof ccEvent>[],
  serviceName = 'claude-code'
): OtlpLogsRequest {
  return {
    resourceLogs: [
      {
        resource: {
          attributes: kvs({
            'host.arch': 'arm64',
            'os.type': 'darwin',
            'service.name': serviceName,
            'service.version': '2.1.304',
          }),
        },
        scopeLogs: [{ scope: { name: 'com.anthropic.claude_code.events' }, logRecords: records }],
      },
    ],
  };
}

/** api_request as Claude Code sends it (token counts as numbers, cost as a double). */
export const apiRequest = (over: Record<string, Value> = {}, opts = {}) =>
  ccEvent(
    'api_request',
    {
      model: 'claude-opus-5-5',
      input_tokens: 2,
      output_tokens: 123,
      cache_read_tokens: 14242,
      cache_creation_tokens: 7651,
      cost_usd: 0.0665244,
      cost_usd_micros: 66524,
      duration_ms: 4573,
      ttft_ms: 3823,
      request_id: 'req_1',
      query_source: 'sdk',
      effort: 'medium',
      ...over,
    },
    opts
  );

/** tool_result as Claude Code sends it (duration, sizes and success as strings). */
export const toolResult = (over: Record<string, Value> = {}, opts = {}) =>
  ccEvent(
    'tool_result',
    {
      tool_name: 'Read',
      tool_use_id: 'toolu_1',
      success: 'true',
      duration_ms: '11',
      tool_input_size_bytes: '146',
      tool_result_size_bytes: '534',
      ...over,
    },
    opts
  );
