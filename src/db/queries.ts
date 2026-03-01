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
} from '../shared/events';

export class TelemetryStore {
  private stmts: ReturnType<typeof this.prepareStatements>;

  constructor(private db: Database.Database) {
    this.stmts = this.prepareStatements();
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
      default:
        break;
    }
  }

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
