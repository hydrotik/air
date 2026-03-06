import type { Detection, DetectorFn, RedactorConfig } from '../types';

/**
 * Detect person names (optional, off by default).
 *
 * Uses a simple heuristic: two or more consecutive capitalized words
 * preceded by a name-context keyword (Mr, Mrs, Dr, taxpayer, filed by, etc.).
 * Also checks against a user-provided denylist.
 *
 * This is intentionally conservative to avoid false positives.
 */
const NAME_CONTEXT =
  /\b(?:Mr\.?|Mrs\.?|Ms\.?|Dr\.?|taxpayer|employee|recipient|filed\s+by|paid\s+to|payee|payer|name|claimant)\s+/gi;

const CAPITALIZED_NAME = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g;

export const detectName: DetectorFn = (text, config) => {
  if (!config?.detectNames) return [];

  const results: Detection[] = [];
  const seen = new Set<string>();
  const allowlist = new Set((config.nameAllowlist ?? []).map((n) => n.toLowerCase()));
  const denylist = (config.nameDenylist ?? []).map((n) => n.toLowerCase());

  // Context-based detection
  NAME_CONTEXT.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = NAME_CONTEXT.exec(text)) !== null) {
    const afterIdx = m.index + m[0].length;
    const after = text.slice(afterIdx, afterIdx + 60);
    const nameMatch = after.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    if (allowlist.has(name.toLowerCase())) continue;
    const key = `${afterIdx}:${name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    results.push({
      category: 'NAME',
      match: name,
      start: afterIdx,
      end: afterIdx + name.length,
    });
  }

  // Denylist-based detection (always match these names)
  for (const denied of denylist) {
    const regex = new RegExp(`\\b${escapeRegex(denied)}\\b`, 'gi');
    let dm: RegExpExecArray | null;
    while ((dm = regex.exec(text)) !== null) {
      if (allowlist.has(dm[0].toLowerCase())) continue;
      const key = `${dm.index}:${dm[0]}`;
      if (seen.has(key)) continue;
      seen.add(key);
      results.push({
        category: 'NAME',
        match: dm[0],
        start: dm.index,
        end: dm.index + dm[0].length,
      });
    }
  }

  return results;
};

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
