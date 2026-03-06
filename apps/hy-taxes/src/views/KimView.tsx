import React, { useMemo } from 'react';
import {
  DataGrid,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  toast,
} from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';
import { IconDots, IconTrash } from '@tabler/icons-react';
import type { KimEntry } from '../types';
import { KIM_LABELS, GRID_DEFAULTS } from '../constants';
import { formatCurrency, parseDateForSort, genId } from '../utils';
import { AddSimpleEntryDialog } from '../components/AddSimpleEntryDialog';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import * as s from '../App.css';

interface KimViewProps {
  kim: KimEntry[];
  onChange: (kim: KimEntry[]) => void;
}

export function KimView({ kim, onChange }: KimViewProps) {
  const grandTotal = useMemo(() => kim.reduce((sum, k) => sum + k.amount, 0), [kim]);

  const deleteEntry = (id: string) => {
    const entry = kim.find((k) => k.id === id);
    onChange(kim.filter((k) => k.id !== id));
    if (entry) toast.success('Entry deleted', { description: `${entry.description || entry.category} — ${formatCurrency(entry.amount)}` });
  };

  const updateEntry = (id: string, updates: Partial<KimEntry>) => {
    onChange(kim.map((k) => (k.id === id ? { ...k, ...updates } : k)));
  };

  const addEntry = (values: Record<string, string>) => {
    const amount = parseFloat(values.amount) || 0;
    const newEntry: KimEntry = {
      id: genId('k'),
      category: 'kim_books', // default — user can change via edit
      date: values.date,
      description: values.description ?? '',
      amount,
    };
    onChange([...kim, newEntry]);
    toast.success('Entry added', { description: `Kim — ${formatCurrency(amount)}` });
  };

  const columns: ColumnDef<KimEntry>[] = useMemo(() => [
    {
      id: 'category',
      accessorKey: 'category',
      header: 'Category',
      size: 180,
      cell: ({ value }: { value: string }) => KIM_LABELS[value as keyof typeof KIM_LABELS] ?? value,
    },
    {
      id: 'date',
      accessorKey: 'date',
      header: 'Date',
      size: 100,
      editable: true,
      sortingFn: (rowA, rowB) =>
        parseDateForSort(rowA.original.date) - parseDateForSort(rowB.original.date),
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Description',
      size: 300,
      editable: true,
    },
    {
      id: 'amount',
      accessorKey: 'amount',
      header: 'Amount',
      size: 120,
      align: 'right' as const,
      editable: true,
      cell: ({ value }: { value: number }) => formatCurrency(value),
    },
    {
      id: 'actions',
      header: '',
      size: 60,
      enableSorting: false,
      cell: ({ row }: { row: { original: KimEntry } }) => (
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
              description={row.original.description || row.original.category}
              amount={formatCurrency(row.original.amount)}
              onConfirm={() => deleteEntry(row.original.id)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [kim, onChange]);

  return (
    <div>
      <div className={s.sectionHeader}>
        <div className={s.sectionTitle}>Kim&apos;s Expenses</div>
        <AddSimpleEntryDialog
          title="Kim's Expense"
          fields={['date', 'description', 'amount']}
          onAdd={addEntry}
        />
      </div>

      <DataGrid<KimEntry>
        columns={columns}
        data={kim}
        {...GRID_DEFAULTS}
        enableSorting
        enableEditing
        enableGrouping
        showToolbar
        initialState={{
          grouping: ['category'],
          sorting: [{ id: 'date', desc: false }],
        }}
        getRowId={(row) => row.id}
        onCellEdit={(rowId, columnId, value) => {
          const parsed = columnId === 'amount' ? parseFloat(value) || 0 : value;
          updateEntry(rowId, { [columnId]: parsed } as Partial<KimEntry>);
          toast.success('Entry updated');
        }}
      />

      <div className={s.grandTotal}>
        <span className={s.grandTotalLabel}>Grand Total</span>
        <span className={s.grandTotalValue}>{formatCurrency(grandTotal)}</span>
      </div>
    </div>
  );
}
