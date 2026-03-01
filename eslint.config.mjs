import { config as reactConfig } from '@hydrotik/eslint-config/react-internal';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,

  // ── Monorepo-wide ignores ────────────────────────────────────────────
  {
    ignores: [
      // Build outputs
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/.next/**',

      // Generated / vendored
      '**/*.d.ts',
      '**/*.css.ts',
      '**/storybook-static/**',

      // Config files (handled by prettier only)
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      'turbo.json',
    ],
  },
];
