import type { Detection, DetectorFn } from '../types';

/**
 * Detect dates of birth in common US formats.
 *
 * Matches: MM/DD/YYYY, MM-DD-YYYY, MM.DD.YYYY, Month DD YYYY,
 *          YYYY-MM-DD (ISO), and two-digit year variants.
 */
const DOB_PATTERNS = [
  // MM/DD/YYYY or MM-DD-YYYY or MM.DD.YYYY (2- or 4-digit year)
  /\b(0[1-9]|1[0-2])[\/\-\.](0[1-9]|[12]\d|3[01])[\/\-\.](\d{4}|\d{2})\b/g,
  // YYYY-MM-DD (ISO)
  /\b(19|20)\d{2}[\/\-\.](0[1-9]|1[0-2])[\/\-\.](0[1-9]|[12]\d|3[01])\b/g,
  // Month DD, YYYY (e.g., "January 15, 1990")
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi,
  // DD Month YYYY
  /\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/gi,
];

/**
 * Contextual keywords that suggest a date is a DOB vs. a random date.
 * We look for these within 50 chars before the match.
 */
const DOB_CONTEXT = /\b(?:born|birth|dob|date\s+of\s+birth|birthday|d\.o\.b)\b/i;

export const detectDOB: DetectorFn = (text) => {
  const results: Detection[] = [];
  const seen = new Set<string>();

  for (const regex of DOB_PATTERNS) {
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      const key = `${m.index}:${m[0]}`;
      if (seen.has(key)) continue;
      seen.add(key);

      // Check for DOB context within 80 chars before the match
      const lookback = text.slice(Math.max(0, m.index - 80), m.index);
      if (!DOB_CONTEXT.test(lookback)) continue;

      results.push({
        category: 'DOB',
        match: m[0],
        start: m.index,
        end: m.index + m[0].length,
      });
    }
  }

  return results;
};
