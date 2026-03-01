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

/**
 * Parse system prompt into sub-sections by detecting structural markers.
 * Pi's system prompt contains CLAUDE.md content, skills, tools, etc.
 */
function parseSystemPromptSources(prompt: string): Array<{ key: string; chars: number }> {
  const sources: Array<{ key: string; chars: number }> = [];
  let remaining = prompt.length;

  // CLAUDE.md content — usually after "## /path/to/CLAUDE.md" or "# Project Context"
  const claudeMdMatch = prompt.match(/## .*?CLAUDE\.md\n([\s\S]*?)(?=\n## |\n<available_skills>|$)/i);
  if (claudeMdMatch) {
    sources.push({ key: 'sp_claude_md', chars: claudeMdMatch[0].length });
    remaining -= claudeMdMatch[0].length;
  }

  // Skills section — between <available_skills> and </available_skills>
  const skillsMatch = prompt.match(/<available_skills>[\s\S]*?<\/available_skills>/);
  if (skillsMatch) {
    sources.push({ key: 'sp_skills', chars: skillsMatch[0].length });
    remaining -= skillsMatch[0].length;
  }

  // Tool definitions — "Available tools:" or "Here are the functions"
  const toolsMatch = prompt.match(/(?:Available tools:|Here are the (?:functions|tools)[^:]*:)[\s\S]*?(?=\n# |\nCurrent date|$)/i);
  if (toolsMatch) {
    sources.push({ key: 'sp_tools', chars: toolsMatch[0].length });
    remaining -= toolsMatch[0].length;
  }

  // Prompt templates
  const templatesMatch = prompt.match(/(?:prompt.templates|Prompt Templates?)[\s\S]*?(?=\n## |\n<|$)/i);
  if (templatesMatch) {
    sources.push({ key: 'sp_prompt_templates', chars: templatesMatch[0].length });
    remaining -= templatesMatch[0].length;
  }

  // Extensions info
  const extMatch = prompt.match(/(?:extensions?|custom tools)[\s\S]*?(?=\n## |\n<|$)/i);
  if (extMatch && extMatch[0].length < prompt.length * 0.5) {
    sources.push({ key: 'sp_extensions', chars: extMatch[0].length });
    remaining -= extMatch[0].length;
  }

  // Remaining = base prompt + anything we didn't match
  if (remaining > 0) {
    sources.push({ key: 'sp_base', chars: remaining });
  }

  return sources;
}

/**
 * Classify a file path into a context source category.
 */
function classifyFilePath(filePath: string): string {
  const p = filePath.toLowerCase();

  // GSD / planning
  if (p.includes('.get-shit-done') || p.includes('.gsd') || p.includes('.planning') || p.includes('gsd')) return 'tr_gsd';

  // Desloppify
  if (p.includes('.desloppify') || p.includes('desloppify')) return 'tr_desloppify';

  // Documentation
  if (p.includes('readme') || p.includes('.md') || p.includes('/docs/')) return 'tr_docs';

  // Config files
  if (p.includes('config') || p.includes('.json') || p.includes('.yaml') || p.includes('.yml') ||
      p.includes('tsconfig') || p.includes('package.json') || p.includes('.env')) return 'tr_config';

  // Test files
  if (p.includes('.test.') || p.includes('.spec.') || p.includes('__tests__')) return 'tr_tests';

  // Style files
  if (p.includes('.css') || p.includes('.scss') || p.includes('.css.ts')) return 'tr_styles';

  // Source code (catch-all for .ts, .tsx, .js, .jsx)
  if (p.match(/\.(tsx?|jsx?|py|rs|go)$/)) return 'tr_source_code';

  return 'tool_results_other';
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
  // Track file reads: toolCallId → { path, outputSize }
  const fileReads = new Map<string, { path: string; outputBytes: number }>();

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

      // System prompt — parse into sub-sections
      const systemPrompt = ctx.getSystemPrompt?.() ?? '';
      if (systemPrompt.length > 0) {
        // Parse the system prompt to identify constituent sources
        const sources = parseSystemPromptSources(systemPrompt);
        for (const src of sources) {
          charsByCategory[src.key] = src.chars;
        }
      }

      // Classify tool results by tracked file reads
      const toolResultByCategory: Record<string, number> = {};
      for (const [, fr] of fileReads) {
        const category = classifyFilePath(fr.path);
        toolResultByCategory[category] = (toolResultByCategory[category] ?? 0) + fr.outputBytes;
      }

      // If we have file-level breakdowns, split the tool_results blob
      if (Object.keys(toolResultByCategory).length > 0) {
        const classifiedChars = Object.values(toolResultByCategory).reduce((s, c) => s + c, 0);
        const totalToolChars = charsByCategory['tool_results'] ?? 0;
        // Scale classified bytes to match the total tool result chars (bytes ≠ chars but close)
        const scale = totalToolChars > 0 && classifiedChars > 0 ? totalToolChars / classifiedChars : 1;
        let accounted = 0;
        for (const [cat, bytes] of Object.entries(toolResultByCategory)) {
          const scaled = Math.round(bytes * scale);
          toolResultByCategory[cat] = scaled;
          accounted += scaled;
        }
        // Keep unclassified remainder (bash output, edit results, etc.)
        const remainder = totalToolChars - accounted;
        if (remainder > 100) {
          toolResultByCategory['tool_results_other'] = remainder;
        }
        delete charsByCategory['tool_results'];
        Object.assign(charsByCategory, toolResultByCategory);
      }

      const labels: Record<string, string> = {
        // System prompt sub-sections
        sp_base: 'Base System Prompt',
        sp_claude_md: 'CLAUDE.md',
        sp_skills: 'Skills',
        sp_tools: 'Tool Definitions',
        sp_prompt_templates: 'Prompt Templates',
        sp_extensions: 'Extensions',
        sp_other: 'Other Context Files',
        system_prompt: 'System Prompt',
        // Messages
        user_messages: 'User Messages',
        assistant_messages: 'Assistant Messages',
        tool_results: 'Tool Results',
        thinking: 'Thinking Blocks',
        compaction_summary: 'Compaction Summaries',
        custom_messages: 'Extension Messages',
        // File-level tool results
        tr_gsd: 'GSD Specs & Plans',
        tr_desloppify: 'Desloppify State',
        tr_source_code: 'Source Code',
        tr_config: 'Config Files',
        tr_docs: 'Documentation',
        tr_tests: 'Test Files',
        tr_styles: 'Stylesheets',
        tool_results_other: 'Other Tool Results',
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

    // Track file reads for context source breakdown
    const toolName = event.toolName?.toLowerCase() ?? '';
    if (toolName === 'read' && event.args?.path) {
      fileReads.set(event.toolCallId, { path: event.args.path, outputBytes: 0 });
    }

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
    const outputBytes = Buffer.byteLength(outputStr);

    // Update file read tracking with output size
    const fileRead = fileReads.get(event.toolCallId);
    if (fileRead) {
      fileRead.outputBytes = outputBytes;
    }

    send({
      id: uid(),
      sessionId,
      timestamp: endTime,
      type: 'tool_call_end',
      toolName: event.toolName,
      toolCallId: event.toolCallId,
      durationMs: endTime - startTime,
      outputSizeBytes: outputBytes,
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
