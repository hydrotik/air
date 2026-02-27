import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import { defineConfig, globalIgnores } from 'eslint/config';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/**
 * A shared ESLint configuration
 * @type {import('eslint').Linter.Config[]}
 */
export const config = defineConfig(
  globalIgnores(['!**/*']),
  js.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  },
  {
    ignores: ['dist/**', '**/node_modules/**', '**/.prettierrc.*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [sonarjs.configs.recommended],
    rules: {
      'comma-spacing': ['error'],
      'comma-style': ['error'],
      'computed-property-spacing': ['error'],
      'dot-location': ['error'],
      'eol-last': ['error'],
      'func-call-spacing': ['error'],
      'function-paren-newline': ['error'],
      'generator-star-spacing': ['error'],
      'implicit-arrow-linebreak': ['off'],
      indent: ['error'],
      'jsx-quotes': ['error'],
      'key-spacing': ['error'],
      'keyword-spacing': ['error'],
      'line-comment-position': ['error'],
      'linebreak-style': ['off'],
      'lines-around-comment': ['error'],
      'lines-between-class-members': ['error'],
      'max-len': ['error', 200],
      'max-statements-per-line': ['error'],
      'multiline-ternary': ['off'],
      'new-parens': ['error'],
      'newline-per-chained-call': ['error'],
      'no-extra-parens': ['error'],
      'no-mixed-spaces-and-tabs': ['error'],
      'no-multi-spaces': ['error'],
      'no-multiple-empty-lines': ['error'],
      'no-tabs': ['error'],
      'no-trailing-spaces': ['error'],
      'no-whitespace-before-property': ['error'],
      'nonblock-statement-body-position': ['error'],
      'object-curly-newline': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'operator-linebreak': ['error'],
      'padded-blocks': ['error', 'never'],
      'padding-line-between-statements': ['error'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'rest-spread-spacing': ['error'],
      semi: ['error'],
      'semi-spacing': ['error'],
      'semi-style': ['error'],
      'space-before-blocks': ['error'],
      'space-before-function-paren': ['error'],
      'space-in-parens': ['error'],
      'space-infix-ops': ['error'],
      'space-unary-ops': ['error'],
      'switch-colon-spacing': ['error'],
      'template-curly-spacing': ['error'],
      'template-tag-spacing': ['error'],
      'unicode-bom': ['error'],
      'wrap-iife': ['error'],
      'wrap-regex': ['error'],
      'yield-star-spacing': ['error'],
      'sort-imports': ['off'],
      'no-console': ['error', { allow: ['error', 'info', 'time', 'timeEnd'] }],
      '@typescript-eslint/no-namespace': ['off'],
      '@typescript-eslint/no-require-imports': ['off'],
      'react/react-in-jsx-scope': ['off'],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {},
  },
);
