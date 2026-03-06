import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { saveMapping, loadMapping, listMappings, deleteMapping, ensureStorageDir } from '../src/storage';
import type { RedactionMapping } from '../src/types';

describe('storage', () => {
  let tempDir: string;
  const passphrase = 'test-storage-key';

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'pi-redactor-storage-'));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  const makeMapping = (id: string): RedactionMapping => ({
    mapping_id: id,
    created_at: new Date().toISOString(),
    token_to_original: { SSN_1: '123-45-6789' },
    hash_to_token: { abc123: 'SSN_1' },
    counters: { SSN: 1 },
  });

  it('saves and loads a mapping', () => {
    const mapping = makeMapping('test-1');
    saveMapping(mapping, tempDir, passphrase);
    const loaded = loadMapping('test-1', tempDir, passphrase);
    expect(loaded).not.toBeNull();
    expect(loaded!.mapping_id).toBe('test-1');
    expect(loaded!.token_to_original.SSN_1).toBe('123-45-6789');
  });

  it('returns null for nonexistent mapping', () => {
    expect(loadMapping('nope', tempDir, passphrase)).toBeNull();
  });

  it('lists all mappings', () => {
    saveMapping(makeMapping('alpha'), tempDir, passphrase);
    saveMapping(makeMapping('beta'), tempDir, passphrase);
    const ids = listMappings(tempDir);
    expect(ids).toEqual(['alpha', 'beta']);
  });

  it('deletes a mapping', () => {
    saveMapping(makeMapping('to-delete'), tempDir, passphrase);
    expect(deleteMapping('to-delete', tempDir)).toBe(true);
    expect(loadMapping('to-delete', tempDir, passphrase)).toBeNull();
  });

  it('returns false when deleting nonexistent', () => {
    expect(deleteMapping('nope', tempDir)).toBe(false);
  });

  it('ensureStorageDir creates directories', () => {
    const dir = join(tempDir, 'sub', 'nested');
    ensureStorageDir(dir);
    // Should not throw
    listMappings(dir);
  });
});
