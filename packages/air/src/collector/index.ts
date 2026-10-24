/**
 * AIr collector for pi: maps pi's extension events to AIr telemetry.
 *
 * Install with `pi install npm:@hydrotik/air` (see src/collectors/pi/README.md); pi loads the
 * built copy, dist/collectors/pi/index.js. Configuration is read from the environment
 * (./config.ts).
 *
 * Loading the extension only registers handlers. A session starts the rest (`session_start`):
 * the server if it is down (./server.ts), the connection (./transport.ts) and the heartbeat;
 * `session_shutdown` stops them. pi loads a fresh copy of the extension for every session.
 */
import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';
import { randomBytes } from 'node:crypto';

import { computeCost, type BaseEvent, type TelemetryEvent } from '../shared/events';
import { resolveConfig } from './config';
import { DEFAULT_CONTEXT_WINDOW, buildContextBreakdown, type FileRead } from './context';
import { ensureServer, launchCandidates } from './server';
import { createTransport } from './transport';

const HEARTBEAT_MS = 10_000;
/** Time given to the last events (`session_end`) before the socket closes. */
const SHUTDOWN_GRACE_MS = 200;

function uid(): string {
  return randomBytes(8).toString('hex');
}

type EventType = TelemetryEvent['type'];
/** An event's own fields: everything but the envelope (`id`, `sessionId`, `timestamp`, `type`). */
type Payload<K extends EventType> = Omit<
  Extract<TelemetryEvent, { type: K }>,
  keyof BaseEvent | 'type'
>;

/** The model fields every event that names a model carries. */
function modelInfo(model: { id?: string; provider?: string } | undefined) {
  return { model: model?.id ?? 'unknown', provider: model?.provider ?? 'unknown' };
}

function contextWindowOf(model: unknown): number {
  return (model as { contextWindow?: number } | undefined)?.contextWindow ?? DEFAULT_CONTEXT_WINDOW;
}

