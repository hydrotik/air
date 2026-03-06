/**
 * Local-only encrypted storage for redaction mappings.
 *
 * Mappings are stored under ~/.pi-redactor/mappings/<mapping_id>.enc.json.
 * Each file is AES-256-GCM encrypted at rest.
 * No sensitive data is ever written to logs.
 */
import { mkdirSync, readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import type { RedactionMapping, RedactorConfig } from '../types';
import { encrypt, decrypt } from '../crypto/encryption';
import type { EncryptedPayload } from '../crypto/encryption';

/** Default storage directory. */
const DEFAULT_BASE_DIR = join(homedir(), '.pi-redactor');

function getMappingsDir(baseDir?: string): string {
  const dir = join(baseDir ?? DEFAULT_BASE_DIR, 'mappings');
  mkdirSync(dir, { recursive: true });
  return dir;
}

function getConfigPath(baseDir?: string): string {
  return join(baseDir ?? DEFAULT_BASE_DIR, 'config.json');
}

/** Save a mapping to encrypted local storage. */
export function saveMapping(mapping: RedactionMapping, baseDir?: string, passphrase?: string): void {
  const dir = getMappingsDir(baseDir);
  const filePath = join(dir, `${mapping.mapping_id}.enc.json`);
  const plaintext = JSON.stringify(mapping);
  const encrypted = encrypt(plaintext, passphrase);
  writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
}

/** Load a mapping from encrypted local storage. Returns null if not found. */
export function loadMapping(mappingId: string, baseDir?: string, passphrase?: string): RedactionMapping | null {
  const dir = getMappingsDir(baseDir);
  const filePath = join(dir, `${mappingId}.enc.json`);
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, 'utf8');
  const payload: EncryptedPayload = JSON.parse(raw);
  const plaintext = decrypt(payload, passphrase);
  return JSON.parse(plaintext) as RedactionMapping;
}

/** List all mapping IDs. */
export function listMappings(baseDir?: string): string[] {
  const dir = getMappingsDir(baseDir);
  return readdirSync(dir)
    .filter((f) => f.endsWith('.enc.json'))
    .map((f) => f.replace('.enc.json', ''))
    .sort();
}

/** Delete a mapping by ID. Returns true if deleted, false if not found. */
export function deleteMapping(mappingId: string, baseDir?: string): boolean {
  const dir = getMappingsDir(baseDir);
  const filePath = join(dir, `${mappingId}.enc.json`);
  if (!existsSync(filePath)) return false;
  unlinkSync(filePath);
  return true;
}

/** Load user config from ~/.pi-redactor/config.json. Returns defaults if not found. */
export function loadConfig(baseDir?: string): RedactorConfig {
  const configPath = getConfigPath(baseDir);
  if (!existsSync(configPath)) return {};
  try {
    const raw = readFileSync(configPath, 'utf8');
    return JSON.parse(raw) as RedactorConfig;
  } catch {
    return {};
  }
}

/** Ensure the storage directory exists. */
export function ensureStorageDir(baseDir?: string): void {
  const dir = baseDir ?? DEFAULT_BASE_DIR;
  mkdirSync(dir, { recursive: true });
  getMappingsDir(baseDir);
}
