import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Base ESLint flat config for all packages in the monorepo.
 *
 * - TypeScript via typescript-eslint (unified)
 * - Prettier handles all formatting (no formatting rules here)
 * - SonarJS for code quality
 * - Turbo for cache safety
 *
 * @type {import('eslint').Linter.Config[]}
 */
export const config = tseslint.config(
  // ── Global ignores ───────────────────────────────────────────────────
  {
    ignores: [
      'dist/**',
      'build/**',
      'coverage/**',
      '**/node_modules/**',
      '**/*.d.ts',
      '**/*.css.ts',
    ],
  },

  // ── JS recommended ───────────────────────────────────────────────────
  js.configs.recommended,

  // ── TypeScript ───────────────────────────────────────────────────────
  ...tseslint.configs.recommended,

  // ── SonarJS (code quality) ───────────────────────────────────────────
  sonarjs.configs.recommended,

  // ── Turbo (env var caching) ──────────────────────────────────────────
  {
    plugins: { turbo: turboPlugin },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },

  // ── Shared language options ──────────────────────────────────────────
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // ── Project rules ────────────────────────────────────────────────────
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
    rules: {
      // Console — allow info/warn/error, flag debug logs
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'time', 'timeEnd'] }],

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-ts-comment': ['warn', {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
      }],

      // SonarJS tuning — relax noisy rules for component libraries
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/cognitive-complexity': ['warn', 25],
      'sonarjs/no-nested-conditional': 'warn',
      // Math.random() is fine for non-crypto IDs (telemetry, UI keys)
      'sonarjs/pseudo-random': 'warn',
    },
  },

  // ── Test files — relaxed rules ───────────────────────────────────────
  {
    files: [
      '**/*.test.ts', '**/*.test.tsx',
      '**/*.spec.ts', '**/*.spec.tsx',
      '**/*.stories.ts', '**/*.stories.tsx',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/cognitive-complexity': 'off',
    },
  },

  // ── Prettier MUST be last (disables all formatting rules) ────────────
  eslintConfigPrettier,
);
