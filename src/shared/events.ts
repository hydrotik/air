// ─── Telemetry Events ───────────────────────────────────────────────────────
// Sent from collectors (pi, Claude Code, Codex, SDK) → AIr server via WebSocket or HTTP
//
// SECURITY: Events contain metadata only by default. Content fields (inputPreview,
// outputPreview, query) are subject to server-side redaction based on RedactionLevel.
// No raw prompts, API keys, credentials, or PII should ever be included in events.
// Collectors MUST strip sensitive data before emission. See RedactionConfig.

export interface BaseEvent {
  id: string;
  sessionId: string;
  timestamp: number; // Unix ms
}

// ─── Tool Events ────────────────────────────────────────────────────────────

export interface ToolCallStartEvent extends BaseEvent {
  type: 'tool_call_start';
  toolName: string;
  toolCallId: string;
  inputSizeBytes: number;
  inputPreview: string; // first N chars — redacted by server based on RedactionLevel
}

export interface ToolCallEndEvent extends BaseEvent {
  type: 'tool_call_end';
  toolName: string;
  toolCallId: string;
  durationMs: number;
  outputSizeBytes: number;
  outputPreview: string; // redacted by server
  isError: boolean;
}

// ─── Turn / Agent Events ────────────────────────────────────────────────────

export interface TurnStartEvent extends BaseEvent {
  type: 'turn_start';
  turnIndex: number;
}

export interface TurnEndEvent extends BaseEvent {
  type: 'turn_end';
  turnIndex: number;
  toolCallCount: number;
}

export interface AgentStartEvent extends BaseEvent {
  type: 'agent_start';
  model: string;
  provider: string;
  thinkingLevel: string;
}

export interface AgentEndEvent extends BaseEvent {
  type: 'agent_end';
  messageCount: number;
}

// ─── Token & Context Events ────────────────────────────────────────────────

export interface TokenUsageEvent extends BaseEvent {
  type: 'token_usage';
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  totalTokens: number;
  cost: {
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    total: number;
  };
  model: string;
  provider: string;
}

export interface ContextUsageEvent extends BaseEvent {
  type: 'context_usage';
  tokensUsed: number;
  contextWindow: number; // model's max context
  utilizationPct: number;
}

// ─── Context Breakdown ─────────────────────────────────────────────────────
// Detailed breakdown of what's consuming the context window

export interface ContextSegment {
  category: string;
  // Known categories:
  // System prompt sub-sections: sp_base, sp_claude_md, sp_skills, sp_tools, sp_prompt_templates, sp_extensions, sp_other
  // Messages: user_messages, assistant_messages, tool_results, thinking, compaction_summary, custom_messages
  // File-level tool results: tr_gsd, tr_desloppify, tr_source_code, tr_config, tr_docs, tr_tests, tr_styles, tool_results_other
  // Legacy: system_prompt, context_files, skills
  label: string;
  estimatedTokens: number;
  charCount: number;
}

export interface ContextBreakdownEvent extends BaseEvent {
  type: 'context_breakdown';
  segments: ContextSegment[];
  totalTokens: number;
  contextWindow: number;
}

// ─── Compaction Events ─────────────────────────────────────────────────────

export interface CompactionEvent extends BaseEvent {
  type: 'compaction';
  tokensBefore: number;
  tokensAfter: number;
  summaryLength: number;
  isAutomatic: boolean;
}

// ─── Model Events ──────────────────────────────────────────────────────────

export interface ModelChangeEvent extends BaseEvent {
  type: 'model_change';
  previousModel?: string;
  previousProvider?: string;
  newModel: string;
  newProvider: string;
  source: string; // 'set' | 'cycle' | 'restore'
}

// ─── Session Events ────────────────────────────────────────────────────────

export interface SessionStartEvent extends BaseEvent {
  type: 'session_start';
  cwd: string;
  model: string;
  provider: string;
  /** Which CLI/agent emitted this session: 'pi' | 'claude-code' | 'codex' | 'sdk' */
  agent?: string;
}

export interface SessionEndEvent extends BaseEvent {
  type: 'session_end';
}

// ─── MCP Events ────────────────────────────────────────────────────────────
// For instrumenting MCP protocol-level calls

export interface McpRequestEvent extends BaseEvent {
  type: 'mcp_request';
  method: string;        // 'tools/call' | 'resources/read' | 'prompts/get' | etc.
  toolName?: string;
  resourceUri?: string;
  serverName: string;
  inputSizeBytes?: number;
  inputPreview?: string; // redacted by server
}

