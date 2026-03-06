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
import type { IncomeEntry } from '../types';
import { INCOME_SOURCE_LABELS, GRID_DEFAULTS } from '../constants';
import { formatCurrency, parseDateForSort, genId } from '../utils';
import { AddSimpleEntryDialog } from '../components/AddSimpleEntryDialog';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import * as s from '../App.css';

interface IncomeViewProps {
  income: IncomeEntry[];
  onChange: (income: IncomeEntry[]) => void;
}

export function IncomeView({ income, onChange }: IncomeViewProps) {
  const grandTotal = useMemo(() => income.reduce((sum, i) => sum + i.amount, 0), [income]);
  const less1099 = useMemo(
    () => income.filter((i) => i.source !== '1099').reduce((sum, i) => sum + i.amount, 0),
    [income],
  );

  const deleteEntry = (id: string) => {
    const entry = income.find((i) => i.id === id);
    onChange(income.filter((i) => i.id !== id));
    if (entry) toast.success('Entry deleted', { description: `${entry.description} — ${formatCurrency(entry.amount)}` });
  };

  const updateEntry = (id: string, updates: Partial<IncomeEntry>) => {
    onChange(income.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  };

  const addEntry = (values: Record<string, string>) => {
    const amount = parseFloat(values.amount) || 0;
    const newEntry: IncomeEntry = {
      id: genId('inc'),
      source: 'other',
      date: values.date,
      description: values.description,
      amount,
    };
    onChange([...income, newEntry]);
    toast.success('Income added', { description: `${values.description} — ${formatCurrency(amount)}` });
  };

  const columns: ColumnDef<IncomeEntry>[] = useMemo(() => [
    {
      id: 'source',
      accessorKey: 'source',
      header: 'Source',
      size: 140,
      cell: ({ value }: { value: string }) =>
        INCOME_SOURCE_LABELS[value as keyof typeof INCOME_SOURCE_LABELS] ?? value,
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
      size: 320,
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
      cell: ({ row }: { row: { original: IncomeEntry } }) => (
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
              description={row.original.description}
              amount={formatCurrency(row.original.amount)}
              onConfirm={() => deleteEntry(row.original.id)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [income, onChange]);

  return (
    <div>
      <div className={s.sectionHeader}>
        <div className={s.sectionTitle}>Income</div>
        <AddSimpleEntryDialog
          title="Income"
          fields={['date', 'description', 'amount']}
          onAdd={addEntry}
        />
      </div>

      <DataGrid<IncomeEntry>
        columns={columns}
        data={income}
        {...GRID_DEFAULTS}
        enableSorting
        enableEditing
        enableGrouping
        showToolbar
        initialState={{
          grouping: ['source'],
          sorting: [{ id: 'date', desc: false }],
        }}
        getRowId={(row) => row.id}
        onCellEdit={(rowId, columnId, value) => {
          const parsed = columnId === 'amount' ? parseFloat(value) || 0 : value;
          updateEntry(rowId, { [columnId]: parsed } as Partial<IncomeEntry>);
          toast.success('Entry updated');
        }}
      />

      <div className={s.grandTotal}>
        <span className={s.grandTotalLabel}>Grand Total</span>
        <span className={s.grandTotalValue}>{formatCurrency(grandTotal)}</span>
        <span style={{ width: 24 }} />
        <span className={s.grandTotalLabel}>Less 1099</span>
        <span className={s.grandTotalValue}>{formatCurrency(less1099)}</span>
      </div>
    </div>
  );
}
