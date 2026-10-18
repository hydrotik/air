import React from 'react';
import { DataGrid } from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';

interface PromptVariant {
  prompt_hash: string;
  variant: string;
  category: string;
  model: string;
  sample_count: number;
  goal_rate: number;
  avg_turns: number;
  avg_tokens: number;
  avg_cost: number;
  avg_latency_ms: number;
  avg_tool_error_rate: number;
  compaction_rate: number;
  avg_rating: number | null;
  rated_count: number;
}

interface Props {
  variants: PromptVariant[];
}

const font = "'JetBrains Mono', monospace";

function formatCost(n: number): string {
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.01) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(4)}`;
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}

function goalBar(rate: number): React.ReactNode {
  const width = Math.round(rate * 100);
  const color = rate >= 0.8 ? '#22c55e' : rate >= 0.5 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div
        style={{
          width: 40,
          height: 6,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div style={{ width: `${width}%`, height: '100%', background: color, borderRadius: 3 }} />
      </div>
      <span style={{ color, fontWeight: 600 }}>{Math.round(rate * 100)}%</span>
    </div>
  );
}

function stars(n: number | null): string {
  if (n == null) return '—';
  return `${n.toFixed(1)} ★`;
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

const columns: ColumnDef<PromptVariant>[] = [
  {
    id: 'variant',
    header: 'Variant',
    accessorKey: 'variant',
    cell: ({ value }) => (
      <span style={{ color: '#a855f7', fontWeight: 600 }}>{value as string}</span>
    ),
  },
  {
    id: 'category',
    header: 'Category',
    accessorKey: 'category',
    cell: ({ value }) => <span style={{ color: 'rgba(255,255,255,0.5)' }}>{value as string}</span>,
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
    id: 'goal',
    header: 'Goal Rate',
    accessorKey: 'goal_rate',
    size: 96,
    cell: ({ value }) => goalBar(value as number),
  },
  {
    id: 'turns',
    header: 'Avg Turns',
    accessorKey: 'avg_turns',
    size: 72,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{(value as number).toFixed(1)}</span>
    ),
  },
  {
    id: 'tokens',
    header: 'Avg Tokens',
    accessorKey: 'avg_tokens',
    size: 80,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{formatTokens(value as number)}</span>
    ),
  },
  {
    id: 'cost',
    header: 'Avg Cost',
    accessorKey: 'avg_cost',
    size: 72,
    align: 'right',
    cell: ({ value }) => <span style={{ color: '#10b981' }}>{formatCost(value as number)}</span>,
  },
  {
    id: 'errors',
    header: 'Errors',
    accessorKey: 'avg_tool_error_rate',
    size: 56,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: (value as number) > 0.1 ? '#ef4444' : 'rgba(255,255,255,0.4)' }}>
        {Math.round((value as number) * 100)}%
      </span>
    ),
  },
  {
    id: 'rating',
    header: 'Rating',
    accessorKey: 'avg_rating',
    size: 64,
    align: 'right',
    cell: ({ value }) => <span style={{ color: '#eab308' }}>{stars(value as number | null)}</span>,
  },
];

export const PromptPanel: React.FC<Props> = ({ variants }) => {
  if (variants.length === 0) {
    return (
      <div
        style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}
      >
        No prompt ratings yet — use <code>air.ratePrompt()</code> in the SDK
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      <DataGrid<PromptVariant>
        aria-label="Prompt variants"
        data={variants}
        columns={columns}
        getRowId={(row) => `${row.prompt_hash}:${row.variant}:${row.model}`}
        {...GRID_PROPS}
      />

      {/* Hash legend */}
      <div style={{ marginTop: 6, padding: '4px 6px', opacity: 0.3, fontSize: 8 }}>
        Prompts identified by SHA-256 hash — no content stored. Group by hash:{' '}
        <code>?hash=...</code>
      </div>
    </div>
  );
};
