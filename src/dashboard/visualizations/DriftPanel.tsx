import React from 'react';
import { DataGrid } from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';

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
  /** Max visible event rows before scrolling (default: 4) */
  maxVisibleRows?: number;
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

/** editorial row height (6px padding top + 6px bottom + ~13px font + 1px border ≈ 26px) */
const EDITORIAL_ROW_HEIGHT = 26;
/** editorial header height (~10px font + padding + 2px border) */
const EDITORIAL_HEADER_HEIGHT = 28;

const columns: ColumnDef<DriftEventRow>[] = [
  {
    id: 'direction',
    header: '',
    accessorKey: 'direction',
    size: 28,
    minSize: 28,
    maxSize: 28,
    enableSorting: false,
    enableResizing: false,
    cell: ({ value }) => (
      <span style={{ fontSize: 12 }}>{value === 'increase' ? '↑' : '↓'}</span>
    ),
  },
  {
    id: 'metric',
    header: 'Metric',
    accessorKey: 'metric',
    size: 120,
    cell: ({ value }) => (
      <span style={{ fontWeight: 600 }}>
        {METRIC_ICONS[value as string] ?? ''} {value as string}
      </span>
    ),
  },
  {
    id: 'severity',
    header: 'Severity',
    accessorKey: 'severity',
    size: 80,
    cell: ({ value }) => {
      const sev = value as string;
      return (
        <span style={{
          color: SEVERITY_COLORS[sev],
          fontWeight: 600,
          fontSize: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
          padding: '1px 4px',
          borderRadius: 3,
          background: `${SEVERITY_COLORS[sev]}15`,
        }}>
          {sev}
        </span>
      );
    },
  },
  {
    id: 'baseline',
    header: 'Baseline',
    accessorKey: 'baseline',
    size: 80,
    align: 'right',
    cell: ({ row }) => (
      <span style={{ color: 'rgba(255,255,255,0.5)' }}>
        {formatValue(row.original.metric, row.original.baseline)}
      </span>
    ),
  },
  {
    id: 'current_val',
    header: 'Current',
    accessorKey: 'current_val',
    size: 80,
    align: 'right',
    cell: ({ row }) => (
      <span style={{ color: '#fff', fontWeight: 500 }}>
        {formatValue(row.original.metric, row.original.current_val)}
      </span>
    ),
  },
  {
    id: 'deviation_pct',
    header: 'Deviation',
    accessorKey: 'deviation_pct',
    size: 80,
    align: 'right',
    cell: ({ row }) => (
      <span style={{
        fontWeight: 600,
        color: SEVERITY_COLORS[row.original.severity],
      }}>
        {row.original.direction === 'increase' ? '+' : ''}{Math.round(row.original.deviation_pct)}%
      </span>
    ),
  },
  {
    id: 'model',
    header: 'Model',
    accessorKey: 'model',
    size: 100,
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{value as string}</span>
    ),
  },
  {
    id: 'when',
    header: 'When',
    accessorKey: 'timestamp',
    size: 70,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.4)' }}>{timeAgo(value as number)}</span>
    ),
  },
];

export const DriftPanel: React.FC<Props> = ({ events, summary, maxVisibleRows = 4 }) => {
  if (events.length === 0 && summary.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}>
        No drift detected — baselines are stable
      </div>
    );
  }

  // Newest first — DB returns DESC but enforce here as a safety net
  const sortedEvents = React.useMemo(
    () => [...events].sort((a, b) => b.timestamp - a.timestamp).slice(0, 20),
    [events],
  );

  // Fixed grid height: header + maxVisibleRows rows
  const gridHeight = EDITORIAL_HEADER_HEIGHT + EDITORIAL_ROW_HEIGHT * maxVisibleRows;

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

      {/* Drift events — DataGrid with fixed scroll height */}
      {sortedEvents.length > 0 && (
        <DataGrid<DriftEventRow>
          data={sortedEvents}
          columns={columns}
          height={gridHeight}
          density="editorial"
          borderless
          transparent
          noRowHover
          headerBorder="thick"
          rowSeparator="subtle"
          showToolbar={false}
          showFooter={false}
          showStatusBar={false}
          enablePagination={false}
          enableSorting={false}
          enableGlobalFilter={false}
          enableColumnVisibility={false}
          enableRowSelection={false}
          enableResizing={false}
        />
      )}
    </div>
  );
};
