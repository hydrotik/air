import { createMcpTracer, instrumentMcp } from './mcp';
import { FakeWebSocket } from './__testing__/fake-ws';

jest.mock('ws', () => jest.requireActual('./__testing__/fake-ws').fakeWsModule);

function openSocket(): FakeWebSocket {
  const ws = FakeWebSocket.latest();
  ws.simulateOpen();
  return ws;
}

function makeClient() {
  return {
    name: 'client-name',
    callTool: jest.fn(async function (this: unknown, name: string, args: unknown) {
      return { name, args, self: this };
    }),
    readResource: jest.fn(async (uri: string) => ({ contents: [uri] })),
    getPrompt: jest.fn(async (name: string) => ({ messages: [name] })),
    listTools: jest.fn(async () => ({ tools: [] })),
    connect: jest.fn(async () => 'connected'),
  };
}

beforeEach(() => {
  FakeWebSocket.reset();
  jest.useFakeTimers({ now: 1_700_000_000_000 });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('instrumentMcp', () => {
  it('connects using the given client options', () => {
    instrumentMcp(makeClient(), 'srv', { url: 'ws://test/ws/collector' });
    expect(FakeWebSocket.latest().url).toBe('ws://test/ws/collector');
  });

  it('records callTool as tools/call with the tool name and args', async () => {
    const client = makeClient();
    const mcp = instrumentMcp(client, 'srv', { url: 'ws://t', sessionId: 'sess' });
    const ws = openSocket();

    const result = await mcp.callTool('search', { q: 'hi' });

    expect(client.callTool).toHaveBeenCalledWith('search', { q: 'hi' });
    // The original method runs with the real client as `this`
    expect(result.self).toBe(client);

    const [req, res, lat] = ws.messages();
    expect(req).toMatchObject({
      type: 'mcp_request',
      sessionId: 'sess',
      method: 'tools/call',
      toolName: 'search',
      serverName: 'srv',
      inputPreview: '["search",{"q":"hi"}]',
    });
    expect(req.resourceUri).toBeUndefined();
    expect(res).toMatchObject({ type: 'mcp_response', method: 'tools/call', isError: false });
    expect(lat).toMatchObject({ type: 'latency', model: 'srv' });
  });

  it('records readResource with the resource uri', async () => {
    const mcp = instrumentMcp(makeClient(), 'srv', { url: 'ws://t' });
    const ws = openSocket();
    await mcp.readResource('file:///a.txt');
    const [req] = ws.messages();
    expect(req).toMatchObject({ method: 'resources/read', resourceUri: 'file:///a.txt' });
    expect(req.toolName).toBeUndefined();
  });

  it.each([
    ['getPrompt', 'prompts/get'],
    ['listTools', 'tools/list'],
  ] as const)('maps %s to the %s MCP method', async (methodName, mcpMethod) => {
    const mcp = instrumentMcp(makeClient(), 'srv', { url: 'ws://t' });
    const ws = openSocket();
    await (mcp[methodName] as (...a: unknown[]) => Promise<unknown>)('x');
    expect(ws.messages()[0].method).toBe(mcpMethod);
  });

  it('passes through methods and properties it does not instrument', async () => {
    const client = makeClient();
    const mcp = instrumentMcp(client, 'srv', { url: 'ws://t' });
    const ws = openSocket();

    expect(mcp.name).toBe('client-name');
    expect(mcp.connect).toBe(client.connect);
    await mcp.connect();
    expect(ws.sent).toHaveLength(0);
  });

  it('only instruments the methods listed in options.methods', async () => {
    const client = makeClient();
    const mcp = instrumentMcp(client, 'srv', { url: 'ws://t', methods: ['readResource'] });
    const ws = openSocket();

    expect(mcp.callTool).toBe(client.callTool);
    await mcp.callTool('t', {});
    expect(ws.sent).toHaveLength(0);

    await mcp.readResource('u');
    expect(ws.messages()[0].method).toBe('resources/read');
  });

  it('leaves the original client unmodified', async () => {
    const client = makeClient();
    const original = client.callTool;
    instrumentMcp(client, 'srv', { url: 'ws://t' });
    expect(client.callTool).toBe(original);
  });

  it('records the error and rethrows when the wrapped call fails', async () => {
    const client = makeClient();
    client.callTool.mockRejectedValueOnce(new Error('denied'));
    const mcp = instrumentMcp(client, 'srv', { url: 'ws://t' });
    const ws = openSocket();

    await expect(mcp.callTool('t', {})).rejects.toThrow('denied');
    expect(ws.messages()[1]).toMatchObject({
      type: 'mcp_response',
      toolName: 't',
      isError: true,
      errorMessage: 'denied',
    });
  });

  // BUG (client.ts:381/391, reached through mcp.ts:82): a wrapped method that
  // resolves with no value (e.g. a notification-style call) makes traceMcp throw
  // a TypeError from Buffer.byteLength(undefined), so the instrumented client
  // rejects where the real client resolved.
  it.failing('resolves when the wrapped method resolves with undefined', async () => {
    const client = makeClient();
    client.listTools.mockResolvedValueOnce(undefined as never);
    const mcp = instrumentMcp(client, 'srv', { url: 'ws://t' });
    openSocket();
    await expect(mcp.listTools()).resolves.toBeUndefined();
  });
});

describe('createMcpTracer', () => {
  it('traces tool calls, resource reads and prompt gets', async () => {
    const tracer = createMcpTracer('srv', { url: 'ws://t' });
    const ws = openSocket();

    await tracer.traceToolCall('search', { q: 1 }, async () => 'a');
    await tracer.traceResourceRead('file:///x', async () => 'b');
    await tracer.tracePromptGet('greeting', async () => 'c');

    const requests = ws.messages().filter((m) => m.type === 'mcp_request');
    expect(requests).toEqual([
      expect.objectContaining({
        method: 'tools/call',
        toolName: 'search',
        inputPreview: '{"q":1}',
      }),
      expect.objectContaining({ method: 'resources/read', resourceUri: 'file:///x' }),
      // The prompt name is carried in the toolName field
      expect.objectContaining({ method: 'prompts/get', toolName: 'greeting' }),
    ]);
    expect(requests.every((r) => r.serverName === 'srv')).toBe(true);
  });

  it('emits raw events and closes the connection', () => {
    const tracer = createMcpTracer('srv', { url: 'ws://t', sessionId: 's' });
    const ws = openSocket();
    tracer.emit({ type: 'custom', eventName: 'hello' });
    expect(ws.messages()[0]).toMatchObject({ type: 'custom', eventName: 'hello', sessionId: 's' });

    tracer.close();
    expect(ws.close).toHaveBeenCalled();
  });
});
