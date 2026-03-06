import type { Detection, DetectorFn, RedactorConfig } from '../types';

/**
 * Run user-defined custom patterns from config.json.
 */
export const detectCustom: DetectorFn = (text, config) => {
  if (!config?.customPatterns?.length) return [];

  const results: Detection[] = [];

  for (const pattern of config.customPatterns) {
    try {
      const regex = new RegExp(pattern.pattern, pattern.flags ?? 'g');
      regex.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(text)) !== null) {
        results.push({
          category: pattern.category,
          match: m[0],
          start: m.index,
          end: m.index + m[0].length,
        });
        // Prevent infinite loop on zero-length matches
        if (m[0].length === 0) regex.lastIndex++;
      }
    } catch {
      // Invalid regex — skip silently (don't log the pattern, it might contain PII).
      continue;
    }
  }

  return results;
};