export interface McpResponseEvent extends BaseEvent {
  type: 'mcp_response';
  method: string;
  toolName?: string;
  resourceUri?: string;
  serverName: string;
  durationMs: number;
  outputSizeBytes?: number;
  outputPreview?: string; // redacted by server
  isError: boolean;
  errorMessage?: string;
}

// ─── RAG Events ────────────────────────────────────────────────────────────
// For instrumenting retrieval-augmented generation pipelines

export interface RagRetrievalEvent extends BaseEvent {
  type: 'rag_retrieval';
  source: string;         // name of the retrieval source / vector DB
  query: string;          // search query — redacted by server
  resultCount: number;
  topScore?: number;      // relevance score of best result (0-1)
  durationMs: number;
  chunkSizes?: number[];  // token/char sizes of returned chunks
  totalChunkTokens?: number;
  metadata?: Record<string, unknown>;
}

export interface RagEmbeddingEvent extends BaseEvent {
  type: 'rag_embedding';
  source: string;
  model: string;          // embedding model name
  inputTokens: number;
  durationMs: number;
  dimensions?: number;    // embedding vector dimensions
  batchSize?: number;
}

export interface RagIndexEvent extends BaseEvent {
  type: 'rag_index';
  source: string;
  documentCount: number;
  totalTokens: number;
  durationMs: number;
  metadata?: Record<string, unknown>;
}

// ─── Custom / Provider Events ──────────────────────────────────────────────
// Generic event for extending AIr with custom providers

export interface CustomEvent extends BaseEvent {
  type: 'custom';
  provider: string;       // provider name (e.g. 'my-rag', 'langchain', 'llamaindex')
  eventName: string;      // provider-specific event name
  data: Record<string, unknown>;
  durationMs?: number;
  isError?: boolean;
  errorMessage?: string;
}

// ─── Heartbeat ─────────────────────────────────────────────────────────────

export interface HeartbeatEvent extends BaseEvent {
  type: 'heartbeat';
  contextTokens?: number;
  contextWindow?: number;
}

// ─── Latency Events ────────────────────────────────────────────────────────
// Detailed timing breakdown for turns and operations

export interface LatencyEvent extends BaseEvent {
  type: 'latency';
  /** What this latency measurement covers */
  operation: 'turn' | 'tool_call' | 'api_call' | 'ttft' | 'custom';
  /** Total wall-clock time in ms */
  totalMs: number;
  /** Time to first token (for streaming responses), ms */
  ttftMs?: number;
  /** Breakdown of time spent in each phase */
  phases?: LatencyPhase[];
  model?: string;
  provider?: string;
  /** Percentile bucket for this measurement: p50 | p90 | p95 | p99 */
  percentile?: string;
}

export interface LatencyPhase {
  name: string;    // 'thinking' | 'tool_execution' | 'response_generation' | 'network' | custom
  durationMs: number;
}

// ─── Cost Events ───────────────────────────────────────────────────────────
// Aggregated cost tracking and budget alerts

export interface CostEvent extends BaseEvent {
  type: 'cost';
  model: string;
  provider: string;
  /** Individual cost components */
  inputCost: number;
  outputCost: number;
  cacheReadCost: number;
  cacheWriteCost: number;
  totalCost: number;
  /** Cumulative session cost at this point */
  cumulativeCost: number;
  /** Budget threshold — if set, alerts when cumulative exceeds */
  budgetLimit?: number;
  /** Whether this event crossed the budget threshold */
  budgetExceeded?: boolean;
  currency: string; // 'USD'
}

// ─── Output Evaluation Events ──────────────────────────────────────────────
// Quality metrics for LLM outputs — no content stored, only measurements

export interface OutputEvalEvent extends BaseEvent {
  type: 'output_eval';
  turnIndex: number;
  model: string;
  provider: string;
  /** Quantitative quality signals (no content — metadata only) */
  metrics: {
    /** Response length in tokens */
    responseTokens: number;
    /** Number of tool calls made in this turn */
    toolCallCount: number;
    /** Number of tool errors in this turn */
    toolErrorCount: number;
    /** Tool success rate (0-1) */
    toolSuccessRate: number;
    /** Whether the turn required a retry / follow-up correction */
    hadRetry: boolean;
    /** Whether the user sent an immediate follow-up (potential dissatisfaction signal) */
    hadImmediateFollowUp: boolean;
    /** Time between user message and final response, ms */
    responseLatencyMs: number;
    /** Ratio of cache hits to total input tokens (efficiency signal) */
    cacheHitRate: number;
  };
  /** Optional user-provided quality rating (1-5 stars) */
  userRating?: number;
  /** Optional tags: 'accurate' | 'hallucination' | 'incomplete' | 'verbose' | custom */
  tags?: string[];
}

