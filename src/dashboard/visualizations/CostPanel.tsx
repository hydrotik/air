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

interface CostBreakdown {
  model: string;
  provider: string;
  event_count: number;
  total_input_cost: number;
  total_output_cost: number;
  total_cache_read_cost: number;
  total_cache_write_cost: number;
  total_cost: number;
  cumulative_cost: number;
  budget_limit: number | null;
  budget_exceeded: number;
}

interface CostPoint {
  timestamp: number;
  total_cost: number;
  cumulative_cost: number;
  model: string;
  budget_limit: number | null;
}

interface Props {
  breakdown: CostBreakdown[];
  timeseries: CostPoint[];
}

const font = "'JetBrains Mono', monospace";

function formatCost(n: number): string {
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.01) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(4)}`;
}

export const CostPanel: React.FC<Props> = ({ breakdown, timeseries }) => {
  if (breakdown.length === 0 && timeseries.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}>
        No cost data recorded yet
      </div>
    );
  }

  const budgetLimit = timeseries.find(p => p.budget_limit)?.budget_limit ?? null;

  const chartData = timeseries.map((p, i) => ({
    index: i + 1,
    cost: Math.round(p.cumulative_cost * 10000) / 10000,
    perTurn: Math.round(p.total_cost * 10000) / 10000,
    time: new Date(p.timestamp).toLocaleTimeString(),
  }));

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      {/* Breakdown table */}
      {breakdown.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Model', 'Events', 'Input', 'Output', 'Cache', 'Total'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left', padding: '3px 6px', fontSize: 8, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {breakdown.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '3px 6px', color: '#fff', fontWeight: 500 }}>{s.model}</td>
                <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.6)' }}>{s.event_count}</td>
                <td style={{ padding: '3px 6px', color: '#3b82f6' }}>{formatCost(s.total_input_cost)}</td>
                <td style={{ padding: '3px 6px', color: '#f97316' }}>{formatCost(s.total_output_cost)}</td>
                <td style={{ padding: '3px 6px', color: '#10b981' }}>
                  {formatCost(s.total_cache_read_cost + s.total_cache_write_cost)}
                </td>
                <td style={{ padding: '3px 6px', color: '#fff', fontWeight: 600 }}>{formatCost(s.total_cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Cumulative cost chart */}
      {chartData.length > 2 && (
        <div style={{ height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="index" hide />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9, fontFamily: font }}
                axisLine={false} tickLine={false}
                tickFormatter={(v: number) => `$${v}`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 15, 20, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, fontFamily: font, fontSize: 11,
                }}
                formatter={(value: number, name: string) => [formatCost(value), name]}
              />
              {budgetLimit && (
                <ReferenceLine
                  y={budgetLimit}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  label={{ value: `Budget $${budgetLimit}`, fill: '#ef4444', fontSize: 9 }}
                />
              )}
              <Area type="monotone" dataKey="cost" name="Cumulative" stroke="#10b981" fill="url(#costGrad)" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
