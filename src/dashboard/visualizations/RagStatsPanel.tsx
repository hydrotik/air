import React from 'react';
import { DataGrid } from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';

interface RagStat {
  source: string;
  type: string;
  call_count: number;
  avg_ms: number;
  min_ms: number;
  max_ms: number;
  avg_results: number | null;
  avg_top_score: number | null;
  total_chunk_tokens: number | null;
}

interface Props {
  stats: RagStat[];
}

const TYPE_COLORS: Record<string, string> = {
  rag_retrieval: '#84cc16',
  rag_embedding: '#a3e635',
  rag_index: '#65a30d',
};

const TYPE_LABELS: Record<string, string> = {
  rag_retrieval: 'Retrieval',
  rag_embedding: 'Embedding',
  rag_index: 'Index',
};

const font = "'JetBrains Mono', monospace";

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
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

const muted = (alpha: number) => `rgba(255,255,255,${alpha})`;

const columns: ColumnDef<RagStat>[] = [
  {
    id: 'source',
    header: 'Source',
    accessorKey: 'source',
    cell: ({ value }) => <span style={{ color: '#fff', fontWeight: 500 }}>{value as string}</span>,
  },
  {
    id: 'type',
    header: 'Type',
    accessorKey: 'type',
    cell: ({ value }) => (
      <span style={{ color: TYPE_COLORS[value as string] ?? '#94a3b8', fontWeight: 600 }}>
        {TYPE_LABELS[value as string] ?? (value as string)}
      </span>
    ),
  },
  {
    id: 'calls',
    header: 'Calls',
    accessorKey: 'call_count',
    size: 56,
    align: 'right',
    cell: ({ value }) => <span style={{ color: '#fff' }}>{value as number}</span>,
  },
  {
    id: 'avg',
    header: 'Avg',
    accessorKey: 'avg_ms',
    size: 64,
    align: 'right',
    cell: ({ value }) => <span style={{ color: muted(0.7) }}>{Math.round(value as number)}ms</span>,
  },
  {
    id: 'results',
    header: 'Avg Results',
    accessorKey: 'avg_results',
    size: 88,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: muted(0.6) }}>
        {value != null ? (value as number).toFixed(1) : '—'}
      </span>
    ),
  },
  {
    id: 'score',
    header: 'Avg Score',
    accessorKey: 'avg_top_score',
    size: 80,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: muted(0.6) }}>
        {value != null ? (value as number).toFixed(3) : '—'}
      </span>
    ),
  },
  {
    id: 'tokens',
    header: 'Tokens',
    accessorKey: 'total_chunk_tokens',
    size: 64,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: muted(0.5) }}>
        {value != null ? formatTokens(value as number) : '—'}
      </span>
    ),
  },
];

export const RagStatsPanel: React.FC<Props> = ({ stats }) => {
  if (stats.length === 0) {
    return (
      <div
        style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}
      >
        No RAG events recorded — connect with <code>createRagTracer()</code>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      <DataGrid<RagStat>
        aria-label="RAG calls by source"
        data={stats}
        columns={columns}
        getRowId={(row) => `${row.source}:${row.type}`}
        {...GRID_PROPS}
      />
    </div>
  );
};
