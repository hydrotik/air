import React, { useEffect, useRef } from 'react';
import type { TelemetryEvent } from '../../shared/events';
import { eventFeed, eventRow, eventTime, eventType, eventDetail } from '../dashboard.css';

interface Props {
  events: TelemetryEvent[];
  maxItems?: number;
}

const TYPE_COLORS: Record<string, string> = {
  tool_call_start: '#3b82f6',
  tool_call_end: '#10b981',
  turn_start: '#6366f1',
  turn_end: '#8b5cf6',
  agent_start: '#f59e0b',
  agent_end: '#f59e0b',
  token_usage: '#06b6d4',
  context_usage: '#ec4899',
  context_breakdown: '#a855f7',
  compaction: '#ef4444',
  model_change: '#14b8a6',
  session_start: '#22c55e',
  session_end: '#64748b',
  heartbeat: '#334155',
  mcp_request: '#f97316',
  mcp_response: '#fb923c',
  rag_retrieval: '#84cc16',
  rag_embedding: '#a3e635',
  rag_index: '#65a30d',
  custom: '#94a3b8',
};

function getEventSummary(event: TelemetryEvent): string {
  switch (event.type) {
    case 'tool_call_start':
      return `${event.toolName} → ${event.inputPreview.slice(0, 80)}`;
    case 'tool_call_end':
      return `${event.toolName} ${event.isError ? '✗' : '✓'} ${event.durationMs}ms (${formatBytes(event.outputSizeBytes)})`;
    case 'turn_start':
      return `Turn #${event.turnIndex}`;
    case 'turn_end':
      return `Turn #${event.turnIndex} — ${event.toolCallCount} tool calls`;
    case 'agent_start':
      return `${event.provider}/${event.model}`;
    case 'agent_end':
      return `${event.messageCount} messages`;
    case 'token_usage':
      return `in:${formatTokens(event.input)} out:${formatTokens(event.output)} cache:${formatTokens(event.cacheRead)} $${event.cost.total.toFixed(4)}`;
    case 'context_usage':
      return `${event.utilizationPct.toFixed(1)}% (${formatTokens(event.tokensUsed)}/${formatTokens(event.contextWindow)})`;
    case 'context_breakdown':
      return `${event.segments.length} segments, ${formatTokens(event.totalTokens)} tokens`;
    case 'compaction':
      return `${formatTokens(event.tokensBefore)} tokens → summary (${event.summaryLength} chars)`;
    case 'model_change':
      return `${event.previousModel ?? '—'} → ${event.newModel}`;
    case 'session_start':
      return `${event.cwd} (${event.provider}/${event.model})`;
    case 'session_end':
      return 'Session ended';
    case 'heartbeat':
      return '♥';
    case 'mcp_request':
      return `${event.serverName}:${event.method}${event.toolName ? ` (${event.toolName})` : ''}${event.resourceUri ? ` [${event.resourceUri}]` : ''}`;
    case 'mcp_response':
      return `${event.serverName}:${event.method} ${event.isError ? '✗ ' + (event.errorMessage ?? '') : '✓'} ${event.durationMs}ms${event.outputSizeBytes ? ` (${formatBytes(event.outputSizeBytes)})` : ''}`;
    case 'rag_retrieval':
      return `${event.source} "${event.query.slice(0, 40)}" → ${event.resultCount} results ${event.durationMs}ms${event.topScore != null ? ` (score:${event.topScore.toFixed(2)})` : ''}`;
    case 'rag_embedding':
      return `${event.source} ${event.model} ${event.inputTokens} tokens ${event.durationMs}ms${event.dimensions ? ` ${event.dimensions}d` : ''}`;
    case 'rag_index':
      return `${event.source} ${event.documentCount} docs ${formatTokens(event.totalTokens)} tokens ${event.durationMs}ms`;
    case 'custom':
      return `${event.provider}:${event.eventName}${event.durationMs ? ` ${event.durationMs}ms` : ''}${event.isError ? ' ✗' : ''}`;
    default:
      return (event as TelemetryEvent).type;
  }
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatBytes(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}MB`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}KB`;
  return `${n}B`;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export const EventFeed: React.FC<Props> = ({ events, maxItems = 100 }) => {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [events]);

  const visibleEvents = events
    .filter((e) => e.type !== 'heartbeat')
    .slice(-maxItems)
    .reverse();

  return (
    <div ref={feedRef} className={eventFeed}>
      {visibleEvents.length === 0 ? (
        <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontSize: 11 }}>
          Waiting for events…
        </div>
      ) : (
        visibleEvents.map((event, i) => (
          <div key={`${event.id}-${i}`} className={eventRow}>
            <span className={eventTime}>{formatTime(event.timestamp)}</span>
            <span
              className={eventType}
              style={{
                background: `${TYPE_COLORS[event.type] ?? '#64748b'}20`,
                color: TYPE_COLORS[event.type] ?? '#64748b',
              }}
            >
              {event.type.replace(/_/g, ' ')}
            </span>
            <span className={eventDetail}>{getEventSummary(event)}</span>
          </div>
        ))
      )}
    </div>
  );
};
