import { useEffect, useState, useCallback } from 'react';
import type { TelemetryEvent, SessionSummary, DashboardMessage } from '@hydrotik/air';
import type { McpProvider, RagProvider } from '../visualizations/ProviderRegistryPanel';

const MAX_EVENTS = 500;

export function useTelemetry() {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [redactionLevel, setRedactionLevel] = useState<string>('preview');
  const [providers, setProviders] = useState<{ rag: RagProvider[]; mcp: McpProvider[] }>({
    rag: [],
    mcp: [],
  });

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
      } catch {
        /* ignore */
      }
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

  // ─── Sparkline timeseries ──────────────────────────────────────────────

  const fetchMcpTimeseries = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/mcp-stats/timeseries`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchRagTimeseries = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/rag-stats/timeseries`);
      return await res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchToolTimeseries = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/tool-calls/timeseries`);
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
    // The socket, its reconnect timer and the disposed flag belong to this
    // effect run, so closing the socket on unmount cannot schedule a reconnect.
    let disposed = false;
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

    const connect = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const socket = new WebSocket(`${protocol}//${window.location.host}/ws/dashboard`);

      socket.onopen = () => {
        setConnected(true);
        console.log('[AIr] Dashboard connected');
      };

      socket.onmessage = (e) => {
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

      socket.onclose = () => {
        setConnected(false);
        ws = null;
        if (!disposed) reconnectTimer = setTimeout(connect, 3000);
      };

      socket.onerror = () => socket.close();
      ws = socket;
    };

    connect();
    // oxlint-disable-next-line react/set-state-in-effect -- async: sessions are set after the fetch resolves, not synchronously
    void fetchSessions();
    void fetchConfig();
    const interval = setInterval(fetchSessions, 5000);
    return () => {
      disposed = true;
      clearInterval(interval);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, [fetchSessions, fetchConfig]);

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
    // Sparkline timeseries
    fetchMcpTimeseries,
    fetchRagTimeseries,
    fetchToolTimeseries,
  };
}
