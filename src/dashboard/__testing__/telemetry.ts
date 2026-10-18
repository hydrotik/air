import type { SessionSummary, TelemetryEvent } from '../../shared/events';
import type { useTelemetry } from '../hooks/useTelemetry';

type Telemetry = ReturnType<typeof useTelemetry>;

/** Per-endpoint responses for a mocked `useTelemetry`. Missing keys resolve to []. */
export interface TelemetryData {
  sessionEvents?: TelemetryEvent[];
  toolCalls?: unknown[];
  contextSnapshots?: unknown[];
  latestBreakdown?: unknown;
  mcpStats?: unknown[];
  ragStats?: unknown[];
  latencyStats?: unknown[];
  latencyTimeseries?: unknown[];
  costBreakdown?: unknown[];
  costTimeseries?: unknown[];
  evalStats?: unknown[];
  evalTimeseries?: unknown[];
  promptVariants?: unknown[];
  driftEvents?: unknown[];
  driftSummary?: unknown[];
  mcpTimeseries?: unknown[];
  ragTimeseries?: unknown[];
  toolTimeseries?: unknown[];
}

export interface TelemetryState {
  events?: TelemetryEvent[];
  sessions?: SessionSummary[];
  connected?: boolean;
  redactionLevel?: string;
  providers?: { rag: any[]; mcp: any[] };
}

const resolver = (value: unknown) => jest.fn(() => Promise.resolve(value));

/** A complete `useTelemetry` return value whose fetchers are jest mocks over `data`. */
export function mockTelemetry(state: TelemetryState = {}, data: TelemetryData = {}): Telemetry {
  return {
    events: state.events ?? [],
    sessions: state.sessions ?? [],
    connected: state.connected ?? false,
    redactionLevel: state.redactionLevel ?? 'preview',
    providers: state.providers ?? { rag: [], mcp: [] },
    fetchSessionEvents: resolver(data.sessionEvents ?? []),
    fetchToolStats: resolver([]),
    fetchToolCalls: resolver(data.toolCalls ?? []),
    fetchContextSnapshots: resolver(data.contextSnapshots ?? []),
    fetchLatestBreakdown: resolver(data.latestBreakdown ?? { segments: [] }),
    fetchMcpStats: resolver(data.mcpStats ?? []),
    fetchRagStats: resolver(data.ragStats ?? []),
    fetchProviderSummary: resolver([]),
    refreshSessions: jest.fn(() => Promise.resolve()),
    fetchLatencyStats: resolver(data.latencyStats ?? []),
    fetchLatencyTimeseries: resolver(data.latencyTimeseries ?? []),
    fetchCostBreakdown: resolver(data.costBreakdown ?? []),
    fetchCostTimeseries: resolver(data.costTimeseries ?? []),
    fetchEvalStats: resolver(data.evalStats ?? []),
    fetchEvalTimeseries: resolver(data.evalTimeseries ?? []),
    fetchPromptVariants: resolver(data.promptVariants ?? []),
    fetchDriftEvents: resolver(data.driftEvents ?? []),
    fetchDriftSummary: resolver(data.driftSummary ?? []),
    fetchMcpTimeseries: resolver(data.mcpTimeseries ?? []),
    fetchRagTimeseries: resolver(data.ragTimeseries ?? []),
    fetchToolTimeseries: resolver(data.toolTimeseries ?? []),
  } as unknown as Telemetry;
}

