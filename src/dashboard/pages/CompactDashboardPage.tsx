import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useTelemetry } from '../hooks/useTelemetry';
import { TabBar } from '../components/TabBar';
import { EventFeed } from '../components/EventFeed';
import { EventTicker } from '../components/EventTicker';
import { SessionSelector } from '../components/SessionSelector';
import { ContextTreemap } from '../visualizations/ContextTreemap';
import { ContextUtilizationChart } from '../visualizations/ContextUtilizationChart';
import { TokenFlowChart } from '../visualizations/TokenFlowChart';
import { CostPanel } from '../visualizations/CostPanel';
import { LatencyPanel } from '../visualizations/LatencyPanel';
import { ActivitySparklines } from '../visualizations/ActivitySparklines';
import { DriftPanel } from '../visualizations/DriftPanel';
import { McpStatsPanel } from '../visualizations/McpStatsPanel';
import { RagStatsPanel } from '../visualizations/RagStatsPanel';
import { ProviderRegistryPanel } from '../visualizations/ProviderRegistryPanel';
import type { TelemetryEvent, SessionSummary } from '../../shared/events';
import {
  appendNewEvents,
  loadInto,
  mapBreakdown,
  type ContextBreakdown,
  type ContextSnapshotRow,
  type CostBreakdownRow,
  type CostPointRow,
  type DriftEventRow,
  type DriftSummaryRow,
  type LatencyPointRow,
  type LatencyStatRow,
  type McpStatRow,
  type RagStatRow,
  type TimeseriesRow,
} from './panel-data';
import {
  compactShell,
  compactHeader,
  compactHeaderLeft,
  compactHeaderRight,
  compactMain,
  compactTabContent,
  compactKpiRow,
  compactKpiCard,
  compactKpiLabel,
  compactKpiValue,
  compactVizGrid,
  compactVizCell,
  compactPanel,
  compactPanelHeader,
  compactPanelBody,
  compactTwoCol,
  compactTickerSlot,
  compactEmptyState,
  compactSessionSummary,
} from '../compact.css';

// ─── Constants ────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'errors', label: 'Errors' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'drift', label: 'Drift' },
];

const PREVIEW_BADGE = { label: 'PREVIEW', color: '#f59e0b', icon: '🛡️' };

const REDACTION_BADGE: Record<string, { label: string; color: string; icon: string }> = {
  preview: PREVIEW_BADGE,
  full: { label: 'FULL', color: '#22c55e', icon: '🔒' },
  none: { label: 'NONE', color: '#ef4444', icon: '⚠️' },
};

const font = "'JetBrains Mono', monospace";

// ─── Helpers ──────────────────────────────────────────────────────────────

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

// ─── Compact KPI Card ─────────────────────────────────────────────────────

