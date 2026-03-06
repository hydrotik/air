/**
 * AES-256-GCM encryption/decryption for mapping files at rest.
 *
 * Encryption key is derived from:
 *   1. OS keychain (macOS Keychain, via `security` CLI) — preferred
 *   2. Environment variable PI_REDACTOR_KEY — fallback
 *
 * The key is 32 bytes (256 bits). We derive it from the user-provided
 * passphrase/env var using PBKDF2 with a fixed salt per mapping file.
 */
import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
} from 'node:crypto';
import { execSync } from 'node:child_process';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;        // 96-bit nonce for GCM
const AUTH_TAG_LENGTH = 16;  // 128-bit auth tag
const SALT_LENGTH = 16;
const PBKDF2_ITERATIONS = 100_000;
const KEY_LENGTH = 32;       // 256 bits

export interface EncryptedPayload {
  /** Base64-encoded ciphertext. */
  ct: string;
  /** Base64-encoded IV/nonce. */
  iv: string;
  /** Base64-encoded authentication tag. */
  tag: string;
  /** Base64-encoded PBKDF2 salt. */
  salt: string;
  /** Version for future-proofing. */
  v: 1;
}

/**
 * Attempt to read the encryption key from the macOS Keychain.
 * Returns undefined if not available (non-macOS or key not set).
 */
function getKeychainKey(): string | undefined {
  if (process.platform !== 'darwin') return undefined;
  try {
    const result = execSync(
      'security find-generic-password -s "pi-redactor" -a "encryption-key" -w 2>/dev/null',
      { encoding: 'utf8', timeout: 5000 },
    ).trim();
    return result || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Store an encryption key in the macOS Keychain.
 * If a key already exists, it will be updated.
 */
export function setKeychainKey(key: string): boolean {
  if (process.platform !== 'darwin') return false;
  try {
    // Delete existing (ignore error if not found)
    try {
      execSync(
        'security delete-generic-password -s "pi-redactor" -a "encryption-key" 2>/dev/null',
        { encoding: 'utf8', timeout: 5000 },
      );
    } catch { /* ignore */ }
    execSync(
      `security add-generic-password -s "pi-redactor" -a "encryption-key" -w "${key}" -U`,
      { encoding: 'utf8', timeout: 5000 },
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the encryption key from the best available source.
 * Priority: OS keychain > PI_REDACTOR_KEY env var.
 * Throws if no key is available.
 */
export function getEncryptionKey(): string {
  const keychainKey = getKeychainKey();
  if (keychainKey) return keychainKey;

  const envKey = process.env.PI_REDACTOR_KEY;
  if (envKey) return envKey;

  throw new Error(
    'No encryption key available. Set PI_REDACTOR_KEY env var or run: ' +
    'security add-generic-password -s "pi-redactor" -a "encryption-key" -w "YOUR_KEY" (macOS).',
  );
}

/** Derive a 256-bit AES key from a passphrase and salt using PBKDF2. */
function deriveKey(passphrase: string, salt: Buffer): Buffer {
  return pbkdf2Sync(passphrase, salt, PBKDF2_ITERATIONS, KEY_LENGTH, 'sha512');
}

/** Encrypt plaintext to an EncryptedPayload. */
export function encrypt(plaintext: string, passphrase?: string): EncryptedPayload {
  const key = passphrase ?? getEncryptionKey();
  const salt = randomBytes(SALT_LENGTH);
  const derivedKey = deriveKey(key, salt);
  const iv = randomBytes(IV_LENGTH);

  const cipher = createCipheriv(ALGORITHM, derivedKey, iv, { authTagLength: AUTH_TAG_LENGTH });
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    ct: encrypted.toString('base64'),
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    salt: salt.toString('base64'),
    v: 1,
  };
}

/** Decrypt an EncryptedPayload back to plaintext. */
export function decrypt(payload: EncryptedPayload, passphrase?: string): string {
  if (payload.v !== 1) throw new Error(`Unknown encryption version: ${payload.v}`);

  const key = passphrase ?? getEncryptionKey();
  const salt = Buffer.from(payload.salt, 'base64');
  const derivedKey = deriveKey(key, salt);
  const iv = Buffer.from(payload.iv, 'base64');
  const tag = Buffer.from(payload.tag, 'base64');
  const ct = Buffer.from(payload.ct, 'base64');

  const decipher = createDecipheriv(ALGORITHM, derivedKey, iv, { authTagLength: AUTH_TAG_LENGTH });
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([
    decipher.update(ct),
    decipher.final(),
  ]);
  return decrypted.toString('utf8');
}
