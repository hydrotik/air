/**
 * In-memory stand-in for the `ws` WebSocket client. Tests mock `ws` with this
 * so no socket is ever opened; each constructed instance is recorded and can
 * be driven through open / close / error by hand.
 */
import { EventEmitter } from 'node:events';

export class FakeWebSocket extends EventEmitter {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  /** Every instance constructed since the last reset, in order */
  static instances: FakeWebSocket[] = [];
  /** When true the constructor throws, like `new WebSocket('not a url')` */
  static throwOnConstruct = false;

  static reset(): void {
    FakeWebSocket.instances = [];
    FakeWebSocket.throwOnConstruct = false;
  }

  static latest(): FakeWebSocket {
    const ws = FakeWebSocket.instances[FakeWebSocket.instances.length - 1];
    if (!ws) throw new Error('no FakeWebSocket has been constructed');
    return ws;
  }

  readonly url: string;
  readyState = FakeWebSocket.CONNECTING;
  readonly sent: string[] = [];
  readonly close = jest.fn(() => {
    this.readyState = FakeWebSocket.CLOSED;
  });

  constructor(url: string) {
    super();
    if (FakeWebSocket.throwOnConstruct) throw new Error('invalid url');
    this.url = url;
    FakeWebSocket.instances.push(this);
  }

  send(data: string): void {
    this.sent.push(data);
  }

  /** Parsed JSON of everything sent on this socket */
  // oxlint-disable-next-line typescript/no-explicit-any -- JSON off the wire; tests read nested fields loosely
  messages(): Array<Record<string, any>> {
    return this.sent.map((s) => JSON.parse(s));
  }

  simulateOpen(): void {
    this.readyState = FakeWebSocket.OPEN;
    this.emit('open');
  }

  simulateClose(): void {
    this.readyState = FakeWebSocket.CLOSED;
    this.emit('close');
  }

  simulateError(): void {
    this.emit('error', new Error('connection refused'));
  }
}

/** Module shape for `jest.mock('ws', ...)` — the code under test uses the default import. */
export const fakeWsModule = { __esModule: true, default: FakeWebSocket };
