import React, { useMemo } from 'react';
import { Badge, Button, Separator, toast } from '@hydrotik/design-system';
import { IconPlus } from '@tabler/icons-react';
import type { W2Entry, W2Status } from '../types';
import { W2_STATUS_LABELS } from '../constants';
import { formatCurrency, genId } from '../utils';
import * as s from '../App.css';

interface W2ViewProps {
  w2s: W2Entry[];
  onChange: (w2s: W2Entry[]) => void;
}

function statusVariant(status: W2Status) {
  switch (status) {
    case 'entered': return 'default' as const;
    case 'received': return 'secondary' as const;
    default: return 'outline' as const;
  }
}

/** Copy raw value to clipboard (numbers without $ formatting for easy paste) */
function copyToClipboard(value: number | string | null, label: string) {
  if (value == null) return;
  const raw = typeof value === 'number'
    ? value.toFixed(2)
    : value.replace(/^\$\s*/, '').replace(/,/g, '');
  navigator.clipboard.writeText(raw).then(() => {
    toast.success('Copied', { description: `${label}: ${raw}` });
  });
}

/** A labeled row for a W-2 box value — click value to copy */
function BoxRow({ box, label, value }: { box: string; label: string; value: number | string | null }) {
  const isNumber = typeof value === 'number';
  const hasValue = value != null && value !== '—';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{
          fontSize: 9, fontWeight: 700, fontFamily: 'monospace', opacity: 0.35,
          minWidth: 44, textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>
          {box}
        </span>
        <span style={{ fontSize: 11, opacity: 0.6 }}>{label}</span>
      </div>
      <span
        role={hasValue ? 'button' : undefined}
        tabIndex={hasValue ? 0 : undefined}
        onClick={hasValue ? () => copyToClipboard(value, `${box} ${label}`) : undefined}
        onKeyDown={hasValue ? (e) => { if (e.key === 'Enter' || e.key === ' ') copyToClipboard(value, `${box} ${label}`); } : undefined}
        title={hasValue ? 'Click to copy' : undefined}
        style={{
          fontSize: 13,
          fontWeight: isNumber && value != null ? 600 : 400,
          fontFamily: 'monospace',
          cursor: hasValue ? 'pointer' : 'default',
          borderRadius: 4,
          padding: '1px 6px',
          margin: '-1px -6px',
          transition: 'background 0.15s',
          ...(hasValue ? { ':hover': { background: 'var(--accent)' } } : {}),
        }}
        onMouseEnter={hasValue ? (e) => { (e.target as HTMLElement).style.background = 'color-mix(in srgb, var(--foreground) 8%, transparent)'; } : undefined}
        onMouseLeave={hasValue ? (e) => { (e.target as HTMLElement).style.background = 'transparent'; } : undefined}
      >
        {isNumber ? formatCurrency(value) : (value ?? '—')}
      </span>
    </div>
  );
}

/** Section header inside a W-2 card */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
      letterSpacing: '0.06em', opacity: 0.4, marginBottom: 4, marginTop: 12,
    }}>
      {children}
    </div>
  );
}

/** Parse Box 14 / notes for extra key-value items */
function parseOtherItems(notes: string | null): Array<{ label: string; value: string }> {
  if (!notes) return [];
  const items: Array<{ label: string; value: string }> = [];

  // Match patterns like "NY State Wages $152,023.25" or "UI/WE/SWE $184.02" or "FLI $529.81"
  const box14Match = notes.match(/Box 14:([^|]+)/);
  if (box14Match) {
    const pairs = box14Match[1].split(',').map((s) => s.trim()).filter(Boolean);
    for (const pair of pairs) {
      const m = pair.match(/^(.+?)\s+\$?([\d,.]+)$/);
      if (m) items.push({ label: m[1].trim(), value: `$${m[2]}` });
    }
  }

  // Match Box 12 codes: "Box 12a C: $58.75"
  const box12Matches = notes.matchAll(/Box\s*12([a-d])\s+([A-Z]+):\s*\$?([\d,.]+)/g);
  for (const m of box12Matches) {
    items.push({ label: `Box 12${m[1]} — Code ${m[2]}`, value: `$${m[3]}` });
  }

  return items;
}

