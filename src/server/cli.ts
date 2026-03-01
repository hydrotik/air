#!/usr/bin/env node

/**
 * AIr CLI — starts the telemetry server and serves the dashboard.
 *
 * Usage:
 *   npx @hydrotik/air                                # default port 5200
 *   npx @hydrotik/air --port 8080                    # custom port
 *   npx @hydrotik/air --host 0.0.0.0                 # bind to all interfaces
 *   npx @hydrotik/air --redaction full                # strip all content
 *   npx @hydrotik/air --redaction none                # development only
 *
 * Environment:
 *   AIR_REDACTION_LEVEL=preview|full|none             # default: preview
 */

import { createServer } from './index.js';
import type { RedactionConfig, RedactionLevel } from '../shared/events.js';
import { loadConfig } from '../shared/config.js';

const args = process.argv.slice(2);

function getArg(name: string, fallback: string): string {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

const config = loadConfig();
const port = Number(getArg('port', String(config.port ?? 5200)));
const host = getArg('host', '0.0.0.0');
const redactionLevel = getArg(
  'redaction',
  process.env.AIR_REDACTION_LEVEL ?? config.redaction ?? 'preview',
) as RedactionLevel;

const redaction: RedactionConfig = { level: redactionLevel };

async function main() {
  const { app } = await createServer(port, { redaction, config });
  await app.listen({ port, host });

  const redactionLabel = redactionLevel === 'none'
    ? '⚠️  NONE (development only — content stored as-is)'
    : redactionLevel === 'full'
      ? '🔒 FULL (all content stripped)'
      : '🛡️  PREVIEW (content truncated + scrubbed)';

  const ragProviders = config.providers?.rag ?? [];
  const mcpProviders = config.providers?.mcp ?? [];
  const providerLines: string[] = [];
  if (ragProviders.length > 0) {
    providerLines.push(`  RAG:        ${ragProviders.map(p => p.name).join(', ')}`);
  }
  if (mcpProviders.length > 0) {
    providerLines.push(`  MCP:        ${mcpProviders.map(p => p.name).join(', ')}`);
  }
  if (config.budgetLimit) {
    providerLines.push(`  Budget:     $${config.budgetLimit.toFixed(2)}`);
  }

  console.log(`
  ⚡ AIr — Real-time AI Observability
  ────────────────────────────────────
  Dashboard:  http://localhost:${port}
  API:        http://localhost:${port}/api/health
  Collector:  ws://localhost:${port}/ws/collector
  RAG API:    http://localhost:${port}/api/rag/*
  Redaction:  ${redactionLabel}
${providerLines.length > 0 ? providerLines.join('\n') + '\n' : ''}  ────────────────────────────────────
  `);
}

main().catch((err) => {
  console.error('Failed to start AIr:', err);
  process.exit(1);
});
