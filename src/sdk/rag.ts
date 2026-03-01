/**
 * AIr RAG Instrumentation
 *
 * Helpers for instrumenting retrieval-augmented generation pipelines.
 * Works with any vector DB, embedding API, or document store.
 *
 * @example
 * ```ts
 * import { createRagTracer } from '@hydrotik/air/sdk';
 *
 * const rag = createRagTracer('pinecone', { sessionId: 'my-session' });
 *
 * // Trace a retrieval
 * const results = await rag.traceRetrieval('search query', async () => {
 *   return await pinecone.query({ vector, topK: 5 });
 * }, {
 *   extractResults: (r) => ({
 *     count: r.matches.length,
 *     topScore: r.matches[0]?.score,
 *     chunkSizes: r.matches.map(m => m.metadata.tokenCount),
 *   }),
 * });
 *
 * // Trace an embedding
 * const embedding = await rag.traceEmbedding('text-embedding-3-small', 150, async () => {
 *   return await openai.embeddings.create({ model: 'text-embedding-3-small', input: text });
 * }, { dimensions: 1536 });
 *
 * rag.close();
 * ```
 */

import { AirClient, type AirClientOptions } from './client';
import { loadConfig, type RagProviderConfig } from '../shared/config';

export interface CreateRagTracerOptions extends AirClientOptions {
  /** Default embedding model name */
  defaultEmbeddingModel?: string;
  /** Default embedding dimensions */
  defaultDimensions?: number;
}

/**
 * Create a RAG telemetry tracer for a specific source/vector DB.
 */
export function createRagTracer(source: string, options?: CreateRagTracerOptions) {
  const air = new AirClient({
    ...options,
    provider: `rag:${source}`,
  });

  return {
    /**
     * Trace a retrieval/search operation.
     *
     * @param query - The search query or text being used for retrieval
     * @param fn - The async retrieval function to instrument
     * @param opts - Optional result extractor for richer telemetry
     */
    traceRetrieval: <T>(
      query: string,
      fn: () => Promise<T>,
      opts?: {
        extractResults?: (result: T) => {
          count: number;
          topScore?: number;
          chunkSizes?: number[];
        };
      },
    ) => air.traceRetrieval(source, query, fn, opts),

    /**
     * Trace an embedding generation.
     *
     * @param model - Embedding model name
     * @param inputTokens - Number of input tokens
     * @param fn - The async embedding function
     * @param opts - Optional dimensions and batch size
     */
    traceEmbedding: <T>(
      model: string,
      inputTokens: number,
      fn: () => Promise<T>,
      opts?: { dimensions?: number; batchSize?: number },
    ) =>
      air.traceEmbedding(
        source,
        model ?? options?.defaultEmbeddingModel ?? 'unknown',
        inputTokens,
        fn,
        {
          dimensions: opts?.dimensions ?? options?.defaultDimensions,
          batchSize: opts?.batchSize,
        },
      ),

    /**
     * Trace a document indexing/upsert operation.
     *
     * @param documentCount - Number of documents indexed
     * @param totalTokens - Total tokens across all documents
     * @param fn - The async indexing function
     */
    traceIndex: <T>(
      documentCount: number,
      totalTokens: number,
      fn: () => Promise<T>,
      metadata?: Record<string, unknown>,
    ) => air.traceIndex(source, documentCount, totalTokens, fn, metadata),

    /**
     * Trace a generic RAG pipeline step.
     */
    trace: <T>(eventName: string, data: Record<string, unknown>, fn: () => Promise<T>) =>
      air.trace(eventName, { source, ...data }, fn),

    /** Emit a raw event */
    emit: (event: Record<string, any> & { type: string }) => air.emit(event),

    /** Close the connection */
    close: () => air.close(),
  };
}

// ─── Config-Driven Factory ──────────────────────────────────────────────

export type RagTracerMap = Record<string, ReturnType<typeof createRagTracer>>;

/**
 * Create RAG tracers for all providers defined in .air.json.
 *
 * Returns a map of { providerName: ragTracer } so you can use them by name:
 *
 * @example
 * ```ts
 * import { createRagTracersFromConfig } from '@hydrotik/air/sdk';
 *
 * const rag = createRagTracersFromConfig();
 * // Uses providers from .air.json:
 * // { "providers": { "rag": [{ "name": "product-search", "type": "qdrant", ... }] } }
 *
 * const results = await rag['product-search'].traceRetrieval('shoes', async () => {
 *   return await qdrant.search({ vector, limit: 10 });
 * });
 * ```
 *
 * Or with overrides:
 * ```ts
 * const rag = createRagTracersFromConfig({
 *   sessionId: 'my-session',
 *   url: 'ws://custom-air:5200/ws/collector',
 * });
 * ```
 */
export function createRagTracersFromConfig(
  options?: AirClientOptions,
): RagTracerMap {
  const config = loadConfig();
  const providers = config.providers?.rag ?? [];
  const tracers: RagTracerMap = {};

  for (const provider of providers) {
    tracers[provider.name] = createRagTracer(provider.name, {
      ...options,
      defaultEmbeddingModel: provider.embeddingModel,
      defaultDimensions: provider.dimensions,
    });
  }

  return tracers;
}

/**
 * Create a single RAG tracer from a provider config object.
 * Useful when you have the config but not the file.
 */
export function createRagTracerFromProvider(
  provider: RagProviderConfig,
  options?: AirClientOptions,
): ReturnType<typeof createRagTracer> {
  return createRagTracer(provider.name, {
    ...options,
    defaultEmbeddingModel: provider.embeddingModel,
    defaultDimensions: provider.dimensions,
  });
}
