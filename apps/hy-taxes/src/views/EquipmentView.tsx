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
import type { EquipmentEntry } from '../types';
import { GRID_DEFAULTS } from '../constants';
import { formatCurrency, parseDateForSort, genId } from '../utils';
import { AddSimpleEntryDialog } from '../components/AddSimpleEntryDialog';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import * as s from '../App.css';

interface EquipmentViewProps {
  equipment: EquipmentEntry[];
  onChange: (equipment: EquipmentEntry[]) => void;
}

export function EquipmentView({ equipment, onChange }: EquipmentViewProps) {
  const totals = useMemo(() => ({
    grand: equipment.reduce((sum, e) => sum + e.amount, 0),
    equip: equipment.reduce((sum, e) => sum + (e.equip_amount ?? 0), 0),
    small: equipment.reduce((sum, e) => sum + (e.small_equip_amount ?? 0), 0),
  }), [equipment]);

  const updateEntry = (id: string, updates: Partial<EquipmentEntry>) => {
    onChange(equipment.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteEntry = (id: string) => {
    const entry = equipment.find((e) => e.id === id);
    onChange(equipment.filter((e) => e.id !== id));
    if (entry) toast.success('Entry deleted', { description: `${entry.description} — ${formatCurrency(entry.amount)}` });
  };

  const addEntry = (values: Record<string, string>) => {
    const amount = parseFloat(values.amount) || 0;
    const newEntry: EquipmentEntry = {
      id: genId('eq'),
      date: values.date,
      company: values.company,
      description: values.description,
      amount,
      equip_amount: amount >= 250 ? amount : null,
      small_equip_amount: amount < 250 ? amount : null,
      source: '',
      notes: null,
    };
    onChange([...equipment, newEntry]);
    toast.success('Equipment added', { description: `${values.description} — ${formatCurrency(amount)}` });
  };

  const columns: ColumnDef<EquipmentEntry>[] = useMemo(() => [
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
      id: 'company',
      accessorKey: 'company',
      header: 'Company',
      size: 150,
      editable: true,
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Description',
      size: 280,
      editable: true,
    },
    {
      id: 'amount',
      accessorKey: 'amount',
      header: 'Price',
      size: 110,
      align: 'right' as const,
      editable: true,
      cell: ({ value }: { value: number }) => formatCurrency(value),
    },
    {
      id: 'equip_amount',
      accessorKey: 'equip_amount',
      header: 'Equip ≥$250',
      size: 120,
      align: 'right' as const,
      cell: ({ value }: { value: number | null }) => (value ? formatCurrency(value) : '—'),
    },
    {
      id: 'small_equip_amount',
      accessorKey: 'small_equip_amount',
      header: 'Small <$250',
      size: 120,
      align: 'right' as const,
      cell: ({ value }: { value: number | null }) => (value ? formatCurrency(value) : '—'),
    },
    {
      id: 'actions',
      header: '',
      size: 60,
      enableSorting: false,
      cell: ({ row }: { row: { original: EquipmentEntry } }) => (
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
  ], [equipment, onChange]);

  return (
    <div>
      <div className={s.sectionHeader}>
        <div className={s.sectionTitle}>Music Equipment</div>
        <AddSimpleEntryDialog
          title="Equipment"
          fields={['date', 'company', 'description', 'amount']}
          onAdd={addEntry}
        />
      </div>

      <DataGrid<EquipmentEntry>
        columns={columns}
        data={equipment}
        {...GRID_DEFAULTS}
        enableSorting
        enableEditing
        enableGlobalFilter
        showToolbar
        getRowId={(row) => row.id}
        onCellEdit={(rowId, columnId, value) => {
          if (columnId === 'amount') {
            const amount = parseFloat(value) || 0;
            updateEntry(rowId, {
              amount,
              equip_amount: amount >= 250 ? amount : null,
              small_equip_amount: amount < 250 ? amount : null,
            });
          } else {
            updateEntry(rowId, { [columnId]: value } as Partial<EquipmentEntry>);
          }
          toast.success('Entry updated');
        }}
      />

      <div className={s.grandTotal}>
        <span style={{ flex: 1 }} />
        <span className={s.grandTotalLabel}>Equip</span>
        <span className={s.grandTotalValue}>{formatCurrency(totals.equip)}</span>
        <span style={{ width: 16 }} />
        <span className={s.grandTotalLabel}>Small</span>
        <span className={s.grandTotalValue}>{formatCurrency(totals.small)}</span>
        <span style={{ width: 16 }} />
        <span className={s.grandTotalLabel}>Total</span>
        <span className={s.grandTotalValue}>{formatCurrency(totals.grand)}</span>
      </div>
    </div>
  );
}
