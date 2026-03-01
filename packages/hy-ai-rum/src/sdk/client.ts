/**
 * AIr Client SDK
 *
 * Lightweight client for emitting telemetry events to an AIr server.
 * Use this to instrument MCP servers, RAG pipelines, or any custom tool.
 *
 * SECURITY: The SDK never sends raw prompt content. Use promptHash for prompt
 * tracking. Content previews are subject to server-side redaction.
 *
 * @example
 * ```ts
 * import { AirClient } from '@hydrotik/air/sdk';
 *
 * const air = new AirClient({ sessionId: 'my-session' });
 *
 * // Wrap an async operation
 * const result = await air.trace('rag_retrieval', { source: 'pinecone', query: 'foo' }, async () => {
 *   return await pinecone.query({ vector, topK: 5 });
 * });
 *
 * // Track latency with breakdown
 * air.recordLatency('turn', 1500, { ttftMs: 200, phases: [{ name: 'thinking', durationMs: 800 }] });
 *
 * // Rate a prompt variant
 * air.ratePrompt('v2-concise', 'system', promptText, {
 *   goalAchieved: true, turnsToComplete: 3, totalTokens: 5000, totalCost: 0.02,
 *   totalLatencyMs: 15000, toolErrorRate: 0, requiredCompaction: false,
 * }, 4);
 *
 * air.close();
 * ```
 */

import WebSocket from 'ws';
import { createHash } from 'node:crypto';

