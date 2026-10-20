/**
 * OTLP/HTTP (JSON) → AIr events, for Claude Code's OpenTelemetry export.
 *
 * Claude Code sends one log record per event (`claude_code.api_request`, `tool_result`, …) with
 * everything in the record's attributes. This module maps the ones AIr shows onto AIr events and
 * drops the rest. It reads attributes by name, so nothing it does not name reaches storage: the
 * identity attributes Claude Code attaches to every event (`user.email`, `user.account_uuid`,
 * `organization.id`, …) are never copied.
 *
 * Event ids derive from `session.id` and `event.sequence`, so an exporter that retries a batch
 * replaces events instead of duplicating them.
 *
 * Reference: https://code.claude.com/docs/en/monitoring-usage
 */
import type { TelemetryEvent } from '../shared/events';

// ─── OTLP JSON (the subset used here) ───────────────────────────────────────

export interface OtlpAnyValue {
  stringValue?: string;
  boolValue?: boolean;
  intValue?: string | number;
  doubleValue?: number;
  arrayValue?: { values?: OtlpAnyValue[] };
  kvlistValue?: { values?: OtlpKeyValue[] };
}

export interface OtlpKeyValue {
  key: string;
  value?: OtlpAnyValue;
}

export interface OtlpLogRecord {
  timeUnixNano?: string | number;
  observedTimeUnixNano?: string | number;
  body?: OtlpAnyValue;
  attributes?: OtlpKeyValue[];
}

export interface OtlpLogsRequest {
  resourceLogs?: {
    resource?: { attributes?: OtlpKeyValue[] };
    scopeLogs?: { scope?: { name?: string }; logRecords?: OtlpLogRecord[] }[];
  }[];
}

type Scalar = string | number | boolean;

function scalar(v: OtlpAnyValue | undefined): Scalar | undefined {
  if (!v) return undefined;
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.intValue !== undefined) return Number(v.intValue);
  if (v.doubleValue !== undefined) return v.doubleValue;
  if (v.boolValue !== undefined) return v.boolValue;
  return undefined;
}

function attributeMap(kvs: OtlpKeyValue[] | undefined): Map<string, Scalar> {
  const out = new Map<string, Scalar>();
  for (const kv of kvs ?? []) {
    const v = scalar(kv.value);
    if (v !== undefined) out.set(kv.key, v);
  }
  return out;
}

/** Attributes of one record. Claude Code sends some numbers as strings ("11"): read through these. */
class Attrs {
  constructor(private readonly map: Map<string, Scalar>) {}
  str(key: string): string | undefined {
    const v = this.map.get(key);
    return v === undefined ? undefined : String(v);
  }
  num(key: string): number {
    const v = this.map.get(key);
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  bool(key: string): boolean | undefined {
    const v = this.map.get(key);
    if (typeof v === 'boolean') return v;
    if (v === 'true') return true;
    if (v === 'false') return false;
    return undefined;
  }
}

// ─── Mapping ────────────────────────────────────────────────────────────────

/** Context window by model id. The status-line bridge reports the exact size when installed. */
export function contextWindowFor(model: string): number {
  return /\[1m\]$/i.test(model) ? 1_000_000 : 200_000;
}

interface SessionState {
  started: boolean;
  model: string | undefined;
  turns: number;
  cumulativeCost: number;
}

export interface OtlpMapResult {
  events: TelemetryEvent[];
  /** Log records read, and those that carried an event AIr maps. */
  records: number;
  mapped: number;
}

const PROVIDER = 'anthropic';
const AGENT = 'claude-code';

/**
 * Maps Claude Code's OTLP log batches onto AIr events. Keeps a little state per session (the
 * current model, a turn counter, the running cost), so one instance serves the whole server.
 */
export class ClaudeCodeOtlpMapper {
  private readonly sessions = new Map<string, SessionState>();

  private session(id: string): SessionState {
    let s = this.sessions.get(id);
    if (!s) {
      s = { started: false, model: undefined, turns: 0, cumulativeCost: 0 };
      this.sessions.set(id, s);
    }
    return s;
  }

  mapLogs(body: OtlpLogsRequest): OtlpMapResult {
    const events: TelemetryEvent[] = [];
    let records = 0;
    let mapped = 0;
    for (const rl of body.resourceLogs ?? []) {
      const resource = attributeMap(rl.resource?.attributes);
      // Only Claude Code's export is understood; other services sending here are ignored.
      if (resource.get('service.name') !== 'claude-code') {
        records += (rl.scopeLogs ?? []).reduce((n, sl) => n + (sl.logRecords?.length ?? 0), 0);
        continue;
      }
      for (const sl of rl.scopeLogs ?? []) {
        for (const record of sl.logRecords ?? []) {
          records++;
          const out = this.mapRecord(record);
          if (out.length) {
            mapped++;
            events.push(...out);
          }
        }
      }
    }
    return { events, records, mapped };
  }

