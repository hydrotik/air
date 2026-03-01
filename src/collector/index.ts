/**
 * AIr Collector — Pi Extension
 *
 * Hooks into pi's event system and streams telemetry to the RUM server.
 * Install: copy to ~/.pi/agent/extensions/ or .pi/extensions/
 *
 * Configuration via environment:
 *   AIR_URL=ws://localhost:5200/ws/collector (default)
 *   AIR_ENABLED=true (default)
 */

import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';
import WebSocket from 'ws';
import { randomBytes } from 'node:crypto';
import type {
  TelemetryEvent,
  ToolCallStartEvent,
  ToolCallEndEvent,
  TurnStartEvent,
  TurnEndEvent,
  AgentStartEvent,
  AgentEndEvent,
  TokenUsageEvent,
  ContextUsageEvent,
  ContextBreakdownEvent,
  CompactionEvent,
  ModelChangeEvent,
  SessionStartEvent,
  SessionEndEvent,
  HeartbeatEvent,
  ContextSegment,
} from '../shared/events';

function uid(): string {
  return randomBytes(8).toString('hex');
}

function estimateTokens(text: string): number {
  // Rough estimate: ~4 chars per token for English
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

export default function airCollector(pi: ExtensionAPI) {
  const url = process.env.AIR_URL ?? 'ws://localhost:5200/ws/collector';
  const enabled = process.env.AIR_ENABLED !== 'false';

  if (!enabled) return;

  let ws: WebSocket | null = null;
  let sessionId = uid();
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  const pendingToolStarts = new Map<string, number>(); // toolCallId → startTime

  // ─── WebSocket Connection ──────────────────────────────────────────────

  function connect() {
    try {
      ws = new WebSocket(url);
      ws.on('open', () => {
        console.log('[AIr] Connected to server');
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
      });
      ws.on('close', () => {
        ws = null;
        scheduleReconnect();
      });
      ws.on('error', () => {
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

  function send(event: TelemetryEvent) {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(event));
    }
  }

  // ─── Connect on load ──────────────────────────────────────────────────

  connect();

  // ─── Heartbeat with context usage ─────────────────────────────────────

  heartbeatTimer = setInterval(() => {
    const hb: HeartbeatEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'heartbeat',
    };
    send(hb);
  }, 10_000);

  // ─── Session Events ──────────────────────────────────────────────────

  pi.on('session_start', async (_event, ctx) => {
    sessionId = ctx.sessionManager.getSessionId?.() ?? uid();

    const model = ctx.model;
    const evt: SessionStartEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'session_start',
      cwd: ctx.cwd,
      model: model?.id ?? 'unknown',
      provider: model?.provider ?? 'unknown',
    };
    send(evt);
  });

  pi.on('session_shutdown', async () => {
    const evt: SessionEndEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'session_end',
    };
    send(evt);

    if (heartbeatTimer) clearInterval(heartbeatTimer);
    if (reconnectTimer) clearTimeout(reconnectTimer);

    // Give time for final message to send
    await new Promise((resolve) => setTimeout(resolve, 200));
    ws?.close();
  });

  // ─── Agent Events ────────────────────────────────────────────────────

  pi.on('agent_start', async (_event, ctx) => {
    const model = ctx.model;
    const evt: AgentStartEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'agent_start',
      model: model?.id ?? 'unknown',
      provider: model?.provider ?? 'unknown',
      thinkingLevel: 'off', // Will be set properly if available
    };
    send(evt);
  });

  pi.on('agent_end', async (event) => {
    const evt: AgentEndEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'agent_end',
      messageCount: event.messages?.length ?? 0,
    };
    send(evt);
  });

  // ─── Turn Events ────────────────────────────────────────────────────

  pi.on('turn_start', async (event) => {
    const evt: TurnStartEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'turn_start',
      turnIndex: event.turnIndex,
    };
    send(evt);
  });

  pi.on('turn_end', async (event, ctx) => {
    const turnEvt: TurnEndEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'turn_end',
      turnIndex: event.turnIndex,
      toolCallCount: event.toolResults?.length ?? 0,
    };
    send(turnEvt);

    // Extract token usage from the assistant message
    const msg = event.message;
    if (msg?.role === 'assistant' && msg.usage) {
      const u = msg.usage;
      const tokenEvt: TokenUsageEvent = {
        id: uid(),
        sessionId,
        timestamp: Date.now(),
        type: 'token_usage',
        input: u.input,
        output: u.output,
        cacheRead: u.cacheRead,
        cacheWrite: u.cacheWrite,
        totalTokens: u.totalTokens,
        cost: u.cost,
        model: msg.model ?? 'unknown',
        provider: msg.provider ?? 'unknown',
      };
      send(tokenEvt);
    }

    // Context usage snapshot
    const usage = ctx.getContextUsage?.();
    if (usage && usage.tokens != null) {
      const model = ctx.model;
      const contextWindow = (model as any)?.contextWindow ?? 200_000;
      const tokens = usage.tokens;
      const ctxEvt: ContextUsageEvent = {
        id: uid(),
        sessionId,
        timestamp: Date.now(),
        type: 'context_usage',
        tokensUsed: tokens,
        contextWindow,
        utilizationPct: (tokens / contextWindow) * 100,
      };
      send(ctxEvt);
    }

    // Context breakdown — analyze what's in the context window
    try {
      const entries = ctx.sessionManager.getBranch?.() ?? [];
      const segments: ContextSegment[] = [];

      let userChars = 0;
      let assistantChars = 0;
      let toolResultChars = 0;
      let compactionChars = 0;
      let customChars = 0;
      let thinkingChars = 0;

      for (const entry of entries) {
        if (entry.type !== 'message') continue;
        const m = entry.message;
        const text = contentToString((m as any).content);

        switch (m.role) {
          case 'user':
            userChars += text.length;
            break;
          case 'assistant':
            assistantChars += text.length;
            // Extract thinking content separately
            if (Array.isArray(m.content)) {
              for (const block of m.content) {
                if (block.type === 'thinking') {
                  thinkingChars += block.thinking.length;
                  assistantChars -= block.thinking.length;
                }
              }
            }
            break;
          case 'toolResult':
            toolResultChars += text.length;
            break;
          case 'compactionSummary':
            compactionChars += text.length;
            break;
          case 'custom':
            customChars += text.length;
            break;
        }
      }

      // System prompt estimate (CLAUDE.md + skills + system)
      const systemPrompt = ctx.getSystemPrompt?.() ?? '';
      const systemChars = systemPrompt.length;

      if (systemChars > 0) segments.push({ category: 'system_prompt', label: 'System Prompt + Context Files', estimatedTokens: estimateTokens(systemPrompt), charCount: systemChars });
      if (userChars > 0) segments.push({ category: 'user_messages', label: 'User Messages', estimatedTokens: estimateTokens('x'.repeat(userChars)), charCount: userChars });
      if (assistantChars > 0) segments.push({ category: 'assistant_messages', label: 'Assistant Messages', estimatedTokens: estimateTokens('x'.repeat(assistantChars)), charCount: assistantChars });
      if (toolResultChars > 0) segments.push({ category: 'tool_results', label: 'Tool Results', estimatedTokens: estimateTokens('x'.repeat(toolResultChars)), charCount: toolResultChars });
      if (thinkingChars > 0) segments.push({ category: 'thinking', label: 'Thinking Blocks', estimatedTokens: estimateTokens('x'.repeat(thinkingChars)), charCount: thinkingChars });
      if (compactionChars > 0) segments.push({ category: 'compaction_summary', label: 'Compaction Summaries', estimatedTokens: estimateTokens('x'.repeat(compactionChars)), charCount: compactionChars });
      if (customChars > 0) segments.push({ category: 'custom_messages', label: 'Extension Messages', estimatedTokens: estimateTokens('x'.repeat(customChars)), charCount: customChars });

      const totalTokens = segments.reduce((sum, s) => sum + s.estimatedTokens, 0);
      const model = ctx.model;
      const contextWindow = (model as any)?.contextWindow ?? 200_000;

      const bdEvt: ContextBreakdownEvent = {
        id: uid(),
        sessionId,
        timestamp: Date.now(),
        type: 'context_breakdown',
        segments,
        totalTokens,
        contextWindow,
      };
      send(bdEvt);
    } catch {
      // Context breakdown is best-effort
    }
  });

  // ─── Tool Events ────────────────────────────────────────────────────

  pi.on('tool_execution_start', async (event) => {
    const startTime = Date.now();
    pendingToolStarts.set(event.toolCallId, startTime);

    const inputStr = JSON.stringify(event.args ?? {});
    const evt: ToolCallStartEvent = {
      id: uid(),
      sessionId,
      timestamp: startTime,
      type: 'tool_call_start',
      toolName: event.toolName,
      toolCallId: event.toolCallId,
      inputSizeBytes: Buffer.byteLength(inputStr),
      inputPreview: inputStr.slice(0, 200),
    };
    send(evt);
  });

  pi.on('tool_execution_end', async (event) => {
    const startTime = pendingToolStarts.get(event.toolCallId) ?? Date.now();
    pendingToolStarts.delete(event.toolCallId);
    const endTime = Date.now();

    const outputStr = event.result
      ? JSON.stringify(event.result)
      : '';

    const evt: ToolCallEndEvent = {
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
    };
    send(evt);
  });

  // ─── Compaction Events ──────────────────────────────────────────────

  pi.on('session_compact', async (event) => {
    const entry = event.compactionEntry;
    const evt: CompactionEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'compaction',
      tokensBefore: entry?.tokensBefore ?? 0,
      tokensAfter: 0, // Not directly available
      summaryLength: entry?.summary?.length ?? 0,
      isAutomatic: !event.fromExtension,
    };
    send(evt);
  });

  // ─── Model Events ──────────────────────────────────────────────────

  pi.on('model_select', async (event) => {
    const evt: ModelChangeEvent = {
      id: uid(),
      sessionId,
      timestamp: Date.now(),
      type: 'model_change',
      previousModel: event.previousModel?.id,
      previousProvider: event.previousModel?.provider,
      newModel: event.model.id,
      newProvider: event.model.provider,
      source: event.source,
    };
    send(evt);
  });
}
