import type Database from 'better-sqlite3';
import type {
  TelemetryEvent,
  SessionSummary,
  ToolCallStartEvent,
  ToolCallEndEvent,
  TokenUsageEvent,
  ContextUsageEvent,
  ContextBreakdownEvent,
  SessionStartEvent,
  AgentStartEvent,
  LatencyEvent,
  CostEvent,
  OutputEvalEvent,
  PromptRatingEvent,
  DriftEvent,
} from '../shared/events';

export class TelemetryStore {
  private stmts: ReturnType<typeof this.prepareStatements>;

  constructor(private db: Database.Database) {
    this.stmts = this.prepareStatements();
  }

  /** Ensure a session row exists (for events that arrive without a session_start) */
  private ensureSession(sessionId: string, provider?: string): void {
    const existing = this.stmts.getSession.get(sessionId);
    if (!existing) {
      this.stmts.upsertSession.run(sessionId, Date.now(), Date.now(), null, null, provider ?? null, provider ?? 'sdk');
    }
  }

  private prepareStatements() {
    return {
      upsertSession: this.db.prepare(`
        INSERT INTO sessions (session_id, start_time, last_event, cwd, model, provider, agent)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(session_id) DO UPDATE SET last_event = excluded.last_event
      `),
      updateSessionModel: this.db.prepare(`
        UPDATE sessions SET model = ?, provider = ? WHERE session_id = ?
      `),
      insertEvent: this.db.prepare(`
        INSERT OR REPLACE INTO events (id, session_id, timestamp, type, data)
        VALUES (?, ?, ?, ?, ?)
      `),
      insertToolStart: this.db.prepare(`
        INSERT OR REPLACE INTO tool_calls (tool_call_id, session_id, tool_name, start_time, input_bytes)
        VALUES (?, ?, ?, ?, ?)
      `),
      updateToolEnd: this.db.prepare(`
        UPDATE tool_calls SET end_time = ?, duration_ms = ?, output_bytes = ?, is_error = ?
        WHERE tool_call_id = ?
      `),
      incrToolCalls: this.db.prepare(`
        UPDATE sessions SET tool_calls = tool_calls + 1 WHERE session_id = ?
      `),
      incrTurns: this.db.prepare(`
        UPDATE sessions SET turns = turns + 1 WHERE session_id = ?
      `),
      incrCompactions: this.db.prepare(`
        UPDATE sessions SET compactions = compactions + 1 WHERE session_id = ?
      `),
      addTokens: this.db.prepare(`
        UPDATE sessions SET total_in = total_in + ?, total_out = total_out + ?, total_cost = total_cost + ?
        WHERE session_id = ?
      `),
      updateContextPct: this.db.prepare(`
        UPDATE sessions SET context_pct = ? WHERE session_id = ?
      `),
      insertContextSnapshot: this.db.prepare(`
        INSERT INTO context_snapshots (session_id, timestamp, tokens_used, context_window, utilization, breakdown)
        VALUES (?, ?, ?, ?, ?, ?)
      `),

      // ─── Latency ───────────────────────────────────────────────────
      insertLatency: this.db.prepare(`
        INSERT INTO latency_snapshots (session_id, timestamp, operation, total_ms, ttft_ms, phases, model, provider)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `),

      // ─── Cost ─────────────────────────────────────────────────────
      insertCost: this.db.prepare(`
        INSERT INTO cost_snapshots (session_id, timestamp, model, provider, input_cost, output_cost,
          cache_read_cost, cache_write_cost, total_cost, cumulative_cost, budget_limit, budget_exceeded)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `),
      getSessionCumulativeCost: this.db.prepare(`
        SELECT COALESCE(MAX(cumulative_cost), 0) as cumulative FROM cost_snapshots WHERE session_id = ?
      `),

      // ─── Output Evaluation ────────────────────────────────────────
      insertOutputEval: this.db.prepare(`
        INSERT INTO output_evals (session_id, timestamp, turn_index, model, provider,
          response_tokens, tool_call_count, tool_error_count, tool_success_rate,
          had_retry, had_immediate_follow_up, response_latency_ms, cache_hit_rate,
          user_rating, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `),

      // ─── Prompt Rating ────────────────────────────────────────────
      insertPromptRating: this.db.prepare(`
        INSERT INTO prompt_ratings (session_id, timestamp, prompt_hash, variant, category,
          model, provider, goal_achieved, turns_to_complete, total_tokens, total_cost,
          total_latency_ms, tool_error_rate, required_compaction, rating, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `),

      // ─── Drift ────────────────────────────────────────────────────
      insertDrift: this.db.prepare(`
        INSERT INTO drift_events (session_id, timestamp, metric, model, provider,
          baseline, current_val, deviation_pct, direction, severity, window_size, threshold)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `),

      // ─── Queries ──────────────────────────────────────────────────
      getSessions: this.db.prepare(`
        SELECT * FROM sessions ORDER BY last_event DESC LIMIT ?
      `),
      getSession: this.db.prepare(`
        SELECT * FROM sessions WHERE session_id = ?
      `),
      getEvents: this.db.prepare(`
        SELECT * FROM events WHERE session_id = ? ORDER BY timestamp ASC
      `),
      getRecentEvents: this.db.prepare(`
        SELECT * FROM events WHERE session_id = ? ORDER BY timestamp DESC LIMIT ?
      `),
      getToolCalls: this.db.prepare(`
        SELECT * FROM tool_calls WHERE session_id = ? ORDER BY start_time ASC
      `),
      getToolStats: this.db.prepare(`
        SELECT tool_name, COUNT(*) as count, AVG(duration_ms) as avg_ms,
               MIN(duration_ms) as min_ms, MAX(duration_ms) as max_ms,
               SUM(CASE WHEN is_error = 1 THEN 1 ELSE 0 END) as errors
        FROM tool_calls WHERE session_id = ?
        GROUP BY tool_name ORDER BY count DESC
      `),
      getContextSnapshots: this.db.prepare(`
        SELECT * FROM context_snapshots WHERE session_id = ? ORDER BY timestamp ASC
      `),
      getLatestContextSnapshot: this.db.prepare(`
        SELECT * FROM context_snapshots WHERE session_id = ? ORDER BY timestamp DESC LIMIT 1
      `),
      getAllEvents: this.db.prepare(`
        SELECT * FROM events ORDER BY timestamp DESC LIMIT ?
      `),
    };
  }

