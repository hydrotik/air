import { useEffect, useRef, useState, useCallback } from 'react';
import type { TelemetryEvent, SessionSummary, DashboardMessage } from '../../shared/events';

const MAX_EVENTS = 500;

export function useTelemetry() {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [redactionLevel, setRedactionLevel] = useState<string>('preview');
  const [providers, setProviders] = useState<{ rag: any[]; mcp: any[] }>({ rag: [], mcp: [] });
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const connect = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws/dashboard`);

    ws.onopen = () => {
      setConnected(true);
      console.log('[AIr] Dashboard connected');
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

  // ─── Fetch helpers ──────────────────────────────────────────────────────

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch('/api/sessions');
      const data = await res.json();
      setSessions(data);
    } catch {
      // server not ready
    }
  }, []);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      if (data.redactionLevel) setRedactionLevel(data.redactionLevel);
      if (data.providers) setProviders(data.providers);
    } catch {
      // try health endpoint as fallback
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        if (data.redactionLevel) setRedactionLevel(data.redactionLevel);
      } catch { /* ignore */ }
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

  const fetchMcpStats = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/mcp-stats`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchRagStats = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/rag-stats`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchProviderSummary = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/providers`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  // ─── New fetch functions ──────────────────────────────────────────────

  const fetchLatencyStats = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/latency`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchLatencyTimeseries = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/latency/timeseries`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchCostBreakdown = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/cost`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchCostTimeseries = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/cost/timeseries`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchEvalStats = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/evals`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchEvalTimeseries = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/evals/timeseries`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchPromptVariants = useCallback(async () => {
    try {
      const res = await fetch('/api/prompts');
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchDriftEvents = useCallback(async (sessionId?: string) => {
    try {
      const url = sessionId ? `/api/drift?session=${sessionId}` : '/api/drift';
      const res = await fetch(url);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchDriftSummary = useCallback(async (sessionId?: string) => {
    try {
      const url = sessionId ? `/api/drift/summary?session=${sessionId}` : '/api/drift/summary';
      const res = await fetch(url);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  // ─── Lifecycle ────────────────────────────────────────────────────────

  useEffect(() => {
    connect();
    fetchSessions();
    fetchConfig();
    const interval = setInterval(fetchSessions, 5000);
    return () => {
      clearInterval(interval);
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      wsRef.current?.close();
    };
  }, [connect, fetchSessions, fetchConfig]);

  return {
    events,
    sessions,
    connected,
    redactionLevel,
    providers,
    // Core fetches
    fetchSessionEvents,
    fetchToolStats,
    fetchToolCalls,
    fetchContextSnapshots,
    fetchLatestBreakdown,
    fetchMcpStats,
    fetchRagStats,
    fetchProviderSummary,
    refreshSessions: fetchSessions,
    // New fetches
    fetchLatencyStats,
    fetchLatencyTimeseries,
    fetchCostBreakdown,
    fetchCostTimeseries,
    fetchEvalStats,
    fetchEvalTimeseries,
    fetchPromptVariants,
    fetchDriftEvents,
    fetchDriftSummary,
  };
}
