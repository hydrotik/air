import React from 'react';

interface McpStat {
  server_name: string;
  method: string;
  tool_name: string | null;
  call_count: number;
  avg_ms: number;
  min_ms: number;
  max_ms: number;
  errors: number;
}

interface Props {
  stats: McpStat[];
}

const METHOD_COLORS: Record<string, string> = {
  'tools/call': '#f97316',
  'resources/read': '#3b82f6',
  'prompts/get': '#a855f7',
  'tools/list': '#64748b',
  'resources/list': '#64748b',
  'prompts/list': '#64748b',
};

const font = "'JetBrains Mono', monospace";

export const McpStatsPanel: React.FC<Props> = ({ stats }) => {
  if (stats.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}>
        No MCP calls recorded — connect an MCP server with <code>instrumentMcp()</code>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['Server', 'Method', 'Tool/Resource', 'Calls', 'Avg', 'Min', 'Max', 'Errors'].map((h) => (
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
              <td style={{ padding: '3px 6px', color: '#fff', fontWeight: 500 }}>{s.server_name}</td>
              <td style={{ padding: '3px 6px' }}>
                <span
                  style={{
                    color: METHOD_COLORS[s.method] ?? '#94a3b8',
                    fontWeight: 600,
                  }}
                >
                  {s.method}
                </span>
              </td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.6)' }}>
                {s.tool_name ?? '—'}
              </td>
              <td style={{ padding: '3px 6px', color: '#fff' }}>{s.call_count}</td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.7)' }}>{Math.round(s.avg_ms)}ms</td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.5)' }}>{s.min_ms}ms</td>
              <td style={{ padding: '3px 6px', color: 'rgba(255,255,255,0.5)' }}>{s.max_ms}ms</td>
              <td style={{ padding: '3px 6px', color: s.errors > 0 ? '#ef4444' : 'rgba(255,255,255,0.3)' }}>
                {s.errors}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
