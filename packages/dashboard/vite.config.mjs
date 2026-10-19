/**
 * The AIr dashboard: a React app built on @hydrotik/design-system, which is not published.
 *
 *   AIR_DS_SOURCE=/path/to/design-system-monorepo pnpm build:dashboard
 *
 * The design system, its tokens and its theme provider compile from source in that checkout
 * (vanilla-extract runs on their .css.ts files). The output goes to packages/air/dist/dashboard/,
 * which ships in the `@hydrotik/air` npm package and is never committed. `pnpm dev:dashboard`
 * serves it on port 5201 and proxies the API to the AIr server on 5200.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { designSystem } from './scripts/design-system.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const ds = designSystem();
const dsModules = path.join(ds.designSystem, 'node_modules');
const own = path.join(here, 'node_modules');

export default {
  root: here,
  plugins: [
    // vanilla-extract compiles .css.ts on a Vite server of its own that keeps our plugins but not
    // our server options: this plugin lets that server, too, read the design system's sources.
    {
      name: 'air-allow-design-system',
      config: () => ({
        server: { fs: { allow: [here, path.join(here, '../air/src'), ds.source] } },
      }),
    },
    react(),
    vanillaExtractPlugin({
      unstable_pluginFilter: ({ name }) => name === 'air-allow-design-system',
    }),
  ],
  logLevel: 'warn',
  resolve: {
    alias: {
      '@hydrotik/air': path.resolve(here, '../air/src/shared/index.ts'),
      '@hydrotik/design-system': path.join(ds.designSystem, 'src'),
      '@hydrotik/tokens': path.join(ds.tokens, 'src'),
      '@hydrotik/theme-provider': path.join(ds.themeProvider, 'src'),
      // One copy of each runtime: the design system's vanilla-extract, our React.
      '@vanilla-extract/css': path.join(dsModules, '@vanilla-extract/css'),
      '@vanilla-extract/recipes': path.join(dsModules, '@vanilla-extract/recipes'),
      react: path.join(own, 'react'),
      'react-dom': path.join(own, 'react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    exclude: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope', '@vanilla-extract/recipes'],
  },
  server: {
    port: 5201,
    strictPort: true,
    host: '127.0.0.1',
    proxy: {
      '/api': 'http://localhost:5200',
      '/ws': { target: 'ws://localhost:5200', ws: true },
    },
  },
  build: {
    outDir: path.resolve(here, '../air/dist/dashboard'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 4000,
  },
};
