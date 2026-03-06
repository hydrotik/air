/**
 * Detector registry.
 *
 * Runs all detectors against text and deduplicates overlapping matches
 * (longer match wins; on tie, higher-priority category wins).
 */
import type { Detection, DetectorFn, RedactorConfig, RedactionCategory } from '../types';
import { detectSSN } from './ssn';
import { detectEIN } from './ein';
import { detectEmail } from './email';
import { detectPhone } from './phone';
import { detectDOB } from './dob';
import { detectCreditCard } from './credit-card';
import { detectRouting } from './routing';
import { detectBankAccount } from './bank-account';
import { detectAddress } from './address';
import { detectName } from './name';
import { detectCustom } from './custom';

/** Priority order (lower = higher priority, wins ties). */
const PRIORITY: Record<RedactionCategory, number> = {
  SSN: 0,
  EIN: 1,
  CC: 2,
  ROUTING: 3,
  BANK_ACCT: 4,
  PHONE: 5,
  EMAIL: 6,
  DOB: 7,
  ADDRESS: 8,
  NAME: 9,
};

/** All built-in detectors in order. */
const DETECTORS: DetectorFn[] = [
  detectSSN,
  detectEIN,
  detectCreditCard,
  detectRouting,
  detectBankAccount,
  detectEmail,
  detectPhone,
  detectDOB,
  detectAddress,
  detectName,
  detectCustom,
];

/**
 * Run all detectors and return deduplicated, non-overlapping detections.
 * Longer matches take precedence. On tie, higher-priority category wins.
 */
export function detectAll(text: string, config?: RedactorConfig): Detection[] {
  const all: Detection[] = [];

  for (const detector of DETECTORS) {
    const hits = detector(text, config);
    all.push(...hits);
  }

  if (all.length === 0) return [];

  // Sort by start position, then by length (longer first), then by priority
  all.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    const aLen = a.end - a.start;
    const bLen = b.end - b.start;
    if (aLen !== bLen) return bLen - aLen; // longer first
    return PRIORITY[a.category] - PRIORITY[b.category];
  });

  // Remove overlapping matches (greedy: keep earlier/longer)
  const result: Detection[] = [];
  let lastEnd = -1;
  for (const d of all) {
    if (d.start >= lastEnd) {
      result.push(d);
      lastEnd = d.end;
    }
  }

  return result;
}

export {
  detectSSN,
  detectEIN,
  detectEmail,
  detectPhone,
  detectDOB,
  detectCreditCard,
  detectRouting,
  detectBankAccount,
  detectAddress,
  detectName,
  detectCustom,
};
