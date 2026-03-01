import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface Snapshot {
  timestamp: number;
  tokens_used: number;
  context_window: number;
  utilization: number;
}

interface Props {
  snapshots: Snapshot[];
}

export const ContextUtilizationChart: React.FC<Props> = ({ snapshots }) => {
  if (snapshots.length === 0) {
    return (
      <div style={{ padding: 24, textAlign: 'center', opacity: 0.5, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
        No context snapshots yet
      </div>
    );
  }

  const data = snapshots.map((s, i) => ({
    index: i + 1,
    utilization: Math.min(100, Math.round(s.utilization * 100) / 100),
    tokensUsed: s.tokens_used,
    contextWindow: s.context_window,
    time: new Date(s.timestamp).toLocaleTimeString(),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="ctxGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="index"
          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          tickLine={false}
          tickFormatter={(v: number) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(15, 15, 20, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
          }}
          formatter={(value: number, name: string) => {
            if (name === 'Context %') return [`${value.toFixed(1)}%`, name];
            return [value, name];
          }}
        />
        <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '80%', fill: '#ef4444', fontSize: 10 }} />
        <ReferenceLine y={95} stroke="#ef4444" strokeWidth={2} strokeDasharray="2 2" />
        <Area
          type="monotone"
          dataKey="utilization"
          name="Context %"
          stroke="#f59e0b"
          fill="url(#ctxGrad)"
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
