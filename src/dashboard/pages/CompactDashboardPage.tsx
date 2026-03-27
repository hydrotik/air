/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';
import { useTelemetry } from '../hooks/useTelemetry';
import { TabBar } from '../components/TabBar';
import type { SessionSummary } from '../../shared/events';
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
  compactTickerSlot,
  compactEmptyState,
} from '../compact.css';

// ─── Constants ────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'errors', label: 'Errors' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'drift', label: 'Drift' },
];

const REDACTION_BADGE: Record<string, { label: string; color: string; icon: string }> = {
  preview: { label: 'PREVIEW', color: '#f59e0b', icon: '🛡️' },
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
  const telemetry = useTelemetry();
  const { events, sessions, connected, redactionLevel } = telemetry;

  const [activeTab, setActiveTab] = useState('overview');
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [contextSnapshots, setContextSnapshots] = useState<any[]>([]);
  const [latencyStats, setLatencyStats] = useState<any[]>([]);

  // Auto-select most recent session
  useEffect(() => {
    if (sessions.length > 0 && !activeSessionId) {
      setActiveSessionId(sessions[0].sessionId);
    }
  }, [sessions, activeSessionId]);

  // Load session data when active session changes
  useEffect(() => {
    if (!activeSessionId) return;

    telemetry.fetchContextSnapshots(activeSessionId).then(setContextSnapshots);
    telemetry.fetchLatencyStats(activeSessionId).then(setLatencyStats);
  }, [activeSessionId, telemetry]);

  // Refresh on relevant events
  useEffect(() => {
    if (!activeSessionId) return;
    const relevant = events.filter((e) => e.sessionId === activeSessionId);
    if (relevant.length === 0) return;

    const types = new Set(relevant.map((e) => e.type));

    if (types.has('context_breakdown') || types.has('context_usage')) {
      telemetry.fetchContextSnapshots(activeSessionId).then(setContextSnapshots);
    }
    if (types.has('latency')) {
      telemetry.fetchLatencyStats(activeSessionId).then(setLatencyStats);
    }
  }, [events, activeSessionId, telemetry]);

  // Compute KPIs
  const activeSession: SessionSummary | undefined = sessions.find(
    (s) => s.sessionId === activeSessionId,
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

    const turnLatency = latencyStats.find((s: any) => s.operation === 'turn');
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

  const redBadge = REDACTION_BADGE[redactionLevel] ?? REDACTION_BADGE.preview;

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
          {activeTab === 'overview' && (
            <>
              {/* KPI Row — no sub line per user decision */}
              <div className={compactKpiRow}>
                <CompactKpiCard label="Total Tokens" value={kpis.totalTokens} color="#3b82f6" />
                <CompactKpiCard label="Total Cost" value={kpis.totalCost} color="#10b981" />
                <CompactKpiCard label="Tool Calls" value={kpis.toolCalls} color="#f59e0b" />
                <CompactKpiCard label="Turns" value={kpis.turns} color="#8b5cf6" />
                <CompactKpiCard label="Avg Latency" value={kpis.avgLatency} color="#3b82f6" />
                <CompactKpiCard label="Context" value={kpis.contextPct} color={kpis.contextColor} />
              </div>

              {/* Placeholder: 3×2 viz grid — wired in Plan 01-02 */}
              <div className={compactEmptyState}>
                <span>Visualization grid loading…</span>
              </div>
            </>
          )}

          {activeTab === 'errors' && (
            <div className={compactEmptyState}>Errors content — wired in Plan 01-03</div>
          )}

          {activeTab === 'sessions' && (
            <div className={compactEmptyState}>Sessions content — wired in Plan 01-03</div>
          )}

          {activeTab === 'integrations' && (
            <div className={compactEmptyState}>Integrations content — wired in Plan 01-03</div>
          )}

          {activeTab === 'drift' && (
            <div className={compactEmptyState}>Drift content — wired in Plan 01-03</div>
          )}
        </div>
      </div>

      {/* Ticker Slot — wired in Plan 01-04 */}
      <div className={compactTickerSlot} />
    </div>
  );
};
