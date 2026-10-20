#!/usr/bin/env node

/**
 * AIr CLI — starts the telemetry server and serves the dashboard.
 *
 * Usage:
 *   npx @hydrotik/air                                # default port 5200
 *   npx @hydrotik/air --port 8080                    # custom port
 *   npx @hydrotik/air --host 0.0.0.0                 # every interface (default 127.0.0.1)
 *   npx @hydrotik/air --allow-origin https://a.example  # also accept this browser origin
 *   npx @hydrotik/air --redaction full                # strip all content
 *   npx @hydrotik/air --redaction none                # development only
 *
 *   npx @hydrotik/air setup claude-code               # connect Claude Code (see README)
 *
 * Environment:
 *   AIR_REDACTION_LEVEL=preview|full|none             # default: preview
 */

import { createServer } from './index.js';
import type { RedactionConfig, RedactionLevel } from '../shared/events.js';
import { loadConfig } from '../shared/config.js';
import { parseOrigins } from './origin.js';
import fs from 'node:fs';
import path from 'node:path';
import { collectorDir, runSetup } from '../setup/claude-code.js';

const args = process.argv.slice(2);

function getArg(name: string, fallback: string): string {
  const idx = args.indexOf(`--${name}`);
  const value = idx === -1 ? undefined : args[idx + 1];
  return value || fallback;
}

async function main() {
  const config = loadConfig();
  const port = Number(getArg('port', String(config.port ?? 5200)));
  const host = getArg('host', config.host ?? '127.0.0.1');
  const allowedOrigins = parseOrigins(getArg('allow-origin', ''));
  const redactionLevel = getArg(
    'redaction',
    process.env.AIR_REDACTION_LEVEL ?? config.redaction ?? 'preview'
  ) as RedactionLevel;
  const redaction: RedactionConfig = { level: redactionLevel };

  const { app } = await createServer(port, { redaction, config, allowedOrigins });
  await app.listen({ port, host });

  const redactionLabel =
    redactionLevel === 'none'
      ? '⚠️  NONE (development only — content stored as-is)'
      : redactionLevel === 'full'
        ? '🔒 FULL (all content stripped)'
        : '🛡️  PREVIEW (content truncated + scrubbed)';

  const ragProviders = config.providers?.rag ?? [];
  const mcpProviders = config.providers?.mcp ?? [];
  const providerLines: string[] = [];
  if (ragProviders.length > 0) {
    providerLines.push(`  RAG:        ${ragProviders.map((p) => p.name).join(', ')}`);
  }
  if (mcpProviders.length > 0) {
    providerLines.push(`  MCP:        ${mcpProviders.map((p) => p.name).join(', ')}`);
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
${host === '127.0.0.1' || host === 'localhost' || host === '::1' ? '' : `  Listening:  ${host}:${port} (other machines can connect; no authentication)\n`}${providerLines.length > 0 ? providerLines.join('\n') + '\n' : ''}  ────────────────────────────────────
  `);
}

const SETUP_USAGE =
  'Usage: air setup claude-code [--user] [--port <n>] [--no-statusline] [--force] [--dry-run] [--uninstall]';

if (args[0] === 'setup') {
  if (args[1] === 'claude-code') {
    // The running script (bin links resolved): dist/server/cli.js, or src/server/cli.ts.
    const script = path.resolve(process.argv[1] ?? '.');
    const here = path.dirname(fs.existsSync(script) ? fs.realpathSync(script) : script);
    process.exitCode = runSetup(args.slice(2), { sourceDir: collectorDir(here) });
  } else {
    console.error(SETUP_USAGE);
    process.exitCode = 2;
  }
} else {
  main().catch((err) => {
    console.error('Failed to start AIr:', err);
    process.exit(1);
  });
}
