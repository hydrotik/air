import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { WebSocket } from 'ws';
import { getDb, TelemetryStore } from '../db';
import type { TelemetryEvent, DashboardMessage } from '../shared/events';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function createServer(port = 5200) {
  const app = Fastify({ logger: false });
  const db = getDb();
  const store = new TelemetryStore(db);

  // Track connected dashboard clients for live broadcast
  const dashboardClients = new Set<WebSocket>();

  await app.register(cors, { origin: true });
  await app.register(websocket);

  // ─── Serve dashboard static files (production) ────────────────────────────
  const distPath = path.resolve(__dirname, '../../dist');
  try {
    await app.register(fastifyStatic, {
      root: distPath,
      prefix: '/',
      decorateReply: false,
    });
  } catch {
    // dist may not exist in dev — dashboard runs via Vite
  }

  // ─── Collector WebSocket (pi extension → server) ─────────────────────────
  app.register(async (fastify) => {
    fastify.get('/ws/collector', { websocket: true }, (socket) => {
      console.log('[AI-RUM] Collector connected');

      socket.on('message', (raw) => {
        try {
          const event: TelemetryEvent = JSON.parse(raw.toString());
          store.ingestEvent(event);

          // Broadcast to all dashboard clients
          const msg: DashboardMessage = { type: 'event', data: event };
          const payload = JSON.stringify(msg);
          for (const client of dashboardClients) {
            if (client.readyState === 1) {
              client.send(payload);
            }
          }
        } catch (err) {
          console.error('[AI-RUM] Failed to parse collector event:', err);
        }
      });

      socket.on('close', () => {
        console.log('[AI-RUM] Collector disconnected');
      });
    });
  });

  // ─── Dashboard WebSocket (server → dashboard live feed) ──────────────────
  app.register(async (fastify) => {
    fastify.get('/ws/dashboard', { websocket: true }, (socket) => {
      console.log('[AI-RUM] Dashboard client connected');
      dashboardClients.add(socket);

      socket.on('close', () => {
        dashboardClients.delete(socket);
        console.log('[AI-RUM] Dashboard client disconnected');
      });
    });
  });

  // ─── REST API ────────────────────────────────────────────────────────────
  app.get('/api/sessions', async (req) => {
    const limit = (req.query as any).limit ?? 50;
    return store.getSessions(Number(limit));
  });

  app.get('/api/sessions/:id', async (req) => {
    const { id } = req.params as { id: string };
    const session = store.getSession(id);
    if (!session) return { error: 'Session not found' };
    return session;
  });

  app.get('/api/sessions/:id/events', async (req) => {
    const { id } = req.params as { id: string };
    const limit = (req.query as any).limit;
    return limit
      ? store.getRecentEvents(id, Number(limit))
      : store.getEvents(id);
  });

  app.get('/api/sessions/:id/tool-calls', async (req) => {
    const { id } = req.params as { id: string };
    return store.getToolCalls(id);
  });

  app.get('/api/sessions/:id/tool-stats', async (req) => {
    const { id } = req.params as { id: string };
    return store.getToolStats(id);
  });

  app.get('/api/sessions/:id/context', async (req) => {
    const { id } = req.params as { id: string };
    return store.getContextSnapshots(id);
  });

  app.get('/api/sessions/:id/context/latest', async (req) => {
    const { id } = req.params as { id: string };
    return store.getLatestContextBreakdown(id) ?? { segments: [] };
  });

  app.get('/api/events/recent', async (req) => {
    const limit = (req.query as any).limit ?? 200;
    return store.getAllRecentEvents(Number(limit));
  });

  // Health check
  app.get('/api/health', async () => ({
    status: 'ok',
    uptime: process.uptime(),
    dashboardClients: dashboardClients.size,
  }));

  return { app, port };
}
