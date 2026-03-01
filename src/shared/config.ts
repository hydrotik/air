/**
 * AIr Configuration
 *
 * Loaded from `.air.json` in the project root, or passed programmatically.
 * Declares RAG providers, MCP servers, and integration settings so the
 * dashboard knows about them before data flows.
 *
 * @example .air.json
 * ```json
 * {
 *   "providers": {
 *     "rag": [
 *       {
 *         "name": "product-search",
 *         "type": "qdrant",
 *         "description": "Product catalog vector search",
 *         "embeddingModel": "text-embedding-3-small",
 *         "dimensions": 1536
 *       },
 *       {
 *         "name": "docs-retrieval",
 *         "type": "pinecone",
 *         "description": "Documentation knowledge base"
 *       }
 *     ],
 *     "mcp": [
 *       { "name": "design-mcp", "description": "Design system MCP server" }
 *     ]
 *   },
 *   "redaction": "preview",
 *   "budgetLimit": 10.00
 * }
 * ```
 */

import fs from 'node:fs';
import path from 'node:path';

// ─── Config Types ───────────────────────────────────────────────────────

export interface RagProviderConfig {
  /** Unique name for this RAG source (used in events and dashboard) */
  name: string;
  /** Vector DB or retrieval system type: 'pinecone' | 'qdrant' | 'weaviate' | 'chroma' | 'custom' */
  type: string;
  /** Human-readable description shown in dashboard */
  description?: string;
  /** Default embedding model name */
  embeddingModel?: string;
  /** Embedding dimensions */
  dimensions?: number;
  /** Custom metadata shown in dashboard provider panel */
  metadata?: Record<string, unknown>;
}

export interface McpProviderConfig {
  /** MCP server name */
  name: string;
  /** Human-readable description */
  description?: string;
}

export interface AirConfig {
  /** Registered integration providers */
  providers?: {
    rag?: RagProviderConfig[];
    mcp?: McpProviderConfig[];
  };
  /** Data redaction level */
  redaction?: 'none' | 'preview' | 'full';
  /** Budget limit in USD for cost alerts */
  budgetLimit?: number;
  /** Port override */
  port?: number;
}

// ─── Config Loading ─────────────────────────────────────────────────────

const CONFIG_FILENAMES = ['.air.json', 'air.config.json'];

/**
 * Load AIr config from the project root.
 * Searches for .air.json or air.config.json in cwd and parent dirs.
 * Returns empty config if not found.
 */
export function loadConfig(startDir?: string): AirConfig {
  const dir = startDir ?? process.cwd();
  const configPath = findConfigFile(dir);
  if (!configPath) return {};

  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(raw) as AirConfig;
    console.log(`[AIr] Loaded config from ${configPath}`);
    return config;
  } catch (err) {
    console.warn(`[AIr] Failed to parse config at ${configPath}:`, err);
    return {};
  }
}

function findConfigFile(dir: string): string | null {
  let current = path.resolve(dir);
  const root = path.parse(current).root;

  // Walk up at most 5 levels
  for (let i = 0; i < 5; i++) {
    for (const name of CONFIG_FILENAMES) {
      const candidate = path.join(current, name);
      if (fs.existsSync(candidate)) return candidate;
    }
    const parent = path.dirname(current);
    if (parent === current || parent === root) break;
    current = parent;
  }
  return null;
}

/**
 * Merge configs: file config as base, programmatic overrides on top.
 */
export function mergeConfig(file: AirConfig, overrides?: Partial<AirConfig>): AirConfig {
  if (!overrides) return file;
  return {
    ...file,
    ...overrides,
    providers: {
      rag: [...(file.providers?.rag ?? []), ...(overrides.providers?.rag ?? [])],
      mcp: [...(file.providers?.mcp ?? []), ...(overrides.providers?.mcp ?? [])],
    },
  };
}
