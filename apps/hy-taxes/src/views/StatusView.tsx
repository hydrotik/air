import React, { useMemo } from 'react';
import {
  DataGrid,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  toast,
} from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';
import type { SourceEntry, SourceStatus } from '../types';
import { STATUS_LABELS, SOURCE_TYPE_LABELS } from '../constants';
import * as s from '../App.css';

interface StatusViewProps {
  sources: SourceEntry[];
  onChange: (sources: SourceEntry[]) => void;
}

export function StatusView({ sources, onChange }: StatusViewProps) {
  const updateStatus = (id: string, status: SourceStatus) => {
    const src = sources.find((s) => s.id === id);
    onChange(sources.map((s) => (s.id === id ? { ...s, status } : s)));
    if (src) toast.success('Status updated', { description: `${src.name} → ${STATUS_LABELS[status]}` });
  };

  const columns: ColumnDef<SourceEntry>[] = useMemo(() => [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Source',
      size: 200,
      cell: ({ row }: { row: { original: SourceEntry } }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className={s.sourceAvatar}>{row.original.name.slice(0, 2)}</div>
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      id: 'type',
      accessorKey: 'type',
      header: 'Type',
      size: 140,
      cell: ({ value }: { value: string }) => (
        <Badge variant="outline">
          {SOURCE_TYPE_LABELS[value as keyof typeof SOURCE_TYPE_LABELS] ?? value}
        </Badge>
      ),
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      size: 160,
      cell: ({ value, row }: { value: string; row: { original: SourceEntry } }) => (
        <Select
          value={value}
          onValueChange={(v) => updateStatus(row.original.id, v as SourceStatus)}
        >
          <SelectTrigger
            style={{
              height: 28,
              fontSize: 12,
              background:
                value === 'complete'
                  ? 'rgba(34, 197, 94, 0.15)'
                  : value === 'downloaded'
                    ? 'rgba(59, 130, 246, 0.15)'
                    : undefined,
              borderColor:
                value === 'complete'
                  ? 'rgba(34, 197, 94, 0.4)'
                  : value === 'downloaded'
                    ? 'rgba(59, 130, 246, 0.4)'
                    : undefined,
              color:
                value === 'complete'
                  ? 'rgb(34, 197, 94)'
                  : value === 'downloaded'
                    ? 'rgb(59, 130, 246)'
                    : undefined,
            }}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not_started">Not Started</SelectItem>
            <SelectItem value="downloaded">Downloaded</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      id: 'files',
      accessorKey: 'files',
      header: 'Files',
      size: 80,
      align: 'center' as const,
      cell: ({ value }: { value: string[] }) => (
        <span style={{ opacity: 0.4 }}>{value.length}</span>
      ),
    },
  ], [sources, onChange]);

  return (
    <div>
      <div className={s.sectionHeader}>
        <div className={s.sectionTitle}>Source Status</div>
      </div>

      <DataGrid<SourceEntry>
        columns={columns}
        data={sources}
        density="compact"
        borderless
        headerBorder="thick"
        rowSeparator="subtle"
        enableSorting
        showToolbar={false}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
