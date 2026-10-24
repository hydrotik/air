#!/usr/bin/env node
// Runs before `npm pack` / `npm publish`: the package must carry the built server, the pi
// collector that its "pi" manifest names, and the dashboard. The dashboard is built separately
// (packages/dashboard, see docs/releasing.md), so a publish without it would ship a server with
// nothing to serve.
import { existsSync } from 'node:fs';

const required = [
  'dist/server/cli.js',
  'dist/server/index.js',
  'dist/sdk/index.js',
  'dist/shared/index.js',
  'dist/collectors/pi/index.js',
  'dist/dashboard/index.html',
];
const missing = required.filter((f) => !existsSync(new URL(`../${f}`, import.meta.url)));
if (missing.length) {
  console.error(
    `[check-pack] missing: ${missing.join(', ')}. Build the server (pnpm build) and the dashboard (pnpm build:dashboard) first.`
  );
  process.exit(1);
}
console.log('[check-pack] ok');
