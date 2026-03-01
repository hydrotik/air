/**
 * AIr MCP Instrumentation
 *
 * Wraps an MCP client to auto-instrument all tool calls, resource reads,
 * and prompt gets. Works with any MCP SDK client that has `callTool`,
 * `readResource`, and `getPrompt` methods.
 *
 * @example
 * ```ts
 * import { Client } from '@modelcontextprotocol/sdk/client';
 * import { instrumentMcp } from '@hydrotik/air/sdk';
 *
 * const client = new Client({ name: 'my-app', version: '1.0' });
 * const instrumented = instrumentMcp(client, 'my-mcp-server', { sessionId: 'abc' });
 *
 * // All calls are now auto-instrumented
 * const result = await instrumented.callTool('search', { query: 'hello' });
 * ```
 */

import { AirClient, type AirClientOptions } from './client';

export interface InstrumentMcpOptions extends AirClientOptions {
  /** Only instrument these methods (default: all) */
  methods?: ('callTool' | 'readResource' | 'getPrompt' | 'listTools' | 'listResources' | 'listPrompts')[];
}

/**
 * Wrap an MCP client to auto-instrument calls.
 *
 * Returns a proxy that intercepts method calls and emits telemetry events.
 * The original client is not modified.
 */
export function instrumentMcp<T extends Record<string, any>>(
  client: T,
  serverName: string,
  options?: InstrumentMcpOptions,
): T {
  const air = new AirClient({
    ...options,
    provider: `mcp:${serverName}`,
  });

  const methodsToInstrument = options?.methods ?? [
    'callTool',
    'readResource',
    'getPrompt',
    'listTools',
    'listResources',
    'listPrompts',
  ];

  const methodToMcpMethod: Record<string, string> = {
    callTool: 'tools/call',
    readResource: 'resources/read',
    getPrompt: 'prompts/get',
    listTools: 'tools/list',
    listResources: 'resources/list',
    listPrompts: 'prompts/list',
  };

  return new Proxy(client, {
    get(target, prop: string) {
      const original = target[prop];

      if (typeof original !== 'function' || !methodsToInstrument.includes(prop as any)) {
        return original;
      }

      return async function (...args: any[]) {
        const method = methodToMcpMethod[prop] ?? prop;
        const toolName = prop === 'callTool' ? args[0] : undefined;
        const resourceUri = prop === 'readResource' ? args[0] : undefined;

        return air.traceMcp(serverName, method, { toolName, resourceUri, input: args }, () =>
          original.apply(target, args),
        );
      };
    },
  });
}

/**
 * Create a standalone MCP telemetry emitter (no proxy wrapping).
 * Use this when you need manual control over event emission.
 */
export function createMcpTracer(serverName: string, options?: AirClientOptions) {
  const air = new AirClient({
    ...options,
    provider: `mcp:${serverName}`,
  });

  return {
    /** Trace a tool call */
    traceToolCall: <T>(toolName: string, args: any, fn: () => Promise<T>) =>
      air.traceMcp(serverName, 'tools/call', { toolName, input: args }, fn),

    /** Trace a resource read */
    traceResourceRead: <T>(uri: string, fn: () => Promise<T>) =>
      air.traceMcp(serverName, 'resources/read', { resourceUri: uri }, fn),

    /** Trace a prompt get */
    tracePromptGet: <T>(promptName: string, fn: () => Promise<T>) =>
      air.traceMcp(serverName, 'prompts/get', { toolName: promptName }, fn),

    /** Emit a raw event */
    emit: (event: Record<string, any> & { type: string }) => air.emit(event),

    /** Close the connection */
    close: () => air.close(),
  };
}
