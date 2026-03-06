/**
 * Policy engine for pi-redactor.
 *
 * Default behavior: BLOCK any outbound request if hard PII is detected
 * (SSN, EIN, CC, ROUTING, BANK_ACCT) unless user explicitly opts in.
 *
 * Even when allowed, redaction is on by default.
 */
import type { RedactionCategory, PolicyConfig, RedactorConfig, Detection } from './types';

/** Categories that trigger a hard block by default. */
const HARD_PII: Set<RedactionCategory> = new Set([
  'SSN', 'EIN', 'CC', 'ROUTING', 'BANK_ACCT',
]);

/** Categories that are always redacted but don't block. */
const SOFT_PII: Set<RedactionCategory> = new Set([
  'PHONE', 'EMAIL', 'DOB', 'ADDRESS', 'NAME',
]);

export interface PolicyDecision {
  /** Whether the request should be blocked entirely. */
  blocked: boolean;
  /** Human-readable reason if blocked. */
  reason?: string;
  /** Whether to apply redaction before sending. */
  shouldRedact: boolean;
  /** Categories that triggered the decision. */
  triggeredCategories: RedactionCategory[];
}

/**
 * Evaluate policy for a set of detections.
 */
export function evaluatePolicy(
  detections: Detection[],
  policyConfig?: PolicyConfig,
  globalConfig?: RedactorConfig,
): PolicyDecision {
  const policy = policyConfig ?? globalConfig?.policy ?? {};
  const categories = [...new Set(detections.map((d) => d.category))];

  const hardHits = categories.filter((c) => HARD_PII.has(c));
  const softHits = categories.filter((c) => SOFT_PII.has(c));
  const allHits = [...hardHits, ...softHits];

  if (allHits.length === 0) {
    return { blocked: false, shouldRedact: false, triggeredCategories: [] };
  }

  // Default: block on hard PII unless explicitly allowed
  if (hardHits.length > 0 && !policy.allowSensitive) {
    return {
      blocked: true,
      reason:
        `Blocked: detected ${hardHits.join(', ')} in outbound request. ` +
        `Set allowSensitive: true in config or confirm interactively to proceed.`,
      shouldRedact: true,
      triggeredCategories: allHits,
    };
  }

  // If allowed, still redact by default. Only skip redaction with explicit opt-out.
  const shouldRedact = policy.redact !== false;

  return {
    blocked: false,
    shouldRedact,
    triggeredCategories: allHits,
  };
}

/**
 * Generate a preview summary (counts/types) without revealing originals.
 */
export function previewSummary(detections: Detection[]): string {
  if (detections.length === 0) return 'No sensitive data detected.';

  const counts: Partial<Record<RedactionCategory, number>> = {};
  for (const d of detections) {
    counts[d.category] = (counts[d.category] ?? 0) + 1;
  }

  const lines: string[] = ['Sensitive data detected:'];
  for (const [cat, count] of Object.entries(counts)) {
    const severity = HARD_PII.has(cat as RedactionCategory) ? '🔴 HARD' : '🟡 SOFT';
    lines.push(`  ${severity}  ${cat}: ${count} occurrence(s)`);
  }
  lines.push(`\nTotal: ${detections.length} detection(s) across ${Object.keys(counts).length} category(ies).`);
  return lines.join('\n');
}
