import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'path';
import fs from 'fs';

// __dirname is available here because Storybook evaluates main.ts via esbuild-register (CJS)
// workspace root: apps/hy-storybook/.storybook → ../../.. → repo root
const workspaceRoot = path.resolve(__dirname, '../../..');

/**
 * Recursively find all files matching a pattern in a directory.
 */
function findFiles(dir: string, pattern: RegExp): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(full, pattern));
    } else if (pattern.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const config: StorybookConfig = {
  stories: ['../../../packages/hy-design-system/src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.plugins = config.plugins ?? [];
    config.plugins.push(vanillaExtractPlugin());

    // Allow Vite to serve files from anywhere in the monorepo
    config.server = config.server ?? {};
    config.server.fs = { allow: [workspaceRoot] };

    // Resolve workspace packages to source for full HMR (no dist required)
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      '@hydrotik/design-system': path.resolve(workspaceRoot, 'packages/hy-design-system/src'),
      '@hydrotik/tokens': path.resolve(workspaceRoot, 'packages/hy-tokens/src'),
      '@hydrotik/theme-provider': path.resolve(workspaceRoot, 'packages/hy-theme-provider/src'),
    };

    // Ensure Vite doesn't try to pre-bundle .css.ts files — the vanilla-extract
    // plugin must process them.
    config.optimizeDeps = config.optimizeDeps ?? {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude ?? []),
      '@vanilla-extract/css',
      '@vanilla-extract/css/fileScope',
      '@vanilla-extract/recipes',
    ];

    // Pre-warm all .css.ts files so the vanilla-extract compiler has them ready
    // before any story requests them (prevents "No CSS for file" race condition).
    const cssFiles = [
      ...findFiles(path.resolve(workspaceRoot, 'packages/hy-tokens/src'), /\.css\.ts$/),
      ...findFiles(path.resolve(workspaceRoot, 'packages/hy-design-system/src'), /\.css\.ts$/),
    ];
    config.optimizeDeps.entries = [
      ...(config.optimizeDeps.entries ?? []),
      ...cssFiles,
    ];

    return config;
  },
};

export default config;
