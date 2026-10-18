import { act, renderHook, waitFor } from '@testing-library/react';
import { useTelemetry } from './useTelemetry';
import { MockWebSocket, callsTo, installFetch } from '../__testing__/mockWebSocket';
import { makeEvent, makeSession } from '../__testing__/fixtures';

const realFetch = globalThis.fetch;
const realWebSocket = globalThis.WebSocket;

beforeEach(() => {
  MockWebSocket.instances = [];
  globalThis.WebSocket = MockWebSocket as unknown as typeof WebSocket;
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
  globalThis.fetch = realFetch;
  globalThis.WebSocket = realWebSocket;
});

const flush = () => act(async () => {});

type Fetcher = (id: string) => Promise<unknown>;

describe('useTelemetry — WebSocket', () => {
  beforeEach(() => {
    installFetch({ '/api/sessions': [], '/api/config': {} });
  });

  it('connects to the dashboard socket on the current host', async () => {
    renderHook(() => useTelemetry());
    await flush();
    expect(MockWebSocket.instances).toHaveLength(1);
    expect(MockWebSocket.latest().url).toBe('ws://localhost/ws/dashboard');
  });

  it('reports connected only once the socket opens', async () => {
    const { result } = renderHook(() => useTelemetry());
    await flush();
    expect(result.current.connected).toBe(false);
    act(() => MockWebSocket.latest().open());
    expect(result.current.connected).toBe(true);
  });

  it('appends events from "event" messages in arrival order', async () => {
    const { result } = renderHook(() => useTelemetry());
    await flush();
    const a = makeEvent('turn_start', { turnIndex: 1 });
    const b = makeEvent('turn_end', { turnIndex: 1, toolCallCount: 0 });
    act(() => {
      MockWebSocket.latest().send({ type: 'event', data: a });
      MockWebSocket.latest().send({ type: 'event', data: b });
    });
    expect(result.current.events.map((e) => e.id)).toEqual([a.id, b.id]);
  });

  it('ignores non-event messages and malformed JSON', async () => {
    const { result } = renderHook(() => useTelemetry());
    await flush();
    act(() => {
      MockWebSocket.latest().send({ type: 'snapshot', data: { sessionId: 's1' } });
      MockWebSocket.latest().send({ type: 'error', data: { message: 'nope' } });
      MockWebSocket.latest().send('{not json');
    });
    expect(result.current.events).toEqual([]);
  });

  it('keeps only the newest 500 events', async () => {
    const { result } = renderHook(() => useTelemetry());
    await flush();
    const events = Array.from({ length: 505 }, (_, i) => makeEvent('turn_start', { turnIndex: i }));
    act(() => {
      for (const e of events) MockWebSocket.latest().send({ type: 'event', data: e });
    });
    expect(result.current.events).toHaveLength(500);
    expect(result.current.events[0]!.id).toBe(events[5]!.id);
    expect(result.current.events[499]!.id).toBe(events[504]!.id);
  });

  it('marks disconnected on close and reconnects after 3s', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useTelemetry());
    await flush();
    const first = MockWebSocket.latest();
    act(() => first.open());
    act(() => first.close());
    expect(result.current.connected).toBe(false);

    act(() => jest.advanceTimersByTime(2_999));
    expect(MockWebSocket.instances).toHaveLength(1);
    act(() => jest.advanceTimersByTime(1));
    expect(MockWebSocket.instances).toHaveLength(2);

    act(() => MockWebSocket.latest().open());
    expect(result.current.connected).toBe(true);
  });

  it('closes the socket on error, which schedules a reconnect', async () => {
    jest.useFakeTimers();
    renderHook(() => useTelemetry());
    await flush();
    const ws = MockWebSocket.latest();
    act(() => ws.fail());
    expect(ws.close).toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(3_000));
    expect(MockWebSocket.instances).toHaveLength(2);
  });

  it('closes the socket on unmount', async () => {
    const { unmount } = renderHook(() => useTelemetry());
    await flush();
    const ws = MockWebSocket.latest();
    unmount();
    expect(ws.close).toHaveBeenCalled();
  });

  // Regression: closing the socket on unmount fired onclose, which scheduled a fresh
  // reconnect after the cleanup had already cleared the timer.
  it('does not reconnect after unmount', async () => {
    jest.useFakeTimers();
    const { unmount } = renderHook(() => useTelemetry());
    await flush();
    unmount();
    act(() => jest.advanceTimersByTime(10_000));
    expect(MockWebSocket.instances).toHaveLength(1);
  });
});

