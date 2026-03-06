import { hmacHash } from '../src/crypto/hmac';
import { encrypt, decrypt } from '../src/crypto/encryption';

describe('hmacHash', () => {
  it('produces consistent hashes for the same input + key', () => {
    const h1 = hmacHash('123-45-6789', 'secret');
    const h2 = hmacHash('123-45-6789', 'secret');
    expect(h1).toBe(h2);
  });

  it('produces different hashes for different inputs', () => {
    const h1 = hmacHash('123-45-6789', 'secret');
    const h2 = hmacHash('987-65-4321', 'secret');
    expect(h1).not.toBe(h2);
  });

  it('produces different hashes for different keys', () => {
    const h1 = hmacHash('123-45-6789', 'key1');
    const h2 = hmacHash('123-45-6789', 'key2');
    expect(h1).not.toBe(h2);
  });

  it('returns a 64-char hex string (SHA-256)', () => {
    const h = hmacHash('test', 'key');
    expect(h).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe('encrypt / decrypt', () => {
  const passphrase = 'test-passphrase-for-unit-tests';

  it('round-trips plaintext correctly', () => {
    const original = JSON.stringify({ token_to_original: { SSN_1: '123-45-6789' } });
    const encrypted = encrypt(original, passphrase);
    const decrypted = decrypt(encrypted, passphrase);
    expect(decrypted).toBe(original);
  });

  it('produces different ciphertext each time (random IV + salt)', () => {
    const original = 'same plaintext';
    const e1 = encrypt(original, passphrase);
    const e2 = encrypt(original, passphrase);
    expect(e1.ct).not.toBe(e2.ct);
    expect(e1.iv).not.toBe(e2.iv);
    expect(e1.salt).not.toBe(e2.salt);
  });

  it('fails with wrong passphrase', () => {
    const encrypted = encrypt('secret data', passphrase);
    expect(() => decrypt(encrypted, 'wrong-passphrase')).toThrow();
  });

  it('fails with tampered ciphertext', () => {
    const encrypted = encrypt('secret data', passphrase);
    const tampered = { ...encrypted, ct: 'AAAA' + encrypted.ct.slice(4) };
    expect(() => decrypt(tampered, passphrase)).toThrow();
  });

  it('includes version field', () => {
    const encrypted = encrypt('test', passphrase);
    expect(encrypted.v).toBe(1);
  });

  it('handles empty string', () => {
    const encrypted = encrypt('', passphrase);
    expect(decrypt(encrypted, passphrase)).toBe('');
  });

  it('handles unicode', () => {
    const original = '日本語テスト 🎉 émojis';
    const encrypted = encrypt(original, passphrase);
    expect(decrypt(encrypted, passphrase)).toBe(original);
  });
});
