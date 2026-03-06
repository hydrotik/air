/**
 * Core sanitization engine for pi-redactor.
 *
 * sanitizePayload() is the main entry point:
 *   1. Detect PII in text and optional JSON
 *   2. Create/update deterministic token mapping
 *   3. Replace matches with tokens (SSN_1, EMAIL_2, etc.)
 *   4. Save mapping (encrypted, local-only)
 *   5. Return redacted content + report + mapping_id
 *
 * rehydrate() restores tokens → originals for local review ONLY.
 */
import { randomUUID } from 'node:crypto';
import type {
  Detection,
  RedactionCategory,
  RedactionMapping,
  RedactorConfig,
  SanitizeResult,
} from './types';
import { detectAll } from './detectors';
import { hmacHash } from './crypto/hmac';
import { saveMapping, loadMapping } from './storage';

/**
 * Get or create a mapping for the given mapping_id.
 */
function getOrCreateMapping(mappingId: string, baseDir?: string, passphrase?: string): RedactionMapping {
  const existing = loadMapping(mappingId, baseDir, passphrase);
  if (existing) return existing;
  return {
    mapping_id: mappingId,
    created_at: new Date().toISOString(),
    token_to_original: {},
    hash_to_token: {},
    counters: {},
  };
}

/**
 * Get the deterministic token for a detected value within a mapping.
 * If the value was seen before (same HMAC), returns the same token.
 * Otherwise, assigns the next sequential token (e.g., SSN_2).
 */
function getToken(
  original: string,
  category: RedactionCategory,
  mapping: RedactionMapping,
  secretKey: string,
): string {
  const hash = hmacHash(original, secretKey);

  // Already mapped?
  if (mapping.hash_to_token[hash]) {
    return mapping.hash_to_token[hash];
  }

  // Assign new token
  const counter = (mapping.counters[category] ?? 0) + 1;
  mapping.counters[category] = counter;

  const token = `${category}_${counter}`;
  mapping.hash_to_token[hash] = token;
  mapping.token_to_original[token] = original;

  return token;
}

/**
 * Replace all detections in text with their tokens.
 * Processes from end to start so indices remain valid.
 */
function replaceDetections(
  text: string,
  detections: Detection[],
  mapping: RedactionMapping,
  secretKey: string,
): string {
  if (detections.length === 0) return text;

  // Sort by start descending so we can replace without shifting indices
  const sorted = [...detections].sort((a, b) => b.start - a.start);

  let result = text;
  for (const det of sorted) {
    const token = getToken(det.match, det.category, mapping, secretKey);
    result = result.slice(0, det.start) + `[${token}]` + result.slice(det.end);
  }
  return result;
}

/**
 * Recursively sanitize all string values in a JSON structure.
 * Returns a deep copy with all strings redacted.
 */
function sanitizeJson(
  value: unknown,
  mapping: RedactionMapping,
  secretKey: string,
  config?: RedactorConfig,
  allDetections?: Detection[],
): unknown {
  if (typeof value === 'string') {
    const detections = detectAll(value, config);
    if (allDetections) allDetections.push(...detections);
    return replaceDetections(value, detections, mapping, secretKey);
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeJson(item, mapping, secretKey, config, allDetections));
  }
  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      // Also sanitize keys (they might contain PII)
      const sanitizedKey = typeof key === 'string'
        ? (() => {
            const keyDetections = detectAll(key, config);
            if (allDetections) allDetections.push(...keyDetections);
            return replaceDetections(key, keyDetections, mapping, secretKey);
          })()
        : key;
      result[sanitizedKey] = sanitizeJson(val, mapping, secretKey, config, allDetections);
    }
    return result;
  }
  return value;
}

export interface SanitizeOptions {
  /** Override the mapping ID (default: random UUID). */
  mappingId?: string;
  /** HMAC secret key. Must be consistent within a session. */
  secretKey: string;
  /** Config (loaded from disk or provided). */
  config?: RedactorConfig;
  /** Storage base dir override (for testing). */
  baseDir?: string;
  /** Encryption passphrase override (for testing). */
  passphrase?: string;
}

/**
 * Main entry point: sanitize a payload (text and/or JSON).
 *
 * 1. Detects all PII.
 * 2. Creates deterministic token mapping.
 * 3. Replaces all matches.
 * 4. Saves mapping (encrypted, local-only).
 * 5. Returns result.
 */
export function sanitizePayload(
  payload: { text: string; json?: unknown },
  options: SanitizeOptions,
): SanitizeResult {
  const mappingId = options.mappingId ?? randomUUID();
  const mapping = getOrCreateMapping(mappingId, options.baseDir, options.passphrase);
  const allDetections: Detection[] = [];

  // Detect + redact text
  const textDetections = detectAll(payload.text, options.config);
  allDetections.push(...textDetections);
  const redactedText = replaceDetections(payload.text, textDetections, mapping, options.secretKey);

  // Detect + redact JSON (if provided)
  let redactedJson: unknown | undefined;
  if (payload.json !== undefined) {
    redactedJson = sanitizeJson(payload.json, mapping, options.secretKey, options.config, allDetections);
  }

  // Build report (counts only — never raw values)
  const report: Record<RedactionCategory, number> = {} as Record<RedactionCategory, number>;
  for (const d of allDetections) {
    report[d.category] = (report[d.category] ?? 0) + 1;
  }

  // Save mapping
  saveMapping(mapping, options.baseDir, options.passphrase);

  return {
    redacted_text: redactedText,
    redacted_json: redactedJson,
    redaction_report: report,
    mapping_id: mappingId,
    has_pii: allDetections.length > 0,
  };
}

/**
 * Rehydrate: replace tokens back with original values.
 * For LOCAL REVIEW ONLY — never send the result to an LLM.
 */
export function rehydrate(
  textOrJson: string | unknown,
  mappingId: string,
  options?: { baseDir?: string; passphrase?: string },
): string | unknown {
  const mapping = loadMapping(mappingId, options?.baseDir, options?.passphrase);
  if (!mapping) {
    throw new Error(`Mapping not found: ${mappingId}`);
  }

  if (typeof textOrJson === 'string') {
    return rehydrateString(textOrJson, mapping);
  }
  return rehydrateValue(textOrJson, mapping);
}

function rehydrateString(text: string, mapping: RedactionMapping): string {
  let result = text;
  // Sort tokens by length descending to avoid partial replacements
  const tokens = Object.entries(mapping.token_to_original)
    .sort((a, b) => b[0].length - a[0].length);
  for (const [token, original] of tokens) {
    // Replace [TOKEN] → original
    result = result.replaceAll(`[${token}]`, original);
  }
  return result;
}

function rehydrateValue(value: unknown, mapping: RedactionMapping): unknown {
  if (typeof value === 'string') return rehydrateString(value, mapping);
  if (Array.isArray(value)) return value.map((v) => rehydrateValue(v, mapping));
  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      const rehydratedKey = typeof key === 'string' ? rehydrateString(key, mapping) : key;
      result[rehydratedKey] = rehydrateValue(val, mapping);
    }
    return result;
  }
  return value;
}
