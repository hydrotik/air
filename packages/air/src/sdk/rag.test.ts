import { createRagTracer, createRagTracerFromProvider, createRagTracersFromConfig } from './rag';
import { loadConfig } from '../shared/config';
import { FakeWebSocket } from './__testing__/fake-ws';
import { defined } from './__testing__/defined';

jest.mock('ws', () => jest.requireActual('./__testing__/fake-ws').fakeWsModule);
jest.mock('../shared/config', () => ({ loadConfig: jest.fn(() => ({})) }));

const mockedLoadConfig = loadConfig as jest.MockedFunction<typeof loadConfig>;

function openSocket(): FakeWebSocket {
  const ws = FakeWebSocket.latest();
  ws.simulateOpen();
  return ws;
}

beforeEach(() => {
  FakeWebSocket.reset();
  mockedLoadConfig.mockReset().mockReturnValue({});
  jest.useFakeTimers({ now: 1_700_000_000_000 });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('createRagTracer', () => {
  it('records retrievals against its source', async () => {
    const rag = createRagTracer('pinecone', { url: 'ws://t', sessionId: 's' });
    const ws = openSocket();

    await rag.traceRetrieval('shoes', async () => ({ matches: [{ score: 0.8 }] }), {
      extractResults: (r) => ({ count: r.matches.length, topScore: r.matches[0]?.score }),
    });

    expect(ws.messages()[0]).toMatchObject({
      type: 'rag_retrieval',
      sessionId: 's',
      source: 'pinecone',
      query: 'shoes',
      resultCount: 1,
      topScore: 0.8,
    });
  });

  it('applies default embedding dimensions unless overridden per call', async () => {
    const rag = createRagTracer('src', { url: 'ws://t', defaultDimensions: 768 });
    const ws = openSocket();

    await rag.traceEmbedding('emb', 10, async () => null);
    await rag.traceEmbedding('emb', 10, async () => null, { dimensions: 1536, batchSize: 4 });

    const [a, b] = ws.messages();
    expect(a).toMatchObject({
      type: 'rag_embedding',
      source: 'src',
      model: 'emb',
      dimensions: 768,
    });
    expect(b).toMatchObject({ dimensions: 1536, batchSize: 4 });
  });

  it('falls back to the default embedding model, then "unknown", when no model is passed', async () => {
    const withDefault = createRagTracer('a', {
      url: 'ws://t',
      defaultEmbeddingModel: 'emb-default',
    });
    const ws1 = openSocket();
    await withDefault.traceEmbedding(undefined as unknown as string, 1, async () => null);
    expect(ws1.messages()[0]?.model).toBe('emb-default');

    const withoutDefault = createRagTracer('b', { url: 'ws://t' });
    const ws2 = openSocket();
    await withoutDefault.traceEmbedding(undefined as unknown as string, 1, async () => null);
    expect(ws2.messages()[0]?.model).toBe('unknown');
  });

  it('records indexing operations', async () => {
    const rag = createRagTracer('src', { url: 'ws://t' });
    const ws = openSocket();
    await rag.traceIndex(5, 900, async () => null, { batch: 'b1' });
    expect(ws.messages()[0]).toMatchObject({
      type: 'rag_index',
      source: 'src',
      documentCount: 5,
      totalTokens: 900,
      metadata: { batch: 'b1' },
    });
  });

  it('adds the source to generic traces and tags them with a rag: provider', async () => {
    const rag = createRagTracer('src', { url: 'ws://t', provider: 'ignored' });
    const ws = openSocket();
    await rag.trace('rerank', { k: 3 }, async () => null);
    expect(ws.messages()[0]).toMatchObject({
      type: 'custom',
      provider: 'rag:src',
      eventName: 'rerank',
      data: { source: 'src', k: 3 },
    });
  });

  it('emits raw events and closes', () => {
    const rag = createRagTracer('src', { url: 'ws://t' });
    const ws = openSocket();
    rag.emit({ type: 'custom', eventName: 'x' });
    expect(ws.messages()[0]?.eventName).toBe('x');
    rag.close();
    expect(ws.close).toHaveBeenCalled();
  });
});

describe('createRagTracersFromConfig', () => {
  it('returns an empty map when no RAG providers are configured', () => {
    expect(createRagTracersFromConfig({ url: 'ws://t' })).toEqual({});
    expect(FakeWebSocket.instances).toHaveLength(0);
  });

  it('creates one tracer per configured provider with its embedding defaults', async () => {
    mockedLoadConfig.mockReturnValue({
      providers: {
        rag: [
          { name: 'product-search', type: 'qdrant', embeddingModel: 'emb-3', dimensions: 1536 },
          { name: 'docs', type: 'pinecone' },
        ],
      },
    });

    const tracers = createRagTracersFromConfig({ url: 'ws://custom', sessionId: 's' });
    expect(Object.keys(tracers)).toEqual(['product-search', 'docs']);
    expect(FakeWebSocket.instances.map((w) => w.url)).toEqual(['ws://custom', 'ws://custom']);

    const productWs = defined(FakeWebSocket.instances[0], 'product-search socket');
    const docsWs = defined(FakeWebSocket.instances[1], 'docs socket');
    productWs.simulateOpen();
    docsWs.simulateOpen();

    await defined(tracers['product-search'], 'product-search tracer').traceEmbedding(
      undefined as unknown as string,
      5,
      async () => 1
    );
    await defined(tracers.docs, 'docs tracer').traceRetrieval('q', async () => 1);

    expect(productWs.messages()[0]).toMatchObject({
      source: 'product-search',
      model: 'emb-3',
      dimensions: 1536,
      sessionId: 's',
    });
    expect(docsWs.messages()[0]).toMatchObject({ type: 'rag_retrieval', source: 'docs' });
  });
});

describe('createRagTracerFromProvider', () => {
  it('builds a tracer from a provider config object', async () => {
    const rag = createRagTracerFromProvider(
      { name: 'kb', type: 'chroma', embeddingModel: 'emb-x', dimensions: 384 },
      { url: 'ws://t' }
    );
    const ws = openSocket();
    await rag.traceEmbedding(undefined as unknown as string, 2, async () => null);
    expect(ws.messages()[0]).toMatchObject({ source: 'kb', model: 'emb-x', dimensions: 384 });
    expect(mockedLoadConfig).not.toHaveBeenCalled();
  });
});
