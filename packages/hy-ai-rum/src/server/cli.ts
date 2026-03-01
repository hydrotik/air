#!/usr/bin/env node

/**
 * AIr CLI — starts the telemetry server and serves the dashboard.
 *
 * Usage:
 *   npx @hydrotik/air                    # default port 5200
 *   npx @hydrotik/air --port 8080        # custom port
 *   npx @hydrotik/air --host 0.0.0.0     # bind to all interfaces
 */

import { createServer } from './index.js';

const args = process.argv.slice(2);

function getArg(name: string, fallback: string): string {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

const port = Number(getArg('port', '5200'));
const host = getArg('host', '0.0.0.0');

async function main() {
  const { app } = await createServer(port);
  await app.listen({ port, host });

  console.log(`
  ⚡ AIr — Real-time AI Observability
  ────────────────────────────────────
  Dashboard:  http://localhost:${port}
  API:        http://localhost:${port}/api/health
  Collector:  ws://localhost:${port}/ws/collector
  ────────────────────────────────────
  `);
}

main().catch((err) => {
  console.error('Failed to start AIr:', err);
  process.exit(1);
});
