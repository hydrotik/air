import React from 'react';

interface RagStat {
  source: string;
  type: string;
  call_count: number;
  avg_ms: number;
  min_ms: number;
  max_ms: number;
  avg_results: number | null;
  avg_top_score: number | null;
  total_chunk_tokens: number | null;
}

interface Props {
  stats: RagStat[];
}

const TYPE_COLORS: Record<string, string> = {
  rag_retrieval: '#84cc16',
  rag_embedding: '#a3e635',
  rag_index: '#65a30d',
};

const TYPE_LABELS: Record<string, string> = {
  rag_retrieval: 'Retrieval',
  rag_embedding: 'Embedding',
  rag_index: 'Index',
};

const font = "'JetBrains Mono', monospace";

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export const RagStatsPanel: React.FC<Props> = ({ stats }) => {
  if (stats.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}>
        No RAG events recorded — connect with <code>createRagTracer()</code>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['Source', 'Type', 'Calls', 'Avg', 'Avg Results', 'Avg Score', 'Tokens'].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  padding: '3px 6px',
                  fontSize: 8,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stats.map((s, i) => (
            <tr
              key={i}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <td style={{ padding: '3px 6px', color: '#fff', fontWeight: 500 }}>{s.source}</td>
              <td style={{ padding: '3px 6px' }}>
                <span style={{ color: TYPE_COLORS[s.type] ?? '#94a3b8', fontWeight: 600 }}>
                  {TYPE_LABELS[s.type] ?? s.type}
                </span>
              </td>
              <td style={{ padding: '3px 6px', color: '#fff' }}>{s.call_count}</td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.7)' }}>{Math.round(s.avg_ms)}ms</td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.6)' }}>
                {s.avg_results != null ? s.avg_results.toFixed(1) : '—'}
              </td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.6)' }}>
                {s.avg_top_score != null ? s.avg_top_score.toFixed(3) : '—'}
              </td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.5)' }}>
                {s.total_chunk_tokens != null ? formatTokens(s.total_chunk_tokens) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