describe('useTelemetry — sessions and config', () => {
  it('loads sessions on mount and polls every 5s', async () => {
    jest.useFakeTimers();
    const fetchMock = installFetch({ '/api/sessions': [makeSession()], '/api/config': {} });
    const { result } = renderHook(() => useTelemetry());
    await flush();
    expect(result.current.sessions.map((s) => s.sessionId)).toEqual(['s1']);
    expect(callsTo(fetchMock, '/api/sessions')).toBe(1);

    await act(async () => {
      jest.advanceTimersByTime(10_000);
    });
    expect(callsTo(fetchMock, '/api/sessions')).toBe(3);
  });

  it('stops polling after unmount', async () => {
    jest.useFakeTimers();
    const fetchMock = installFetch({ '/api/sessions': [], '/api/config': {} });
    const { unmount } = renderHook(() => useTelemetry());
    await flush();
    unmount();
    jest.advanceTimersByTime(20_000);
    expect(callsTo(fetchMock, '/api/sessions')).toBe(1);
  });

  it('refreshSessions re-fetches on demand', async () => {
    const routes: Record<string, unknown> = { '/api/sessions': [], '/api/config': {} };
    installFetch(routes);
    const { result } = renderHook(() => useTelemetry());
    await flush();
    routes['/api/sessions'] = [makeSession({ sessionId: 'later' })];
    await act(() => result.current.refreshSessions());
    expect(result.current.sessions[0]!.sessionId).toBe('later');
  });

  it('keeps an empty session list while the server is down', async () => {
    installFetch({});
    const { result } = renderHook(() => useTelemetry());
    await flush();
    expect(result.current.sessions).toEqual([]);
    expect(result.current.redactionLevel).toBe('preview');
  });

  it('applies redaction level and providers from /api/config', async () => {
    const providers = { rag: [{ name: 'docs' }], mcp: [] };
    installFetch({ '/api/sessions': [], '/api/config': { redactionLevel: 'full', providers } });
    const { result } = renderHook(() => useTelemetry());
    await waitFor(() => expect(result.current.redactionLevel).toBe('full'));
    expect(result.current.providers).toEqual(providers);
  });

  it('falls back to /api/health when /api/config fails', async () => {
    const fetchMock = installFetch({
      '/api/sessions': [],
      '/api/health': { redactionLevel: 'none' },
    });
    const { result } = renderHook(() => useTelemetry());
    await waitFor(() => expect(result.current.redactionLevel).toBe('none'));
    expect(callsTo(fetchMock, '/api/health')).toBe(1);
    expect(result.current.providers).toEqual({ rag: [], mcp: [] });
  });
});

describe('useTelemetry — fetch helpers', () => {
  const helpers: [string, string][] = [
    ['fetchSessionEvents', '/api/sessions/abc/events'],
    ['fetchToolStats', '/api/sessions/abc/tool-stats'],
    ['fetchToolCalls', '/api/sessions/abc/tool-calls'],
    ['fetchContextSnapshots', '/api/sessions/abc/context'],
    ['fetchLatestBreakdown', '/api/sessions/abc/context/latest'],
    ['fetchMcpStats', '/api/sessions/abc/mcp-stats'],
    ['fetchRagStats', '/api/sessions/abc/rag-stats'],
    ['fetchProviderSummary', '/api/sessions/abc/providers'],
    ['fetchMcpTimeseries', '/api/sessions/abc/mcp-stats/timeseries'],
    ['fetchRagTimeseries', '/api/sessions/abc/rag-stats/timeseries'],
    ['fetchToolTimeseries', '/api/sessions/abc/tool-calls/timeseries'],
    ['fetchLatencyStats', '/api/sessions/abc/latency'],
    ['fetchLatencyTimeseries', '/api/sessions/abc/latency/timeseries'],
    ['fetchCostBreakdown', '/api/sessions/abc/cost'],
    ['fetchCostTimeseries', '/api/sessions/abc/cost/timeseries'],
    ['fetchEvalStats', '/api/sessions/abc/evals'],
    ['fetchEvalTimeseries', '/api/sessions/abc/evals/timeseries'],
    ['fetchDriftEvents', '/api/drift?session=abc'],
    ['fetchDriftSummary', '/api/drift/summary?session=abc'],
  ];

  it.each(helpers)('%s requests %s and returns its JSON', async (name, url) => {
    const payload = [{ marker: name }];
    installFetch({ '/api/sessions': [], '/api/config': {}, [url]: payload });
    const { result } = renderHook(() => useTelemetry());
    await flush();
    const fn = (result.current as unknown as Record<string, Fetcher>)[name]!;
    await expect(fn('abc')).resolves.toEqual(payload);
  });

  it.each(helpers.filter(([name]) => name !== 'fetchLatestBreakdown'))(
    '%s resolves to [] when the request fails',
    async (name) => {
      installFetch({ '/api/sessions': [], '/api/config': {} });
      const { result } = renderHook(() => useTelemetry());
      await flush();
      await expect(
        (result.current as unknown as Record<string, Fetcher>)[name]!('abc')
      ).resolves.toEqual([]);
    }
  );

  it('fetchLatestBreakdown resolves to an empty breakdown when the request fails', async () => {
    installFetch({ '/api/sessions': [], '/api/config': {} });
    const { result } = renderHook(() => useTelemetry());
    await flush();
    await expect(result.current.fetchLatestBreakdown('abc')).resolves.toEqual({ segments: [] });
  });

  it('drift helpers and prompts work without a session id', async () => {
    installFetch({
      '/api/sessions': [],
      '/api/config': {},
      '/api/drift': ['all-drift'],
      '/api/drift/summary': ['all-summary'],
      '/api/prompts': ['variant'],
    });
    const { result } = renderHook(() => useTelemetry());
    await flush();
    await expect(result.current.fetchDriftEvents()).resolves.toEqual(['all-drift']);
    await expect(result.current.fetchDriftSummary()).resolves.toEqual(['all-summary']);
    await expect(result.current.fetchPromptVariants()).resolves.toEqual(['variant']);
  });

  it('returns stable helper identities across renders', async () => {
    installFetch({ '/api/sessions': [], '/api/config': {} });
    const { result, rerender } = renderHook(() => useTelemetry());
    await flush();
    const before = result.current;
    rerender();
    expect(result.current.fetchCostBreakdown).toBe(before.fetchCostBreakdown);
    expect(result.current.fetchSessionEvents).toBe(before.fetchSessionEvents);
  });
});