  private mapRecord(record: OtlpLogRecord): TelemetryEvent[] {
    const a = new Attrs(attributeMap(record.attributes));
    const sessionId = a.str('session.id');
    const name =
      a.str('event.name') ?? String(scalar(record.body) ?? '').replace(/^claude_code\./, '');
    if (!sessionId || !name) return [];

    const timestamp = recordTime(record, a);
    const base = (suffix: string) => ({
      id: `otel:${sessionId}:${a.str('event.sequence') ?? `${timestamp}`}:${suffix}`,
      sessionId,
      timestamp,
    });
    const s = this.session(sessionId);
    const out: TelemetryEvent[] = [];

    const known = [
      'api_request',
      'api_error',
      'tool_result',
      'tool_decision',
      'compaction',
      'user_prompt',
    ];
    if (!known.includes(name)) return out;

    if (!s.started) {
      s.started = true;
      out.push({
        ...base('session'),
        id: `otel:${sessionId}:session`,
        type: 'session_start',
        cwd: '',
        model: a.str('model') ?? '',
        provider: PROVIDER,
        agent: AGENT,
      });
    }

    switch (name) {
      case 'api_request': {
        const model = a.str('model') ?? 'unknown';
        if (model !== s.model) {
          out.push({
            ...base('model'),
            type: 'agent_start',
            model,
            provider: PROVIDER,
            thinkingLevel: a.str('effort') ?? '',
          });
          s.model = model;
        }
        const input = a.num('input_tokens');
        const output = a.num('output_tokens');
        const cacheRead = a.num('cache_read_tokens');
        const cacheWrite = a.num('cache_creation_tokens');
        const cost = a.num('cost_usd');
        const durationMs = a.num('duration_ms');
        s.cumulativeCost += cost;
        s.turns++;
        out.push(
          {
            ...base('turn-start'),
            timestamp: timestamp - durationMs,
            type: 'turn_start',
            turnIndex: s.turns,
          },
          {
            ...base('tokens'),
            type: 'token_usage',
            input,
            output,
            cacheRead,
            cacheWrite,
            totalTokens: input + output + cacheRead + cacheWrite,
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: cost },
            model,
            provider: PROVIDER,
          },
          {
            ...base('cost'),
            type: 'cost',
            model,
            provider: PROVIDER,
            // Claude Code reports the request's total only.
            inputCost: 0,
            outputCost: 0,
            cacheReadCost: 0,
            cacheWriteCost: 0,
            totalCost: cost,
            cumulativeCost: s.cumulativeCost,
            currency: 'USD',
          },
          {
            ...base('latency'),
            type: 'latency',
            operation: 'api_call',
            totalMs: durationMs,
            ...(a.str('ttft_ms') !== undefined ? { ttftMs: a.num('ttft_ms') } : {}),
            model,
            provider: PROVIDER,
          }
        );
        // What the request sent is what the context held: the prompt, its cache reads and writes.
        const contextWindow = contextWindowFor(model);
        const tokensUsed = input + cacheRead + cacheWrite;
        out.push(
          {
            ...base('context'),
            type: 'context_usage',
            tokensUsed,
            contextWindow,
            utilizationPct: (tokensUsed / contextWindow) * 100,
          },
          { ...base('turn-end'), type: 'turn_end', turnIndex: s.turns, toolCallCount: 0 }
        );
        break;
      }
      case 'tool_result': {
        const toolName = a.str('tool_name') ?? 'unknown';
        const toolCallId = a.str('tool_use_id') ?? `otel:${sessionId}:${a.str('event.sequence')}`;
        const durationMs = a.num('duration_ms');
        out.push(
          {
            ...base('tool-start'),
            timestamp: timestamp - durationMs,
            type: 'tool_call_start',
            toolName,
            toolCallId,
            inputSizeBytes: a.num('tool_input_size_bytes'),
            inputPreview: '',
          },
          {
            ...base('tool-end'),
            type: 'tool_call_end',
            toolName,
            toolCallId,
            durationMs,
            outputSizeBytes: a.num('tool_result_size_bytes'),
            outputPreview: a.str('error_type') ?? '',
            isError: a.bool('success') === false,
          }
        );
        break;
      }
      case 'tool_decision': {
        // Accepted calls arrive as tool_result; only refusals need an event of their own.
        if (a.str('decision') !== 'reject') break;
        out.push({
          ...base('tool-rejected'),
          type: 'tool_call',
          toolName: a.str('tool_name') ?? 'unknown',
          toolCallId: a.str('tool_use_id') ?? `otel:${sessionId}:${a.str('event.sequence')}`,
          provider: AGENT,
          durationMs: 0,
          isError: true,
          errorMessage: `Rejected (${a.str('source') ?? 'permission'})`,
        });
        break;
      }
      case 'compaction': {
        if (a.bool('success') === false) break;
        out.push({
          ...base('compaction'),
          type: 'compaction',
          tokensBefore: a.num('pre_tokens'),
          tokensAfter: a.num('post_tokens'),
          summaryLength: 0,
          isAutomatic: a.str('trigger') !== 'manual',
        });
        break;
      }
      case 'api_error': {
        out.push({
          ...base('api-error'),
          type: 'custom',
          provider: AGENT,
          eventName: 'api_error',
          data: {
            model: a.str('model') ?? 'unknown',
            error: a.str('error') ?? '',
            ...(a.str('status_code') !== undefined ? { statusCode: a.num('status_code') } : {}),
            attempt: a.num('attempt'),
          },
          durationMs: a.num('duration_ms'),
          isError: true,
          errorMessage: a.str('error') ?? 'API error',
        });
        break;
      }
      // user_prompt only opens the session (above): its text is redacted by Claude Code.
    }
    return out;
  }
}

/** Unix ms of a record: `event.timestamp` (ISO), else the record's own time. */
function recordTime(record: OtlpLogRecord, a: Attrs): number {
  const iso = a.str('event.timestamp');
  if (iso) {
    const t = Date.parse(iso);
    if (Number.isFinite(t)) return t;
  }
  const nanos = record.timeUnixNano ?? record.observedTimeUnixNano;
  if (nanos !== undefined && String(nanos) !== '0')
    return Math.floor(Number(BigInt(String(nanos)) / 1_000_000n));
  return Date.now();
}
