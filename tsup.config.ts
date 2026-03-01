import { defineConfig } from 'tsup';

export default defineConfig([
  // Server CLI + library
  {
    entry: {
      'server/cli': 'src/server/cli.ts',
      'server/index': 'src/server/index.ts',
    },
    format: ['esm'],
    target: 'node20',
    platform: 'node',
    outDir: 'dist',
    dts: false,
    sourcemap: true,
    clean: false,
    external: ['better-sqlite3'],
    noExternal: ['../db', '../shared'],
    tsconfig: 'tsconfig.build.json',
    banner: {
      js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
    },
  },
  // SDK (publishable, minimal deps)
  {
    entry: {
      'sdk/index': 'src/sdk/index.ts',
    },
    format: ['esm', 'cjs'],
    target: 'node18',
    platform: 'node',
    outDir: 'dist',
    dts: true,
    sourcemap: true,
    clean: false,
    external: ['ws'],
  },
  // Shared event types (used by both SDK consumers and server)
  {
    entry: {
      'shared/index': 'src/shared/index.ts',
    },
    format: ['esm', 'cjs'],
    target: 'node18',
    platform: 'node',
    outDir: 'dist',
    dts: true,
    sourcemap: true,
    clean: false,
  },
]);