/** Realistic per-endpoint data for a populated session. */
export const fullData: TelemetryData = {
  contextSnapshots: [
    { timestamp: 1, tokens_used: 90_000, context_window: 200_000, utilization: 45 },
    { timestamp: 2, tokens_used: 150_000, context_window: 200_000, utilization: 75 },
  ],
  latestBreakdown: {
    breakdown: [
      { category: 'sp_base', label: 'System Prompt', estimatedTokens: 40_000, charCount: 1 },
    ],
    tokens_used: 150_000,
    context_window: 200_000,
  },
  latencyStats: [
    {
      operation: 'turn',
      sample_count: 4,
      avg_ms: 1200.4,
      min_ms: 900,
      max_ms: 1600,
      avg_ttft_ms: 300,
      model: 'm',
      provider: 'p',
    },
    {
      operation: 'tool_call',
      sample_count: 9,
      avg_ms: 99.6,
      min_ms: 10,
      max_ms: 300,
      avg_ttft_ms: null,
      model: 'm',
      provider: 'p',
    },
  ],
  costBreakdown: [
    {
      model: 'opus',
      provider: 'p',
      event_count: 3,
      total_input_cost: 0.1,
      total_output_cost: 0.2,
      total_cache_read_cost: 0,
      total_cache_write_cost: 0,
      total_cost: 0.3,
      cumulative_cost: 0.3,
      budget_limit: null,
      budget_exceeded: 0,
    },
    {
      model: 'haiku',
      provider: 'p',
      event_count: 1,
      total_input_cost: 0.01,
      total_output_cost: 0.02,
      total_cache_read_cost: 0,
      total_cache_write_cost: 0,
      total_cost: 0.0234,
      cumulative_cost: 0.3234,
      budget_limit: null,
      budget_exceeded: 0,
    },
  ],
  evalStats: [
    {
      model: 'opus',
      provider: 'p',
      eval_count: 7,
      avg_response_tokens: 1,
      avg_tool_success_rate: 0.9,
      total_retries: 0,
      total_follow_ups: 0,
      avg_response_latency_ms: 1,
      avg_cache_hit_rate: 0.5,
      avg_user_rating: null,
      rated_count: 0,
    },
  ],
  promptVariants: [
    {
      prompt_hash: 'a',
      variant: 'alpha',
      category: 'c',
      model: 'm',
      sample_count: 1,
      goal_rate: 1,
      avg_turns: 1,
      avg_tokens: 1,
      avg_cost: 0,
      avg_latency_ms: 0,
      avg_tool_error_rate: 0,
      compaction_rate: 0,
      avg_rating: null,
      rated_count: 0,
    },
    {
      prompt_hash: 'b',
      variant: 'beta',
      category: 'c',
      model: 'm',
      sample_count: 1,
      goal_rate: 1,
      avg_turns: 1,
      avg_tokens: 1,
      avg_cost: 0,
      avg_latency_ms: 0,
      avg_tool_error_rate: 0,
      compaction_rate: 0,
      avg_rating: null,
      rated_count: 0,
    },
  ],
  driftEvents: [
    {
      id: 1,
      session_id: 's1',
      timestamp: 0,
      metric: 'latency',
      model: 'opus',
      provider: 'p',
      baseline: 1,
      current_val: 2,
      deviation_pct: 100,
      direction: 'increase',
      severity: 'critical',
      window_size: 1,
      threshold: 1,
    },
  ],
  driftSummary: [
    {
      metric: 'latency',
      severity: 'critical',
      event_count: 1,
      avg_deviation_pct: 100,
      max_deviation_pct: 100,
      first_seen: 0,
      last_seen: 0,
    },
  ],
  mcpStats: [
    {
      server_name: 'fs',
      method: 'tools/call',
      tool_name: 'read',
      call_count: 5,
      avg_ms: 1,
      min_ms: 1,
      max_ms: 1,
      errors: 0,
    },
    {
      server_name: 'web',
      method: 'tools/call',
      tool_name: 'get',
      call_count: 2,
      avg_ms: 1,
      min_ms: 1,
      max_ms: 1,
      errors: 0,
    },
  ],
  ragStats: [
    {
      source: 'docs',
      type: 'rag_retrieval',
      call_count: 11,
      avg_ms: 1,
      min_ms: 1,
      max_ms: 1,
      avg_results: null,
      avg_top_score: null,
      total_chunk_tokens: null,
    },
  ],
  toolTimeseries: [{ timestamp: 1, duration_ms: 10, tool_name: 'read' }],
  mcpTimeseries: [{ timestamp: 1, duration_ms: 10, server_name: 'fs', method: 'tools/call' }],
  ragTimeseries: [],
};
