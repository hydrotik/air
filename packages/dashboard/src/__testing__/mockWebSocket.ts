/** Controllable WebSocket double. `close()` fires `onclose`, as a real socket eventually does. */
export class MockWebSocket {
  static instances: MockWebSocket[] = [];

  static latest(): MockWebSocket {
    const ws = MockWebSocket.instances[MockWebSocket.instances.length - 1];
    if (!ws) throw new Error('no WebSocket was constructed');
    return ws;
  }

  readonly url: string;
  onopen: ((e?: unknown) => void) | null = null;
  onmessage: ((e: { data: string }) => void) | null = null;
  onclose: ((e?: unknown) => void) | null = null;
  onerror: ((e?: unknown) => void) | null = null;
  closed = false;

  constructor(url: string) {
    this.url = url;
    MockWebSocket.instances.push(this);
  }

  close = jest.fn(() => {
    if (this.closed) return;
    this.closed = true;
    this.onclose?.({});
  });

  open(): void {
    this.onopen?.({});
  }

  send(payload: unknown): void {
    this.onmessage?.({ data: typeof payload === 'string' ? payload : JSON.stringify(payload) });
  }

  fail(): void {
    this.onerror?.({});
  }
}

export type FetchRoutes = Record<string, unknown>;

/**
 * Installs a fetch mock that answers JSON from `routes` by exact URL. Unknown URLs reject,
 * like a server that is not up yet.
 */
export function installFetch(routes: FetchRoutes): jest.Mock {
  const mock = jest.fn((url: string) => {
    if (!(url in routes)) return Promise.reject(new Error(`unrouted ${url}`));
    return Promise.resolve({ json: () => Promise.resolve(routes[url]) });
  });
  globalThis.fetch = mock as unknown as typeof fetch;
  return mock;
}

export function callsTo(fetchMock: jest.Mock, url: string): number {
  return fetchMock.mock.calls.filter(([u]) => u === url).length;
}
