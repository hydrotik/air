/**
 * AIr Collector — Pi Extension
 *
 * Streams telemetry to the AIr server for real-time AI observability.
 * Hooks into pi's tool calls, turns, context usage, compaction, and model events.
 *
 * Requires: AIr server running on ws://localhost:5200
 * Start with: pnpm turbo run dev --filter=@hydrotik/air
 *
 * Config env vars:
 *   AIR_URL     — WebSocket endpoint (default: ws://localhost:5200/ws/collector)
 *   AIR_ENABLED — set to "false" to disable (default: true)
 */

import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';
import WebSocket from 'ws';

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

function estimateTokens(text: string): number {
  // ~4 chars per token for English
  return Math.ceil(text.length / 4);
}

function contentToString(content: any): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((c: any) => {
        if (c.type === 'text') return c.text ?? '';
        if (c.type === 'image') return '[image]';
        if (c.type === 'thinking') return c.thinking ?? '';
        if (c.type === 'toolCall') return `[tool:${c.name}]`;
        return '';
      })
      .join('\n');
  }
  return '';
}

export default function airCollector(pi: ExtensionAPI) {
  const url = process.env.AIR_URL ?? 'ws://localhost:5200/ws/collector';
  const enabled = process.env.AIR_ENABLED !== 'false';
  if (!enabled) return;

  let ws: WebSocket | null = null;
  let sessionId = uid();
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  const pendingToolStarts = new Map<string, number>();

  // ─── Connection Management ───────────────────────────────────────────

  let pendingSessionStart: Record<string, any> | null = null;

  function connect() {
    try {
      ws = new WebSocket(url);
      ws.on('open', () => {
        // If we have a pending session_start (from before WS connected), send it now
        if (pendingSessionStart) {
          send(pendingSessionStart);
          pendingSessionStart = null;
        }
      });
      ws.on('close', () => {
        ws = null;
        scheduleReconnect();
      });
      ws.on('error', () => {
        // Server not running — that's fine, reconnect silently
        ws = null;
        scheduleReconnect();
      });
    } catch {
      scheduleReconnect();
    }
  }

  function scheduleReconnect() {
    if (reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, 5000);
  }

  function send(event: Record<string, any>) {
    if (ws?.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify(event));
      } catch {
        // Drop silently — don't disrupt pi
      }
    }
  }

  connect();

  // Heartbeat every 10s
  heartbeatTimer = setInterval(() => {
    send({ id: uid(), sessionId, timestamp: Date.now(), type: 'heartbeat' });
  }, 10_000);

  // ─── Session Events ──────────────────────────────────────────────────

  pi.on('session_start', async (_event, ctx) => {
    sessionId = (ctx.sessionManager as any).getSessionId?.() ?? uid();
    const model = ctx.model;
    const startEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'session_start',
      cwd: ctx.cwd,
      model: model?.id ?? 'unknown',
      provider: (model as any)?.provider ?? 'unknown',
    };
    if (ws?.readyState === WebSocket.OPEN) {
      send(startEvent);
    } else {
      // WS not ready yet — queue it for when connection opens
      pendingSessionStart = startEvent;
    }
  });

  pi.on('session_shutdown', async () => {
    send({ id: uid(), sessionId, timestamp: Date.now(), type: 'session_end' });
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    if (reconnectTimer) clearTimeout(reconnectTimer);
    await new Promise((r) => setTimeout(r, 200));
    ws?.close();
  });

  // ─── Agent Events ────────────────────────────────────────────────────

  pi.on('agent_start', async (_event, ctx) => {
    const model = ctx.model;
    send({
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'agent_start',
      model: model?.id ?? 'unknown',
      provider: (model as any)?.provider ?? 'unknown',
      thinkingLevel: 'off',
    });
  });

  pi.on('agent_end', async (event) => {
    send({
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'agent_end',
      messageCount: event.messages?.length ?? 0,
    });
  });

  // ─── Turn Events ────────────────────────────────────────────────────

  pi.on('turn_start', async (event) => {
    send({
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'turn_start',
      turnIndex: event.turnIndex,
    });
  });

  pi.on('turn_end', async (event, ctx) => {
    send({
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'turn_end',
      turnIndex: event.turnIndex,
      toolCallCount: event.toolResults?.length ?? 0,
    });

    // ── Token Usage from assistant message ──
    const msg = event.message;
    if (msg?.role === 'assistant' && (msg as any).usage) {
      const u = (msg as any).usage;
      send({
        id: uid(),
        sessionId,
        timestamp: Date.now(),
        type: 'token_usage',
        input: u.input ?? 0,
        output: u.output ?? 0,
        cacheRead: u.cacheRead ?? 0,
        cacheWrite: u.cacheWrite ?? 0,
        totalTokens: u.totalTokens ?? 0,
        cost: u.cost ?? { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
        model: (msg as any).model ?? 'unknown',
        provider: (msg as any).provider ?? 'unknown',
      });
    }

    // ── Context Usage ──
    const usage = ctx.getContextUsage?.();
    if (usage && usage.tokens != null) {
      const model = ctx.model;
      const contextWindow = (model as any)?.contextWindow ?? 200_000;
      const tokens = usage.tokens;
      send({
        id: uid(),
        sessionId,
        timestamp: Date.now(),
        type: 'context_usage',
        tokensUsed: tokens,
        contextWindow,
        utilizationPct: (tokens / contextWindow) * 100,
      });
    }

    // ── Context Breakdown — analyze what fills the window ──
    try {
      const entries = ctx.sessionManager.getBranch?.() ?? [];

      const charsByCategory: Record<string, number> = {};

      for (const entry of entries) {
        if (entry.type !== 'message') continue;
        const m = (entry as any).message;
        if (!m) continue;
        const text = contentToString(m.content);

        switch (m.role) {
          case 'user':
            charsByCategory['user_messages'] = (charsByCategory['user_messages'] ?? 0) + text.length;
            break;
          case 'assistant': {
            let aChars = text.length;
            if (Array.isArray(m.content)) {
              for (const block of m.content) {
                if (block.type === 'thinking') {
                  const tLen = (block.thinking ?? '').length;
                  charsByCategory['thinking'] = (charsByCategory['thinking'] ?? 0) + tLen;
                  aChars -= tLen;
                }
              }
            }
            charsByCategory['assistant_messages'] = (charsByCategory['assistant_messages'] ?? 0) + Math.max(0, aChars);
            break;
          }
          case 'toolResult':
            charsByCategory['tool_results'] = (charsByCategory['tool_results'] ?? 0) + text.length;
            break;
          case 'compactionSummary':
            charsByCategory['compaction_summary'] = (charsByCategory['compaction_summary'] ?? 0) + text.length;
            break;
          case 'custom':
            charsByCategory['custom_messages'] = (charsByCategory['custom_messages'] ?? 0) + text.length;
            break;
        }
      }

      // System prompt — includes CLAUDE.md, skills, etc.
      const systemPrompt = ctx.getSystemPrompt?.() ?? '';
      if (systemPrompt.length > 0) {
        charsByCategory['system_prompt'] = systemPrompt.length;
      }

      const labels: Record<string, string> = {
        system_prompt: 'System Prompt + Context Files',
        user_messages: 'User Messages',
        assistant_messages: 'Assistant Messages',
        tool_results: 'Tool Results',
        thinking: 'Thinking Blocks',
        compaction_summary: 'Compaction Summaries',
        custom_messages: 'Extension Messages',
      };

      // Use real token count from getContextUsage() and distribute proportionally
      const realUsage = ctx.getContextUsage?.();
      const realTokens = realUsage?.tokens ?? 0;
      const model = ctx.model;
      const contextWindow = (model as any)?.contextWindow ?? 200_000;

      const totalChars = Object.values(charsByCategory).reduce((sum, c) => sum + c, 0);

      const segments = Object.entries(charsByCategory)
        .filter(([, chars]) => chars > 0)
        .map(([category, chars]) => ({
          category,
          label: labels[category] ?? category,
          // Distribute real tokens proportionally by char count
          estimatedTokens: totalChars > 0
            ? Math.round((chars / totalChars) * realTokens)
            : estimateTokens('x'.repeat(chars)),
          charCount: chars,
        }));

      const totalTokens = realTokens > 0 ? realTokens : segments.reduce((sum, s) => sum + s.estimatedTokens, 0);

      send({
        id: uid(),
        sessionId,
        timestamp: Date.now(),
        type: 'context_breakdown',
        segments,
        totalTokens,
        contextWindow,
      });
    } catch {
      // Context breakdown is best-effort — never disrupt pi
    }
  });

  // ─── Tool Events ────────────────────────────────────────────────────

  pi.on('tool_execution_start', async (event) => {
    const startTime = Date.now();
    pendingToolStarts.set(event.toolCallId, startTime);

    const inputStr = JSON.stringify(event.args ?? {});
    send({
      id: uid(),
      sessionId,
      timestamp: startTime,
      type: 'tool_call_start',
      toolName: event.toolName,
      toolCallId: event.toolCallId,
      inputSizeBytes: Buffer.byteLength(inputStr),
      inputPreview: inputStr.slice(0, 200),
    });
  });

  pi.on('tool_execution_end', async (event) => {
    const startTime = pendingToolStarts.get(event.toolCallId) ?? Date.now();
    pendingToolStarts.delete(event.toolCallId);
    const endTime = Date.now();

    const outputStr = event.result ? JSON.stringify(event.result) : '';
    send({
      id: uid(),
      sessionId,
      timestamp: endTime,
      type: 'tool_call_end',
      toolName: event.toolName,
      toolCallId: event.toolCallId,
      durationMs: endTime - startTime,
      outputSizeBytes: Buffer.byteLength(outputStr),
      outputPreview: outputStr.slice(0, 200),
      isError: event.isError ?? false,
    });
  });

  // ─── Compaction Events ──────────────────────────────────────────────

  pi.on('session_compact', async (event) => {
    const entry = (event as any).compactionEntry;
    send({
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'compaction',
      tokensBefore: entry?.tokensBefore ?? 0,
      tokensAfter: 0,
      summaryLength: entry?.summary?.length ?? 0,
      isAutomatic: !(event as any).fromExtension,
    });
  });

  // ─── Model Events ──────────────────────────────────────────────────

  pi.on('model_select', async (event) => {
    send({
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'model_change',
      previousModel: event.previousModel?.id,
      previousProvider: (event.previousModel as any)?.provider,
      newModel: event.model.id,
      newProvider: (event.model as any)?.provider,
      source: event.source,
    });
  });
}