/** Parse NJ or other secondary state info from notes */
function parseSecondaryState(notes: string | null): { state: string; wages: string; tax: string; id: string } | null {
  if (!notes) return null;
  const m = notes.match(/(\w{2}):\s*wages\s*\$?([\d,.]+)\s*\/\s*state tax\s*\$?([\d,.]+)\s*\(ID:\s*([^)]+)\)/i);
  if (m) return { state: m[1], wages: `$${m[2]}`, tax: `$${m[3]}`, id: m[4] };
  return null;
}

function W2Card({ w2, onUpdate }: { w2: W2Entry; onUpdate: (updates: Partial<W2Entry>) => void }) {
  const totalWithheld = useMemo(() => {
    const fed = w2.box2_fed_withheld ?? 0;
    const state = w2.box17_state_withheld ?? 0;
    const local = w2.box19_local_withheld ?? 0;
    const ss = w2.box4_ss_withheld ?? 0;
    const medicare = w2.box6_medicare_withheld ?? 0;
    return fed + state + local + ss + medicare;
  }, [w2]);

  const hasData = w2.box1_wages != null;
  const otherItems = useMemo(() => parseOtherItems(w2.notes), [w2.notes]);
  const secondaryState = useMemo(() => parseSecondaryState(w2.notes), [w2.notes]);

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: 20,
      marginBottom: 16,
      background: 'var(--card)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{w2.employer}</div>
          {w2.employer_ein && (
            <div style={{ fontSize: 10, opacity: 0.35, fontFamily: 'monospace', marginTop: 2 }}>
              EIN: {w2.employer_ein}
            </div>
          )}
        </div>
        <Badge variant={statusVariant(w2.status)}>
          {W2_STATUS_LABELS[w2.status]}
        </Badge>
      </div>

      {hasData ? (
        <>
          {/* ─── Income ─── */}
          <SectionLabel>Income</SectionLabel>
          <BoxRow box="Box 1" label="Wages, tips, other compensation" value={w2.box1_wages} />
          <BoxRow box="Box 3" label="Social Security wages" value={w2.box3_ss_wages} />
          <BoxRow box="Box 5" label="Medicare wages and tips" value={w2.box5_medicare_wages} />

          <Separator style={{ margin: '8px 0' }} />

          {/* ─── Federal Withholding ─── */}
          <SectionLabel>Federal Withholding</SectionLabel>
          <BoxRow box="Box 2" label="Federal income tax withheld" value={w2.box2_fed_withheld} />
          <BoxRow box="Box 4" label="Social Security tax withheld" value={w2.box4_ss_withheld} />
          <BoxRow box="Box 6" label="Medicare tax withheld" value={w2.box6_medicare_withheld} />

          <Separator style={{ margin: '8px 0' }} />

          {/* ─── State & Local ─── */}
          <SectionLabel>State & Local (Primary)</SectionLabel>
          <BoxRow box="Box 15" label="State" value={w2.box20_locality ? 'NY' : '—'} />
          <BoxRow box="Box 16" label="State wages, tips, etc." value={w2.box16_state_wages} />
          <BoxRow box="Box 17" label="State income tax withheld" value={w2.box17_state_withheld} />
          <BoxRow box="Box 18" label="Local wages, tips, etc." value={w2.box18_local_wages} />
          <BoxRow box="Box 19" label="Local income tax withheld" value={w2.box19_local_withheld} />
          <BoxRow box="Box 20" label="Locality name" value={w2.box20_locality} />

          {/* ─── Secondary State (NJ, etc.) ─── */}
          {secondaryState && (
            <>
              <Separator style={{ margin: '8px 0' }} />
              <SectionLabel>State & Local (Secondary — {secondaryState.state})</SectionLabel>
              <BoxRow box="Box 15" label={`State (${secondaryState.state})`} value={secondaryState.state} />
              <BoxRow box="Box 16" label="State wages, tips, etc." value={secondaryState.wages} />
              <BoxRow box="Box 17" label="State income tax withheld" value={secondaryState.tax} />
              <div style={{ fontSize: 10, opacity: 0.35, fontFamily: 'monospace', marginTop: 2 }}>
                State ID: {secondaryState.id}
              </div>
            </>
          )}

          {/* ─── Box 12 Codes ─── */}
          {otherItems.some((i) => i.label.startsWith('Box 12')) && (
            <>
              <Separator style={{ margin: '8px 0' }} />
              <SectionLabel>Box 12 — Codes</SectionLabel>
              {otherItems
                .filter((i) => i.label.startsWith('Box 12'))
                .map((item, idx) => (
                  <BoxRow key={idx} box={item.label.split('—')[0].trim()} label={item.label.split('—')[1]?.trim() ?? ''} value={item.value} />
                ))
              }
            </>
          )}

          {/* ─── Box 14 Other ─── */}
          {otherItems.some((i) => !i.label.startsWith('Box 12')) && (
            <>
              <Separator style={{ margin: '8px 0' }} />
              <SectionLabel>Box 14 — Other</SectionLabel>
              {otherItems
                .filter((i) => !i.label.startsWith('Box 12'))
                .map((item, idx) => (
                  <BoxRow key={idx} box="Box 14" label={item.label} value={item.value} />
                ))
              }
            </>
          )}

          <Separator style={{ margin: '10px 0' }} />

          {/* ─── Total ─── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.6 }}>Total Withheld (Fed + SS + Medicare + State + Local)</span>
            <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'monospace' }}>
              {formatCurrency(totalWithheld)}
            </span>
          </div>
        </>
      ) : (
        <div style={{ padding: '20px 0', textAlign: 'center', opacity: 0.35, fontSize: 12 }}>
          Awaiting W-2 — data will be populated once received
        </div>
      )}
    </div>
  );
}

export function W2View({ w2s, onChange }: W2ViewProps) {
  const totalWages = useMemo(
    () => w2s.reduce((sum, w) => sum + (w.box1_wages ?? 0), 0),
    [w2s],
  );
  const totalFedWithheld = useMemo(
    () => w2s.reduce((sum, w) => sum + (w.box2_fed_withheld ?? 0), 0),
    [w2s],
  );
  const totalStateWithheld = useMemo(
    () => w2s.reduce((sum, w) => sum + (w.box17_state_withheld ?? 0), 0),
    [w2s],
  );

  /* ── SS overpayment calc (2025 wage base $176,100 @ 6.2%) ── */
  const SS_WAGE_BASE = 176100;
  const SS_RATE = 0.062;

  const totalSsWithheld = useMemo(
    () => w2s.reduce((sum, w) => sum + (w.box4_ss_withheld ?? 0), 0),
    [w2s],
  );
  const totalSsWages = useMemo(
    () => w2s.reduce((sum, w) => sum + (w.box3_ss_wages ?? 0), 0),
    [w2s],
  );
  const maxSsTax = SS_WAGE_BASE * SS_RATE;
  const ssOverpayment = Math.max(0, totalSsWithheld - maxSsTax);
  const ssExcessWages = Math.max(0, totalSsWages - SS_WAGE_BASE);

  const updateW2 = (id: string, updates: Partial<W2Entry>) => {
    onChange(w2s.map((w) => (w.id === id ? { ...w, ...updates } : w)));
  };

  const addW2 = () => {
    const newW2: W2Entry = {
      id: genId('w2'),
      employer: 'New Employer',
      employer_ein: null,
      status: 'pending',
      date_received: null,
      box1_wages: null,
      box2_fed_withheld: null,
      box3_ss_wages: null,
      box4_ss_withheld: null,
      box5_medicare_wages: null,
      box6_medicare_withheld: null,
      box16_state_wages: null,
      box17_state_withheld: null,
      box18_local_wages: null,
      box19_local_withheld: null,
      box20_locality: null,
      notes: null,
    };
    onChange([...w2s, newW2]);
    toast.success('W-2 placeholder added');
  };

  return (
    <div>
      <div className={s.sectionHeader}>
        <div className={s.sectionTitle}>W-2 Forms</div>
        <Button variant="outline" size="sm" onClick={addW2}>
          <IconPlus size={14} />
          Add W-2
        </Button>
      </div>

      {w2s.length === 0 ? (
        <div style={{ padding: 32, textAlign: 'center', opacity: 0.4, fontSize: 13 }}>
          No W-2s added yet.
        </div>
      ) : (
        <>
          {w2s.map((w2) => (
            <W2Card key={w2.id} w2={w2} onUpdate={(updates) => updateW2(w2.id, updates)} />
          ))}

          <Separator style={{ margin: '16px 0 12px' }} />

          <div className={s.grandTotal}>
            <span className={s.grandTotalLabel}>Total Wages</span>
            <span className={s.grandTotalValue}>{formatCurrency(totalWages)}</span>
            <span style={{ width: 24 }} />
            <span className={s.grandTotalLabel}>Fed Withheld</span>
            <span className={s.grandTotalValue}>{formatCurrency(totalFedWithheld)}</span>
            <span style={{ width: 24 }} />
            <span className={s.grandTotalLabel}>State Withheld</span>
            <span className={s.grandTotalValue}>{formatCurrency(totalStateWithheld)}</span>
          </div>

          {/* ── SS Overpayment Alert ── */}
          {ssOverpayment > 0 && (
            <div style={{
              marginTop: 16,
              padding: '14px 18px',
              border: '1px solid color-mix(in srgb, var(--destructive) 40%, transparent)',
              borderRadius: 8,
              background: 'color-mix(in srgb, var(--destructive) 6%, transparent)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: 'var(--destructive)' }}>
                ⚠ Social Security Tax Overpayment
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.6, opacity: 0.8 }}>
                Combined SS wages ({formatCurrency(totalSsWages)}) exceeded the 2025 wage base
                of {formatCurrency(SS_WAGE_BASE)} by {formatCurrency(ssExcessWages)}.
                Each employer withheld independently.
              </div>
              <div style={{
                display: 'flex', gap: 24, marginTop: 10, fontSize: 11, fontFamily: 'monospace',
              }}>
                <div>
                  <span style={{ opacity: 0.5 }}>Total SS withheld: </span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(totalSsWithheld)}</span>
                </div>
                <div>
                  <span style={{ opacity: 0.5 }}>Max owed: </span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(maxSsTax)}</span>
                </div>
                <div>
                  <span style={{ opacity: 0.5 }}>Overpayment: </span>
                  <span style={{ fontWeight: 700, color: 'var(--destructive)' }}>{formatCurrency(ssOverpayment)}</span>
                </div>
              </div>
              <div style={{ fontSize: 10, opacity: 0.45, marginTop: 8 }}>
                Claim excess on Form 1040 → Schedule 3, Line 11 → 1040 Line 24 (dollar-for-dollar credit)
              </div>
            </div>
          )}

          <div style={{ padding: '8px 0', fontSize: 11, opacity: 0.4 }}>
            {w2s.length} W-2{w2s.length !== 1 ? 's' : ''} ·{' '}
            {w2s.filter((w) => w.status === 'entered').length} entered ·{' '}
            {w2s.filter((w) => w.status === 'pending').length} pending
          </div>
        </>
      )}
    </div>
  );
}
