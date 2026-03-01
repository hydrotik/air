/**
 * AI-RUM Collector — Pi Extension (Standalone)
 *
 * Hooks into pi's event system and streams telemetry to the RUM server.
 * Place in ~/.pi/agent/extensions/ (global) or .pi/extensions/ (project).
 *
 * Configuration via environment:
 *   AI_RUM_URL=ws://localhost:5200/ws/collector (default)
 *   AI_RUM_ENABLED=true (default)
 */

import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function contentToString(content: any): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((c: any) => {
        if (c.type === 'text') return c.text;
        if (c.type === 'image') return '[image]';
        if (c.type === 'thinking') return c.thinking;
        if (c.type === 'toolCall') return `[tool:${c.name}]`;
        return '';
      })
      .join('\n');
  }
  return JSON.stringify(content);
}

export default function aiRumCollector(pi: ExtensionAPI) {
  const url = process.env.AI_RUM_URL ?? 'ws://localhost:5200/ws/collector';
  const enabled = process.env.AI_RUM_ENABLED !== 'false';

  if (!enabled) return;

  let ws: any = null;
  let sessionId = uid();
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  const pendingToolStarts = new Map<string, number>();

  // Dynamic import for ws (works in pi's jiti runtime)
  let WebSocketImpl: any;
  try {
    WebSocketImpl = require('ws');
  } catch {
    // ws not available — try native WebSocket
    WebSocketImpl = (globalThis as any).WebSocket;
  }

  if (!WebSocketImpl) {
    console.log('[AI-RUM] WebSocket not available, collector disabled');
    return;
  }

  function connect() {
    try {
      ws = new WebSocketImpl(url);
      ws.on?.('open', () => console.log('[AI-RUM] Connected to server'));
      ws.on?.('close', () => { ws = null; scheduleReconnect(); });
      ws.on?.('error', () => { ws = null; scheduleReconnect(); });
      // For native WebSocket
      if (!ws.on) {
        ws.onopen = () => console.log('[AI-RUM] Connected to server');
        ws.onclose = () => { ws = null; scheduleReconnect(); };
        ws.onerror = () => { ws = null; scheduleReconnect(); };
      }
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

  function send(event: any) {
    if (ws?.readyState === 1) {
      ws.send(JSON.stringify(event));
    }
  }

  connect();

  heartbeatTimer = setInterval(() => {
    send({ id: uid(), sessionId, timestamp: Date.now(), type: 'heartbeat' });
  }, 10_000);

  // ─── Session Events ──────────────────────────────────────────────────

  pi.on('session_start', async (_event, ctx) => {
    sessionId = (ctx.sessionManager as any).getSessionId?.() ?? uid();
    const model = ctx.model;
    send({
      id: uid(), sessionId, timestamp: Date.now(), type: 'session_start',
      cwd: ctx.cwd, model: model?.id ?? 'unknown', provider: (model as any)?.provider ?? 'unknown',
    });
  });

  pi.on('session_shutdown', async () => {
    send({ id: uid(), sessionId, timestamp: Date.now(), type: 'session_end' });
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    if (reconnectTimer) clearTimeout(reconnectTimer);
    await new Promise((r) => setTimeout(r, 200));
    ws?.close?.();
  });

  // ─── Agent Events ────────────────────────────────────────────────────

  pi.on('agent_start', async (_event, ctx) => {
    const model = ctx.model;
    send({
      id: uid(), sessionId, timestamp: Date.now(), type: 'agent_start',
      model: model?.id ?? 'unknown', provider: (model as any)?.provider ?? 'unknown',
      thinkingLevel: 'off',
    });
  });

  pi.on('agent_end', async (event) => {
    send({
      id: uid(), sessionId, timestamp: Date.now(), type: 'agent_end',
      messageCount: event.messages?.length ?? 0,
    });
  });

  // ─── Turn Events ────────────────────────────────────────────────────

  pi.on('turn_start', async (event) => {
    send({ id: uid(), sessionId, timestamp: Date.now(), type: 'turn_start', turnIndex: event.turnIndex });
  });

  pi.on('turn_end', async (event, ctx) => {
    send({
      id: uid(), sessionId, timestamp: Date.now(), type: 'turn_end',
      turnIndex: event.turnIndex, toolCallCount: event.toolResults?.length ?? 0,
    });

    // Token usage from assistant message
    const msg = event.message;
    if (msg?.role === 'assistant' && msg.usage) {
      const u = msg.usage;
      send({
        id: uid(), sessionId, timestamp: Date.now(), type: 'token_usage',
        input: u.input, output: u.output, cacheRead: u.cacheRead, cacheWrite: u.cacheWrite,
        totalTokens: u.totalTokens, cost: u.cost,
        model: msg.model ?? 'unknown', provider: msg.provider ?? 'unknown',
      });
    }

    // Context usage
    const usage = ctx.getContextUsage?.();
    if (usage) {
      const contextWindow = (ctx.model as any)?.contextWindow ?? 200_000;
      send({
        id: uid(), sessionId, timestamp: Date.now(), type: 'context_usage',
        tokensUsed: usage.tokens, contextWindow,
        utilizationPct: (usage.tokens / contextWindow) * 100,
      });
    }

    // Context breakdown
    try {
      const entries = ctx.sessionManager.getBranch?.() ?? [];
      const charsByType: Record<string, number> = {};

      for (const entry of entries) {
        if (entry.type !== 'message') continue;
        const m = entry.message;
        const text = contentToString(m.content);

        switch (m.role) {
          case 'user': charsByType['user_messages'] = (charsByType['user_messages'] ?? 0) + text.length; break;
          case 'assistant': {
            let assistantChars = text.length;
            if (Array.isArray(m.content)) {
              for (const block of m.content) {
                if (block.type === 'thinking') {
                  charsByType['thinking'] = (charsByType['thinking'] ?? 0) + block.thinking.length;
                  assistantChars -= block.thinking.length;
                }
              }
            }
            charsByType['assistant_messages'] = (charsByType['assistant_messages'] ?? 0) + assistantChars;
            break;
          }
          case 'toolResult': charsByType['tool_results'] = (charsByType['tool_results'] ?? 0) + text.length; break;
          case 'compactionSummary': charsByType['compaction_summary'] = (charsByType['compaction_summary'] ?? 0) + text.length; break;
          case 'custom': charsByType['custom_messages'] = (charsByType['custom_messages'] ?? 0) + text.length; break;
        }
      }

      const systemPrompt = ctx.getSystemPrompt?.() ?? '';
      if (systemPrompt.length > 0) charsByType['system_prompt'] = systemPrompt.length;

      const labels: Record<string, string> = {
        system_prompt: 'System Prompt + Context Files',
        user_messages: 'User Messages',
        assistant_messages: 'Assistant Messages',
        tool_results: 'Tool Results',
        thinking: 'Thinking Blocks',
        compaction_summary: 'Compaction Summaries',
        custom_messages: 'Extension Messages',
      };

      const segments = Object.entries(charsByType)
        .filter(([, chars]) => chars > 0)
        .map(([category, chars]) => ({
          category, label: labels[category] ?? category,
          estimatedTokens: estimateTokens('x'.repeat(chars)), charCount: chars,
        }));

      const totalTokens = segments.reduce((sum, s) => sum + s.estimatedTokens, 0);
      const contextWindow = (ctx.model as any)?.contextWindow ?? 200_000;

      send({
        id: uid(), sessionId, timestamp: Date.now(), type: 'context_breakdown',
        segments, totalTokens, contextWindow,
      });
    } catch { /* best-effort */ }
  });

  // ─── Tool Events ────────────────────────────────────────────────────

  pi.on('tool_execution_start', async (event) => {
    pendingToolStarts.set(event.toolCallId, Date.now());
    const inputStr = JSON.stringify(event.args ?? {});
    send({
      id: uid(), sessionId, timestamp: Date.now(), type: 'tool_call_start',
      toolName: event.toolName, toolCallId: event.toolCallId,
      inputSizeBytes: inputStr.length, inputPreview: inputStr.slice(0, 200),
    });
  });

  pi.on('tool_execution_end', async (event) => {
    const startTime = pendingToolStarts.get(event.toolCallId) ?? Date.now();
    pendingToolStarts.delete(event.toolCallId);
    const endTime = Date.now();
    const outputStr = event.result ? JSON.stringify(event.result) : '';
    send({
      id: uid(), sessionId, timestamp: endTime, type: 'tool_call_end',
      toolName: event.toolName, toolCallId: event.toolCallId,
      durationMs: endTime - startTime, outputSizeBytes: outputStr.length,
      outputPreview: outputStr.slice(0, 200), isError: event.isError ?? false,
    });
  });

  // ─── Compaction Events ──────────────────────────────────────────────

  pi.on('session_compact', async (event) => {
    send({
      id: uid(), sessionId, timestamp: Date.now(), type: 'compaction',
      tokensBefore: event.compactionEntry?.tokensBefore ?? 0,
      tokensAfter: 0, summaryLength: event.compactionEntry?.summary?.length ?? 0,
      isAutomatic: !event.fromExtension,
    });
  });

  // ─── Model Events ──────────────────────────────────────────────────

  pi.on('model_select', async (event) => {
    send({
      id: uid(), sessionId, timestamp: Date.now(), type: 'model_change',
      previousModel: event.previousModel?.id, previousProvider: event.previousModel?.provider,
      newModel: event.model.id, newProvider: event.model.provider, source: event.source,
    });
  });
}
