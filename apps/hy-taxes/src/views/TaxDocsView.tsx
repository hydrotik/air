import React, { useMemo } from 'react';
import {
  DataGrid,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  toast,
} from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';
import { IconDots, IconTrash } from '@tabler/icons-react';
import type { TaxDocEntry, TaxDocStatus } from '../types';
import { TAX_DOC_TYPE_LABELS, TAX_DOC_STATUS_LABELS, GRID_DEFAULTS } from '../constants';
import { genId } from '../utils';
import { AddSimpleEntryDialog } from '../components/AddSimpleEntryDialog';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import * as s from '../App.css';

interface TaxDocsViewProps {
  taxDocs: TaxDocEntry[];
  onChange: (docs: TaxDocEntry[]) => void;
}

function statusVariant(status: TaxDocStatus) {
  switch (status) {
    case 'entered': return 'default' as const;
    case 'received': return 'secondary' as const;
    default: return 'outline' as const;
  }
}

export function TaxDocsView({ taxDocs, onChange }: TaxDocsViewProps) {
  const deleteEntry = (id: string) => {
    const entry = taxDocs.find((d) => d.id === id);
    onChange(taxDocs.filter((d) => d.id !== id));
    if (entry) toast.success('Document removed', { description: `${entry.issuer}` });
  };

  const updateEntry = (id: string, updates: Partial<TaxDocEntry>) => {
    onChange(taxDocs.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const addEntry = (values: Record<string, string>) => {
    const newEntry: TaxDocEntry = {
      id: genId('td'),
      type: 'other',
      issuer: values.description,
      description: values.amount ?? '',
      status: 'pending',
      date_received: values.date || null,
      notes: null,
    };
    onChange([...taxDocs, newEntry]);
    toast.success('Document added', { description: values.description });
  };

  const columns: ColumnDef<TaxDocEntry>[] = useMemo(() => [
    {
      id: 'type',
      accessorKey: 'type',
      header: 'Form',
      size: 180,
      cell: ({ value }: { value: string }) =>
        TAX_DOC_TYPE_LABELS[value as keyof typeof TAX_DOC_TYPE_LABELS] ?? value,
    },
    {
      id: 'issuer',
      accessorKey: 'issuer',
      header: 'Issuer',
      size: 280,
      editable: true,
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Details',
      size: 380,
      editable: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      size: 120,
      cell: ({ value }: { value: TaxDocStatus }) => (
        <Badge variant={statusVariant(value)}>
          {TAX_DOC_STATUS_LABELS[value]}
        </Badge>
      ),
    },
    {
      id: 'date_received',
      accessorKey: 'date_received',
      header: 'Received',
      size: 110,
      editable: true,
      cell: ({ value }: { value: string | null }) => value ?? '—',
    },
    {
      id: 'actions',
      header: '',
      size: 60,
      enableSorting: false,
      cell: ({ row }: { row: { original: TaxDocEntry } }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <IconDots size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DeleteConfirmDialog
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <IconTrash size={14} />
                  Delete
                </DropdownMenuItem>
              }
              description={row.original.issuer}
              amount={row.original.type}
              onConfirm={() => deleteEntry(row.original.id)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [taxDocs, onChange]);

  return (
    <div>
      <div className={s.sectionHeader}>
        <div className={s.sectionTitle}>Tax Documents</div>
        <AddSimpleEntryDialog
          title="Tax Document"
          fields={['date', 'description']}
          onAdd={addEntry}
        />
      </div>

      {taxDocs.length === 0 ? (
        <div style={{ padding: 32, textAlign: 'center', opacity: 0.4, fontSize: 13 }}>
          No tax documents yet. Add 1099s, 1098s, and other forms as they arrive.
        </div>
      ) : (
        <DataGrid<TaxDocEntry>
          columns={columns}
          data={taxDocs}
          {...GRID_DEFAULTS}
          enableSorting
          enableEditing
          showToolbar={false}
          getRowId={(row) => row.id}
          onCellEdit={(rowId, columnId, value) => {
            updateEntry(rowId, { [columnId]: value } as Partial<TaxDocEntry>);
            toast.success('Document updated');
          }}
        />
      )}

      <div style={{ padding: '12px 0', fontSize: 11, opacity: 0.4 }}>
        {taxDocs.length} document{taxDocs.length !== 1 ? 's' : ''} ·{' '}
        {taxDocs.filter((d) => d.status === 'entered').length} entered ·{' '}
        {taxDocs.filter((d) => d.status === 'pending').length} pending
      </div>
    </div>
  );
}
