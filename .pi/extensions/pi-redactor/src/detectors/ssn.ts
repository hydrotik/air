import type { Detection, DetectorFn } from '../types';

/**
 * Detect US Social Security Numbers.
 *
 * Matches: 123-45-6789, 123 45 6789, 123456789
 * Excludes: 000-xx-xxxx, 666-xx-xxxx, 9xx-xx-xxxx (ITIN range),
 *           xxx-00-xxxx, xxx-xx-0000
 */
const SSN_REGEX = /\b(?!000|666|9\d{2})\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}\b/g;

export const detectSSN: DetectorFn = (text) => {
  const results: Detection[] = [];
  let m: RegExpExecArray | null;
  // Reset lastIndex for safety
  SSN_REGEX.lastIndex = 0;
  while ((m = SSN_REGEX.exec(text)) !== null) {
    results.push({
      category: 'SSN',
      match: m[0],
      start: m.index,
      end: m.index + m[0].length,
    });
  }
  return results;
};
