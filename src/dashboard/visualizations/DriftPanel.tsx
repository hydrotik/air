import React from 'react';

interface DriftEventRow {
  id: number;
  session_id: string;
  timestamp: number;
  metric: string;
  model: string;
  provider: string;
  baseline: number;
  current_val: number;
  deviation_pct: number;
  direction: string;
  severity: string;
  window_size: number;
  threshold: number;
}

interface DriftSummaryRow {
  metric: string;
  severity: string;
  event_count: number;
  avg_deviation_pct: number;
  max_deviation_pct: number;
  first_seen: number;
  last_seen: number;
}

interface Props {
  events: DriftEventRow[];
  summary: DriftSummaryRow[];
}

const font = "'JetBrains Mono', monospace";

const SEVERITY_COLORS: Record<string, string> = {
  info: '#3b82f6',
  warning: '#f59e0b',
  critical: '#ef4444',
};

const METRIC_ICONS: Record<string, string> = {
  latency: '⏱',
  cost: '💰',
  token_usage: '📊',
  output_tokens: '📝',
  error_rate: '❌',
  cache_hit_rate: '💾',
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function formatValue(metric: string, value: number): string {
  if (metric === 'cost') return `$${value.toFixed(4)}`;
  if (metric === 'latency') return `${Math.round(value)}ms`;
  if (metric === 'error_rate' || metric === 'cache_hit_rate') return `${(value * 100).toFixed(1)}%`;
  if (metric === 'token_usage' || metric === 'output_tokens') {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : String(Math.round(value));
  }
  return String(Math.round(value * 100) / 100);
}

export const DriftPanel: React.FC<Props> = ({ events, summary }) => {
  if (events.length === 0 && summary.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}>
        No drift detected — baselines are stable
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      {/* Summary badges */}
      {summary.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          {summary.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px',
              borderRadius: 4, background: `${SEVERITY_COLORS[s.severity]}15`,
              border: `1px solid ${SEVERITY_COLORS[s.severity]}30`,
            }}>
              <span>{METRIC_ICONS[s.metric] ?? '📈'}</span>
              <span style={{ fontWeight: 600, color: SEVERITY_COLORS[s.severity] }}>{s.metric}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>×{s.event_count}</span>
              <span style={{ color: SEVERITY_COLORS[s.severity], fontWeight: 500 }}>
                {s.severity}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Recent drift events */}
      {events.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['', 'Metric', 'Severity', 'Baseline', 'Current', 'Deviation', 'Model', 'When'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left', padding: '3px 6px', fontSize: 8, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.slice(0, 20).map((e, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '3px 4px', fontSize: 12 }}>
                  {e.direction === 'increase' ? '↑' : '↓'}
                </td>
                <td style={{ padding: '3px 6px' }}>
                  <span style={{ fontWeight: 600 }}>{METRIC_ICONS[e.metric] ?? ''} {e.metric}</span>
                </td>
                <td style={{ padding: '3px 6px' }}>
                  <span style={{
                    color: SEVERITY_COLORS[e.severity], fontWeight: 600, fontSize: 8,
                    textTransform: 'uppercase', letterSpacing: '0.3px',
                    padding: '1px 4px', borderRadius: 3,
                    background: `${SEVERITY_COLORS[e.severity]}15`,
                  }}>
                    {e.severity}
                  </span>
                </td>
                <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.5)' }}>
                  {formatValue(e.metric, e.baseline)}
                </td>
                <td style={{ padding: '3px 6px', color: '#fff', fontWeight: 500 }}>
                  {formatValue(e.metric, e.current_val)}
                </td>
                <td style={{
                  padding: '3px 6px', fontWeight: 600,
                  color: SEVERITY_COLORS[e.severity],
                }}>
                  {e.direction === 'increase' ? '+' : ''}{Math.round(e.deviation_pct)}%
                </td>
                <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.5)' }}>{e.model}</td>
                <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.4)' }}>{timeAgo(e.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
