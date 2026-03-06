import type { Detection, DetectorFn } from '../types';

/**
 * Detect US ABA routing transit numbers (9 digits) with checksum.
 *
 * The ABA checksum: 3(d1+d4+d7) + 7(d2+d5+d8) + (d3+d6+d9) mod 10 === 0
 * Must start with valid Federal Reserve district prefix (00-12, 21-32, 61-72, 80).
 */
const ROUTING_REGEX = /\b\d{9}\b/g;

const VALID_PREFIXES = new Set([
  ...Array.from({ length: 13 }, (_, i) => String(i).padStart(2, '0')),       // 00-12
  ...Array.from({ length: 12 }, (_, i) => String(21 + i).padStart(2, '0')),  // 21-32
  ...Array.from({ length: 12 }, (_, i) => String(61 + i).padStart(2, '0')),  // 61-72
  '80',
]);

function abaChecksum(digits: string): boolean {
  const d = digits.split('').map(Number);
  const sum =
    3 * (d[0] + d[3] + d[6]) +
    7 * (d[1] + d[4] + d[7]) +
    1 * (d[2] + d[5] + d[8]);
  return sum % 10 === 0;
}

export const detectRouting: DetectorFn = (text) => {
  const results: Detection[] = [];
  ROUTING_REGEX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ROUTING_REGEX.exec(text)) !== null) {
    const raw = m[0];
    const prefix = raw.slice(0, 2);
    if (!VALID_PREFIXES.has(prefix)) continue;
    if (!abaChecksum(raw)) continue;
    results.push({
      category: 'ROUTING',
      match: raw,
      start: m.index,
      end: m.index + raw.length,
    });
  }
  return results;
};

export { abaChecksum };
