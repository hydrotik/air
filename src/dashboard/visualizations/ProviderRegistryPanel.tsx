import React from 'react';

interface RagProvider {
  name: string;
  type: string;
  description?: string;
  embeddingModel?: string;
  dimensions?: number;
  eventCount: number;
  lastSeen?: number;
  active: boolean;
}

interface McpProvider {
  name: string;
  description?: string;
  eventCount: number;
  lastSeen?: number;
  active: boolean;
}

interface Props {
  rag: RagProvider[];
  mcp: McpProvider[];
}

const font = "'JetBrains Mono', monospace";

function timeAgo(ts?: number): string {
  if (!ts) return 'never';
  const diff = Date.now() - ts;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  return `${Math.floor(diff / 3_600_000)}h ago`;
}

const TYPE_ICONS: Record<string, string> = {
  pinecone: '🌲',
  qdrant: '🔷',
  weaviate: '🕸',
  chroma: '🎨',
  pgvector: '🐘',
  milvus: '🔬',
  custom: '⚙️',
  'auto-detected': '🔍',
};

export const ProviderRegistryPanel: React.FC<Props> = ({ rag, mcp }) => {
  if (rag.length === 0 && mcp.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 10 }}>
        No providers registered — add a <code>.air.json</code> config or POST to <code>/api/providers/rag</code>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, fontSize: 10 }}>
      {/* RAG providers */}
      {rag.length > 0 && (
        <>
          <div style={{
            fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
            color: 'rgba(255,255,255,0.4)', padding: '4px 6px', marginBottom: 2,
          }}>
            RAG Providers
          </div>
          {rag.map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '5px 6px', borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {/* Status dot */}
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: p.active ? '#22c55e' : p.eventCount > 0 ? '#f59e0b' : '#64748b',
                }} />
                {/* Icon + name */}
                <span style={{ fontSize: 12 }}>{TYPE_ICONS[p.type] ?? TYPE_ICONS.custom}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff' }}>{p.name}</div>
                  {p.description && (
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>
                      {p.description}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{p.type}</span>
                {p.embeddingModel && (
                  <span style={{ color: '#a855f7', fontSize: 9 }}>{p.embeddingModel}</span>
                )}
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{p.eventCount} events</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9 }}>{timeAgo(p.lastSeen)}</span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* MCP providers */}
      {mcp.length > 0 && (
        <>
          <div style={{
            fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
            color: 'rgba(255,255,255,0.4)', padding: '4px 6px', marginTop: 8, marginBottom: 2,
          }}>
            MCP Servers
          </div>
          {mcp.map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '5px 6px', borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: p.active ? '#22c55e' : p.eventCount > 0 ? '#f59e0b' : '#64748b',
                }} />
                <span style={{ fontSize: 12 }}>🔌</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff' }}>{p.name}</div>
                  {p.description && (
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>
                      {p.description}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{p.eventCount} events</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9 }}>{timeAgo(p.lastSeen)}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
