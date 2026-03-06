/**
 * Core types for pi-redactor.
 *
 * Tokens follow the pattern: CATEGORY_N (e.g., SSN_1, EMAIL_2).
 * Mappings are scoped to a mapping_id (per run or per project).
 */

/** Categories of sensitive data we detect and redact. */
export type RedactionCategory =
  | 'SSN'
  | 'EIN'
  | 'BANK_ACCT'
  | 'ROUTING'
  | 'CC'
  | 'PHONE'
  | 'EMAIL'
  | 'DOB'
  | 'ADDRESS'
  | 'NAME';

/** A single detection hit from a detector. */
export interface Detection {
  /** Category of the sensitive data. */
  category: RedactionCategory;
  /** The matched substring. */
  match: string;
  /** Start index in the original string. */
  start: number;
  /** End index (exclusive) in the original string. */
  end: number;
}

/** Result of sanitizing a payload. */
export interface SanitizeResult {
  /** The redacted text. */
  redacted_text: string;
  /** Redacted JSON (if JSON input was provided). */
  redacted_json?: unknown;
  /** Summary of detections (category → count). Never includes raw values. */
  redaction_report: Record<RedactionCategory, number>;
  /** Unique ID scoping this mapping (per run or per project). */
  mapping_id: string;
  /** Whether any PII was detected at all. */
  has_pii: boolean;
}

/** The internal mapping stored on disk (encrypted). */
export interface RedactionMapping {
  /** Unique identifier for this mapping. */
  mapping_id: string;
  /** ISO timestamp of creation. */
  created_at: string;
  /** token → original value (e.g., "SSN_1" → "123-45-6789"). */
  token_to_original: Record<string, string>;
  /** HMAC-SHA256(original) → token. For deterministic re-mapping. */
  hash_to_token: Record<string, string>;
  /** Per-category counter so next token increments correctly. */
  counters: Partial<Record<RedactionCategory, number>>;
}

/** Policy configuration. */
export interface PolicyConfig {
  /**
   * If true, allow sending requests even when hard PII is detected.
   * Default: false (BLOCK).
   */
  allowSensitive?: boolean;
  /**
   * If true AND allowSensitive is true, skip redaction entirely.
   * Default: false (always redact).
   */
  redact?: boolean;
}

/** Custom pattern defined by the user in config.json. */
export interface CustomPattern {
  name: string;
  /** Category to file detections under (use a built-in or invent one). */
  category: RedactionCategory;
  /** Regex source string (without delimiters). */
  pattern: string;
  /** Regex flags (default "g"). */
  flags?: string;
}

/** User config loaded from ~/.pi-redactor/config.json. */
export interface RedactorConfig {
  /** Enable name detection (off by default). */
  detectNames?: boolean;
  /** Names that should NOT be redacted. */
  nameAllowlist?: string[];
  /** Names that MUST be redacted (takes priority). */
  nameDenylist?: string[];
  /** Additional custom patterns. */
  customPatterns?: CustomPattern[];
  /** Policy overrides. */
  policy?: PolicyConfig;
}

/** A detector function: takes text, returns all detections found. */
export type DetectorFn = (text: string, config?: RedactorConfig) => Detection[];
