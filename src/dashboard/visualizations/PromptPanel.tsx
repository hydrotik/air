import React from 'react';

interface PromptVariant {
  prompt_hash: string;
  variant: string;
  category: string;
  model: string;
  sample_count: number;
  goal_rate: number;
  avg_turns: number;
  avg_tokens: number;
  avg_cost: number;
  avg_latency_ms: number;
  avg_tool_error_rate: number;
  compaction_rate: number;
  avg_rating: number | null;
  rated_count: number;
}

interface Props {
  variants: PromptVariant[];
}

const font = "'JetBrains Mono', monospace";

function formatCost(n: number): string {
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.01) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(4)}`;
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}

function goalBar(rate: number): React.ReactNode {
  const width = Math.round(rate * 100);
  const color = rate >= 0.8 ? '#22c55e' : rate >= 0.5 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: 40, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden',
      }}>
        <div style={{ width: `${width}%`, height: '100%', background: color, borderRadius: 3 }} />
      </div>
      <span style={{ color, fontWeight: 600 }}>{Math.round(rate * 100)}%</span>
    </div>
  );
}

function stars(n: number | null): string {
  if (n == null) return '—';
  return `${n.toFixed(1)} ★`;
}

export const PromptPanel: React.FC<Props> = ({ variants }) => {
  if (variants.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}>
        No prompt ratings yet — use <code>air.ratePrompt()</code> in the SDK
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['Variant', 'Category', 'Samples', 'Goal Rate', 'Avg Turns', 'Avg Tokens', 'Avg Cost', 'Errors', 'Rating'].map((h) => (
              <th key={h} style={{
                textAlign: 'left', padding: '3px 6px', fontSize: 8, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((v, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '3px 6px' }}>
                <span style={{ color: '#a855f7', fontWeight: 600 }}>{v.variant}</span>
              </td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.5)' }}>{v.category}</td>
              <td style={{ padding: '3px 6px', color: '#fff' }}>{v.sample_count}</td>
              <td style={{ padding: '3px 6px' }}>{goalBar(v.goal_rate)}</td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.7)' }}>{v.avg_turns.toFixed(1)}</td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.6)' }}>{formatTokens(v.avg_tokens)}</td>
              <td style={{ padding: '3px 6px', color: '#10b981' }}>{formatCost(v.avg_cost)}</td>
              <td style={{ padding: '3px 6px', color: v.avg_tool_error_rate > 0.1 ? '#ef4444' : 'rgba(255,255,255,0.4)' }}>
                {Math.round(v.avg_tool_error_rate * 100)}%
              </td>
              <td style={{ padding: '3px 6px', color: '#eab308' }}>{stars(v.avg_rating)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hash legend */}
      <div style={{ marginTop: 6, padding: '4px 6px', opacity: 0.3, fontSize: 8 }}>
        Prompts identified by SHA-256 hash — no content stored. Group by hash: <code>?hash=...</code>
      </div>
    </div>
  );
};