const CompactKpiCard: React.FC<{ label: string; value: string | number; color?: string }> = ({
  label,
  value,
  color,
}) => (
  <div className={compactKpiCard}>
    <span className={compactKpiLabel}>{label}</span>
    <span className={compactKpiValue} style={color ? { color } : undefined}>
      {value}
    </span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────

export const CompactDashboardPage: React.FC = () => {
  // Destructure the stable fetch callbacks: the object useTelemetry returns is new on
  // every render, so depending on it would refetch after every render, forever.
  const {
    events,
    sessions,
    connected,
    redactionLevel,
    providers,
    fetchSessionEvents,
    fetchContextSnapshots,
    fetchLatestBreakdown,
    fetchMcpStats,
    fetchRagStats,
    fetchLatencyStats,
    fetchLatencyTimeseries,
    fetchCostBreakdown,
    fetchCostTimeseries,
    fetchDriftEvents,
    fetchDriftSummary,
    fetchMcpTimeseries,
    fetchRagTimeseries,
    fetchToolTimeseries,
  } = useTelemetry();

  const [activeTab, setActiveTab] = useState('overview');
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionEvents, setSessionEvents] = useState<TelemetryEvent[]>([]);
  const [contextSnapshots, setContextSnapshots] = useState<ContextSnapshotRow[]>([]);
  const [breakdown, setBreakdown] = useState<ContextBreakdown | null>(null);
  const [mcpStats, setMcpStats] = useState<McpStatRow[]>([]);
  const [ragStats, setRagStats] = useState<RagStatRow[]>([]);
  const [latencyStats, setLatencyStats] = useState<LatencyStatRow[]>([]);
  const [latencyTs, setLatencyTs] = useState<LatencyPointRow[]>([]);
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdownRow[]>([]);
  const [costTs, setCostTs] = useState<CostPointRow[]>([]);
  const [driftEvents, setDriftEvents] = useState<DriftEventRow[]>([]);
  const [driftSummary, setDriftSummary] = useState<DriftSummaryRow[]>([]);
  const [mcpTs, setMcpTs] = useState<TimeseriesRow[]>([]);
  const [ragTs, setRagTs] = useState<TimeseriesRow[]>([]);
  const [toolTs, setToolTs] = useState<TimeseriesRow[]>([]);

  // Auto-select the most recent session, during render rather than an effect later
  const newestSession = sessions[0];
  if (newestSession && !activeSessionId) {
    setActiveSessionId(newestSession.sessionId);
  }

  // The session the panels currently show. A response for any other session is dropped,
  // so a slow fetch for the previous session cannot overwrite the new one's panels.
  const shownSessionRef = useRef(activeSessionId);
  useEffect(() => {
    shownSessionRef.current = activeSessionId;
  }, [activeSessionId]);

  // Load all session data when active session changes
  useEffect(() => {
    if (!activeSessionId) return;
    const sessionId = activeSessionId;
    const isCurrent = () => shownSessionRef.current === sessionId;

    loadInto(fetchSessionEvents(activeSessionId), setSessionEvents, isCurrent);
    loadInto(fetchContextSnapshots(activeSessionId), setContextSnapshots, isCurrent);
    loadInto(
      fetchLatestBreakdown(activeSessionId),
      (d) => setBreakdown(mapBreakdown(d)),
      isCurrent
    );
    loadInto(fetchMcpStats(activeSessionId), setMcpStats, isCurrent);
    loadInto(fetchRagStats(activeSessionId), setRagStats, isCurrent);
    loadInto(fetchLatencyStats(activeSessionId), setLatencyStats, isCurrent);
    loadInto(fetchLatencyTimeseries(activeSessionId), setLatencyTs, isCurrent);
    loadInto(fetchCostBreakdown(activeSessionId), setCostBreakdown, isCurrent);
    loadInto(fetchCostTimeseries(activeSessionId), setCostTs, isCurrent);
    loadInto(fetchDriftEvents(activeSessionId), setDriftEvents, isCurrent);
    loadInto(fetchDriftSummary(activeSessionId), setDriftSummary, isCurrent);
    loadInto(fetchMcpTimeseries(activeSessionId), setMcpTs, isCurrent);
    loadInto(fetchRagTimeseries(activeSessionId), setRagTs, isCurrent);
    loadInto(fetchToolTimeseries(activeSessionId), setToolTs, isCurrent);
  }, [
    activeSessionId,
    fetchSessionEvents,
    fetchContextSnapshots,
    fetchLatestBreakdown,
    fetchMcpStats,
    fetchRagStats,
    fetchLatencyStats,
    fetchLatencyTimeseries,
    fetchCostBreakdown,
    fetchCostTimeseries,
    fetchDriftEvents,
    fetchDriftSummary,
    fetchMcpTimeseries,
    fetchRagTimeseries,
    fetchToolTimeseries,
  ]);

  // Refresh on relevant events
  useEffect(() => {
    if (!activeSessionId) return;
    const sessionId = activeSessionId;
    const isCurrent = () => shownSessionRef.current === sessionId;
    const relevant = events.filter((e) => e.sessionId === activeSessionId);
    if (relevant.length === 0) return;

    const types = new Set(relevant.map((e) => e.type));

    if (types.has('context_breakdown') || types.has('context_usage')) {
      loadInto(fetchContextSnapshots(activeSessionId), setContextSnapshots, isCurrent);
      loadInto(
        fetchLatestBreakdown(activeSessionId),
        (d) => setBreakdown(mapBreakdown(d)),
        isCurrent
      );
    }
    if (types.has('latency')) {
      loadInto(fetchLatencyStats(activeSessionId), setLatencyStats, isCurrent);
      loadInto(fetchLatencyTimeseries(activeSessionId), setLatencyTs, isCurrent);
    }
    if (types.has('cost') || types.has('token_usage')) {
      loadInto(fetchCostBreakdown(activeSessionId), setCostBreakdown, isCurrent);
      loadInto(fetchCostTimeseries(activeSessionId), setCostTs, isCurrent);
    }
    if (types.has('tool_call_end') || types.has('tool_call')) {
      loadInto(fetchToolTimeseries(activeSessionId), setToolTs, isCurrent);
      // `events` is the whole rolling buffer, so append only the events not yet held.
      setSessionEvents((prev) => appendNewEvents(prev, relevant));
    }
    if (types.has('mcp_response')) {
      loadInto(fetchMcpStats(activeSessionId), setMcpStats, isCurrent);
      loadInto(fetchMcpTimeseries(activeSessionId), setMcpTs, isCurrent);
    }
    if (types.has('rag_retrieval') || types.has('rag_embedding') || types.has('rag_index')) {
      loadInto(fetchRagStats(activeSessionId), setRagStats, isCurrent);
      loadInto(fetchRagTimeseries(activeSessionId), setRagTs, isCurrent);
    }
    if (types.has('drift')) {
      loadInto(fetchDriftEvents(activeSessionId), setDriftEvents, isCurrent);
      loadInto(fetchDriftSummary(activeSessionId), setDriftSummary, isCurrent);
    }
  }, [
    events,
    activeSessionId,
    fetchContextSnapshots,
    fetchLatestBreakdown,
    fetchLatencyStats,
    fetchLatencyTimeseries,
    fetchCostBreakdown,
    fetchCostTimeseries,
    fetchToolTimeseries,
    fetchMcpStats,
    fetchMcpTimeseries,
    fetchRagStats,
    fetchRagTimeseries,
    fetchDriftEvents,
    fetchDriftSummary,
  ]);

  // Compute KPIs
  const activeSession: SessionSummary | undefined = sessions.find(
    (s) => s.sessionId === activeSessionId
  );

  const kpis = useMemo(() => {
    if (!activeSession) {
      return {
        totalTokens: '—',
        totalCost: '—',
        toolCalls: '—',
        turns: '—',
        avgLatency: '—',
        contextPct: '—',
        contextColor: '#ec4899',
      };
    }
    const latestCtx =
      contextSnapshots.length > 0 ? contextSnapshots[contextSnapshots.length - 1] : null;
    const ctxTokens = latestCtx?.tokens_used ?? 0;
    const ctxPct = activeSession.contextUtilizationPct;
    const ctxColor = ctxPct >= 90 ? '#ef4444' : ctxPct >= 80 ? '#f59e0b' : '#ec4899';

    const turnLatency = latencyStats.find((s) => s.operation === 'turn');
    const avgLatency = turnLatency ? `${Math.round(turnLatency.avg_ms)}ms` : '—';

    return {
      totalTokens: formatTokens(ctxTokens),
      totalCost: `$${activeSession.totalCost.toFixed(4)}`,
      toolCalls: String(activeSession.toolCallCount),
      turns: String(activeSession.turnCount),
      avgLatency,
      contextPct: `${ctxPct.toFixed(1)}%`,
      contextColor: ctxColor,
    };
  }, [activeSession, contextSnapshots, latencyStats]);

  // Filter error events for Errors tab
  const errorEvents = useMemo(
    () => events.filter((e) => e.type === 'tool_call_end' && e.isError),
    [events]
  );

  const redBadge = REDACTION_BADGE[redactionLevel] ?? PREVIEW_BADGE;

  return (
    <div className={compactShell}>
      {/* Header */}
      <div className={compactHeader}>
        <div className={compactHeaderLeft}>
          <span
            style={{
              fontFamily: font,
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.5px',
              color: 'var(--color-primary, #3b82f6)',
            }}
          >
            ⚡ AIr
          </span>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: connected ? '#22c55e' : '#ef4444',
              transition: 'background 0.3s ease',
              flexShrink: 0,
            }}
          />
          <span style={{ fontFamily: font, fontSize: 10, opacity: 0.5 }}>
            {connected ? 'Live' : 'Reconnecting…'}
          </span>
          {activeSession && (
            <span style={{ fontFamily: font, fontSize: 9, opacity: 0.4 }}>
              {activeSession.provider}/{activeSession.model}
            </span>
          )}
        </div>
        <div className={compactHeaderRight}>
          <span
            style={{
              fontFamily: font,
              fontSize: 8,
              fontWeight: 600,
              color: redBadge.color,
              background: `${redBadge.color}12`,
              border: `1px solid ${redBadge.color}25`,
              padding: '2px 6px',
              borderRadius: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            title={`Data redaction: ${redactionLevel}`}
          >
            {redBadge.icon} {redBadge.label}
          </span>
          <span style={{ fontFamily: font, fontSize: 10, opacity: 0.4 }}>
            {sessions.length} session{sessions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Area */}
      <div className={compactMain}>
        <div className={compactTabContent}>
          {/* ═══ OVERVIEW TAB ═══ */}
          {activeTab === 'overview' && (
            <>
              <div className={compactKpiRow}>
                <CompactKpiCard label="Total Tokens" value={kpis.totalTokens} color="#3b82f6" />
                <CompactKpiCard label="Total Cost" value={kpis.totalCost} color="#10b981" />
                <CompactKpiCard label="Tool Calls" value={kpis.toolCalls} color="#f59e0b" />
                <CompactKpiCard label="Turns" value={kpis.turns} color="#8b5cf6" />
                <CompactKpiCard label="Avg Latency" value={kpis.avgLatency} color="#3b82f6" />
                <CompactKpiCard label="Context" value={kpis.contextPct} color={kpis.contextColor} />
              </div>

              <div className={compactVizGrid}>
                <div className={compactVizCell}>
                  <div className={compactPanel} style={{ flex: 1 }}>
                    <div className={compactPanelHeader}>Context Window</div>
                    <div className={compactPanelBody} style={{ padding: 2 }}>
                      <ContextTreemap
                        segments={breakdown?.segments ?? []}
                        totalTokens={breakdown?.tokens_used ?? 0}
                        contextWindow={breakdown?.context_window ?? 200_000}
                        height={115}
                      />
                    </div>
                  </div>
                </div>
                <div className={compactVizCell}>
                  <div className={compactPanel} style={{ flex: 1 }}>
                    <div className={compactPanelHeader}>Utilization</div>
                    <div className={compactPanelBody} style={{ padding: 0, flex: 1 }}>
                      <ContextUtilizationChart snapshots={contextSnapshots} />
                    </div>
                  </div>
                </div>
                <div className={compactVizCell}>
                  <div className={compactPanel} style={{ flex: 1 }}>
                    <div className={compactPanelHeader}>Token Flow</div>
                    <div className={compactPanelBody} style={{ padding: 0, flex: 1 }}>
                      <TokenFlowChart events={sessionEvents} />
                    </div>
                  </div>
                </div>
                <div className={compactVizCell}>
                  <div className={compactPanel} style={{ flex: 1 }}>
                    <div className={compactPanelHeader}>Cost</div>
                    <div className={compactPanelBody} style={{ padding: 0, flex: 1 }}>
                      <CostPanel breakdown={costBreakdown} timeseries={costTs} compact />
                    </div>
                  </div>
                </div>
                <div className={compactVizCell}>
                  <div className={compactPanel} style={{ flex: 1 }}>
                    <div className={compactPanelHeader}>Latency</div>
                    <div className={compactPanelBody} style={{ padding: 0, flex: 1 }}>
                      <LatencyPanel stats={latencyStats} timeseries={latencyTs} compact />
                    </div>
                  </div>
                </div>
                <div className={compactVizCell}>
                  <div className={compactPanel} style={{ flex: 1 }}>
                    <div className={compactPanelHeader}>Activity</div>
                    <div
                      className={compactPanelBody}
                      style={{ padding: 0, overflow: 'auto', maxHeight: 130 }}
                    >
                      <ActivitySparklines
                        mcpTimeseries={mcpTs}
                        ragTimeseries={ragTs}
                        toolTimeseries={toolTs}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ═══ ERRORS TAB ═══ */}
          {activeTab === 'errors' && (
            <div className={compactTwoCol}>
              <div className={compactPanel} style={{ flex: 1 }}>
                <div className={compactPanelHeader}>
                  <span>Tool Errors</span>
                  <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                    {errorEvents.length}
                  </span>
                </div>
                <div className={compactPanelBody} style={{ flex: 1 }}>
                  {errorEvents.length > 0 ? (
                    <EventFeed events={errorEvents} maxItems={50} />
                  ) : (
                    <div className={compactEmptyState}>No tool errors</div>
                  )}
                </div>
              </div>
              <div className={compactPanel} style={{ flex: 1 }}>
                <div className={compactPanelHeader}>
                  <span>Drift Alerts</span>
                  <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                    {driftEvents.length}
                  </span>
                </div>
                <div className={compactPanelBody} style={{ flex: 1 }}>
                  {driftEvents.length > 0 ? (
                    <DriftPanel events={driftEvents} summary={[]} maxVisibleRows={8} />
                  ) : (
                    <div className={compactEmptyState}>No drift alerts</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══ SESSIONS TAB ═══ */}
          {activeTab === 'sessions' && (
            <div className={compactPanel} style={{ flex: 1 }}>
              <div className={compactPanelHeader}>
                <span>Sessions</span>
                <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                  {sessions.length}
                </span>
              </div>
              <div className={compactPanelBody} style={{ flex: 1 }}>
                <SessionSelector
                  sessions={sessions}
                  activeSessionId={activeSessionId}
                  onSelect={setActiveSessionId}
                />
              </div>
              {activeSession && (
                <div className={compactSessionSummary}>
                  <span style={{ fontWeight: 600, color: '#fff' }}>
                    {activeSession.provider}/{activeSession.model}
                  </span>
                  <span>${activeSession.totalCost.toFixed(4)}</span>
                  <span>{activeSession.turnCount} turns</span>
                  <span>{activeSession.toolCallCount} tools</span>
                  <span>{activeSession.contextUtilizationPct.toFixed(1)}% ctx</span>
                </div>
              )}
            </div>
          )}

          {/* ═══ INTEGRATIONS TAB ═══ */}
          {activeTab === 'integrations' && (
            <div className={compactTwoCol}>
              <div className={compactPanel} style={{ flex: 1 }}>
                <div className={compactPanelHeader}>
                  <span>MCP Servers</span>
                  <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                    {mcpStats.length > 0
                      ? `${mcpStats.reduce((s: number, r) => s + r.call_count, 0)} calls`
                      : '—'}
                  </span>
                </div>
                <div className={compactPanelBody} style={{ flex: 1 }}>
                  {mcpStats.length > 0 ? (
                    <McpStatsPanel stats={mcpStats} />
                  ) : (
                    <div className={compactEmptyState}>No MCP data</div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, overflow: 'hidden' }}>
                <div className={compactPanel} style={{ flex: 1 }}>
                  <div className={compactPanelHeader}>
                    <span>RAG Pipeline</span>
                    <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                      {ragStats.length > 0
                        ? `${ragStats.reduce((s: number, r) => s + r.call_count, 0)} ops`
                        : '—'}
                    </span>
                  </div>
                  <div className={compactPanelBody} style={{ flex: 1 }}>
                    {ragStats.length > 0 ? (
                      <RagStatsPanel stats={ragStats} />
                    ) : (
                      <div className={compactEmptyState}>No RAG data</div>
                    )}
                  </div>
                </div>
                {(providers.rag.length > 0 || providers.mcp.length > 0) && (
                  <div className={compactPanel}>
                    <div className={compactPanelHeader}>Providers</div>
                    <div className={compactPanelBody}>
                      <ProviderRegistryPanel rag={providers.rag} mcp={providers.mcp} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══ DRIFT TAB ═══ */}
          {activeTab === 'drift' && (
            <div className={compactTwoCol}>
              <div className={compactPanel} style={{ flex: 1 }}>
                <div className={compactPanelHeader}>
                  <span>Events</span>
                  <span style={{ fontWeight: 400, opacity: 0.4, fontSize: 9 }}>
                    {driftEvents.length}
                  </span>
                </div>
                <div className={compactPanelBody} style={{ flex: 1 }}>
                  {driftEvents.length > 0 ? (
                    <DriftPanel events={driftEvents} summary={[]} maxVisibleRows={15} />
                  ) : (
                    <div className={compactEmptyState}>No drift events</div>
                  )}
                </div>
              </div>
              <div className={compactPanel} style={{ flex: 1 }}>
                <div className={compactPanelHeader}>Summary</div>
                <div className={compactPanelBody} style={{ flex: 1 }}>
                  {driftSummary.length > 0 ? (
                    <DriftPanel events={[]} summary={driftSummary} maxVisibleRows={15} />
                  ) : (
                    <div className={compactEmptyState}>No drift summary data</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Ticker */}
      <div className={compactTickerSlot}>
        <EventTicker events={events} />
      </div>
    </div>
  );
};
