import type { Detection, DetectorFn } from '../types';

/**
 * Detect bank account numbers (heuristic).
 *
 * Bank account numbers are 6-17 digits. We require contextual keywords
 * to avoid false positives on random number sequences.
 */
const ACCOUNT_REGEX = /\b\d{6,17}\b/g;

const BANK_CONTEXT =
  /\b(?:account\s*(?:number|num|no|#)?|acct\s*(?:number|num|no|#)?|bank\s*(?:account|acct)|checking|savings|deposit\s*account)\b/i;

export const detectBankAccount: DetectorFn = (text) => {
  const results: Detection[] = [];
  ACCOUNT_REGEX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ACCOUNT_REGEX.exec(text)) !== null) {
    // Look for banking context within 80 chars before or 30 after the match
    const before = text.slice(Math.max(0, m.index - 80), m.index);
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 30);
    if (!BANK_CONTEXT.test(before) && !BANK_CONTEXT.test(after)) continue;

    results.push({
      category: 'BANK_ACCT',
      match: m[0],
      start: m.index,
      end: m.index + m[0].length,
    });
  }
  return results;
};