  ingestEvent(event: TelemetryEvent): void {
    // Ensure session row exists before inserting event (FK constraint)
    if (event.type === 'session_start') {
      const e = event as SessionStartEvent;
      this.stmts.upsertSession.run(e.sessionId, e.timestamp, e.timestamp, e.cwd, e.model, e.provider, e.agent ?? 'pi');
    } else {
      // Auto-create session if we see events without a session_start
      this.stmts.upsertSession.run(event.sessionId, event.timestamp, event.timestamp, '', '', '', 'unknown');
    }

    // Store raw event
    this.stmts.insertEvent.run(event.id, event.sessionId, event.timestamp, event.type, JSON.stringify(event));

    switch (event.type) {
      case 'session_start':
        // Already handled above
        break;
      case 'agent_start': {
        const e = event as AgentStartEvent;
        this.stmts.updateSessionModel.run(e.model, e.provider, e.sessionId);
        break;
      }
      case 'tool_call_start': {
        const e = event as ToolCallStartEvent;
        this.stmts.insertToolStart.run(e.toolCallId, e.sessionId, e.toolName, e.timestamp, e.inputSizeBytes);
        break;
      }
      case 'tool_call_end': {
        const e = event as ToolCallEndEvent;
        this.stmts.updateToolEnd.run(e.timestamp, e.durationMs, e.outputSizeBytes, e.isError ? 1 : 0, e.toolCallId);
        this.stmts.incrToolCalls.run(e.sessionId);
        break;
      }
      case 'tool_call': {
        // Complete tool call in a single event (from HTTP ingest, e.g. MCP servers)
        const e = event as any;
        const startTime = e.timestamp - (e.durationMs ?? 0);
        this.stmts.insertToolStart.run(e.toolCallId, e.sessionId, e.toolName, startTime, e.inputTokens ?? 0);
        this.stmts.updateToolEnd.run(e.timestamp, e.durationMs ?? 0, e.outputTokens ?? 0, e.isError ? 1 : 0, e.toolCallId);
        this.stmts.incrToolCalls.run(e.sessionId);
        // Auto-create session if it doesn't exist (MCP servers don't send session_start)
        this.ensureSession(e.sessionId, e.provider ?? 'mcp');
        break;
      }
      case 'turn_end': {
        this.stmts.incrTurns.run(event.sessionId);
        break;
      }
      case 'token_usage': {
        const e = event as TokenUsageEvent;
        this.stmts.addTokens.run(e.input, e.output, e.cost.total, e.sessionId);
        break;
      }
      case 'context_usage': {
        const e = event as ContextUsageEvent;
        this.stmts.updateContextPct.run(e.utilizationPct, e.sessionId);
        this.stmts.insertContextSnapshot.run(e.sessionId, e.timestamp, e.tokensUsed, e.contextWindow, e.utilizationPct, null);
        break;
      }
      case 'context_breakdown': {
        const e = event as ContextBreakdownEvent;
        this.stmts.updateContextPct.run((e.totalTokens / e.contextWindow) * 100, e.sessionId);
        this.stmts.insertContextSnapshot.run(
          e.sessionId, e.timestamp, e.totalTokens, e.contextWindow,
          (e.totalTokens / e.contextWindow) * 100, JSON.stringify(e.segments),
        );
        break;
      }
      case 'compaction': {
        this.stmts.incrCompactions.run(event.sessionId);
        break;
      }

      // ─── New event types ────────────────────────────────────────────

      case 'latency': {
        const e = event as LatencyEvent;
        this.ensureSession(e.sessionId, e.provider ?? e.model);
        this.stmts.insertLatency.run(
          e.sessionId, e.timestamp, e.operation, e.totalMs, e.ttftMs ?? null,
          e.phases ? JSON.stringify(e.phases) : null, e.model ?? null, e.provider ?? null,
        );
        break;
      }

      case 'cost': {
        const e = event as CostEvent;
        this.stmts.insertCost.run(
          e.sessionId, e.timestamp, e.model, e.provider,
          e.inputCost, e.outputCost, e.cacheReadCost, e.cacheWriteCost,
          e.totalCost, e.cumulativeCost, e.budgetLimit ?? null, e.budgetExceeded ? 1 : 0,
        );
        // Also update session total cost
        this.stmts.addTokens.run(0, 0, e.totalCost, e.sessionId);
        break;
      }

      case 'output_eval': {
        const e = event as OutputEvalEvent;
        const m = e.metrics;
        this.stmts.insertOutputEval.run(
          e.sessionId, e.timestamp, e.turnIndex, e.model, e.provider,
          m.responseTokens, m.toolCallCount, m.toolErrorCount, m.toolSuccessRate,
          m.hadRetry ? 1 : 0, m.hadImmediateFollowUp ? 1 : 0,
          m.responseLatencyMs, m.cacheHitRate,
          e.userRating ?? null, e.tags ? JSON.stringify(e.tags) : null,
        );
        break;
      }

      case 'prompt_rating': {
        const e = event as PromptRatingEvent;
        const m = e.metrics;
        this.stmts.insertPromptRating.run(
          e.sessionId, e.timestamp, e.promptHash, e.variant, e.category,
          e.model, e.provider,
          m.goalAchieved ? 1 : 0, m.turnsToComplete, m.totalTokens, m.totalCost,
          m.totalLatencyMs, m.toolErrorRate, m.requiredCompaction ? 1 : 0,
          e.rating ?? null, e.notes ?? null,
        );
        break;
      }

      case 'drift': {
        const e = event as DriftEvent;
        this.stmts.insertDrift.run(
          e.sessionId, e.timestamp, e.metric, e.model, e.provider,
          e.baseline, e.current, e.deviationPct, e.direction, e.severity,
          e.windowSize, e.threshold,
        );
        break;
      }

      default:
        break;
    }
  }

