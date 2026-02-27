import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

/**
 * Base tsdown configuration for @hydrotik library packages.
 * Includes vanilla-extract CSS processing via the Vite plugin.
 *
 * @param {import('tsdown').Options} overrides
 * @returns {import('tsdown').Options}
 */
export function defineLibrary(overrides = {}) {
  return {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    external: ['react', 'react-dom', /^@radix-ui/],
    vitePlugins: [vanillaExtractPlugin()],
    ...overrides,
  };
}

export default defineLibrary;
