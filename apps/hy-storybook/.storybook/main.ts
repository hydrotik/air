import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'path';

// __dirname is available here because Storybook evaluates main.ts via esbuild-register (CJS)
// workspace root: apps/hy-storybook/.storybook → ../../.. → repo root
const workspaceRoot = path.resolve(__dirname, '../../..');

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

    return config;
  },
};

export default config;
