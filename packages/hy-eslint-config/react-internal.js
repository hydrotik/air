import eslintReact from '@eslint-react/eslint-plugin';
import { config as baseConfig } from './base.js';

/**
 * ESLint flat config for React packages (design system, apps, Storybook).
 *
 * Extends base config with @eslint-react (ESLint 10 compatible).
 *
 * @type {import('eslint').Linter.Config[]}
 */
export const config = [
  ...baseConfig,

  // ── React (eslint-react — supports ESLint 10) ───────────────────────
  eslintReact.configs['recommended-typescript'],

  // ── React rule tuning ────────────────────────────────────────────────
  {
    rules: {
      // We use TypeScript for prop validation
      '@eslint-react/no-prop-types': 'off',
      // Allow array index keys in static lists (common in design system demos)
      '@eslint-react/no-array-index-key': 'warn',
      // Display name is set explicitly on all forwardRef components
      '@eslint-react/no-missing-component-display-name': 'warn',
    },
  },
];
