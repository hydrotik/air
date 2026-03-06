/* ─── hy-taxes data types ────────────────────────────────────────────────── */

// ─── Users ───────────────────────────────────────────────────────────────────

export type UserId = 'donovan' | 'kimaree';

export interface UserProfile {
  id: UserId;
  name: string;
  initials: string;
  business: string | null;
  color: string;
}

// ─── Meta ────────────────────────────────────────────────────────────────────

export interface TaxMeta {
  year: number;
  created_at: string;
  status: 'in_progress' | 'complete';
}

// ─── Sources ─────────────────────────────────────────────────────────────────

export type SourceType = 'credit_card' | 'bank_account' | 'platform' | 'utility' | 'other';
export type SourceStatus = 'not_started' | 'downloaded' | 'complete';

export interface SourceEntry {
  id: string;
  name: string;
  type: SourceType;
  status: SourceStatus;
  files: string[];
}

// ─── Deductions ──────────────────────────────────────────────────────────────

export type DeductionCategory =
  | 'books'
  | 'shipping'
  | 'office_furnishings'
  | 'office_equipment'
  | 'office_supplies'
  | 'computer_software'
  | 'advertising'
  | 'hosting'
  | 'dining'
  | 'transportation'
  | 'medical'
  | 'education';

export type EntryCreatedBy = 'import' | 'manual' | 'llm_suggested';
export type EntryStatus = 'pending' | 'confirmed' | 'excluded';

export interface DeductionEntry {
  id: string;
  category: DeductionCategory;
  date: string;
  description: string;
  amount: number;
  source: string;
  notes: string | null;
  created_by: EntryCreatedBy;
  status: EntryStatus;
}

// ─── Equipment ───────────────────────────────────────────────────────────────

export interface EquipmentEntry {
  id: string;
  date: string;
  company: string;
  description: string;
  amount: number;
  equip_amount: number | null;
  small_equip_amount: number | null;
  source: string;
  notes: string | null;
}

// ─── Utilities ───────────────────────────────────────────────────────────────

export type UtilityCategory =
  | 'cell'
  | 'electricity'
  | 'rent'
  | 'internet'
  | 'utilities_other'
  | 'school'
  | 'storage'
  | 'transportation'
  | 'car';

export interface UtilityEntry {
  category: UtilityCategory;
  month: number; // 1-12
  date: string;
  amount: number;
}

// ─── Kim ─────────────────────────────────────────────────────────────────────

export type KimCategory = 'kim_cell' | 'anthony_college' | 'kim_transportation' | 'kim_books';

export interface KimEntry {
  id: string;
  category: KimCategory;
  date: string;
  description: string;
  amount: number;
}

// ─── Income ──────────────────────────────────────────────────────────────────

export type IncomeSource = 'catapult' | 'bandcamp' | 'w2' | '1099' | 'other';

export interface IncomeEntry {
  id: string;
  source: IncomeSource;
  date: string;
  description: string;
  amount: number;
}

// ─── Tax Documents ───────────────────────────────────────────────────────────

export type TaxDocType = '1095-B' | '1099-B' | '1099-G' | '1099-INT' | '1099-DIV' | '1099-MISC' | '1099-NEC' | '1099-R' | '1098' | 'other';
export type TaxDocStatus = 'pending' | 'received' | 'entered';

export interface TaxDocEntry {
  id: string;
  type: TaxDocType;
  issuer: string;
  description: string;
  status: TaxDocStatus;
  date_received: string | null;
  notes: string | null;
}

// ─── W-2s ────────────────────────────────────────────────────────────────────

export type W2Status = 'pending' | 'received' | 'entered';

export interface W2Entry {
  id: string;
  employer: string;
  employer_ein: string | null;
  status: W2Status;
  date_received: string | null;
  box1_wages: number | null;
  box2_fed_withheld: number | null;
  box3_ss_wages: number | null;
  box4_ss_withheld: number | null;
  box5_medicare_wages: number | null;
  box6_medicare_withheld: number | null;
  box16_state_wages: number | null;
  box17_state_withheld: number | null;
  box18_local_wages: number | null;
  box19_local_withheld: number | null;
  box20_locality: string | null;
  notes: string | null;
}

// ─── Combined app state ──────────────────────────────────────────────────────

export interface TaxData {
  meta: TaxMeta;
  sources: SourceEntry[];
  deductions: DeductionEntry[];
  equipment: EquipmentEntry[];
  utilities: UtilityEntry[];
  kim: KimEntry[];
  income: IncomeEntry[];
  taxDocs: TaxDocEntry[];
  w2s: W2Entry[];
}
