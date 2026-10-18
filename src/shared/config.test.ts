import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig, mergeConfig } from './config';
import type { AirConfig } from './config';

let root: string;
let logSpy: jest.SpyInstance;
let warnSpy: jest.SpyInstance;

/** Create nested dirs under the temp root and return the deepest path. */
function mkdirs(...segments: string[]): string {
  const dir = path.join(root, ...segments);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function writeConfig(dir: string, name: string, content: unknown): string {
  const file = path.join(dir, name);
  fs.writeFileSync(file, typeof content === 'string' ? content : JSON.stringify(content));
  return file;
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'air-config-'));
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  logSpy.mockRestore();
  warnSpy.mockRestore();
  fs.rmSync(root, { recursive: true, force: true });
});

describe('loadConfig', () => {
  const sample: AirConfig = {
    providers: {
      rag: [{ name: 'docs', type: 'qdrant', dimensions: 1536 }],
      mcp: [{ name: 'design' }],
    },
    redaction: 'preview',
    budgetLimit: 10,
  };

  it('returns an empty config when no file exists', () => {
    expect(loadConfig(mkdirs('empty'))).toEqual({});
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('loads .air.json from the start directory and logs its path', () => {
    const dir = mkdirs('project');
    const file = writeConfig(dir, '.air.json', sample);

    expect(loadConfig(dir)).toEqual(sample);
    expect(logSpy).toHaveBeenCalledWith(`[AIr] Loaded config from ${file}`);
  });

  it('loads air.config.json when .air.json is absent', () => {
    const dir = mkdirs('project');
    writeConfig(dir, 'air.config.json', { port: 5300 });
    expect(loadConfig(dir)).toEqual({ port: 5300 });
  });

  it('prefers .air.json over air.config.json in the same directory', () => {
    const dir = mkdirs('project');
    writeConfig(dir, '.air.json', { port: 1 });
    writeConfig(dir, 'air.config.json', { port: 2 });
    expect(loadConfig(dir)).toEqual({ port: 1 });
  });

  it('walks up to find a config in a parent directory', () => {
    const project = mkdirs('project');
    writeConfig(project, '.air.json', { port: 7 });
    expect(loadConfig(mkdirs('project', 'src', 'nested'))).toEqual({ port: 7 });
  });

  it('the nearest config wins over one further up', () => {
    writeConfig(mkdirs('project'), '.air.json', { port: 1 });
    const pkg = mkdirs('project', 'packages', 'app');
    writeConfig(pkg, 'air.config.json', { port: 2 });
    expect(loadConfig(path.join(pkg, 'src'))).toEqual({ port: 2 });
  });

  it('searches at most 5 directory levels (start dir + 4 parents)', () => {
    const deepest = mkdirs('l0', 'l1', 'l2', 'l3', 'l4', 'l5');
    // l5 l4 l3 l2 l1 are searched; l0 is the 6th level and is not.
    writeConfig(path.join(root, 'l0'), '.air.json', { port: 0 });
    expect(loadConfig(deepest)).toEqual({});

    writeConfig(path.join(root, 'l0', 'l1'), '.air.json', { port: 1 });
    expect(loadConfig(deepest)).toEqual({ port: 1 });
  });

  it('defaults the start directory to process.cwd()', () => {
    const dir = mkdirs('cwd-project');
    writeConfig(dir, '.air.json', { budgetLimit: 3 });
    const cwd = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    try {
      expect(loadConfig()).toEqual({ budgetLimit: 3 });
    } finally {
      cwd.mockRestore();
    }
  });

  it('returns an empty config and warns when the file is not valid JSON', () => {
    const dir = mkdirs('broken');
    const file = writeConfig(dir, '.air.json', '{ "port": ');

    expect(loadConfig(dir)).toEqual({});
    expect(warnSpy).toHaveBeenCalledWith(
      `[AIr] Failed to parse config at ${file}:`,
      expect.any(SyntaxError)
    );
  });

  it('does not fall through to air.config.json when .air.json is malformed', () => {
    const dir = mkdirs('broken');
    writeConfig(dir, '.air.json', 'nope');
    writeConfig(dir, 'air.config.json', { port: 2 });
    expect(loadConfig(dir)).toEqual({});
  });

  // BUG (config.ts:93-94): JSON.parse output is cast straight to AirConfig, so
  // a file containing `null` makes loadConfig return null (not {}), and the
  // first `config.providers` access in a caller throws a TypeError.
  it.failing('returns an object for a config file containing JSON null', () => {
    const dir = mkdirs('null');
    writeConfig(dir, '.air.json', 'null');
    expect(loadConfig(dir)).toEqual({});
  });
});

describe('mergeConfig', () => {
  const file: AirConfig = {
    providers: {
      rag: [{ name: 'docs', type: 'pinecone' }],
      mcp: [{ name: 'design' }],
    },
    redaction: 'full',
    budgetLimit: 5,
    port: 5200,
  };

  it('returns the file config unchanged (same reference) without overrides', () => {
    expect(mergeConfig(file)).toBe(file);
    expect(mergeConfig(file, undefined)).toBe(file);
  });

  it('lets scalar overrides win and keeps unspecified file values', () => {
    expect(mergeConfig(file, { redaction: 'none', port: 6000 })).toMatchObject({
      redaction: 'none',
      port: 6000,
      budgetLimit: 5,
    });
  });

  it('concatenates provider lists, file entries first', () => {
    const merged = mergeConfig(file, {
      providers: { rag: [{ name: 'code', type: 'chroma' }], mcp: [{ name: 'search' }] },
    });

    expect(merged.providers).toEqual({
      rag: [
        { name: 'docs', type: 'pinecone' },
        { name: 'code', type: 'chroma' },
      ],
      mcp: [{ name: 'design' }, { name: 'search' }],
    });
  });

  it('keeps file providers when overrides only set one provider kind', () => {
    const merged = mergeConfig(file, { providers: { mcp: [{ name: 'extra' }] } });
    expect(merged.providers!.rag).toEqual([{ name: 'docs', type: 'pinecone' }]);
    expect(merged.providers!.mcp).toEqual([{ name: 'design' }, { name: 'extra' }]);
  });

  it('normalises providers to empty lists when neither side has any', () => {
    expect(mergeConfig({}, { port: 1 })).toEqual({ port: 1, providers: { rag: [], mcp: [] } });
  });

  it('does not mutate either input', () => {
    const overrides: Partial<AirConfig> = { providers: { rag: [{ name: 'x', type: 'custom' }] } };
    const fileCopy = structuredClone(file);
    const overridesCopy = structuredClone(overrides);

    mergeConfig(file, overrides);

    expect(file).toEqual(fileCopy);
    expect(overrides).toEqual(overridesCopy);
  });
});