export default function airCollector(pi: ExtensionAPI) {
  const config = resolveConfig(process.env, (message) => console.warn(`[AIr] ${message}`));
  if (!config.enabled) return;

  const transport = createTransport({ url: config.url });
  let sessionId: string | null = null;
  let stopped = false;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  // Per-session state
  const pendingToolStarts = new Map<string, number>(); // toolCallId → start time
  const turnStartTimes = new Map<number, number>(); // turnIndex → start time
  const fileReads = new Map<string, FileRead>(); // toolCallId → the file a `read` returned
  let cumulativeCost = 0;
  let turnToolErrors = 0;

  function event<K extends EventType>(
    type: K,
    payload: Payload<K>,
    timestamp = Date.now()
  ): TelemetryEvent | null {
    if (!sessionId) return null;
    return { id: uid(), sessionId, timestamp, type, ...payload } as unknown as TelemetryEvent;
  }

  /** Sends an event for the current session; nothing before `session_start` or after shutdown. */
  function emit<K extends EventType>(type: K, payload: Payload<K>, timestamp?: number) {
    const evt = event(type, payload, timestamp);
    if (evt && !stopped) transport.send(evt);
  }

  // ─── Session lifecycle ───────────────────────────────────────────────

  pi.on('session_start', (_event, ctx) => {
    if (stopped || sessionId) return;
    sessionId = ctx.sessionManager.getSessionId?.() ?? uid();
    const start = event('session_start', { cwd: ctx.cwd, ...modelInfo(ctx.model), agent: 'pi' });
    if (start) transport.greet(start);

    heartbeatTimer = setInterval(() => {
      const beat = event('heartbeat', {});
      if (beat && !stopped) transport.send(beat, { queue: false });
    }, HEARTBEAT_MS);

    // Not awaited: starting the server can take seconds, and pi should not wait for it.
    void (async () => {
      if (config.autoStart) {
        await ensureServer({
          port: config.port,
          candidates: launchCandidates(ctx.cwd, config.port, __dirname),
          cancelled: () => stopped,
        });
      }
      if (!stopped) transport.open();
    })();
  });

  pi.on('session_shutdown', async () => {
    emit('session_end', {});
    stopped = true;
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    heartbeatTimer = null;
    await new Promise((resolve) => setTimeout(resolve, SHUTDOWN_GRACE_MS));
    transport.close();
  });

  // ─── Agent events ────────────────────────────────────────────────────

  pi.on('agent_start', (_event, ctx) => {
    emit('agent_start', { ...modelInfo(ctx.model), thinkingLevel: 'off' });
  });

  pi.on('agent_end', (evt) => {
    emit('agent_end', { messageCount: evt.messages?.length ?? 0 });
  });

  // ─── Turn events ─────────────────────────────────────────────────────

  pi.on('turn_start', (evt) => {
    turnStartTimes.set(evt.turnIndex, Date.now());
    turnToolErrors = 0;
    emit('turn_start', { turnIndex: evt.turnIndex });
  });

  pi.on('turn_end', (evt, ctx) => {
    const toolCount = evt.toolResults?.length ?? 0;
    emit('turn_end', { turnIndex: evt.turnIndex, toolCallCount: toolCount });

    const turnStart = turnStartTimes.get(evt.turnIndex);
    turnStartTimes.delete(evt.turnIndex);
    if (turnStart) {
      emit('latency', {
        operation: 'turn',
        totalMs: Date.now() - turnStart,
        model: ctx.model?.id,
        provider: ctx.model?.provider,
      });
    }

    const msg = evt.message;
    if (msg?.role === 'assistant' && msg.usage) {
      const u = msg.usage;
      const usage = {
        input: u.input ?? 0,
        output: u.output ?? 0,
        cacheRead: u.cacheRead ?? 0,
        cacheWrite: u.cacheWrite ?? 0,
        totalTokens: u.totalTokens ?? 0,
      };
      const reported = u.cost ?? { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 };
      const model = { model: msg.model ?? 'unknown', provider: msg.provider ?? 'unknown' };
      emit('token_usage', { ...usage, cost: reported, ...model });

      // The provider's cost when it reports one, else the pricing table's
      const cost =
        reported.total > 0
          ? reported
          : computeCost(model.model, usage.input, usage.output, usage.cacheRead, usage.cacheWrite);
      if (cost && cost.total > 0) {
        cumulativeCost += cost.total;
        emit('cost', {
          ...model,
          inputCost: cost.input,
          outputCost: cost.output,
          cacheReadCost: cost.cacheRead,
          cacheWriteCost: cost.cacheWrite,
          totalCost: cost.total,
          cumulativeCost,
          currency: 'USD',
        });
      }

      emit('output_eval', {
        turnIndex: evt.turnIndex,
        ...model,
        metrics: {
          responseTokens: usage.output,
          toolCallCount: toolCount,
          toolErrorCount: turnToolErrors,
          toolSuccessRate: toolCount > 0 ? (toolCount - turnToolErrors) / toolCount : 1,
          hadRetry: false,
          hadImmediateFollowUp: false,
          responseLatencyMs: turnStart ? Date.now() - turnStart : 0,
          cacheHitRate: usage.totalTokens > 0 ? usage.cacheRead / usage.totalTokens : 0,
        },
      });
    }

    // Read once: context_usage and context_breakdown share them.
    const contextUsage = ctx.getContextUsage?.();
    const contextWindow = contextWindowOf(ctx.model);
    const tokens = contextUsage?.tokens;
    if (tokens != null) {
      emit('context_usage', {
        tokensUsed: tokens,
        contextWindow,
        utilizationPct: (tokens / contextWindow) * 100,
      });
    }

    try {
      const breakdown = buildContextBreakdown({
        entries: ctx.sessionManager.getBranch?.() ?? [],
        systemPrompt: ctx.getSystemPrompt?.() ?? '',
        fileReads: fileReads.values(),
        realTokens: tokens ?? 0,
      });
      emit('context_breakdown', { ...breakdown, contextWindow });
    } catch {
      // The breakdown is best-effort: never fail pi's turn over it
    }
  });

  // ─── Tool events ─────────────────────────────────────────────────────

  pi.on('tool_execution_start', (evt) => {
    const startTime = Date.now();
    pendingToolStarts.set(evt.toolCallId, startTime);
    const args = (evt.args ?? {}) as { path?: unknown };
    if (evt.toolName?.toLowerCase() === 'read' && typeof args.path === 'string') {
      fileReads.set(evt.toolCallId, { path: args.path, outputBytes: 0 });
    }
    const input = JSON.stringify(evt.args ?? {});
    emit(
      'tool_call_start',
      {
        toolName: evt.toolName,
        toolCallId: evt.toolCallId,
        inputSizeBytes: Buffer.byteLength(input),
        inputPreview: input.slice(0, 200),
      },
      startTime
    );
  });

  pi.on('tool_execution_end', (evt) => {
    const startTime = pendingToolStarts.get(evt.toolCallId) ?? Date.now();
    pendingToolStarts.delete(evt.toolCallId);
    const endTime = Date.now();
    if (evt.isError) turnToolErrors++;

    const output = evt.result ? JSON.stringify(evt.result) : '';
    const outputBytes = Buffer.byteLength(output);
    const read = fileReads.get(evt.toolCallId);
    if (read) read.outputBytes = outputBytes;

    emit(
      'tool_call_end',
      {
        toolName: evt.toolName,
        toolCallId: evt.toolCallId,
        durationMs: endTime - startTime,
        outputSizeBytes: outputBytes,
        outputPreview: output.slice(0, 200),
        isError: evt.isError ?? false,
      },
      endTime
    );
  });

  // ─── Compaction and model events ─────────────────────────────────────

  pi.on('session_compact', (evt) => {
    const entry = evt.compactionEntry;
    emit('compaction', {
      tokensBefore: entry?.tokensBefore ?? 0,
      tokensAfter: 0, // pi does not report it
      summaryLength: entry?.summary?.length ?? 0,
      isAutomatic: !evt.fromExtension,
    });
  });

  pi.on('model_select', (evt) => {
    emit('model_change', {
      previousModel: evt.previousModel?.id,
      previousProvider: evt.previousModel?.provider,
      newModel: evt.model.id,
      newProvider: evt.model.provider,
      source: evt.source,
    });
  });
}
