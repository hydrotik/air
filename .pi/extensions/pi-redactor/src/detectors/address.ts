import type { Detection, DetectorFn } from '../types';

/**
 * Detect US street addresses (heuristic).
 *
 * Pattern: street number + street name + street suffix.
 * Does NOT detect PO Boxes or standalone city/state/zip.
 */
const STREET_SUFFIXES = [
  'Street', 'St', 'Avenue', 'Ave', 'Boulevard', 'Blvd', 'Drive', 'Dr',
  'Lane', 'Ln', 'Road', 'Rd', 'Court', 'Ct', 'Circle', 'Cir', 'Way',
  'Place', 'Pl', 'Terrace', 'Ter', 'Trail', 'Trl', 'Parkway', 'Pkwy',
  'Highway', 'Hwy', 'Pike', 'Crescent', 'Cres', 'Loop',
];

// Build a single regex: \b\d{1,6}\s+\w[\w\s]{1,40}\s+(Street|St|...)\b\.?
const suffixPattern = STREET_SUFFIXES.map((s) => s.replace('.', '\\.')).join('|');
const ADDRESS_REGEX = new RegExp(
  `\\b(\\d{1,6})\\s+([A-Z][A-Za-z0-9\\s]{1,40})\\b\\s*(?:${suffixPattern})\\.?\\b`,
  'gi',
);

export const detectAddress: DetectorFn = (text) => {
  const results: Detection[] = [];
  ADDRESS_REGEX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ADDRESS_REGEX.exec(text)) !== null) {
    results.push({
      category: 'ADDRESS',
      match: m[0],
      start: m.index,
      end: m.index + m[0].length,
    });
  }
  return results;
};
