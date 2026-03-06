import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { sanitizePayload, rehydrate } from '../src/sanitize';
import { loadMapping } from '../src/storage';

describe('sanitizePayload', () => {
  let tempDir: string;
  const passphrase = 'test-key-for-sanitize';
  const secretKey = 'hmac-secret-for-tests';

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'pi-redactor-test-'));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  const opts = () => ({
    mappingId: 'test-mapping',
    secretKey,
    baseDir: tempDir,
    passphrase,
  });

  it('redacts SSN in text', () => {
    const result = sanitizePayload(
      { text: 'My SSN is 123-45-6789.' },
      opts(),
    );
    expect(result.redacted_text).not.toContain('123-45-6789');
    expect(result.redacted_text).toContain('[SSN_1]');
    expect(result.has_pii).toBe(true);
    expect(result.redaction_report.SSN).toBe(1);
  });

  it('produces same token for same value within a mapping', () => {
    const result = sanitizePayload(
      { text: 'SSN: 123-45-6789 and again 123-45-6789.' },
      opts(),
    );
    expect(result.redacted_text).toBe('SSN: [SSN_1] and again [SSN_1].');
    expect(result.redaction_report.SSN).toBe(2);
  });

  it('assigns different tokens for different values', () => {
    const result = sanitizePayload(
      { text: 'SSN1: 123-45-6789 SSN2: 234-56-7890' },
      opts(),
    );
    expect(result.redacted_text).toContain('[SSN_1]');
    expect(result.redacted_text).toContain('[SSN_2]');
  });

  it('redacts nested JSON recursively', () => {
    const json = {
      employee: {
        name: 'John',
        ssn: '123-45-6789',
        contacts: [
          { email: 'john@example.com', phone: '(555) 123-4567' },
        ],
      },
    };
    const result = sanitizePayload(
      { text: 'See JSON', json },
      opts(),
    );
    const redacted = result.redacted_json as any;
    expect(redacted.employee.ssn).not.toContain('123-45-6789');
    expect(redacted.employee.ssn).toContain('[SSN_');
    expect(redacted.employee.contacts[0].email).not.toContain('john@example.com');
    expect(redacted.employee.contacts[0].email).toContain('[EMAIL_');
  });

  it('saves mapping to disk (encrypted)', () => {
    sanitizePayload(
      { text: 'SSN: 123-45-6789' },
      opts(),
    );
    const mapping = loadMapping('test-mapping', tempDir, passphrase);
    expect(mapping).not.toBeNull();
    expect(mapping!.token_to_original['SSN_1']).toBe('123-45-6789');
  });

  it('returns empty report when no PII', () => {
    const result = sanitizePayload(
      { text: 'Hello world, no PII here.' },
      opts(),
    );
    expect(result.has_pii).toBe(false);
    expect(Object.keys(result.redaction_report)).toHaveLength(0);
  });

  it('handles multiple categories', () => {
    const result = sanitizePayload(
      { text: 'SSN: 123-45-6789, Email: john@example.com' },
      opts(),
    );
    expect(result.redacted_text).toContain('[SSN_1]');
    expect(result.redacted_text).toContain('[EMAIL_1]');
    expect(result.redaction_report.SSN).toBe(1);
    expect(result.redaction_report.EMAIL).toBe(1);
  });

  it('maintains determinism across calls with same mapping ID', () => {
    // First call
    sanitizePayload(
      { text: 'SSN: 123-45-6789' },
      opts(),
    );
    // Second call — same mapping ID
    const result2 = sanitizePayload(
      { text: 'Again SSN: 123-45-6789 and new 234-56-7890' },
      opts(),
    );
    // Same SSN gets same token
    expect(result2.redacted_text).toContain('[SSN_1]');
    // New SSN gets next token
    expect(result2.redacted_text).toContain('[SSN_2]');
  });
});

describe('rehydrate', () => {
  let tempDir: string;
  const passphrase = 'test-key-for-rehydrate';
  const secretKey = 'hmac-secret-for-rehydrate';

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'pi-redactor-rehydrate-'));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('restores original text from tokens', () => {
    const result = sanitizePayload(
      { text: 'SSN: 123-45-6789, Email: john@example.com' },
      { mappingId: 'rh-test', secretKey, baseDir: tempDir, passphrase },
    );
    const restored = rehydrate(result.redacted_text, 'rh-test', { baseDir: tempDir, passphrase });
    expect(restored).toBe('SSN: 123-45-6789, Email: john@example.com');
  });

  it('restores JSON structure', () => {
    const json = { ssn: '123-45-6789', nested: { email: 'a@b.com' } };
    const result = sanitizePayload(
      { text: 'test', json },
      { mappingId: 'rh-json', secretKey, baseDir: tempDir, passphrase },
    );
    const restored = rehydrate(result.redacted_json, 'rh-json', { baseDir: tempDir, passphrase });
    expect((restored as any).ssn).toBe('123-45-6789');
    expect((restored as any).nested.email).toBe('a@b.com');
  });

  it('throws on unknown mapping ID', () => {
    expect(() => rehydrate('text', 'nonexistent', { baseDir: tempDir, passphrase })).toThrow('Mapping not found');
  });
});
