import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { ports } from '@hydrotik/config/ports';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    port: ports.componentPreview,
  },
});
