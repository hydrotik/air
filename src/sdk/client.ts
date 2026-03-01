/**
 * AIr Client SDK
 *
 * Lightweight client for emitting telemetry events to an AIr server.
 * Use this to instrument MCP servers, RAG pipelines, or any custom tool.
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
 * // Or emit raw events
 * air.emit({ type: 'custom', provider: 'my-tool', eventName: 'cache_hit', data: { key: 'abc' } });
 *
 * air.close();
 * ```
 */

import WebSocket from 'ws';

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
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
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

  constructor(options: AirClientOptions = {}) {
    this.url = options.url ?? process.env.AIR_URL ?? 'ws://localhost:5200/ws/collector';
    this.sessionId = options.sessionId ?? uid();
    this.provider = options.provider ?? 'custom';
    this.reconnect = options.reconnect ?? true;
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
      this.emit({
        type: 'mcp_response',
        method,
        toolName: opts.toolName,
        resourceUri: opts.resourceUri,
        serverName,
        durationMs: Date.now() - start,
        outputSizeBytes: Buffer.byteLength(outputStr),
        outputPreview: outputStr.slice(0, 200),
        isError: false,
      });
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
      const extracted = opts?.extractResults?.(result) ?? { count: 0 };
      this.emit({
        type: 'rag_retrieval',
        source,
        query: query.slice(0, 500),
        resultCount: extracted.count,
        topScore: extracted.topScore,
        durationMs: Date.now() - start,
        chunkSizes: extracted.chunkSizes,
        totalChunkTokens: extracted.chunkSizes?.reduce((a, b) => a + b, 0),
      });
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
