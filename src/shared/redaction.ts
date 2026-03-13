/**
 * AIr Data Redaction
 *
 * Server-side sanitization applied to all ingested events before storage.
 * Strips sensitive content based on RedactionLevel configuration.
 *
 * SECURITY PRINCIPLES:
 * 1. No raw prompts, API keys, or credentials are ever stored
 * 2. Previews are truncated and scrubbed of common sensitive patterns
 * 3. Only metadata (sizes, durations, counts) persists at 'full' level
 * 4. Redaction happens at ingestion — once stored, data is already clean
 */

import type { TelemetryEvent, RedactionLevel, RedactionConfig } from './events';

// ─── Sensitive Patterns ─────────────────────────────────────────────────────
// Common patterns that should never appear in stored telemetry

const SENSITIVE_PATTERNS: RegExp[] = [
  // API keys and tokens
  /(?:sk|pk|api|key|token|secret|auth|bearer|password|passwd|pwd)[_-]?[a-zA-Z0-9]{16,}/gi,
  // AWS keys
  /AKIA[0-9A-Z]{16}/g,
  // JWT tokens
  /eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/g,
  // Email addresses
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  // Private key blocks
  /-----BEGIN[A-Z ]*PRIVATE KEY-----[\s\S]*?-----END[A-Z ]*PRIVATE KEY-----/g,
  // Connection strings with credentials
  /(?:mongodb|postgres|mysql|redis):\/\/[^:]+:[^@]+@[^\s]+/gi,
  // .env file patterns
  /^[A-Z_]+=\S+$/gm,
];

/** Fields that contain content eligible for redaction */
const CONTENT_FIELDS = new Set([
  'inputPreview',
  'outputPreview',
  'query',
  'errorMessage',
  'notes',
]);

/** Fields that are always stripped at 'full' redaction level */
const FULL_STRIP_FIELDS = new Set([
  'inputPreview',
  'outputPreview',
  'query',
  'errorMessage',
  'notes',
  'metadata',
  'data', // CustomEvent data
]);

// ─── Redaction Functions ────────────────────────────────────────────────────

/**
 * Scrub a string of known sensitive patterns.
 * Replaces matches with [REDACTED] markers.
 */
function scrubSensitive(text: string, customPatterns?: RegExp[]): string {
  let result = text;
  for (const pattern of SENSITIVE_PATTERNS) {
    result = result.replace(pattern, '[REDACTED]');
  }
  if (customPatterns) {
    for (const pattern of customPatterns) {
      result = result.replace(pattern, '[REDACTED]');
    }
  }
  return result;
}

/**
 * Truncate a string to a maximum length, adding ellipsis.
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
}

/**
 * Apply redaction to a single event based on the configured level.
 * Returns a new event object — does not mutate the input.
 */
export function redactEvent(event: TelemetryEvent, config: RedactionConfig): TelemetryEvent {
  if (config.level === 'none') return event;

  // Deep clone to avoid mutation
  const redacted = JSON.parse(JSON.stringify(event)) as Record<string, any>;

  // Always strip custom stripFields
  if (config.stripFields) {
    for (const field of config.stripFields) {
      if (field in redacted) {
        delete redacted[field];
      }
    }
  }

  if (config.level === 'full') {
    // Strip all content fields — keep only metadata
    for (const field of FULL_STRIP_FIELDS) {
      if (field in redacted) {
        if (typeof redacted[field] === 'string') {
          redacted[field] = '[REDACTED]';
        } else {
          delete redacted[field];
        }
      }
    }
    return redacted as TelemetryEvent;
  }

  // 'preview' level — truncate and scrub
  for (const field of CONTENT_FIELDS) {
    if (field in redacted && typeof redacted[field] === 'string') {
      redacted[field] = scrubSensitive(
        truncate(redacted[field], 50),
        config.customPatterns,
      );
    }
  }

  // Scrub nested metadata/data objects
  if (redacted.metadata && typeof redacted.metadata === 'object') {
    redacted.metadata = scrubObject(redacted.metadata, config.customPatterns);
  }
  if (redacted.data && typeof redacted.data === 'object') {
    redacted.data = scrubObject(redacted.data, config.customPatterns);
  }

  return redacted as TelemetryEvent;
}

/**
 * Scrub all string values in an object recursively.
 */
function scrubObject(obj: Record<string, any>, customPatterns?: RegExp[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = scrubSensitive(truncate(value, 100), customPatterns);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = scrubObject(value, customPatterns);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Parse RedactionLevel from environment variable.
 * Defaults to 'preview' if unset or invalid.
 */
export function parseRedactionLevel(envValue?: string): RedactionLevel {
  if (envValue === 'none' || envValue === 'full') return envValue;
  return 'preview';
}

/**
 * Create a RedactionConfig from environment.
 * Reads AIR_REDACTION_LEVEL env var.
 */
export function createRedactionConfig(): RedactionConfig {
  return {
    level: parseRedactionLevel(process.env.AIR_REDACTION_LEVEL),
  };
}

