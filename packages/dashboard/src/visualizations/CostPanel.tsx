import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { DataGrid } from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';

interface CostBreakdown {
  model: string;
  provider: string;
  event_count: number;
  total_input_cost: number;
  total_output_cost: number;
  total_cache_read_cost: number;
  total_cache_write_cost: number;
  total_cost: number;
  cumulative_cost: number;
  budget_limit: number | null;
  budget_exceeded: number;
}

interface CostPoint {
  timestamp: number;
  total_cost: number;
  cumulative_cost: number;
  model: string;
  budget_limit: number | null;
}

interface Props {
  breakdown: CostBreakdown[];
  timeseries: CostPoint[];
  compact?: boolean;
}

const font = "'JetBrains Mono', monospace";

/** Some sources (Claude Code) report only a request's total: no split to show. */
function hasSplit(row: CostBreakdown): boolean {
  return (
    row.total_input_cost +
      row.total_output_cost +
      row.total_cache_read_cost +
      row.total_cache_write_cost >
      0 || row.total_cost === 0
  );
}

const NO_SPLIT = <span style={{ color: 'rgba(255,255,255,0.35)' }}>—</span>;

function formatCost(n: number): string {
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.01) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(4)}`;
}

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

const columns: ColumnDef<CostBreakdown>[] = [
  {
    id: 'model',
    header: 'Model',
    accessorKey: 'model',
    cell: ({ value }) => <span style={{ color: '#fff', fontWeight: 500 }}>{value as string}</span>,
  },
  {
    id: 'events',
    header: 'Events',
    accessorKey: 'event_count',
    size: 64,
    align: 'right',
    cell: ({ value }) => <span style={{ color: 'rgba(255,255,255,0.6)' }}>{value as number}</span>,
  },
  {
    id: 'input',
    header: 'Input',
    accessorKey: 'total_input_cost',
    size: 72,
    align: 'right',
    cell: ({ row, value }) =>
      hasSplit(row.original) ? (
        <span style={{ color: '#3b82f6' }}>{formatCost(value as number)}</span>
      ) : (
        NO_SPLIT
      ),
  },
  {
    id: 'output',
    header: 'Output',
    accessorKey: 'total_output_cost',
    size: 72,
    align: 'right',
    cell: ({ row, value }) =>
      hasSplit(row.original) ? (
        <span style={{ color: '#f97316' }}>{formatCost(value as number)}</span>
      ) : (
        NO_SPLIT
      ),
  },
  {
    id: 'cache',
    header: 'Cache',
    accessorFn: (row) => row.total_cache_read_cost + row.total_cache_write_cost,
    size: 72,
    align: 'right',
    cell: ({ row }) =>
      hasSplit(row.original) ? (
        <span style={{ color: '#10b981' }}>
          {formatCost(row.original.total_cache_read_cost + row.original.total_cache_write_cost)}
        </span>
      ) : (
        NO_SPLIT
      ),
  },
  {
    id: 'total',
    header: 'Total',
    accessorKey: 'total_cost',
    size: 72,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: '#fff', fontWeight: 600 }}>{formatCost(value as number)}</span>
    ),
  },
];

export const CostPanel: React.FC<Props> = ({ breakdown, timeseries, compact }) => {
  if (breakdown.length === 0 && timeseries.length === 0) {
    return (
      <div
        style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}
      >
        No cost data recorded yet
      </div>
    );
  }

  const budgetLimit = timeseries.find((p) => p.budget_limit)?.budget_limit ?? null;

  const chartData = timeseries.map((p, i) => ({
    index: i + 1,
    cost: Math.round(p.cumulative_cost * 10000) / 10000,
    perTurn: Math.round(p.total_cost * 10000) / 10000,
    time: new Date(p.timestamp).toLocaleTimeString(),
  }));

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      {/* Breakdown grid — hidden in compact mode */}
      {!compact && breakdown.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <DataGrid<CostBreakdown>
            aria-label="Cost by model"
            data={breakdown}
            columns={columns}
            getRowId={(row) => `${row.provider}:${row.model}`}
            {...GRID_PROPS}
          />
        </div>
      )}

      {/* Cumulative cost chart */}
      {chartData.length > 2 && (
        <div style={{ height: compact ? '100%' : 120, flex: compact ? 1 : undefined }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="index" hide />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9, fontFamily: font }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${v}`}
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
                formatter={(value: number, name: string) => [formatCost(value), name]}
              />
              {budgetLimit && (
                <ReferenceLine
                  y={budgetLimit}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  label={{ value: `Budget $${budgetLimit}`, fill: '#ef4444', fontSize: 9 }}
                />
              )}
              <Area
                type="monotone"
                dataKey="cost"
                name="Cumulative"
                stroke="#10b981"
                fill="url(#costGrad)"
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
