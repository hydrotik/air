import type { SessionSummary, TelemetryEvent } from '@hydrotik/air';

/** Fixed clock used by tests that render relative times ("5m ago"). */
export const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);

export function makeSession(overrides: Partial<SessionSummary> = {}): SessionSummary {
  return {
    sessionId: 's1',
    startTime: NOW - 3_600_000,
    lastEventTime: NOW - 5 * 60_000,
    model: 'sonnet-4',
    provider: 'anthropic',
    cwd: '/work/projects/air-demo',
    totalTokensIn: 12_000,
    totalTokensOut: 3_400,
    totalCost: 0.12345,
    toolCallCount: 17,
    turnCount: 6,
    compactionCount: 1,
    avgToolDurationMs: 120,
    contextUtilizationPct: 42.25,
    agent: 'claude-code',
    ...overrides,
  };
}

let seq = 0;

/** Builds a telemetry event; `fields` supplies the type-specific payload. */
export function makeEvent(
  type: TelemetryEvent['type'],
  fields: Record<string, unknown> = {}
): TelemetryEvent {
  seq += 1;
  return {
    id: `evt-${seq}`,
    sessionId: 's1',
    timestamp: NOW,
    type,
    ...fields,
  } as unknown as TelemetryEvent;
}

export function tokenUsage(input: number, output: number, fields: Record<string, unknown> = {}) {
  return makeEvent('token_usage', {
    input,
    output,
    cacheRead: 0,
    cacheWrite: 0,
    totalTokens: input + output,
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0.0123 },
    model: 'sonnet-4',
    provider: 'anthropic',
    ...fields,
  });
}
