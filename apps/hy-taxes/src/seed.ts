/* ─── Default seed data for a new tax year ──────────────────────────────── */

import type { TaxMeta, SourceEntry } from './types';
import { TAX_YEAR } from './constants';

export const SEED_META: TaxMeta = {
  year: TAX_YEAR,
  created_at: new Date().toISOString(),
  status: 'in_progress',
};

export const SEED_SOURCES: SourceEntry[] = [
  { id: 'xcel',            name: 'XCel',           type: 'utility',      status: 'not_started', files: [] },
  { id: 'aa-mastercard',   name: 'AA Mastercard',  type: 'credit_card',  status: 'not_started', files: [] },
  { id: 'amex',            name: 'Amex',           type: 'credit_card',  status: 'not_started', files: [] },
  { id: 'jetblue',         name: 'Jetblue',        type: 'credit_card',  status: 'not_started', files: [] },
  { id: 'sony-card',       name: 'Sony Card',      type: 'credit_card',  status: 'not_started', files: [] },
  { id: 'best-buy',        name: 'Best Buy',       type: 'credit_card',  status: 'not_started', files: [] },
  { id: 'affirm',          name: 'Affirm',         type: 'credit_card',  status: 'not_started', files: [] },
  { id: 'td-bills',        name: 'TD Bills',       type: 'bank_account', status: 'not_started', files: [] },
  { id: 'td-shared',       name: 'TD Shared',      type: 'bank_account', status: 'not_started', files: [] },
  { id: 'td-hydrotik',     name: 'TD Hydrotik',    type: 'bank_account', status: 'not_started', files: [] },
  { id: 'catapult',        name: 'Catapult',       type: 'platform',     status: 'not_started', files: [] },
  { id: 'navy-federal',    name: 'Navy Federal',   type: 'credit_card',  status: 'not_started', files: [] },
  { id: 'paypal',          name: 'Paypal',         type: 'platform',     status: 'not_started', files: [] },
  { id: 'fios',            name: 'Fios',           type: 'utility',      status: 'not_started', files: [] },
  { id: 'ascap',           name: 'ASCAP',          type: 'platform',     status: 'not_started', files: [] },
  { id: 'venmo',           name: 'Venmo',          type: 'platform',     status: 'not_started', files: [] },
  { id: 'capitalone-ing',  name: 'CapitalOne/ING', type: 'bank_account', status: 'not_started', files: [] },
  { id: 'coned',           name: 'ConEd',          type: 'utility',      status: 'not_started', files: [] },
  { id: 'bandcamp',        name: 'Bandcamp',       type: 'platform',     status: 'not_started', files: [] },
  { id: 'vintage-king',    name: 'Vintage King',   type: 'other',        status: 'not_started', files: [] },
  { id: 'perfect-circuit', name: 'Perfect Circuit', type: 'other',       status: 'not_started', files: [] },
  { id: 'reverb',          name: 'Reverb',         type: 'other',        status: 'not_started', files: [] },
  { id: 'sweetwater',      name: 'Sweetwater',     type: 'other',        status: 'not_started', files: [] },
];
