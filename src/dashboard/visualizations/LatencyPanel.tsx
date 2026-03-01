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

interface LatencyStat {
  operation: string;
  sample_count: number;
  avg_ms: number;
  min_ms: number;
  max_ms: number;
  avg_ttft_ms: number | null;
  model: string;
  provider: string;
}

interface LatencyPoint {
  timestamp: number;
  total_ms: number;
  ttft_ms: number | null;
  operation: string;
  model: string;
}

interface Props {
  stats: LatencyStat[];
  timeseries: LatencyPoint[];
}

const OP_COLORS: Record<string, string> = {
  turn: '#3b82f6',
  tool_call: '#f97316',
  api_call: '#a855f7',
  ttft: '#10b981',
  custom: '#64748b',
};

const font = "'JetBrains Mono', monospace";

export const LatencyPanel: React.FC<Props> = ({ stats, timeseries }) => {
  if (stats.length === 0 && timeseries.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}>
        No latency data recorded yet
      </div>
    );
  }

  const chartData = timeseries.map((p, i) => ({
    index: i + 1,
    latency: Math.round(p.total_ms),
    ttft: p.ttft_ms ? Math.round(p.ttft_ms) : undefined,
    op: p.operation,
    time: new Date(p.timestamp).toLocaleTimeString(),
  }));

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      {/* Stats table */}
      {stats.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Operation', 'Samples', 'Avg', 'Min', 'Max', 'TTFT'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left', padding: '3px 6px', fontSize: 8, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '3px 6px' }}>
                  <span style={{ color: OP_COLORS[s.operation] ?? '#94a3b8', fontWeight: 600 }}>
                    {s.operation}
                  </span>
                </td>
                <td style={{ padding: '3px 6px', color: '#fff' }}>{s.sample_count}</td>
                <td style={{ padding: '3px 6px', color: '#fff', fontWeight: 500 }}>{Math.round(s.avg_ms)}ms</td>
                <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.5)' }}>{Math.round(s.min_ms)}ms</td>
                <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.5)' }}>{Math.round(s.max_ms)}ms</td>
                <td style={{ padding: '3px 6px', color: s.avg_ttft_ms ? '#10b981' : 'rgba(255,255,255,0.3)' }}>
                  {s.avg_ttft_ms ? `${Math.round(s.avg_ttft_ms)}ms` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Time series chart */}
      {chartData.length > 2 && (
        <div style={{ height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="latGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="index" hide />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9, fontFamily: font }}
                axisLine={false} tickLine={false}
                tickFormatter={(v: number) => `${v}ms`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 15, 20, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, fontFamily: font, fontSize: 11,
                }}
                formatter={(value: number, name: string) => [`${value}ms`, name]}
              />
              <Area type="monotone" dataKey="latency" name="Latency" stroke="#3b82f6" fill="url(#latGrad)" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
