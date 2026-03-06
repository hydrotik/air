/* ─── JSON data loader ───────────────────────────────────────────────────── */
/*
 * Reads JSON files from `public/data/YYYY/` via fetch.
 * On first load, if a file 404s, returns the seed default.
 *
 * WRITES are handled outside the app (Pi tools edit the JSON files directly).
 * The app is read-only + in-memory edits. We persist edits by writing back
 * to the JSON files via a Vite dev middleware or Pi.
 */

import { userDataDir } from './constants';
import { SEED_META, SEED_SOURCES } from './seed';
import type {
  TaxMeta,
  SourceEntry,
  DeductionEntry,
  EquipmentEntry,
  UtilityEntry,
  KimEntry,
  IncomeEntry,
  TaxDocEntry,
  W2Entry,
  TaxData,
  UserId,
} from './types';

async function fetchJson<T>(dir: string, filename: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${dir}/${filename}`);
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function loadTaxData(userId: UserId = 'donovan'): Promise<TaxData> {
  const dir = userDataDir(userId);
  const [meta, sources, deductions, equipment, utilities, kim, income, taxDocs, w2s] =
    await Promise.all([
      fetchJson<TaxMeta>(dir, 'meta.json', SEED_META),
      fetchJson<SourceEntry[]>(dir, 'sources.json', userId === 'donovan' ? SEED_SOURCES : []),
      fetchJson<DeductionEntry[]>(dir, 'deductions.json', []),
      fetchJson<EquipmentEntry[]>(dir, 'equipment.json', []),
      fetchJson<UtilityEntry[]>(dir, 'utilities.json', []),
      fetchJson<KimEntry[]>(dir, 'kim.json', []),
      fetchJson<IncomeEntry[]>(dir, 'income.json', []),
      fetchJson<TaxDocEntry[]>(dir, 'tax-docs.json', []),
      fetchJson<W2Entry[]>(dir, 'w2s.json', []),
    ]);

  return { meta, sources, deductions, equipment, utilities, kim, income, taxDocs, w2s };
}
