import React, { useMemo, useState } from 'react';
import {
  Button,
  Badge,
  FlagTag,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  toast,
} from '@hydrotik/design-system';
import { IconDots, IconEyeOff, IconTrash, IconEye, IconPlus } from '@tabler/icons-react';
import type { DeductionEntry, SourceEntry, EntryStatus, DeductionCategory } from '../types';
import { CATEGORY_LABELS, DEDUCTION_CATEGORIES } from '../constants';
import { formatCurrency, parseDateForSort, genId } from '../utils';
import { AddEntryDialog } from '../components/AddEntryDialog';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import * as s from '../App.css';

interface DeductionsViewProps {
  deductions: DeductionEntry[];
  sources: SourceEntry[];
  activeSource: string | null;
  onChange: (deductions: DeductionEntry[]) => void;
}

const SOURCE_MAP = (sources: SourceEntry[]) =>
  Object.fromEntries(sources.map((s) => [s.id, s.name]));

/** A single category section: header + table + subtotal */
function CategorySection({
  category,
  label,
  entries,
  sourceLabels,
  onUpdate,
  onDelete,
}: {
  category: DeductionCategory;
  label: string;
  entries: DeductionEntry[];
  sourceLabels: Record<string, string>;
  onUpdate: (id: string, updates: Partial<DeductionEntry>) => void;
  onDelete: (id: string) => void;
}) {
  const sorted = useMemo(
    () => [...entries].sort((a, b) => parseDateForSort(a.date) - parseDateForSort(b.date)),
    [entries],
  );
  const subtotal = useMemo(
    () => sorted.filter((d) => d.status !== 'excluded').reduce((sum, d) => sum + d.amount, 0),
    [sorted],
  );

  if (sorted.length === 0) return null;

  return (
    <section className={s.categorySection}>
      <div className={s.categoryHeader}>
        <span className={s.categoryName}>{label}</span>
        <span className={s.categoryTotal}>{formatCurrency(subtotal)}</span>
      </div>
      <table className={s.categoryTable}>
        <thead>
          <tr>
            <th style={{ width: 100 }}>Date</th>
            <th>Description</th>
            <th style={{ width: 110, textAlign: 'right' }}>Amount</th>
            <th style={{ width: 130 }}>Source</th>
            <th style={{ width: 40 }}></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry) => {
            const isExcluded = entry.status === 'excluded';
            return (
              <tr
                key={entry.id}
                style={{ opacity: isExcluded ? 0.4 : 1 }}
              >
                <td>{entry.date}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {entry.description}
                    {entry.status === 'pending' && (
                      <FlagTag variant="warning" label="PENDING" size="xs" marginLeft="0" />
                    )}
                    {isExcluded && (
                      <FlagTag variant="muted" label="EXCLUDED" size="xs" marginLeft="0" />
                    )}
                    {entry.created_by === 'llm_suggested' && (
                      <FlagTag variant="primary" label="LLM" size="xs" marginLeft="0" />
                    )}
                  </span>
                </td>
                <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                  {formatCurrency(entry.amount)}
                </td>
                <td>
                  <Badge variant="outline" style={{ fontSize: 10 }}>
                    {sourceLabels[entry.source] ?? entry.source}
                  </Badge>
                </td>
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <IconDots size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          const newStatus: EntryStatus = isExcluded ? 'confirmed' : 'excluded';
                          onUpdate(entry.id, { status: newStatus });
                          toast.success(isExcluded ? 'Entry included' : 'Entry excluded', {
                            description: entry.description,
                          });
                        }}
                      >
                        {isExcluded ? <IconEye size={14} /> : <IconEyeOff size={14} />}
                        {isExcluded ? 'Include' : 'Exclude'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DeleteConfirmDialog
                        trigger={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <IconTrash size={14} />
                            Delete
                          </DropdownMenuItem>
                        }
                        description={entry.description}
                        amount={formatCurrency(entry.amount)}
                        onConfirm={() => onDelete(entry.id)}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export function DeductionsView({ deductions, sources, activeSource, onChange }: DeductionsViewProps) {
  const [showExcluded, setShowExcluded] = useState(false);
  const sourceLabels = useMemo(() => SOURCE_MAP(sources), [sources]);

  const filteredData = useMemo(() => {
    let items = deductions;
    if (!showExcluded) items = items.filter((d) => d.status !== 'excluded');
    if (activeSource) items = items.filter((d) => d.source === activeSource);
    return items;
  }, [deductions, showExcluded, activeSource]);

  const grandTotal = useMemo(
    () => filteredData.filter((d) => d.status !== 'excluded').reduce((sum, d) => sum + d.amount, 0),
    [filteredData],
  );

  const updateEntry = (id: string, updates: Partial<DeductionEntry>) => {
    onChange(deductions.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const deleteEntry = (id: string) => {
    const entry = deductions.find((d) => d.id === id);
    onChange(deductions.filter((d) => d.id !== id));
    if (entry) toast.success('Entry deleted', { description: `${entry.description} — ${formatCurrency(entry.amount)}` });
  };

  const addEntry = (data: { date: string; description: string; amount: number; category: DeductionCategory; source: string }) => {
    const newEntry: DeductionEntry = {
      id: genId('d'),
      category: data.category,
      date: data.date,
      description: data.description,
      amount: data.amount,
      source: data.source,
      notes: null,
      created_by: 'manual',
      status: 'confirmed',
    };
    onChange([...deductions, newEntry]);
    toast.success('Entry added', { description: `${data.description} — ${formatCurrency(data.amount)}` });
  };

  /** Categories that have entries, in canonical order */
  const activeCategories = useMemo(() =>
    DEDUCTION_CATEGORIES.filter((cat) => filteredData.some((d) => d.category === cat)),
    [filteredData],
  );

  return (
    <div>
      <div className={s.sectionHeader}>
        <div className={s.sectionTitle}>Deductions</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExcluded(!showExcluded)}
          >
            {showExcluded ? <IconEye size={14} /> : <IconEyeOff size={14} />}
            {showExcluded ? 'Hide excluded' : 'Show excluded'}
          </Button>
          <AddEntryDialog sources={sources} onAdd={addEntry} />
        </div>
      </div>

      <div className={s.categorySections}>
        {activeCategories.map((cat) => (
          <CategorySection
            key={cat}
            category={cat}
            label={CATEGORY_LABELS[cat]}
            entries={filteredData.filter((d) => d.category === cat)}
            sourceLabels={sourceLabels}
            onUpdate={updateEntry}
            onDelete={deleteEntry}
          />
        ))}
      </div>

      <div className={s.grandTotal}>
        <span className={s.grandTotalLabel}>Deduction Grand Total</span>
        <span className={s.grandTotalValue}>{formatCurrency(grandTotal)}</span>
      </div>
    </div>
  );
}
