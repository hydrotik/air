import type { Detection, DetectorFn } from '../types';

/**
 * Detect email addresses.
 */
const EMAIL_REGEX = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g;

export const detectEmail: DetectorFn = (text) => {
  const results: Detection[] = [];
  EMAIL_REGEX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = EMAIL_REGEX.exec(text)) !== null) {
    results.push({
      category: 'EMAIL',
      match: m[0],
      start: m.index,
      end: m.index + m[0].length,
    });
  }
  return results;
};
