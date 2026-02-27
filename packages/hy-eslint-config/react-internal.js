import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libs that use React
 * @type {import('eslint').Linter.Config[]}
 */
export const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: [
      '**/*.test.js',
      '**/*.test.jsx',
      '**/*.stories.jsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.stories.tsx',
    ],
    rules: {
      '@typescript-eslint/no-namespace': ['off'],
      '@typescript-eslint/no-require-imports': ['off'],
    },
  },
];