export interface AirClientOptions {
  /** AIr server WebSocket URL */
  url?: string;
  /** Session ID — groups events together in the dashboard */
  sessionId?: string;
  /** Provider name — appears in custom events and dashboard filters */
  provider?: string;
  /** Auto-reconnect on disconnect (default: true) */
  reconnect?: boolean;
  /** Silent mode — suppress console output (default: true) */
  silent?: boolean;
  /** Budget limit in USD — emits budget_exceeded alerts when cumulative cost exceeds */
  budgetLimit?: number;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

/**
 * Hash prompt text to a safe, non-reversible identifier.
 * Uses SHA-256, returns first 16 hex chars. No raw content stored.
 */
export function hashPrompt(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

export class AirClient {
  private ws: WebSocket | null = null;
  private url: string;
  private sessionId: string;
  private provider: string;
  private reconnect: boolean;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private queue: string[] = [];
  private closed = false;
  private cumulativeCost = 0;
  private budgetLimit?: number;

  constructor(options: AirClientOptions = {}) {
    this.url = options.url ?? process.env.AIR_URL ?? 'ws://localhost:5200/ws/collector';
    this.sessionId = options.sessionId ?? uid();
    this.provider = options.provider ?? 'custom';
    this.reconnect = options.reconnect ?? true;
    this.budgetLimit = options.budgetLimit;
    this.connect();
  }

  // ─── Connection ─────────────────────────────────────────────────────────

  private connect() {
    if (this.closed) return;
    try {
      this.ws = new WebSocket(this.url);
      this.ws.on('open', () => {
        // Flush queued events
        for (const msg of this.queue) {
          this.ws?.send(msg);
        }
        this.queue = [];
      });
      this.ws.on('close', () => {
        this.ws = null;
        if (this.reconnect && !this.closed) this.scheduleReconnect();
      });
      this.ws.on('error', () => {
        this.ws = null;
        if (this.reconnect && !this.closed) this.scheduleReconnect();
      });
    } catch {
      if (this.reconnect && !this.closed) this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 5000);
  }

  /** Close the connection and stop reconnecting */
  close() {
    this.closed = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
  }

  /** Current session ID */
  getSessionId(): string {
    return this.sessionId;
  }

  /** Switch session */
  setSessionId(id: string) {
    this.sessionId = id;
  }

  // ─── Event Emission ─────────────────────────────────────────────────────

  /** Emit a raw telemetry event */
  emit(event: Omit<Record<string, any>, 'id' | 'sessionId' | 'timestamp'> & { type: string }) {
    const full = {
      id: uid(),
      sessionId: this.sessionId,
      timestamp: Date.now(),
      ...event,
    };
    const payload = JSON.stringify(full);
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(payload);
    } else {
      // Queue up to 200 events while disconnected
      if (this.queue.length < 200) {
        this.queue.push(payload);
      }
    }
  }

  // ─── Latency Monitoring ─────────────────────────────────────────────────

  /**
   * Record a latency measurement with optional breakdown.
   */
  recordLatency(
    operation: 'turn' | 'tool_call' | 'api_call' | 'ttft' | 'custom',
    totalMs: number,
    opts?: {
      ttftMs?: number;
      phases?: Array<{ name: string; durationMs: number }>;
      model?: string;
      provider?: string;
    },
  ) {
    this.emit({
      type: 'latency',
      operation,
      totalMs,
      ttftMs: opts?.ttftMs,
      phases: opts?.phases,
      model: opts?.model,
      provider: opts?.provider,
    });
  }

  /**
   * Measure latency of an async operation automatically.
   */
  async measureLatency<T>(
    operation: 'turn' | 'tool_call' | 'api_call' | 'ttft' | 'custom',
    fn: () => Promise<T>,
    opts?: { model?: string; provider?: string },
  ): Promise<T> {
    const start = Date.now();
    const result = await fn();
    this.recordLatency(operation, Date.now() - start, opts);
    return result;
  }

  // ─── Cost Monitoring ────────────────────────────────────────────────────

  /**
   * Record a cost event with automatic cumulative tracking and budget alerts.
   */
  recordCost(
    model: string,
    provider: string,
    costs: {
      inputCost: number;
      outputCost: number;
      cacheReadCost?: number;
      cacheWriteCost?: number;
    },
  ) {
    const totalCost = costs.inputCost + costs.outputCost + (costs.cacheReadCost ?? 0) + (costs.cacheWriteCost ?? 0);
    this.cumulativeCost += totalCost;
    const budgetExceeded = this.budgetLimit != null && this.cumulativeCost > this.budgetLimit;

    this.emit({
      type: 'cost',
      model,
      provider,
      inputCost: costs.inputCost,
      outputCost: costs.outputCost,
      cacheReadCost: costs.cacheReadCost ?? 0,
      cacheWriteCost: costs.cacheWriteCost ?? 0,
      totalCost,
      cumulativeCost: this.cumulativeCost,
      budgetLimit: this.budgetLimit,
      budgetExceeded,
      currency: 'USD',
    });
  }

  // ─── Output Evaluation ──────────────────────────────────────────────────

  /**
   * Record quality metrics for an LLM turn output.
   * No content stored — only numeric quality signals.
   */
  recordOutputEval(
    turnIndex: number,
    model: string,
    provider: string,
    metrics: {
      responseTokens: number;
      toolCallCount: number;
      toolErrorCount: number;
      hadRetry?: boolean;
      hadImmediateFollowUp?: boolean;
      responseLatencyMs: number;
      cacheHitRate?: number;
    },
    opts?: { userRating?: number; tags?: string[] },
  ) {
    const successRate = metrics.toolCallCount > 0
      ? (metrics.toolCallCount - metrics.toolErrorCount) / metrics.toolCallCount
      : 1;

    this.emit({
      type: 'output_eval',
      turnIndex,
      model,
      provider,
      metrics: {
        responseTokens: metrics.responseTokens,
        toolCallCount: metrics.toolCallCount,
        toolErrorCount: metrics.toolErrorCount,
        toolSuccessRate: Math.round(successRate * 1000) / 1000,
        hadRetry: metrics.hadRetry ?? false,
        hadImmediateFollowUp: metrics.hadImmediateFollowUp ?? false,
        responseLatencyMs: metrics.responseLatencyMs,
        cacheHitRate: metrics.cacheHitRate ?? 0,
      },
      userRating: opts?.userRating,
      tags: opts?.tags,
    });
  }

  // ─── Prompt Rating ──────────────────────────────────────────────────────

  /**
   * Rate a prompt variant's effectiveness.
   *
   * SECURITY: Only a SHA-256 hash of the prompt is stored. The raw prompt text
   * is hashed client-side and never transmitted to the server.
   *
   * @param variant - Human-readable label: 'baseline', 'v2-concise', etc.
   * @param category - Purpose: 'system', 'tool_guidance', 'few_shot', etc.
   * @param promptText - Raw prompt text (hashed locally, never sent)
   * @param metrics - Effectiveness measurements
   * @param rating - Optional 1-5 star rating
   * @param notes - Optional brief notes (no sensitive data)
   */
  ratePrompt(
    variant: string,
    category: string,
    promptText: string,
    metrics: {
      goalAchieved: boolean;
      turnsToComplete: number;
      totalTokens: number;
      totalCost: number;
      totalLatencyMs: number;
      toolErrorRate: number;
      requiredCompaction: boolean;
    },
    rating?: number,
    notes?: string,
  ) {
    this.emit({
      type: 'prompt_rating',
      promptHash: hashPrompt(promptText),
      variant,
      category,
      model: this.provider, // Will be overridden if model context is available
      provider: this.provider,
      metrics,
      rating,
      notes,
    });
  }

  /**
   * Rate a prompt by hash (when you already have the hash).
   */
  ratePromptByHash(
    promptHash: string,
    variant: string,
    category: string,
    model: string,
    provider: string,
    metrics: {
      goalAchieved: boolean;
      turnsToComplete: number;
      totalTokens: number;
      totalCost: number;
      totalLatencyMs: number;
      toolErrorRate: number;
      requiredCompaction: boolean;
    },
    rating?: number,
    notes?: string,
  ) {
    this.emit({
      type: 'prompt_rating',
      promptHash,
      variant,
      category,
      model,
      provider,
      metrics,
      rating,
      notes,
    });
  }

  // ─── MCP Helpers ────────────────────────────────────────────────────────

  /** Record an MCP request/response pair */
  async traceMcp<T>(
    serverName: string,
    method: string,
    opts: { toolName?: string; resourceUri?: string; input?: any },
    fn: () => Promise<T>,
  ): Promise<T> {
    const inputStr = opts.input ? JSON.stringify(opts.input) : '';
    this.emit({
      type: 'mcp_request',
      method,
      toolName: opts.toolName,
      resourceUri: opts.resourceUri,
      serverName,
      inputSizeBytes: Buffer.byteLength(inputStr),
      inputPreview: inputStr.slice(0, 200),
    });

    const start = Date.now();
    try {
      const result = await fn();
      const outputStr = JSON.stringify(result);
      const durationMs = Date.now() - start;

      this.emit({
        type: 'mcp_response',
        method,
        toolName: opts.toolName,
        resourceUri: opts.resourceUri,
        serverName,
        durationMs,
        outputSizeBytes: Buffer.byteLength(outputStr),
        outputPreview: outputStr.slice(0, 200),
        isError: false,
      });

      // Auto-record latency for MCP calls
      this.recordLatency('api_call', durationMs, { model: serverName });

      return result;
    } catch (err: any) {
      this.emit({
        type: 'mcp_response',
        method,
        toolName: opts.toolName,
        resourceUri: opts.resourceUri,
        serverName,
        durationMs: Date.now() - start,
        isError: true,
        errorMessage: err?.message ?? String(err),
      });
      throw err;
    }
  }

  // ─── RAG Helpers ────────────────────────────────────────────────────────

  /** Record a retrieval operation */
  async traceRetrieval<T>(
    source: string,
    query: string,
    fn: () => Promise<T>,
    opts?: { extractResults?: (result: T) => { count: number; topScore?: number; chunkSizes?: number[] } },
  ): Promise<T> {
    const start = Date.now();
    try {
      const result = await fn();
      const durationMs = Date.now() - start;
      const extracted = opts?.extractResults?.(result) ?? { count: 0 };

      this.emit({
        type: 'rag_retrieval',
        source,
        query: query.slice(0, 500),
        resultCount: extracted.count,
        topScore: extracted.topScore,
        durationMs,
        chunkSizes: extracted.chunkSizes,
        totalChunkTokens: extracted.chunkSizes?.reduce((a, b) => a + b, 0),
      });

      // Auto-record latency
      this.recordLatency('api_call', durationMs, { model: source });

      return result;
    } catch (err: any) {
      this.emit({
        type: 'custom',
        provider: this.provider,
        eventName: 'rag_retrieval_error',
        data: { source, query: query.slice(0, 500), error: err?.message },
        durationMs: Date.now() - start,
        isError: true,
        errorMessage: err?.message,
      });
      throw err;
    }
  }

  /** Record an embedding generation */
  async traceEmbedding<T>(
    source: string,
    model: string,
    inputTokens: number,
    fn: () => Promise<T>,
    opts?: { dimensions?: number; batchSize?: number },
  ): Promise<T> {
    const start = Date.now();
    const result = await fn();
    this.emit({
      type: 'rag_embedding',
      source,
      model,
      inputTokens,
      durationMs: Date.now() - start,
      dimensions: opts?.dimensions,
      batchSize: opts?.batchSize,
    });
    return result;
  }

  /** Record a document indexing operation */
  async traceIndex<T>(
    source: string,
    documentCount: number,
    totalTokens: number,
    fn: () => Promise<T>,
    metadata?: Record<string, unknown>,
  ): Promise<T> {
    const start = Date.now();
    const result = await fn();
    this.emit({
      type: 'rag_index',
      source,
      documentCount,
      totalTokens,
      durationMs: Date.now() - start,
      metadata,
    });
    return result;
  }

  // ─── Generic Trace ──────────────────────────────────────────────────────

  /** Trace any async operation as a custom event */
  async trace<T>(
    eventName: string,
    data: Record<string, unknown>,
    fn: () => Promise<T>,
  ): Promise<T> {
    const start = Date.now();
    try {
      const result = await fn();
      this.emit({
        type: 'custom',
        provider: this.provider,
        eventName,
        data,
        durationMs: Date.now() - start,
        isError: false,
      });
      return result;
    } catch (err: any) {
      this.emit({
        type: 'custom',
        provider: this.provider,
        eventName,
        data: { ...data, error: err?.message },
        durationMs: Date.now() - start,
        isError: true,
        errorMessage: err?.message,
      });
      throw err;
    }
  }
}
