#!/usr/bin/env node
/**
 * Typecheck the dashboard against the design system's published declarations (`dist/*.d.mts`) in
 * the AIR_DS_SOURCE checkout, which must be built. Writes a tsconfig with those paths under
 * node_modules/.cache (never committed) and runs tsc on it.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { designSystem } from './design-system.mjs';

const here = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ds = designSystem();
const types = (dir) => {
  for (const f of ['dist/index.d.mts', 'dist/index.d.ts'])
    if (existsSync(path.join(dir, f))) return path.join(dir, f);
  throw new Error(`no declarations in ${dir}/dist: build the design system in AIR_DS_SOURCE first`);
};
const cache = path.join(here, 'node_modules/.cache/air-typecheck');
mkdirSync(cache, { recursive: true });
const config = path.join(cache, 'tsconfig.json');
writeFileSync(
  config,
  JSON.stringify(
    {
      extends: path.join(here, 'tsconfig.json'),
      compilerOptions: {
        paths: {
          '@hydrotik/air': [path.join(here, '../air/src/shared/index.ts')],
          '@hydrotik/design-system': [types(ds.designSystem)],
          '@hydrotik/tokens': [types(ds.tokens)],
          '@hydrotik/theme-provider': [types(ds.themeProvider)],
        },
      },
      include: [path.join(here, 'src')],
    },
    null,
    2
  )
);
execFileSync(path.join(here, 'node_modules/.bin/tsc'), ['-p', config], { stdio: 'inherit' });
