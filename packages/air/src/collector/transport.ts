/**
 * The collector's connection to the AIr server: one WebSocket, reconnected every
 * `reconnectMs` while it is down, with a bounded queue for what is sent before it opens.
 *
 * Nothing here throws into pi: a server that is not running only means events wait in the queue
 * (the oldest dropped past `maxQueue`) until a connection opens.
 */
import WebSocket from 'ws';
import type { TelemetryEvent } from '../shared/events';

export interface TransportOptions {
  url: string;
  /** Delay before reconnecting after the socket drops. */
  reconnectMs?: number;
  /** Events kept while the socket is not open; the oldest go first. */
  maxQueue?: number;
}

export interface Transport {
  /** Opens the connection (once; later calls do nothing). */
  open(): void;
  /**
   * Sends now when the socket is open, else queues it; `queue: false` drops it instead (a
   * heartbeat says the session is alive now, and is no use later).
   */
  send(event: TelemetryEvent, options?: { queue?: boolean }): void;
  /**
   * The event sent first on every connection, before the queue (the session's `session_start`):
   * a full queue never pushes it out, and a restarted server learns the session again. The
   * server stores an event id once, so sending it again is harmless.
   */
  greet(event: TelemetryEvent): void;
  /** Closes the socket for good: no reconnect, nothing more is sent. */
  close(): void;
}

export function createTransport({
  url,
  reconnectMs = 5000,
  maxQueue = 200,
}: TransportOptions): Transport {
  let ws: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let opened = false;
  let closed = false;
  const queue: string[] = [];
  let greeting: string | null = null;

  function write(data: string): boolean {
    if (ws?.readyState !== WebSocket.OPEN) return false;
    try {
      ws.send(data);
      return true;
    } catch {
      return false;
    }
  }

  function flush() {
    for (let next = queue[0]; next !== undefined && write(next); next = queue[0]) queue.shift();
  }

  function scheduleReconnect() {
    if (closed || reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, reconnectMs);
  }

  function connect() {
    if (closed) return;
    try {
      const socket = new WebSocket(url);
      ws = socket;
      socket.on('open', () => {
        if (greeting) write(greeting);
        flush();
      });
      const drop = () => {
        if (ws === socket) ws = null;
        scheduleReconnect();
      };
      socket.on('close', drop);
      socket.on('error', drop);
    } catch {
      scheduleReconnect();
    }
  }

  return {
    open() {
      if (opened || closed) return;
      opened = true;
      connect();
    },
    send(event, { queue: keep = true } = {}) {
      if (closed) return;
      const data = JSON.stringify(event);
      if (queue.length === 0 && write(data)) return;
      if (!keep) return;
      queue.push(data);
      if (queue.length > maxQueue) queue.shift();
      flush();
    },
    greet(event) {
      if (closed) return;
      greeting = JSON.stringify(event);
      write(greeting);
    },
    close() {
      closed = true;
      queue.length = 0;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = null;
      ws?.close();
      ws = null;
    },
  };
}
