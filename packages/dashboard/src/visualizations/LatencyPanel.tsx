import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DataGrid } from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';

interface LatencyStat {
  operation: string;
  sample_count: number;
  avg_ms: number;
  min_ms: number;
  max_ms: number;
  avg_ttft_ms: number | null;
  model: string;
  provider: string;
}

interface LatencyPoint {
  timestamp: number;
  total_ms: number;
  ttft_ms: number | null;
  operation: string;
  model: string;
}

interface Props {
  stats: LatencyStat[];
  timeseries: LatencyPoint[];
  compact?: boolean;
}

const OP_COLORS: Record<string, string> = {
  turn: '#3b82f6',
  tool_call: '#f97316',
  api_call: '#a855f7',
  ttft: '#10b981',
  custom: '#64748b',
};

const font = "'JetBrains Mono', monospace";

/** Same quiet, read-only grid as DriftPanel, at compact density. */
const GRID_PROPS = {
  density: 'compact',
  borderless: true,
  transparent: true,
  noRowHover: true,
  rowSeparator: 'subtle',
  showToolbar: false,
  showFooter: false,
  showStatusBar: false,
  enablePagination: false,
  enableSorting: false,
  enableGlobalFilter: false,
  enableColumnVisibility: false,
  enableRowSelection: false,
  enableColumnResizing: false,
} as const;

const ms = (n: number) => `${Math.round(n)}ms`;

const columns: ColumnDef<LatencyStat>[] = [
  {
    id: 'operation',
    header: 'Operation',
    accessorKey: 'operation',
    cell: ({ value }) => (
      <span style={{ color: OP_COLORS[value as string] ?? '#94a3b8', fontWeight: 600 }}>
        {value as string}
      </span>
    ),
  },
  {
    id: 'samples',
    header: 'Samples',
    accessorKey: 'sample_count',
    size: 64,
    align: 'right',
    cell: ({ value }) => <span style={{ color: '#fff' }}>{value as number}</span>,
  },
  {
    id: 'avg',
    header: 'Avg',
    accessorKey: 'avg_ms',
    size: 64,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: '#fff', fontWeight: 500 }}>{ms(value as number)}</span>
    ),
  },
  {
    id: 'min',
    header: 'Min',
    accessorKey: 'min_ms',
    size: 64,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{ms(value as number)}</span>
    ),
  },
  {
    id: 'max',
    header: 'Max',
    accessorKey: 'max_ms',
    size: 64,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{ms(value as number)}</span>
    ),
  },
  {
    id: 'ttft',
    header: 'TTFT',
    accessorKey: 'avg_ttft_ms',
    size: 64,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: value ? '#10b981' : 'rgba(255,255,255,0.3)' }}>
        {value ? ms(value as number) : '—'}
      </span>
    ),
  },
];

export const LatencyPanel: React.FC<Props> = ({ stats, timeseries, compact }) => {
  if (stats.length === 0 && timeseries.length === 0) {
    return (
      <div
        style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}
      >
        No latency data recorded yet
      </div>
    );
  }

  const chartData = timeseries.map((p, i) => ({
    index: i + 1,
    latency: Math.round(p.total_ms),
    ttft: p.ttft_ms ? Math.round(p.ttft_ms) : undefined,
    op: p.operation,
    time: new Date(p.timestamp).toLocaleTimeString(),
  }));

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      {/* Stats grid — hidden in compact mode */}
      {!compact && stats.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <DataGrid<LatencyStat>
            aria-label="Latency by operation"
            data={stats}
            columns={columns}
            getRowId={(row) => `${row.provider}:${row.model}:${row.operation}`}
            {...GRID_PROPS}
          />
        </div>
      )}

      {/* Time series chart */}
      {chartData.length > 2 && (
        <div style={{ height: compact ? '100%' : 120, flex: compact ? 1 : undefined }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="latGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="index" hide />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9, fontFamily: font }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}ms`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 15, 20, 0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  fontFamily: font,
                  fontSize: 11,
                }}
                formatter={(value: number, name: string) => [`${value}ms`, name]}
              />
              <Area
                type="monotone"
                dataKey="latency"
                name="Latency"
                stroke="#3b82f6"
                fill="url(#latGrad)"
                strokeWidth={1.5}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
