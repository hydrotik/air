import React, { useMemo, useState, useCallback } from 'react';
import { Button, Input, toast } from '@hydrotik/design-system';
import type { UtilityEntry, UtilityCategory } from '../types';
import { UTILITY_CATEGORIES, UTILITY_LABELS, MONTHS } from '../constants';
import { formatCurrency } from '../utils';
import * as s from '../App.css';

interface UtilitiesViewProps {
  utilities: UtilityEntry[];
  onChange: (utilities: UtilityEntry[]) => void;
}

export function UtilitiesView({ utilities, onChange }: UtilitiesViewProps) {
  const [editing, setEditing] = useState<{ cat: UtilityCategory; month: number } | null>(null);
  const [editValue, setEditValue] = useState('');

  /** Look up amount for a category + month */
  const getAmount = useCallback(
    (cat: UtilityCategory, month: number): number | null => {
      const entry = utilities.find((u) => u.category === cat && u.month === month);
      return entry ? entry.amount : null;
    },
    [utilities],
  );

  /** Row total for a utility category */
  const rowTotal = useCallback(
    (cat: UtilityCategory): number =>
      utilities.filter((u) => u.category === cat).reduce((sum, u) => sum + u.amount, 0),
    [utilities],
  );

  /** Column total for a month */
  const colTotal = useCallback(
    (month: number): number =>
      utilities.filter((u) => u.month === month).reduce((sum, u) => sum + u.amount, 0),
    [utilities],
  );

  const grandTotal = useMemo(
    () => utilities.reduce((sum, u) => sum + u.amount, 0),
    [utilities],
  );

  const startEdit = (cat: UtilityCategory, month: number) => {
    setEditing({ cat, month });
    setEditValue(String(getAmount(cat, month) ?? ''));
  };

  const commitEdit = () => {
    if (!editing) return;
    const { cat, month } = editing;
    const amount = parseFloat(editValue);
    const idx = utilities.findIndex((u) => u.category === cat && u.month === month);

    let updated: UtilityEntry[];
    if (isNaN(amount) || amount === 0) {
      // Remove entry
      updated = utilities.filter((_, i) => i !== idx);
    } else if (idx >= 0) {
      // Update existing
      updated = utilities.map((u, i) => (i === idx ? { ...u, amount } : u));
    } else {
      // Add new
      updated = [...utilities, { category: cat, month, date: '', amount }];
    }
    onChange(updated);
    setEditing(null);
    toast.success('Utility updated', { description: `${UTILITY_LABELS[cat]} — ${MONTHS[month - 1]}` });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') setEditing(null);
  };

  return (
    <div>
      <div className={s.sectionHeader}>
        <div className={s.sectionTitle}>Utilities Breakdown</div>
      </div>

      <table className={s.utilityMatrix}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Category</th>
            {MONTHS.map((m) => (
              <th key={m}>{m}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {UTILITY_CATEGORIES.map((cat) => (
            <tr key={cat}>
              <td>{UTILITY_LABELS[cat]}</td>
              {MONTHS.map((_, mi) => {
                const month = mi + 1;
                const isEditing = editing?.cat === cat && editing?.month === month;
                const amt = getAmount(cat, month);

                return (
                  <td key={mi} onClick={() => !isEditing && startEdit(cat, month)} style={{ cursor: 'pointer', minWidth: 70 }}>
                    {isEditing ? (
                      <Input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={commitEdit}
                        onKeyDown={handleKeyDown}
                        style={{ width: 70, textAlign: 'right', padding: '2px 4px', fontSize: 12 }}
                      />
                    ) : amt != null ? (
                      formatCurrency(amt)
                    ) : (
                      <span className={s.utilityEmpty}>—</span>
                    )}
                  </td>
                );
              })}
              <td className={s.utilityTotal}>{formatCurrency(rowTotal(cat))}</td>
            </tr>
          ))}
          {/* Footer totals row */}
          <tr>
            <td className={s.utilityTotal}>Total</td>
            {MONTHS.map((_, mi) => (
              <td key={mi} className={s.utilityTotal}>
                {formatCurrency(colTotal(mi + 1))}
              </td>
            ))}
            <td className={s.utilityTotal}>{formatCurrency(grandTotal)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
