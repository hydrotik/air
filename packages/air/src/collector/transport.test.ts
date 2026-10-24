import { createTransport } from './transport';
import { FakeWebSocket } from '../sdk/__testing__/fake-ws';
import type { TelemetryEvent } from '../shared/events';

jest.mock('ws', () => jest.requireActual('../sdk/__testing__/fake-ws').fakeWsModule);

const URL = 'ws://localhost:5200/ws/collector';
const evt = (n: number, type = 'heartbeat') =>
  ({ id: `e${n}`, sessionId: 's', timestamp: n, type }) as TelemetryEvent;
const ids = (ws: FakeWebSocket) => ws.messages().map((m) => m.id as string);

beforeEach(() => {
  FakeWebSocket.reset();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('createTransport', () => {
  it('connects on open(), once', () => {
    const t = createTransport({ url: URL });
    expect(FakeWebSocket.instances).toHaveLength(0);
    t.open();
    t.open();
    expect(FakeWebSocket.instances).toHaveLength(1);
    expect(FakeWebSocket.latest().url).toBe(URL);
  });

  it('sends at once when open', () => {
    const t = createTransport({ url: URL });
    t.open();
    const ws = FakeWebSocket.latest();
    ws.simulateOpen();
    t.send(evt(1));
    expect(ids(ws)).toEqual(['e1']);
  });

  it('queues while closed, keeping the newest maxQueue, and flushes in order on open', () => {
    const t = createTransport({ url: URL, maxQueue: 2 });
    t.send(evt(1));
    t.send(evt(2));
    t.send(evt(3));
    t.open();
    const ws = FakeWebSocket.latest();
    ws.simulateOpen();
    expect(ids(ws)).toEqual(['e2', 'e3']);
  });

  it('drops an event sent with queue: false while closed', () => {
    const t = createTransport({ url: URL });
    t.send(evt(1), { queue: false });
    t.open();
    const ws = FakeWebSocket.latest();
    ws.simulateOpen();
    expect(ws.sent).toHaveLength(0);
    t.send(evt(2), { queue: false });
    expect(ids(ws)).toEqual(['e2']);
  });

  it('keeps an event the socket refused, and sends it after the next open', () => {
    const t = createTransport({ url: URL });
    t.open();
    const ws = FakeWebSocket.latest();
    ws.simulateOpen();
    const refuse = () => {
      throw new Error('socket gone');
    };
    jest.spyOn(ws, 'send').mockImplementationOnce(refuse).mockImplementationOnce(refuse);
    t.send(evt(1)); // refused, queued, and refused again by the flush that follows
    expect(ws.sent).toHaveLength(0);
    t.send(evt(2)); // behind e1 in the queue: order is kept
    expect(ids(ws)).toEqual(['e1', 'e2']);
  });

  it('sends the greeting first on every connection, outside the queue', () => {
    const t = createTransport({ url: URL, maxQueue: 1 });
    t.greet(evt(0, 'session_start'));
    t.send(evt(1));
    t.send(evt(2));
    t.open();
    const first = FakeWebSocket.latest();
    first.simulateOpen();
    expect(ids(first)).toEqual(['e0', 'e2']);

    first.simulateClose();
    jest.advanceTimersByTime(5000);
    const second = FakeWebSocket.latest();
    second.simulateOpen();
    expect(ids(second)).toEqual(['e0']);
  });

  it('sends a greeting at once when already open', () => {
    const t = createTransport({ url: URL });
    t.open();
    const ws = FakeWebSocket.latest();
    ws.simulateOpen();
    t.greet(evt(0, 'session_start'));
    expect(ids(ws)).toEqual(['e0']);
  });

  it('reconnects after reconnectMs, once when error and close both fire', () => {
    const t = createTransport({ url: URL, reconnectMs: 1000 });
    t.open();
    const ws = FakeWebSocket.latest();
    ws.simulateError();
    ws.simulateClose();
    jest.advanceTimersByTime(999);
    expect(FakeWebSocket.instances).toHaveLength(1);
    jest.advanceTimersByTime(1);
    expect(FakeWebSocket.instances).toHaveLength(2);
  });

  it('ignores a late close from a socket it already replaced', () => {
    const t = createTransport({ url: URL, reconnectMs: 1000 });
    t.open();
    const old = FakeWebSocket.latest();
    old.simulateError();
    jest.advanceTimersByTime(1000);
    const current = FakeWebSocket.latest();
    current.simulateOpen();
    old.simulateClose(); // schedules a reconnect, but must not forget the open socket
    t.send(evt(1));
    expect(ids(current)).toEqual(['e1']);
  });

  it('retries when the WebSocket constructor throws', () => {
    FakeWebSocket.throwOnConstruct = true;
    const t = createTransport({ url: URL });
    t.open();
    FakeWebSocket.throwOnConstruct = false;
    jest.advanceTimersByTime(5000);
    expect(FakeWebSocket.instances).toHaveLength(1);
  });

  it('close() closes the socket for good: no reconnect, nothing sent', () => {
    const t = createTransport({ url: URL });
    t.open();
    const ws = FakeWebSocket.latest();
    ws.simulateOpen();
    t.close();
    expect(ws.close).toHaveBeenCalledTimes(1);
    ws.simulateClose();
    jest.advanceTimersByTime(60_000);
    t.send(evt(1));
    t.greet(evt(2));
    t.open();
    expect(FakeWebSocket.instances).toHaveLength(1);
    expect(ws.sent).toHaveLength(0);
  });

  it('close() cancels a pending reconnect', () => {
    const t = createTransport({ url: URL });
    t.open();
    FakeWebSocket.latest().simulateClose();
    t.close();
    jest.advanceTimersByTime(60_000);
    expect(FakeWebSocket.instances).toHaveLength(1);
  });
});
