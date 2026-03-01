import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'node:path';

const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  root: __dirname,
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@hydrotik/design-system': path.resolve(workspaceRoot, 'packages/hy-design-system/src'),
      '@hydrotik/tokens': path.resolve(workspaceRoot, 'packages/hy-tokens/src'),
      '@hydrotik/theme-provider': path.resolve(workspaceRoot, 'packages/hy-theme-provider/src'),
    },
  },
  server: {
    port: 5201, // Dashboard dev port (server on 5200)
    proxy: {
      '/api': 'http://localhost:5200',
      '/ws': {
        target: 'ws://localhost:5200',
        ws: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
