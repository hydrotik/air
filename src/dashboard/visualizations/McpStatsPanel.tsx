import React from 'react';
import { DataGrid } from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';

interface McpStat {
  server_name: string;
  method: string;
  tool_name: string | null;
  call_count: number;
  avg_ms: number;
  min_ms: number;
  max_ms: number;
  errors: number;
}

interface Props {
  stats: McpStat[];
}

const METHOD_COLORS: Record<string, string> = {
  'tools/call': '#f97316',
  'resources/read': '#3b82f6',
  'prompts/get': '#a855f7',
  'tools/list': '#64748b',
  'resources/list': '#64748b',
  'prompts/list': '#64748b',
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

const columns: ColumnDef<McpStat>[] = [
  {
    id: 'server',
    header: 'Server',
    accessorKey: 'server_name',
    cell: ({ value }) => <span style={{ color: '#fff', fontWeight: 500 }}>{value as string}</span>,
  },
  {
    id: 'method',
    header: 'Method',
    accessorKey: 'method',
    cell: ({ value }) => (
      <span style={{ color: METHOD_COLORS[value as string] ?? '#94a3b8', fontWeight: 600 }}>
        {value as string}
      </span>
    ),
  },
  {
    id: 'tool',
    header: 'Tool/Resource',
    accessorKey: 'tool_name',
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{(value as string | null) ?? '—'}</span>
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
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{Math.round(value as number)}ms</span>
    ),
  },
  {
    id: 'min',
    header: 'Min',
    accessorKey: 'min_ms',
    size: 64,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{value as number}ms</span>
    ),
  },
  {
    id: 'max',
    header: 'Max',
    accessorKey: 'max_ms',
    size: 64,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{value as number}ms</span>
    ),
  },
  {
    id: 'errors',
    header: 'Errors',
    accessorKey: 'errors',
    size: 56,
    align: 'right',
    cell: ({ value }) => (
      <span style={{ color: (value as number) > 0 ? '#ef4444' : 'rgba(255,255,255,0.3)' }}>
        {value as number}
      </span>
    ),
  },
];

export const McpStatsPanel: React.FC<Props> = ({ stats }) => {
  if (stats.length === 0) {
    return (
      <div
        style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}
      >
        No MCP calls recorded — connect an MCP server with <code>instrumentMcp()</code>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      <DataGrid<McpStat>
        aria-label="MCP calls by server and method"
        data={stats}
        columns={columns}
        getRowId={(row) => `${row.server_name}:${row.method}:${row.tool_name ?? ''}`}
        {...GRID_PROPS}
      />
    </div>
  );
};
