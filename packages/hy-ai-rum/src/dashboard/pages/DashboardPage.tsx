import React, { useEffect, useState, useMemo } from 'react';
import { useTelemetry } from '../hooks/useTelemetry';
import { KpiCard } from '../components/KpiCard';
import { EventFeed } from '../components/EventFeed';
import { SessionSelector } from '../components/SessionSelector';
import { ContextTreemap } from '../visualizations/ContextTreemap';
import { ToolWaterfall } from '../visualizations/ToolWaterfall';
import { TokenFlowChart } from '../visualizations/TokenFlowChart';
import { ContextUtilizationChart } from '../visualizations/ContextUtilizationChart';
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
  } = useTelemetry();

  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionEvents, setSessionEvents] = useState<TelemetryEvent[]>([]);
  const [toolCalls, setToolCalls] = useState<any[]>([]);
  const [contextSnapshots, setContextSnapshots] = useState<any[]>([]);
  const [breakdown, setBreakdown] = useState<{ segments: ContextSegment[]; tokens_used: number; context_window: number } | null>(null);

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
    fetchLatestBreakdown(activeSessionId).then(setBreakdown);
  }, [activeSessionId, fetchSessionEvents, fetchToolCalls, fetchContextSnapshots, fetchLatestBreakdown]);

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
        fetchLatestBreakdown(activeSessionId).then(setBreakdown);
      }
    }
  }, [events, activeSessionId, fetchToolCalls, fetchContextSnapshots, fetchLatestBreakdown]);

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
    return {
      totalTokens: formatTokens(activeSession.totalTokensIn + activeSession.totalTokensOut),
      totalCost: `$${activeSession.totalCost.toFixed(4)}`,
      toolCalls: String(activeSession.toolCallCount),
      turns: String(activeSession.turnCount),
      compactions: String(activeSession.compactionCount),
      contextPct: `${activeSession.contextUtilizationPct.toFixed(1)}%`,
    };
  }, [activeSession]);

  return (
    <div className={shell}>
      {/* Header */}
      <div className={header}>
        <div className={headerLeft}>
          <span className={logo}>⚡ AI-RUM</span>
          <span
            className={statusDot}
            style={{ background: connected ? '#22c55e' : '#ef4444' }}
            title={connected ? 'Connected' : 'Disconnected'}
          />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, opacity: 0.5 }}>
            {connected ? 'Live' : 'Reconnecting…'}
          </span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, opacity: 0.4 }}>
          {sessions.length} session{sessions.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className={main}>
        {/* KPI Row */}
        <div className={kpiRow}>
          <KpiCard label="Total Tokens" value={kpis.totalTokens} sub="in + out" color="#3b82f6" />
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
              <span style={{ fontWeight: 400, opacity: 0.5 }}>treemap</span>
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
              <span style={{ fontWeight: 400, opacity: 0.5 }}>% of window</span>
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
              <span style={{ fontWeight: 400, opacity: 0.5 }}>per turn</span>
            </div>
            <div className={panelBody}>
              <TokenFlowChart events={sessionEvents} />
            </div>
          </div>

          <div className={panel}>
            <div className={panelHeader}>
              <span>Tool Call Waterfall</span>
              <span style={{ fontWeight: 400, opacity: 0.5 }}>timeline</span>
            </div>
            <div className={panelBody} style={{ overflow: 'auto', maxHeight: 400 }}>
              <ToolWaterfall toolCalls={toolCalls} />
            </div>
          </div>
        </div>

        {/* Sessions + Live Feed */}
        <div className={gridRow}>
          <div className={panel}>
            <div className={panelHeader}>
              <span>Sessions</span>
            </div>
            <div className={panelBody} style={{ maxHeight: 400, overflow: 'auto' }}>
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
              <span style={{ fontWeight: 400, opacity: 0.5 }}>{events.length} events</span>
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
              Start a pi session with the AI-RUM collector extension to see data here
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
