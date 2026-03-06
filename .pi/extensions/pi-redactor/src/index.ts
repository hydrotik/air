/**
 * pi-redactor — public API.
 *
 * All exports for use by the Pi extension entry point and external consumers.
 */
export type {
  Detection,
  RedactionCategory,
  RedactionMapping,
  RedactorConfig,
  SanitizeResult,
  PolicyConfig,
  CustomPattern,
  DetectorFn,
} from './types';

export { detectAll } from './detectors';
export {
  detectSSN,
  detectEIN,
  detectEmail,
  detectPhone,
  detectDOB,
  detectCreditCard,
  detectRouting,
  detectBankAccount,
  detectAddress,
  detectName,
  detectCustom,
} from './detectors';

export { hmacHash, encrypt, decrypt, getEncryptionKey, setKeychainKey } from './crypto';

export { saveMapping, loadMapping, listMappings, deleteMapping, loadConfig, ensureStorageDir } from './storage';

export { evaluatePolicy, previewSummary } from './policy';
export type { PolicyDecision } from './policy';

export { sanitizePayload, rehydrate } from './sanitize';
export type { SanitizeOptions } from './sanitize';
