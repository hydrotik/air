import React, { useEffect, useState, useMemo } from 'react';
import { useTelemetry } from '../hooks/useTelemetry';
import { KpiCard } from '../components/KpiCard';
import { EventFeed } from '../components/EventFeed';
import { SessionSelector } from '../components/SessionSelector';
import { ContextTreemap } from '../visualizations/ContextTreemap';
import { ToolWaterfall } from '../visualizations/ToolWaterfall';
import { TokenFlowChart } from '../visualizations/TokenFlowChart';
import { ContextUtilizationChart } from '../visualizations/ContextUtilizationChart';
import { McpStatsPanel } from '../visualizations/McpStatsPanel';
import { RagStatsPanel } from '../visualizations/RagStatsPanel';
import type { TelemetryEvent, SessionSummary, ContextSegment } from '../../shared/events';
import {
  shell,
  header,
  headerLeft,
  logo,
  statusDot,
  main,
  kpiRow,
  gridRow,
  panel,
  panelHeader,
  panelBody,
  emptyState,
} from '../dashboard.css';

export const DashboardPage: React.FC = () => {
  const {
    events,
    sessions,
    connected,
    fetchSessionEvents,
    fetchToolCalls,
    fetchContextSnapshots,
    fetchLatestBreakdown,
    fetchMcpStats,
    fetchRagStats,
  } = useTelemetry();

  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionEvents, setSessionEvents] = useState<TelemetryEvent[]>([]);
  const [toolCalls, setToolCalls] = useState<any[]>([]);
  const [contextSnapshots, setContextSnapshots] = useState<any[]>([]);
  const [breakdown, setBreakdown] = useState<{ segments: ContextSegment[]; tokens_used: number; context_window: number } | null>(null);
  const [mcpStats, setMcpStats] = useState<any[]>([]);
  const [ragStats, setRagStats] = useState<any[]>([]);

  // Map API response shape to our state shape
  const mapBreakdown = (data: any) => {
    if (!data) return null;
    return {
      segments: data.breakdown ?? data.segments ?? [],
      tokens_used: data.tokens_used ?? 0,
      context_window: data.context_window ?? 200_000,
    };
  };

  // Auto-select most recent session
  useEffect(() => {
    if (sessions.length > 0 && !activeSessionId) {
      setActiveSessionId(sessions[0].sessionId);
    }
  }, [sessions, activeSessionId]);

  // Load session data when active session changes
  useEffect(() => {
    if (!activeSessionId) return;

    fetchSessionEvents(activeSessionId).then(setSessionEvents);
    fetchToolCalls(activeSessionId).then(setToolCalls);
    fetchContextSnapshots(activeSessionId).then(setContextSnapshots);
    fetchLatestBreakdown(activeSessionId).then((d) => setBreakdown(mapBreakdown(d)));
    fetchMcpStats(activeSessionId).then(setMcpStats);
    fetchRagStats(activeSessionId).then(setRagStats);
  }, [activeSessionId, fetchSessionEvents, fetchToolCalls, fetchContextSnapshots, fetchLatestBreakdown, fetchMcpStats, fetchRagStats]);

  // Refresh session data when new events arrive for active session
  useEffect(() => {
    if (!activeSessionId) return;
    const relevant = events.filter((e) => e.sessionId === activeSessionId);
    if (relevant.length > 0) {
      setSessionEvents((prev) => [...prev, ...relevant]);

      // Refresh on specific event types
      const types = new Set(relevant.map((e) => e.type));
      if (types.has('tool_call_end')) fetchToolCalls(activeSessionId).then(setToolCalls);
      if (types.has('context_breakdown') || types.has('context_usage')) {
        fetchContextSnapshots(activeSessionId).then(setContextSnapshots);
        fetchLatestBreakdown(activeSessionId).then((d) => setBreakdown(mapBreakdown(d)));
      }
      if (types.has('mcp_response')) fetchMcpStats(activeSessionId).then(setMcpStats);
      if (types.has('rag_retrieval') || types.has('rag_embedding') || types.has('rag_index')) {
        fetchRagStats(activeSessionId).then(setRagStats);
      }
    }
  }, [events, activeSessionId, fetchToolCalls, fetchContextSnapshots, fetchLatestBreakdown, fetchMcpStats, fetchRagStats]);

  // Compute KPIs from active session
  const activeSession: SessionSummary | undefined = sessions.find((s) => s.sessionId === activeSessionId);

  const kpis = useMemo(() => {
    if (!activeSession) {
      return {
        totalTokens: '—',
        totalCost: '—',
        toolCalls: '—',
        turns: '—',
        compactions: '—',
        contextPct: '—',
      };
    }
    // Use latest context snapshot tokens (real context window usage) instead of marginal API tokens
    const latestCtx = contextSnapshots.length > 0 ? contextSnapshots[contextSnapshots.length - 1] : null;
    const ctxTokens = latestCtx?.tokens_used ?? 0;

    return {
      totalTokens: formatTokens(ctxTokens),
      totalCost: `$${activeSession.totalCost.toFixed(4)}`,
      toolCalls: String(activeSession.toolCallCount),
      turns: String(activeSession.turnCount),
      compactions: String(activeSession.compactionCount),
      contextPct: `${activeSession.contextUtilizationPct.toFixed(1)}%`,
    };
  }, [activeSession, contextSnapshots]);

  return (
    <div className={shell}>
      {/* Header */}
      <div className={header}>
        <div className={headerLeft}>
          <span className={logo}>⚡ AIr</span>
          <span
            className={statusDot}
            style={{ background: connected ? '#22c55e' : '#ef4444' }}
            title={connected ? 'Connected' : 'Disconnected'}
          />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, opacity: 0.5 }}>
            {connected ? 'Live' : 'Reconnecting…'}
          </span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, opacity: 0.4 }}>
          {sessions.length} session{sessions.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className={main}>
        {/* KPI Row */}
        <div className={kpiRow}>
          <KpiCard label="Total Tokens" value={kpis.totalTokens} sub="context window" color="#3b82f6" />
          <KpiCard label="Total Cost" value={kpis.totalCost} sub="this session" color="#10b981" />
          <KpiCard label="Tool Calls" value={kpis.toolCalls} sub="executions" color="#f59e0b" />
          <KpiCard label="Turns" value={kpis.turns} sub="LLM roundtrips" color="#8b5cf6" />
          <KpiCard label="Compactions" value={kpis.compactions} sub="context resets" color="#ef4444" />
          <KpiCard label="Context" value={kpis.contextPct} sub="window used" color="#ec4899" />
        </div>

        {/* Context Window Section */}
        <div className={gridRow}>
          <div className={panel}>
            <div className={panelHeader}>
              <span>Context Window Breakdown</span>
              <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>treemap</span>
            </div>
            <div className={panelBody}>
              <ContextTreemap
                segments={breakdown?.segments ?? []}
                totalTokens={breakdown?.tokens_used ?? 0}
                contextWindow={breakdown?.context_window ?? 200_000}
              />
            </div>
          </div>

          <div className={panel}>
            <div className={panelHeader}>
              <span>Context Utilization Over Time</span>
              <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>% of window</span>
            </div>
            <div className={panelBody}>
              <ContextUtilizationChart snapshots={contextSnapshots} />
            </div>
          </div>
        </div>

        {/* Token Flow + Tool Waterfall */}
        <div className={gridRow}>
          <div className={panel}>
            <div className={panelHeader}>
              <span>Token Flow</span>
              <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>per turn</span>
            </div>
            <div className={panelBody}>
              <TokenFlowChart events={sessionEvents} />
            </div>
          </div>

          <div className={panel}>
            <div className={panelHeader}>
              <span>Tool Call Waterfall</span>
              <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>timeline</span>
            </div>
            <div className={panelBody} style={{ overflow: 'auto', maxHeight: 280 }}>
              <ToolWaterfall toolCalls={toolCalls} />
            </div>
          </div>
        </div>

        {/* MCP + RAG Stats (conditional — only when data exists) */}
        {(mcpStats.length > 0 || ragStats.length > 0) && (
          <div className={gridRow}>
            <div className={panel}>
              <div className={panelHeader}>
                <span>MCP Servers</span>
                <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                  {mcpStats.length > 0 ? `${mcpStats.reduce((s: number, r: any) => s + r.call_count, 0)} calls` : 'no data'}
                </span>
              </div>
              <div className={panelBody} style={{ overflow: 'auto', maxHeight: 200 }}>
                <McpStatsPanel stats={mcpStats} />
              </div>
            </div>

            <div className={panel}>
              <div className={panelHeader}>
                <span>RAG Pipeline</span>
                <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                  {ragStats.length > 0 ? `${ragStats.reduce((s: number, r: any) => s + r.call_count, 0)} ops` : 'no data'}
                </span>
              </div>
              <div className={panelBody} style={{ overflow: 'auto', maxHeight: 200 }}>
                <RagStatsPanel stats={ragStats} />
              </div>
            </div>
          </div>
        )}

        {/* Sessions + Live Feed */}
        <div className={gridRow}>
          <div className={panel}>
            <div className={panelHeader}>
              <span>Sessions</span>
            </div>
            <div className={panelBody} style={{ maxHeight: 240, overflow: 'auto' }}>
              <SessionSelector
                sessions={sessions}
                activeSessionId={activeSessionId}
                onSelect={setActiveSessionId}
              />
            </div>
          </div>

          <div className={panel}>
            <div className={panelHeader}>
              <span>Live Event Feed</span>
              <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>{events.length} events</span>
            </div>
            <div className={panelBody} style={{ padding: 0 }}>
              <EventFeed events={events} />
            </div>
          </div>
        </div>

        {!activeSession && (
          <div className={emptyState}>
            <div style={{ fontSize: 32 }}>🔬</div>
            <div>No telemetry data yet</div>
            <div style={{ opacity: 0.5 }}>
              Start a pi session with the AIr collector extension to see data here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
