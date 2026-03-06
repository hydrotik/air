import type { Detection, DetectorFn } from '../types';

/**
 * Detect US phone numbers.
 *
 * Matches: (555) 123-4567, 555-123-4567, 555.123.4567,
 *          5551234567, +1 555 123 4567, 1-555-123-4567
 */
const PHONE_REGEX =
  /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.\-]?)?\d{3}[\s.\-]?\d{4}\b/g;

export const detectPhone: DetectorFn = (text) => {
  const results: Detection[] = [];
  PHONE_REGEX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = PHONE_REGEX.exec(text)) !== null) {
    const raw = m[0].replace(/[\s.\-()]/g, '');
    // Must be 10 or 11 digits (with leading 1)
    if (raw.startsWith('+')) {
      const digits = raw.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) continue;
    } else {
      const digits = raw.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) continue;
    }
    results.push({
      category: 'PHONE',
      match: m[0],
      start: m.index,
      end: m.index + m[0].length,
    });
  }
  return results;
};