  // ─── Session Queries ─────────────────────────────────────────────────

  getSessions(limit = 50): SessionSummary[] {
    const rows = this.stmts.getSessions.all(limit) as any[];
    return rows.map(this.rowToSummary);
  }

  getSession(sessionId: string): SessionSummary | null {
    const row = this.stmts.getSession.get(sessionId) as any;
    return row ? this.rowToSummary(row) : null;
  }

  getEvents(sessionId: string): TelemetryEvent[] {
    const rows = this.stmts.getEvents.all(sessionId) as any[];
    return rows.map((r) => JSON.parse(r.data));
  }

  getRecentEvents(sessionId: string, limit = 100): TelemetryEvent[] {
    const rows = this.stmts.getRecentEvents.all(sessionId, limit) as any[];
    return rows.map((r) => JSON.parse(r.data)).reverse();
  }

  getToolCalls(sessionId: string) {
    return this.stmts.getToolCalls.all(sessionId);
  }

  getToolStats(sessionId: string) {
    return this.stmts.getToolStats.all(sessionId);
  }

  getContextSnapshots(sessionId: string) {
    return this.stmts.getContextSnapshots.all(sessionId) as any[];
  }

  getLatestContextBreakdown(sessionId: string) {
    const row = this.stmts.getLatestContextSnapshot.get(sessionId) as any;
    if (!row?.breakdown) return null;
    return {
      ...row,
      breakdown: JSON.parse(row.breakdown),
    };
  }

