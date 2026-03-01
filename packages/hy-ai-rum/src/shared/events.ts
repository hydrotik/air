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
  category:
    | 'system_prompt'
    | 'context_files' // CLAUDE.md, AGENTS.md
    | 'skills'
    | 'user_messages'
    | 'assistant_messages'
    | 'tool_results'
    | 'compaction_summary'
    | 'custom_messages'
    | 'thinking';
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
  method: string;
  toolName?: string;
  serverName: string;
}

export interface McpResponseEvent extends BaseEvent {
  type: 'mcp_response';
  method: string;
  toolName?: string;
  serverName: string;
  durationMs: number;
  isError: boolean;
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