// ─── Prompt Rating Events ──────────────────────────────────────────────────
// Track prompt variants and their effectiveness — no prompt content stored
//
// SECURITY: promptHash is a one-way hash of the prompt text. The actual prompt
// content is NEVER stored in AIr. Only the hash, variant label, and metrics.

export interface PromptRatingEvent extends BaseEvent {
  type: 'prompt_rating';
  /** One-way hash of the prompt text (SHA-256, first 16 chars). No raw content. */
  promptHash: string;
  /** Human-readable variant label: 'baseline' | 'v2-concise' | 'v3-cot' | custom */
  variant: string;
  /** Category/purpose of this prompt: 'system' | 'tool_guidance' | 'few_shot' | custom */
  category: string;
  model: string;
  provider: string;
  /** Effectiveness signals */
  metrics: {
    /** Did the response achieve the user's goal? (inferred or explicit) */
    goalAchieved: boolean;
    /** Number of turns needed to complete the task */
    turnsToComplete: number;
    /** Total tokens consumed (input + output) */
    totalTokens: number;
    /** Total cost for this prompt interaction */
    totalCost: number;
    /** Total latency from prompt to final response, ms */
    totalLatencyMs: number;
    /** Tool error rate during this interaction */
    toolErrorRate: number;
    /** Did the interaction require compaction? */
    requiredCompaction: boolean;
  };
  /** Optional explicit rating (1-5) */
  rating?: number;
  /** Optional notes (keep brief — no sensitive data) */
  notes?: string;
}

// ─── Drift Detection Events ────────────────────────────────────────────────
// Tracks metric baselines and detects when behavior deviates significantly

export interface DriftEvent extends BaseEvent {
  type: 'drift';
  /** Which metric drifted */
  metric: string; // 'latency' | 'cost' | 'token_usage' | 'error_rate' | 'cache_hit_rate' | custom
  model: string;
  provider: string;
  /** Baseline value (rolling average from recent history) */
  baseline: number;
  /** Current value that triggered the drift alert */
  current: number;
  /** Deviation from baseline as a percentage */
  deviationPct: number;
  /** Direction of the drift */
  direction: 'increase' | 'decrease';
  /** Severity based on deviation magnitude */
  severity: 'info' | 'warning' | 'critical';
  /** Window size used to compute baseline (number of samples) */
  windowSize: number;
  /** Threshold that was exceeded to trigger this event */
  threshold: number;
}

// ─── Data Redaction ────────────────────────────────────────────────────────
// Server-side content sanitization. Applied during ingestion.
//
// Levels:
//   'none'    — store everything as-is (development only, NOT recommended)
//   'preview' — truncate previews to 50 chars, redact paths/emails/tokens
//   'full'    — strip ALL content fields, keep only sizes and metadata
//
// Default: 'preview'

export type RedactionLevel = 'none' | 'preview' | 'full';

export interface RedactionConfig {
  /** Content redaction level (default: 'preview') */
  level: RedactionLevel;
  /** Additional regex patterns to redact (applied to all string fields) */
  customPatterns?: RegExp[];
  /** Fields to always strip regardless of level */
  stripFields?: string[];
}

// ─── Union Type ────────────────────────────────────────────────────────────

export type TelemetryEvent =
  | ToolCallStartEvent
  | ToolCallEndEvent
  | TurnStartEvent
  | TurnEndEvent
  | AgentStartEvent
  | AgentEndEvent
  | TokenUsageEvent
  | ContextUsageEvent
  | ContextBreakdownEvent
  | CompactionEvent
  | ModelChangeEvent
  | SessionStartEvent
  | SessionEndEvent
  | McpRequestEvent
  | McpResponseEvent
  | RagRetrievalEvent
  | RagEmbeddingEvent
  | RagIndexEvent
  | CustomEvent
  | HeartbeatEvent
  | LatencyEvent
  | CostEvent
  | OutputEvalEvent
  | PromptRatingEvent
  | DriftEvent;

// ─── Dashboard Messages (Server → Dashboard via WebSocket) ─────────────────

export interface DashboardMessage {
  type: 'event' | 'snapshot' | 'error';
  data: TelemetryEvent | SessionSnapshot | { message: string };
}

export interface SessionSnapshot {
  sessionId: string;
  events: TelemetryEvent[];
  summary: SessionSummary;
}

