// ─── Telemetry Events ───────────────────────────────────────────────────────
// Sent from pi extension collector → RUM server via WebSocket

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
  inputPreview: string; // first 200 chars
}

export interface ToolCallEndEvent extends BaseEvent {
  type: 'tool_call_end';
  toolName: string;
  toolCallId: string;
  durationMs: number;
  outputSizeBytes: number;
  outputPreview: string;
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
  inputPreview?: string;
}

export interface McpResponseEvent extends BaseEvent {
  type: 'mcp_response';
  method: string;
  toolName?: string;
  resourceUri?: string;
  serverName: string;
  durationMs: number;
  outputSizeBytes?: number;
  outputPreview?: string;
  isError: boolean;
  errorMessage?: string;
}

// ─── RAG Events ────────────────────────────────────────────────────────────
// For instrumenting retrieval-augmented generation pipelines

export interface RagRetrievalEvent extends BaseEvent {
  type: 'rag_retrieval';
  source: string;         // name of the retrieval source / vector DB
  query: string;          // search query or embedding input (truncated)
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
  | HeartbeatEvent;

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
}
