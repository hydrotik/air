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
import type { TelemetryEvent, TokenUsageEvent } from '../../shared/events';

interface Props {
  events: TelemetryEvent[];
}

export const TokenFlowChart: React.FC<Props> = ({ events }) => {
  const tokenEvents = events.filter((e): e is TokenUsageEvent => e.type === 'token_usage');

  if (tokenEvents.length === 0) {
    return (
      <div style={{ padding: 24, textAlign: 'center', opacity: 0.5, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
        No token usage data yet
      </div>
    );
  }

  const data = tokenEvents.map((e, i) => ({
    index: i + 1,
    time: new Date(e.timestamp).toLocaleTimeString(),
    input: e.input,
    output: e.output,
    cacheRead: e.cacheRead,
    cacheWrite: e.cacheWrite,
    cost: e.cost.total,
  }));

  // Auto-scale Y axis to data range with padding
  const allValues = data.flatMap((d) => [d.input, d.output, d.cacheRead]);
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(...allValues.filter((v) => v > 0), 0);
  const yPad = Math.max((maxVal - minVal) * 0.1, maxVal * 0.05);
  const yMin = Math.max(0, Math.floor((minVal - yPad) / 1000) * 1000);
  const yMax = Math.ceil((maxVal + yPad) / 1000) * 1000;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="inputGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="outputGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="cacheGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="index"
          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          tickLine={false}
        />
        <YAxis
          domain={[yMin, yMax]}
          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          tickLine={false}
          tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v))}
          width={40}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(10, 10, 15, 0.95)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            padding: '4px 8px',
          }}
          labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 9 }}
          formatter={(value: number, name: string) => [value.toLocaleString(), name]}
        />
        <Area type="monotone" dataKey="input" name="Input" stroke="#3b82f6" fill="url(#inputGrad)" strokeWidth={1.5} />
        <Area type="monotone" dataKey="output" name="Output" stroke="#8b5cf6" fill="url(#outputGrad)" strokeWidth={1.5} />
        <Area type="monotone" dataKey="cacheRead" name="Cache Read" stroke="#10b981" fill="url(#cacheGrad)" strokeWidth={1.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
