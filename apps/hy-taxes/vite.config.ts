import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { ports } from '@hydrotik/config/ports';
import path from 'path';

const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    port: ports.taxes,
    fs: { allow: [workspaceRoot] },
  },
  appType: 'spa',
  resolve: {
    alias: {
      '@hydrotik/design-system': path.resolve(workspaceRoot, 'packages/hy-design-system/src'),
      '@hydrotik/tokens': path.resolve(workspaceRoot, 'packages/hy-tokens/src'),
      '@hydrotik/theme-provider': path.resolve(workspaceRoot, 'packages/hy-theme-provider/src'),
    },
  },
  optimizeDeps: {
    exclude: [
      '@vanilla-extract/css',
      '@vanilla-extract/css/fileScope',
      '@vanilla-extract/recipes',
    ],
  },
});
