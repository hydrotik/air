import { useEffect, useRef, useState, useCallback } from 'react';
import type { TelemetryEvent, SessionSummary, DashboardMessage } from '../../shared/events';

const MAX_EVENTS = 500;

export function useTelemetry() {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const connect = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws/dashboard`);

    ws.onopen = () => {
      setConnected(true);
      console.log('[AI-RUM Dashboard] Connected');
    };

    ws.onmessage = (e) => {
      try {
        const msg: DashboardMessage = JSON.parse(e.data);
        if (msg.type === 'event') {
          const event = msg.data as TelemetryEvent;
          setEvents((prev) => {
            const next = [...prev, event];
            return next.length > MAX_EVENTS ? next.slice(-MAX_EVENTS) : next;
          });
        }
      } catch {
        // ignore
      }
    };

    ws.onclose = () => {
      setConnected(false);
      wsRef.current = null;
      reconnectRef.current = setTimeout(connect, 3000);
    };

    ws.onerror = () => ws.close();
    wsRef.current = ws;
  }, []);

  // Fetch initial data
  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch('/api/sessions');
      const data = await res.json();
      setSessions(data);
    } catch {
      // server not ready
    }
  }, []);

  const fetchSessionEvents = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/events`);
      return (await res.json()) as TelemetryEvent[];
    } catch {
      return [];
    }
  }, []);

  const fetchToolStats = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/tool-stats`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchToolCalls = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/tool-calls`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchContextSnapshots = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/context`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchLatestBreakdown = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/context/latest`);
      return await res.json();
    } catch {
      return { segments: [] };
    }
  }, []);

  useEffect(() => {
    connect();
    fetchSessions();
    const interval = setInterval(fetchSessions, 5000);
    return () => {
      clearInterval(interval);
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      wsRef.current?.close();
    };
  }, [connect, fetchSessions]);

  return {
    events,
    sessions,
    connected,
    fetchSessionEvents,
    fetchToolStats,
    fetchToolCalls,
    fetchContextSnapshots,
    fetchLatestBreakdown,
    refreshSessions: fetchSessions,
  };
}