export interface SessionSummary {
  sessionId: string;
  startTime: number;
  lastEventTime: number;
  model: string;
  provider: string;
  cwd: string;
  totalTokensIn: number;
  totalTokensOut: number;
  totalCost: number;
  toolCallCount: number;
  turnCount: number;
  compactionCount: number;
  avgToolDurationMs: number;
  contextUtilizationPct: number;
  /** Which CLI/agent: 'pi' | 'claude-code' | 'codex' | 'sdk' */
  agent: string;
}

// ─── Model Pricing ─────────────────────────────────────────────────────────
// Known model pricing for auto-cost calculation. Prices per 1M tokens (USD).

export interface ModelPricing {
  inputPer1M: number;
  outputPer1M: number;
  cacheReadPer1M?: number;
  cacheWritePer1M?: number;
}

/** Built-in pricing table — updated periodically. Override via server config. */
export const MODEL_PRICING: Record<string, ModelPricing> = {
  // Anthropic
  'claude-sonnet-4-20250514': { inputPer1M: 3, outputPer1M: 15, cacheReadPer1M: 0.3, cacheWritePer1M: 3.75 },
  'claude-4-sonnet': { inputPer1M: 3, outputPer1M: 15, cacheReadPer1M: 0.3, cacheWritePer1M: 3.75 },
  'claude-opus-4-20250514': { inputPer1M: 15, outputPer1M: 75, cacheReadPer1M: 1.5, cacheWritePer1M: 18.75 },
  'claude-4-opus': { inputPer1M: 15, outputPer1M: 75, cacheReadPer1M: 1.5, cacheWritePer1M: 18.75 },
  'claude-3-7-sonnet-20250219': { inputPer1M: 3, outputPer1M: 15, cacheReadPer1M: 0.3, cacheWritePer1M: 3.75 },
  'claude-3-5-sonnet-20241022': { inputPer1M: 3, outputPer1M: 15, cacheReadPer1M: 0.3, cacheWritePer1M: 3.75 },
  'claude-3-5-haiku-20241022': { inputPer1M: 0.8, outputPer1M: 4, cacheReadPer1M: 0.08, cacheWritePer1M: 1 },
  // OpenAI
  'gpt-4o': { inputPer1M: 2.5, outputPer1M: 10, cacheReadPer1M: 1.25 },
  'gpt-4o-mini': { inputPer1M: 0.15, outputPer1M: 0.6, cacheReadPer1M: 0.075 },
  'gpt-4.1': { inputPer1M: 2, outputPer1M: 8, cacheReadPer1M: 0.5 },
  'gpt-4.1-mini': { inputPer1M: 0.4, outputPer1M: 1.6, cacheReadPer1M: 0.1 },
  'gpt-4.1-nano': { inputPer1M: 0.1, outputPer1M: 0.4, cacheReadPer1M: 0.025 },
  'o3': { inputPer1M: 2, outputPer1M: 8, cacheReadPer1M: 0.5 },
  'o3-mini': { inputPer1M: 1.1, outputPer1M: 4.4, cacheReadPer1M: 0.275 },
  'o4-mini': { inputPer1M: 1.1, outputPer1M: 4.4, cacheReadPer1M: 0.275 },
  'codex-mini-latest': { inputPer1M: 1.5, outputPer1M: 6 },
  // Google
  'gemini-2.5-pro': { inputPer1M: 1.25, outputPer1M: 10 },
  'gemini-2.5-flash': { inputPer1M: 0.15, outputPer1M: 0.6 },
  'gemini-2.0-flash': { inputPer1M: 0.1, outputPer1M: 0.4 },
};

/**
 * Compute cost for a token usage event using the pricing table.
 * Returns null if model pricing is unknown.
 */
export function computeCost(
  model: string,
  input: number,
  output: number,
  cacheRead = 0,
  cacheWrite = 0,
): { input: number; output: number; cacheRead: number; cacheWrite: number; total: number } | null {
  // Try exact match, then fuzzy match (model IDs often have date suffixes)
  const pricing = MODEL_PRICING[model] ?? Object.entries(MODEL_PRICING).find(([k]) => model.startsWith(k))?.[1];
  if (!pricing) return null;

  const inputCost = (input / 1_000_000) * pricing.inputPer1M;
  const outputCost = (output / 1_000_000) * pricing.outputPer1M;
  const cacheReadCost = (cacheRead / 1_000_000) * (pricing.cacheReadPer1M ?? pricing.inputPer1M);
  const cacheWriteCost = (cacheWrite / 1_000_000) * (pricing.cacheWritePer1M ?? pricing.inputPer1M);

  return {
    input: inputCost,
    output: outputCost,
    cacheRead: cacheReadCost,
    cacheWrite: cacheWriteCost,
    total: inputCost + outputCost + cacheReadCost + cacheWriteCost,
  };
}
