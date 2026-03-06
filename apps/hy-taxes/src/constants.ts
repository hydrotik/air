/* ─── Labels & constants ────────────────────────────────────────────────── */

import type {
  DeductionCategory,
  UtilityCategory,
  KimCategory,
  IncomeSource,
  SourceStatus,
  SourceType,
  EntryStatus,
  TaxDocType,
  TaxDocStatus,
  W2Status,
  UserId,
  UserProfile,
} from './types';

// ─── Tax year ────────────────────────────────────────────────────────────────

export const TAX_YEAR = 2025;
export const DATA_DIR = `/data/${TAX_YEAR}`;

// ─── Users ───────────────────────────────────────────────────────────────────

export const USERS: Record<UserId, UserProfile> = {
  donovan: {
    id: 'donovan',
    name: 'Donovan',
    initials: 'DA',
    business: 'Hydrotik LLC',
    color: 'var(--chart-1)',
  },
  kimaree: {
    id: 'kimaree',
    name: 'Kimaree',
    initials: 'KA',
    business: 'Book Publishing LLC',
    color: 'var(--chart-4)',
  },
};

export const USER_IDS = Object.keys(USERS) as UserId[];

/** Data directory for a given user */
export function userDataDir(userId: UserId): string {
  return userId === 'donovan' ? DATA_DIR : `${DATA_DIR}/${userId}`;
}

// ─── Category labels ─────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<DeductionCategory, string> = {
  books: 'Books',
  shipping: 'Shipping/Mailing',
  office_furnishings: 'Office Furnishings',
  office_equipment: 'Office Equipment',
  office_supplies: 'Office Supplies',
  computer_software: 'Computer Supplies/Software',
  advertising: 'Advertising',
  hosting: 'Hosting',
  dining: 'Dining/Entertaining',
  transportation: 'Transportation',
  medical: 'Doctor/Medical',
  education: 'Education',
};

export const DEDUCTION_CATEGORIES = Object.keys(CATEGORY_LABELS) as DeductionCategory[];

// ─── Utility labels ──────────────────────────────────────────────────────────

export const UTILITY_LABELS: Record<UtilityCategory, string> = {
  cell: 'Cell',
  electricity: 'Electricity',
  rent: 'Rent',
  internet: 'Internet',
  utilities_other: 'Utilities (Other)',
  school: 'School',
  storage: 'Storage',
  transportation: 'Transportation',
  car: 'Car',
};

export const UTILITY_CATEGORIES = Object.keys(UTILITY_LABELS) as UtilityCategory[];

// ─── Kim labels ──────────────────────────────────────────────────────────────

export const KIM_LABELS: Record<KimCategory, string> = {
  kim_cell: 'Kim Cell',
  anthony_college: 'Anthony College',
  kim_transportation: 'Kim Transportation',
  kim_books: 'Kim Books',
};

export const KIM_CATEGORIES = Object.keys(KIM_LABELS) as KimCategory[];

// ─── Income labels ───────────────────────────────────────────────────────────

export const INCOME_SOURCE_LABELS: Record<IncomeSource, string> = {
  catapult: 'Catapult',
  bandcamp: 'Bandcamp',
  w2: 'W-2',
  '1099': '1099',
  other: 'Other',
};

export const INCOME_SOURCES = Object.keys(INCOME_SOURCE_LABELS) as IncomeSource[];

// ─── Source status ───────────────────────────────────────────────────────────

export const STATUS_LABELS: Record<SourceStatus, string> = {
  not_started: 'Not Started',
  downloaded: 'Downloaded',
  complete: 'Complete',
};

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  credit_card: 'Credit Card',
  bank_account: 'Bank Account',
  platform: 'Platform',
  utility: 'Utility',
  other: 'Other',
};

export const ENTRY_STATUS_LABELS: Record<EntryStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  excluded: 'Excluded',
};

// ─── Months ──────────────────────────────────────────────────────────────────

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

// ─── Tax Document labels ─────────────────────────────────────────────────────

export const TAX_DOC_TYPE_LABELS: Record<TaxDocType, string> = {
  '1095-B': '1095-B (Health Coverage)',
  '1099-B': '1099-B (Broker Proceeds)',
  '1099-G': '1099-G (Gov Payments)',
  '1099-INT': '1099-INT (Interest)',
  '1099-DIV': '1099-DIV (Dividends)',
  '1099-MISC': '1099-MISC (Misc Income)',
  '1099-NEC': '1099-NEC (Non-Employee)',
  '1099-R': '1099-R (Retirement)',
  '1098': '1098 (Mortgage Interest)',
  other: 'Other',
};

export const TAX_DOC_STATUS_LABELS: Record<TaxDocStatus, string> = {
  pending: 'Pending',
  received: 'Received',
  entered: 'Entered',
};

export const W2_STATUS_LABELS: Record<W2Status, string> = {
  pending: 'Pending',
  received: 'Received',
  entered: 'Entered',
};

// ─── DataGrid shared config ─────────────────────────────────────────────────

export const GRID_DEFAULTS = {
  density: 'editorial' as const,
  borderless: true,
  transparent: true,
  headerBorder: 'thick' as const,
  rowSeparator: 'subtle' as const,
} as const;
