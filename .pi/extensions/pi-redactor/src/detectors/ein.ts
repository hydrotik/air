import type { Detection, DetectorFn } from '../types';

/**
 * Detect US Employer Identification Numbers (EIN / Federal Tax ID).
 *
 * Format: XX-XXXXXXX (with or without dash).
 * Valid prefixes: 01-06, 10-16, 20-27, 30-39, 40-48, 50-59, 60-68, 71-77, 80-88, 90-92, 98-99.
 */
const EIN_REGEX = /\b(\d{2})[- ]?(\d{7})\b/g;

const VALID_PREFIXES = new Set([
  ...range(1, 6), ...range(10, 16), ...range(20, 27),
  ...range(30, 39), ...range(40, 48), ...range(50, 59),
  ...range(60, 68), ...range(71, 77), ...range(80, 88),
  ...range(90, 92), 98, 99,
]);

function range(a: number, b: number): number[] {
  const r: number[] = [];
  for (let i = a; i <= b; i++) r.push(i);
  return r;
}

export const detectEIN: DetectorFn = (text) => {
  const results: Detection[] = [];
  EIN_REGEX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = EIN_REGEX.exec(text)) !== null) {
    const prefix = parseInt(m[1], 10);
    if (!VALID_PREFIXES.has(prefix)) continue;
    // Avoid matching SSNs that are 9 digits without separator
    // EIN is XX-XXXXXXX; SSN is XXX-XX-XXXX.
    // If the match contains a dash at position 2, it's EIN format.
    // If no separator and 9 digits, ambiguous — skip (SSN detector handles).
    const raw = m[0];
    if (raw.length === 9 && !raw.includes('-') && !raw.includes(' ')) continue;
    results.push({
      category: 'EIN',
      match: raw,
      start: m.index,
      end: m.index + raw.length,
    });
  }
  return results;
};