  getAllRecentEvents(limit = 200): TelemetryEvent[] {
    const rows = this.stmts.getAllEvents.all(limit) as any[];
    return rows.map((r) => JSON.parse(r.data)).reverse();
  }

  // ─── MCP Stats ──────────────────────────────────────────────────────

  /** MCP call stats grouped by server + method */
  getMcpStats(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT
        json_extract(data, '$.serverName') as server_name,
        json_extract(data, '$.method') as method,
        json_extract(data, '$.toolName') as tool_name,
        COUNT(*) as call_count,
        AVG(json_extract(data, '$.durationMs')) as avg_ms,
        MIN(json_extract(data, '$.durationMs')) as min_ms,
        MAX(json_extract(data, '$.durationMs')) as max_ms,
        SUM(CASE WHEN json_extract(data, '$.isError') = 1 THEN 1 ELSE 0 END) as errors
      FROM events
      WHERE session_id = ? AND type = 'mcp_response'
      GROUP BY server_name, method, tool_name
      ORDER BY call_count DESC
    `);
    return stmt.all(sessionId);
  }

  // ─── RAG Stats ─────────────────────────────────────────────────────

  /** RAG retrieval stats grouped by source */
  getRagStats(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT
        json_extract(data, '$.source') as source,
        type,
        COUNT(*) as call_count,
        AVG(json_extract(data, '$.durationMs')) as avg_ms,
        MIN(json_extract(data, '$.durationMs')) as min_ms,
        MAX(json_extract(data, '$.durationMs')) as max_ms,
        AVG(json_extract(data, '$.resultCount')) as avg_results,
        AVG(json_extract(data, '$.topScore')) as avg_top_score,
        SUM(json_extract(data, '$.totalChunkTokens')) as total_chunk_tokens
      FROM events
      WHERE session_id = ? AND type IN ('rag_retrieval', 'rag_embedding', 'rag_index')
      GROUP BY source, type
      ORDER BY call_count DESC
    `);
    return stmt.all(sessionId);
  }

  /** MCP call timeseries — each event with timestamp and duration */
  getMcpTimeseries(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT
        timestamp,
        json_extract(data, '$.serverName') as server_name,
        json_extract(data, '$.method') as method,
        json_extract(data, '$.toolName') as tool_name,
        json_extract(data, '$.durationMs') as duration_ms,
        json_extract(data, '$.isError') as is_error
      FROM events
      WHERE session_id = ? AND type = 'mcp_response'
      ORDER BY timestamp ASC
    `);
    return stmt.all(sessionId);
  }

  /** RAG event timeseries — each event with timestamp, duration, and type-specific fields */
  getRagTimeseries(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT
        timestamp,
        type,
        json_extract(data, '$.source') as source,
        json_extract(data, '$.durationMs') as duration_ms,
        json_extract(data, '$.resultCount') as result_count,
        json_extract(data, '$.topScore') as top_score,
        json_extract(data, '$.documentCount') as document_count,
        json_extract(data, '$.inputTokens') as input_tokens
      FROM events
      WHERE session_id = ? AND type IN ('rag_retrieval', 'rag_embedding', 'rag_index')
      ORDER BY timestamp ASC
    `);
    return stmt.all(sessionId);
  }

  /** Tool call timeseries from tool_calls table */
  getToolCallTimeseries(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT
        start_time as timestamp,
        tool_name,
        duration_ms,
        is_error,
        output_bytes
      FROM tool_calls
      WHERE session_id = ? AND duration_ms IS NOT NULL
      ORDER BY start_time ASC
    `);
    return stmt.all(sessionId);
  }

  // ─── Provider Summary ─────────────────────────────────────────────

  /** Summary of all providers that have sent events */
  getProviderSummary(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT
        type,
        COUNT(*) as event_count,
        MIN(timestamp) as first_seen,
        MAX(timestamp) as last_seen
      FROM events
      WHERE session_id = ?
      GROUP BY type
      ORDER BY event_count DESC
    `);
    return stmt.all(sessionId);
  }

  // ─── Latency Stats ────────────────────────────────────────────────

  /** Latency percentiles by operation */
  getLatencyStats(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT
        operation,
        COUNT(*) as sample_count,
        AVG(total_ms) as avg_ms,
        MIN(total_ms) as min_ms,
        MAX(total_ms) as max_ms,
        AVG(ttft_ms) as avg_ttft_ms,
        model, provider
      FROM latency_snapshots
      WHERE session_id = ?
      GROUP BY operation, model
      ORDER BY avg_ms DESC
    `);
    return stmt.all(sessionId);
  }

  /** Latency time series for a specific operation */
  getLatencyTimeSeries(sessionId: string, operation?: string) {
    if (operation) {
      const stmt = this.db.prepare(`
        SELECT timestamp, total_ms, ttft_ms, operation, model
        FROM latency_snapshots
        WHERE session_id = ? AND operation = ?
        ORDER BY timestamp ASC
      `);
      return stmt.all(sessionId, operation);
    }
    const stmt = this.db.prepare(`
      SELECT timestamp, total_ms, ttft_ms, operation, model
      FROM latency_snapshots WHERE session_id = ?
      ORDER BY timestamp ASC
    `);
    return stmt.all(sessionId);
  }

  // ─── Cost Stats ───────────────────────────────────────────────────

  /** Cost breakdown by model */
  getCostBreakdown(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT
        model, provider,
        COUNT(*) as event_count,
        SUM(input_cost) as total_input_cost,
        SUM(output_cost) as total_output_cost,
        SUM(cache_read_cost) as total_cache_read_cost,
        SUM(cache_write_cost) as total_cache_write_cost,
        SUM(total_cost) as total_cost,
        MAX(cumulative_cost) as cumulative_cost,
        MAX(budget_limit) as budget_limit,
        MAX(budget_exceeded) as budget_exceeded
      FROM cost_snapshots
      WHERE session_id = ?
      GROUP BY model, provider
      ORDER BY total_cost DESC
    `);
    return stmt.all(sessionId);
  }

  /** Cost time series */
  getCostTimeSeries(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT timestamp, total_cost, cumulative_cost, model, budget_limit
      FROM cost_snapshots WHERE session_id = ?
      ORDER BY timestamp ASC
    `);
    return stmt.all(sessionId);
  }

  /** Get current cumulative cost for a session */
  getCumulativeCost(sessionId: string): number {
    const row = this.stmts.getSessionCumulativeCost.get(sessionId) as any;
    return row?.cumulative ?? 0;
  }

  // ─── Output Evaluation Stats ──────────────────────────────────────

  /** Aggregate quality metrics */
  getOutputEvalStats(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT
        model, provider,
        COUNT(*) as eval_count,
        AVG(response_tokens) as avg_response_tokens,
        AVG(tool_success_rate) as avg_tool_success_rate,
        SUM(had_retry) as total_retries,
        SUM(had_immediate_follow_up) as total_follow_ups,
        AVG(response_latency_ms) as avg_response_latency_ms,
        AVG(cache_hit_rate) as avg_cache_hit_rate,
        AVG(user_rating) as avg_user_rating,
        COUNT(user_rating) as rated_count
      FROM output_evals
      WHERE session_id = ?
      GROUP BY model, provider
    `);
    return stmt.all(sessionId);
  }

  /** Output eval time series */
  getOutputEvalTimeSeries(sessionId: string) {
    const stmt = this.db.prepare(`
      SELECT timestamp, turn_index, tool_success_rate, response_latency_ms,
             cache_hit_rate, user_rating, had_retry, had_immediate_follow_up
      FROM output_evals WHERE session_id = ?
      ORDER BY timestamp ASC
    `);
    return stmt.all(sessionId);
  }

  // ─── Prompt Rating Stats ──────────────────────────────────────────

  /** Compare prompt variants (A/B testing) */
  getPromptVariantComparison(promptHash?: string) {
    const sql = promptHash
      ? `SELECT
          prompt_hash, variant, category, model,
          COUNT(*) as sample_count,
          AVG(goal_achieved) as goal_rate,
          AVG(turns_to_complete) as avg_turns,
          AVG(total_tokens) as avg_tokens,
          AVG(total_cost) as avg_cost,
          AVG(total_latency_ms) as avg_latency_ms,
          AVG(tool_error_rate) as avg_tool_error_rate,
          AVG(required_compaction) as compaction_rate,
          AVG(rating) as avg_rating,
          COUNT(rating) as rated_count
        FROM prompt_ratings
        WHERE prompt_hash = ?
        GROUP BY variant, model
        ORDER BY goal_rate DESC, avg_cost ASC`
      : `SELECT
          prompt_hash, variant, category, model,
          COUNT(*) as sample_count,
          AVG(goal_achieved) as goal_rate,
          AVG(turns_to_complete) as avg_turns,
          AVG(total_tokens) as avg_tokens,
          AVG(total_cost) as avg_cost,
          AVG(total_latency_ms) as avg_latency_ms,
          AVG(tool_error_rate) as avg_tool_error_rate,
          AVG(required_compaction) as compaction_rate,
          AVG(rating) as avg_rating,
          COUNT(rating) as rated_count
        FROM prompt_ratings
        GROUP BY prompt_hash, variant, model
        ORDER BY goal_rate DESC, avg_cost ASC`;

    const stmt = this.db.prepare(sql);
    return promptHash ? stmt.all(promptHash) : stmt.all();
  }

  /** Get all ratings for a specific prompt variant */
  getPromptRatings(variant: string) {
    const stmt = this.db.prepare(`
      SELECT * FROM prompt_ratings WHERE variant = ? ORDER BY timestamp DESC
    `);
    return stmt.all(variant);
  }

  // ─── Drift Stats ──────────────────────────────────────────────────

  /** Recent drift events */
  getDriftEvents(sessionId?: string, limit = 50) {
    if (sessionId) {
      const stmt = this.db.prepare(`
        SELECT * FROM drift_events WHERE session_id = ? ORDER BY timestamp DESC LIMIT ?
      `);
      return stmt.all(sessionId, limit);
    }
    const stmt = this.db.prepare(`
      SELECT * FROM drift_events ORDER BY timestamp DESC LIMIT ?
    `);
    return stmt.all(limit);
  }

  /** Drift summary by metric */
  getDriftSummary(sessionId?: string) {
    const whereClause = sessionId ? 'WHERE session_id = ?' : '';
    const stmt = this.db.prepare(`
      SELECT
        metric, severity,
        COUNT(*) as event_count,
        AVG(deviation_pct) as avg_deviation_pct,
        MAX(ABS(deviation_pct)) as max_deviation_pct,
        MIN(timestamp) as first_seen,
        MAX(timestamp) as last_seen
      FROM drift_events
      ${whereClause}
      GROUP BY metric, severity
      ORDER BY event_count DESC
    `);
    return sessionId ? stmt.all(sessionId) : stmt.all();
  }

  // ─── Helpers ──────────────────────────────────────────────────────

  private rowToSummary(row: any): SessionSummary {
    return {
      sessionId: row.session_id,
      startTime: row.start_time,
      lastEventTime: row.last_event,
      model: row.model,
      provider: row.provider,
      cwd: row.cwd,
      totalTokensIn: row.total_in,
      totalTokensOut: row.total_out,
      totalCost: row.total_cost,
      toolCallCount: row.tool_calls,
      turnCount: row.turns,
      compactionCount: row.compactions,
      avgToolDurationMs: 0, // computed on demand
      contextUtilizationPct: row.context_pct,
      agent: row.agent ?? 'pi',
    };
  }
}
