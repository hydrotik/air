import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface EvalStat {
  model: string;
  provider: string;
  eval_count: number;
  avg_response_tokens: number;
  avg_tool_success_rate: number;
  total_retries: number;
  total_follow_ups: number;
  avg_response_latency_ms: number;
  avg_cache_hit_rate: number;
  avg_user_rating: number | null;
  rated_count: number;
}

interface EvalPoint {
  timestamp: number;
  turn_index: number;
  tool_success_rate: number;
  response_latency_ms: number;
  cache_hit_rate: number;
  user_rating: number | null;
  had_retry: number;
  had_immediate_follow_up: number;
}

interface Props {
  stats: EvalStat[];
  timeseries: EvalPoint[];
}

const font = "'JetBrains Mono', monospace";

function pct(n: number): string {
  return `${(n * 100).toFixed(0)}%`;
}

function stars(n: number | null): string {
  if (n == null) return '—';
  return '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
}

export const QualityPanel: React.FC<Props> = ({ stats, timeseries }) => {
  if (stats.length === 0 && timeseries.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}>
        No evaluation data yet
      </div>
    );
  }

  const chartData = timeseries.map((p, i) => ({
    index: i + 1,
    successRate: Math.round(p.tool_success_rate * 100),
    cacheHitRate: Math.round(p.cache_hit_rate * 100),
    turn: p.turn_index,
    time: new Date(p.timestamp).toLocaleTimeString(),
  }));

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      {/* Summary cards */}
      {stats.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          {stats.map((s, i) => {
            const successColor = s.avg_tool_success_rate >= 0.95 ? '#22c55e' :
              s.avg_tool_success_rate >= 0.8 ? '#f59e0b' : '#ef4444';
            return (
              <div key={i} style={{
                flex: '1 1 auto', minWidth: 120, padding: '6px 8px',
                background: 'rgba(255,255,255,0.03)', borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>
                  {s.model}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: successColor }}>{pct(s.avg_tool_success_rate)}</div>
                    <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>tool success</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#3b82f6' }}>{pct(s.avg_cache_hit_rate)}</div>
                    <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>cache hit</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>{s.total_retries}</div>
                    <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>retries</div>
                  </div>
                  {s.avg_user_rating != null && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#eab308' }}>{stars(s.avg_user_rating)}</div>
                      <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>{s.rated_count} rated</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Success rate over time */}
      {chartData.length > 2 && (
        <div style={{ height: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="succGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cacheGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="index" hide />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9, fontFamily: font }}
                axisLine={false} tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 15, 20, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, fontFamily: font, fontSize: 11,
                }}
                formatter={(value: number, name: string) => [`${value}%`, name]}
              />
              <Area type="monotone" dataKey="successRate" name="Tool Success" stroke="#22c55e" fill="url(#succGrad)" strokeWidth={1.5} dot={false} />
              <Area type="monotone" dataKey="cacheHitRate" name="Cache Hit" stroke="#3b82f6" fill="url(#cacheGrad)" strokeWidth={1} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
