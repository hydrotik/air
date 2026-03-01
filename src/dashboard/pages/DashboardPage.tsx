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
import { LatencyPanel } from '../visualizations/LatencyPanel';
import { CostPanel } from '../visualizations/CostPanel';
import { QualityPanel } from '../visualizations/QualityPanel';
import { PromptPanel } from '../visualizations/PromptPanel';
import { DriftPanel } from '../visualizations/DriftPanel';
import { ProviderRegistryPanel } from '../visualizations/ProviderRegistryPanel';
import { ActivitySparklines } from '../visualizations/ActivitySparklines';
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

// ─── Redaction badge ──────────────────────────────────────────────────────

const REDACTION_BADGE: Record<string, { label: string; color: string; icon: string }> = {
  preview: { label: 'PREVIEW', color: '#f59e0b', icon: '🛡️' },
  full: { label: 'FULL', color: '#22c55e', icon: '🔒' },
  none: { label: 'NONE', color: '#ef4444', icon: '⚠️' },
};

export const DashboardPage: React.FC = () => {
  const {
    events,
    sessions,
    connected,
    redactionLevel,
    providers,
    fetchSessionEvents,
    fetchToolCalls,
    fetchContextSnapshots,
    fetchLatestBreakdown,
    fetchMcpStats,
    fetchRagStats,
    fetchLatencyStats,
    fetchLatencyTimeseries,
    fetchCostBreakdown,
    fetchCostTimeseries,
    fetchEvalStats,
    fetchEvalTimeseries,
    fetchPromptVariants,
    fetchDriftEvents,
    fetchDriftSummary,
    fetchMcpTimeseries,
    fetchRagTimeseries,
    fetchToolTimeseries,
  } = useTelemetry();

  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionEvents, setSessionEvents] = useState<TelemetryEvent[]>([]);
  const [toolCalls, setToolCalls] = useState<any[]>([]);
  const [contextSnapshots, setContextSnapshots] = useState<any[]>([]);
  const [breakdown, setBreakdown] = useState<{ segments: ContextSegment[]; tokens_used: number; context_window: number } | null>(null);
  const [mcpStats, setMcpStats] = useState<any[]>([]);
  const [ragStats, setRagStats] = useState<any[]>([]);
  const [latencyStats, setLatencyStats] = useState<any[]>([]);
  const [latencyTs, setLatencyTs] = useState<any[]>([]);
  const [costBreakdown, setCostBreakdown] = useState<any[]>([]);
  const [costTs, setCostTs] = useState<any[]>([]);
  const [evalStats, setEvalStats] = useState<any[]>([]);
  const [evalTs, setEvalTs] = useState<any[]>([]);
  const [promptVariants, setPromptVariants] = useState<any[]>([]);
  const [driftEvents, setDriftEvents] = useState<any[]>([]);
  const [mcpTs, setMcpTs] = useState<any[]>([]);
  const [ragTs2, setRagTs2] = useState<any[]>([]);
  const [toolTs, setToolTs] = useState<any[]>([]);
  const [driftSummary, setDriftSummary] = useState<any[]>([]);

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

  // Load all session data when active session changes
  useEffect(() => {
    if (!activeSessionId) return;

    fetchSessionEvents(activeSessionId).then(setSessionEvents);
    fetchToolCalls(activeSessionId).then(setToolCalls);
    fetchContextSnapshots(activeSessionId).then(setContextSnapshots);
    fetchLatestBreakdown(activeSessionId).then((d) => setBreakdown(mapBreakdown(d)));
    fetchMcpStats(activeSessionId).then(setMcpStats);
    fetchRagStats(activeSessionId).then(setRagStats);
    fetchLatencyStats(activeSessionId).then(setLatencyStats);
    fetchLatencyTimeseries(activeSessionId).then(setLatencyTs);
    fetchCostBreakdown(activeSessionId).then(setCostBreakdown);
    fetchCostTimeseries(activeSessionId).then(setCostTs);
    fetchEvalStats(activeSessionId).then(setEvalStats);
    fetchEvalTimeseries(activeSessionId).then(setEvalTs);
    fetchPromptVariants().then(setPromptVariants);
    fetchDriftEvents(activeSessionId).then(setDriftEvents);
    fetchDriftSummary(activeSessionId).then(setDriftSummary);
    fetchMcpTimeseries(activeSessionId).then(setMcpTs);
    fetchRagTimeseries(activeSessionId).then(setRagTs2);
    fetchToolTimeseries(activeSessionId).then(setToolTs);
  }, [activeSessionId, fetchSessionEvents, fetchToolCalls, fetchContextSnapshots,
    fetchLatestBreakdown, fetchMcpStats, fetchRagStats, fetchLatencyStats,
    fetchLatencyTimeseries, fetchCostBreakdown, fetchCostTimeseries,
    fetchEvalStats, fetchEvalTimeseries, fetchPromptVariants,
    fetchDriftEvents, fetchDriftSummary, fetchMcpTimeseries, fetchRagTimeseries, fetchToolTimeseries]);

  // Refresh data when new events arrive for active session
  useEffect(() => {
    if (!activeSessionId) return;
    const relevant = events.filter((e) => e.sessionId === activeSessionId);
    if (relevant.length > 0) {
      setSessionEvents((prev) => [...prev, ...relevant]);

      const types = new Set(relevant.map((e) => e.type));

      if (types.has('tool_call_end') || types.has('tool_call')) {
        fetchToolCalls(activeSessionId).then(setToolCalls);
        fetchToolTimeseries(activeSessionId).then(setToolTs);
      }
      if (types.has('context_breakdown') || types.has('context_usage')) {
        fetchContextSnapshots(activeSessionId).then(setContextSnapshots);
        fetchLatestBreakdown(activeSessionId).then((d) => setBreakdown(mapBreakdown(d)));
      }
      if (types.has('mcp_response')) {
        fetchMcpStats(activeSessionId).then(setMcpStats);
        fetchMcpTimeseries(activeSessionId).then(setMcpTs);
      }
      if (types.has('rag_retrieval') || types.has('rag_embedding') || types.has('rag_index')) {
        fetchRagStats(activeSessionId).then(setRagStats);
        fetchRagTimeseries(activeSessionId).then(setRagTs2);
      }
      if (types.has('latency')) {
        fetchLatencyStats(activeSessionId).then(setLatencyStats);
        fetchLatencyTimeseries(activeSessionId).then(setLatencyTs);
      }
      if (types.has('cost') || types.has('token_usage')) {
        fetchCostBreakdown(activeSessionId).then(setCostBreakdown);
        fetchCostTimeseries(activeSessionId).then(setCostTs);
      }
      if (types.has('output_eval')) {
        fetchEvalStats(activeSessionId).then(setEvalStats);
        fetchEvalTimeseries(activeSessionId).then(setEvalTs);
      }
      if (types.has('prompt_rating')) {
        fetchPromptVariants().then(setPromptVariants);
      }
      if (types.has('drift')) {
        fetchDriftEvents(activeSessionId).then(setDriftEvents);
        fetchDriftSummary(activeSessionId).then(setDriftSummary);
      }
    }
  }, [events, activeSessionId, fetchToolCalls, fetchContextSnapshots, fetchLatestBreakdown,
    fetchMcpStats, fetchRagStats, fetchLatencyStats, fetchLatencyTimeseries,
    fetchCostBreakdown, fetchCostTimeseries, fetchEvalStats, fetchEvalTimeseries,
    fetchPromptVariants, fetchDriftEvents, fetchDriftSummary,
    fetchMcpTimeseries, fetchRagTimeseries, fetchToolTimeseries]);

  // Compute KPIs from active session
  const activeSession: SessionSummary | undefined = sessions.find((s) => s.sessionId === activeSessionId);

  const kpis = useMemo(() => {
    if (!activeSession) {
      return {
        totalTokens: '—', totalCost: '—', toolCalls: '—',
        turns: '—', compactions: '—', contextPct: '—',
        contextColor: '#ec4899', avgLatency: '—',
      };
    }
    const latestCtx = contextSnapshots.length > 0 ? contextSnapshots[contextSnapshots.length - 1] : null;
    const ctxTokens = latestCtx?.tokens_used ?? 0;
    const ctxPct = activeSession.contextUtilizationPct;
    const ctxColor = ctxPct >= 90 ? '#ef4444' : ctxPct >= 80 ? '#f59e0b' : '#ec4899';

    // Average turn latency from latency stats
    const turnLatency = latencyStats.find((s: any) => s.operation === 'turn');
    const avgLatency = turnLatency ? `${Math.round(turnLatency.avg_ms)}ms` : '—';

    return {
      totalTokens: formatTokens(ctxTokens),
      totalCost: `$${activeSession.totalCost.toFixed(4)}`,
      toolCalls: String(activeSession.toolCallCount),
      turns: String(activeSession.turnCount),
      compactions: String(activeSession.compactionCount),
      contextPct: `${ctxPct.toFixed(1)}%`,
      contextColor: ctxColor,
      avgLatency,
    };
  }, [activeSession, contextSnapshots, latencyStats]);

  const redBadge = REDACTION_BADGE[redactionLevel] ?? REDACTION_BADGE.preview;

  // Determine which optional panels to show
  const hasLatencyData = latencyStats.length > 0 || latencyTs.length > 0;
  const hasCostData = costBreakdown.length > 0 || costTs.length > 0;
  const hasEvalData = evalStats.length > 0 || evalTs.length > 0;
  const hasMcpData = mcpStats.length > 0;
  const hasRagData = ragStats.length > 0;
  const hasPromptData = promptVariants.length > 0;
  const hasDriftData = driftEvents.length > 0 || driftSummary.length > 0;
  const hasProviders = providers.rag.length > 0 || providers.mcp.length > 0;
  const hasActivityData = mcpTs.length > 0 || ragTs2.length > 0 || toolTs.length > 0;

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Redaction badge */}
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 8, fontWeight: 600,
            color: redBadge.color, background: `${redBadge.color}12`,
            border: `1px solid ${redBadge.color}25`,
            padding: '2px 6px', borderRadius: 4,
            textTransform: 'uppercase', letterSpacing: '0.5px',
          }} title={`Data redaction: ${redactionLevel}`}>
            {redBadge.icon} {redBadge.label}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, opacity: 0.4 }}>
            {sessions.length} session{sessions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className={main}>
        {/* KPI Row */}
        <div className={kpiRow}>
          <KpiCard label="Total Tokens" value={kpis.totalTokens} sub="context window" color="#3b82f6" />
          <KpiCard label="Total Cost" value={kpis.totalCost} sub="this session" color="#10b981" />
          <KpiCard label="Tool Calls" value={kpis.toolCalls} sub="executions" color="#f59e0b" />
          <KpiCard label="Turns" value={kpis.turns} sub="LLM roundtrips" color="#8b5cf6" />
          <KpiCard label="Avg Latency" value={kpis.avgLatency} sub="per turn" color="#3b82f6" />
          <KpiCard label="Context" value={kpis.contextPct} sub="window used" color={kpis.contextColor} />
        </div>

        {/* Drift alerts (top of dashboard when present) */}
        {hasDriftData && (
          <div className={panel}>
            <div className={panelHeader}>
              <span>⚠ Drift Detection</span>
              <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                {driftEvents.length} alert{driftEvents.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className={panelBody} style={{ overflow: 'auto', maxHeight: 240 }}>
              <DriftPanel events={driftEvents} summary={driftSummary} />
            </div>
          </div>
        )}

        {/* Activity Sparklines */}
        {hasActivityData && (
          <div className={panel}>
            <div className={panelHeader}>
              <span>Activity Monitor</span>
              <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                {toolTs.length + mcpTs.length + ragTs2.length} events · latency sparklines
              </span>
            </div>
            <div className={panelBody} style={{ overflow: 'auto', maxHeight: 340, padding: 0 }}>
              <ActivitySparklines
                mcpTimeseries={mcpTs}
                ragTimeseries={ragTs2}
                toolTimeseries={toolTs}
              />
            </div>
          </div>
        )}

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

          <div className={panel} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={panelHeader}>
              <span>Context Utilization Over Time</span>
              <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>% of window</span>
            </div>
            <div className={panelBody} style={{ flex: 1, minHeight: 200, padding: 0 }}>
              <ContextUtilizationChart snapshots={contextSnapshots} />
            </div>
          </div>
        </div>

        {/* Latency + Cost */}
        {(hasLatencyData || hasCostData) && (
          <div className={gridRow}>
            <div className={panel} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={panelHeader}>
                <span>Latency</span>
                <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                  {latencyStats.length > 0
                    ? `avg ${Math.round(latencyStats.reduce((s: number, r: any) => s + r.avg_ms, 0) / latencyStats.length)}ms`
                    : 'timing'}
                </span>
              </div>
              <div className={panelBody} style={{ flex: 1, overflow: 'auto', maxHeight: 300 }}>
                <LatencyPanel stats={latencyStats} timeseries={latencyTs} />
              </div>
            </div>

            <div className={panel} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={panelHeader}>
                <span>Cost</span>
                <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                  {costBreakdown.length > 0
                    ? `$${costBreakdown.reduce((s: number, r: any) => s + r.total_cost, 0).toFixed(4)}`
                    : 'spend'}
                </span>
              </div>
              <div className={panelBody} style={{ flex: 1, overflow: 'auto', maxHeight: 300 }}>
                <CostPanel breakdown={costBreakdown} timeseries={costTs} />
              </div>
            </div>
          </div>
        )}

        {/* Token Flow + Tool Waterfall */}
        <div className={gridRow}>
          <div className={panel} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={panelHeader}>
              <span>Token Flow</span>
              <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>per turn</span>
            </div>
            <div className={panelBody} style={{ flex: 1, minHeight: 200, padding: 0 }}>
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

        {/* Quality + Prompts */}
        {(hasEvalData || hasPromptData) && (
          <div className={gridRow}>
            <div className={panel}>
              <div className={panelHeader}>
                <span>Output Quality</span>
                <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                  {evalStats.length > 0 ? `${evalStats.reduce((s: number, r: any) => s + r.eval_count, 0)} evals` : 'metrics'}
                </span>
              </div>
              <div className={panelBody} style={{ overflow: 'auto', maxHeight: 300 }}>
                <QualityPanel stats={evalStats} timeseries={evalTs} />
              </div>
            </div>

            <div className={panel}>
              <div className={panelHeader}>
                <span>Prompt Variants</span>
                <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                  {promptVariants.length > 0 ? `${promptVariants.length} variant${promptVariants.length !== 1 ? 's' : ''}` : 'A/B'}
                </span>
              </div>
              <div className={panelBody} style={{ overflow: 'auto', maxHeight: 280 }}>
                <PromptPanel variants={promptVariants} />
              </div>
            </div>
          </div>
        )}

        {/* Integrations: Provider Registry + MCP + RAG */}
        {(hasProviders || hasMcpData || hasRagData) && (
          <>
            {/* Provider registry (always show when providers configured) */}
            {hasProviders && (
              <div className={panel}>
                <div className={panelHeader}>
                  <span>Integrations</span>
                  <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                    {providers.rag.length} RAG · {providers.mcp.length} MCP
                  </span>
                </div>
                <div className={panelBody} style={{ overflow: 'auto', maxHeight: 220 }}>
                  <ProviderRegistryPanel rag={providers.rag} mcp={providers.mcp} />
                </div>
              </div>
            )}

            {/* MCP + RAG stats (when data flows) */}
            {(hasMcpData || hasRagData) && (
              <div className={gridRow}>
                <div className={panel}>
                  <div className={panelHeader}>
                    <span>MCP Servers</span>
                    <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                      {hasMcpData ? `${mcpStats.reduce((s: number, r: any) => s + r.call_count, 0)} calls` : 'no data'}
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
                      {hasRagData ? `${ragStats.reduce((s: number, r: any) => s + r.call_count, 0)} ops` : 'no data'}
                    </span>
                  </div>
                  <div className={panelBody} style={{ overflow: 'auto', maxHeight: 200 }}>
                    <RagStatsPanel stats={ragStats} />
                  </div>
                </div>
              </div>
            )}
          </>
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
              Connect a coding agent (pi, Claude Code, or Codex) to see data here
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
