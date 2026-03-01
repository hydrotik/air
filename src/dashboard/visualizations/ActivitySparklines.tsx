import React, { useMemo } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────

interface TimeseriesPoint {
  timestamp: number;
  duration_ms: number;
  is_error?: number | boolean;
  tool_name?: string;
  server_name?: string;
  method?: string;
  source?: string;
  type?: string;
  result_count?: number;
  top_score?: number;
}

interface Props {
  mcpTimeseries: TimeseriesPoint[];
  ragTimeseries: TimeseriesPoint[];
  toolTimeseries: TimeseriesPoint[];
}

// ─── Sparkline SVG ──────────────────────────────────────────────────────

const SPARK_W = 200;
const SPARK_H = 28;

function Sparkline({
  data,
  color,
  fillColor,
  label,
}: {
  data: number[];
  color: string;
  fillColor: string;
  label?: string;
}) {
  if (data.length < 2) {
    return (
      <div style={{ width: SPARK_W, height: SPARK_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>{label ? `${label}: —` : '—'}</span>
      </div>
    );
  }

  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const step = SPARK_W / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = SPARK_H - ((v - min) / range) * (SPARK_H - 4) - 2;
    return `${x},${y}`;
  });

  const polyline = points.join(' ');
  const areaPoints = `0,${SPARK_H} ${polyline} ${SPARK_W},${SPARK_H}`;

  return (
    <svg width={SPARK_W} height={SPARK_H} style={{ display: 'block' }}>
      <polygon points={areaPoints} fill={fillColor} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </svg>
  );
}

// ─── Stat Row ───────────────────────────────────────────────────────────

const font = "'JetBrains Mono', monospace";

function SparkRow({
  label,
  icon,
  color,
  sparkData,
  stats,
}: {
  label: string;
  icon: string;
  color: string;
  sparkData: number[];
  stats: { count: number; avg: string; last: string; errors: number };
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 8px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Icon + label */}
      <div style={{ width: 100, display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 12 }}>{icon}</span>
        <span style={{ fontWeight: 600, color: '#fff', fontSize: 10 }}>{label}</span>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, flexShrink: 0, width: 180 }}>
        <StatPill label="count" value={String(stats.count)} />
        <StatPill label="avg" value={stats.avg} />
        <StatPill label="last" value={stats.last} />
        {stats.errors > 0 && <StatPill label="err" value={String(stats.errors)} isError />}
      </div>

      {/* Sparkline */}
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Sparkline data={sparkData} color={color} fillColor={color.replace(')', ',0.1)').replace('rgb', 'rgba')} />
      </div>
    </div>
  );
}

function StatPill({ label, value, isError }: { label: string; value: string; isError?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <span style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.3)' }}>
        {label}
      </span>
      <span style={{ fontSize: 11, fontWeight: 600, color: isError ? '#ef4444' : 'rgba(255,255,255,0.8)' }}>
        {value}
      </span>
    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────

function bucket(points: TimeseriesPoint[], bucketCount = 40): number[] {
  if (points.length === 0) return [];
  if (points.length <= bucketCount) return points.map((p) => p.duration_ms ?? 0);

  const size = Math.ceil(points.length / bucketCount);
  const result: number[] = [];
  for (let i = 0; i < points.length; i += size) {
    const slice = points.slice(i, i + size);
    const avg = slice.reduce((s, p) => s + (p.duration_ms ?? 0), 0) / slice.length;
    result.push(avg);
  }
  return result;
}

function calcStats(points: TimeseriesPoint[]) {
  if (points.length === 0) return { count: 0, avg: '—', last: '—', errors: 0 };
  const durations = points.map((p) => p.duration_ms ?? 0);
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
  const last = durations[durations.length - 1] ?? 0;
  const errors = points.filter((p) => p.is_error).length;
  return {
    count: points.length,
    avg: `${Math.round(avg)}ms`,
    last: `${Math.round(last)}ms`,
    errors,
  };
}

// Group points by a key function
function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of items) {
    const key = keyFn(item);
    (result[key] ??= []).push(item);
  }
  return result;
}

// ─── Main Component ─────────────────────────────────────────────────────

const TOOL_COLORS = [
  'rgb(59,130,246)',   // blue
  'rgb(249,115,22)',   // orange
  'rgb(168,85,247)',   // purple
  'rgb(34,197,94)',    // green
  'rgb(236,72,153)',   // pink
  'rgb(234,179,8)',    // yellow
  'rgb(6,182,212)',    // cyan
  'rgb(239,68,68)',    // red
];

const RAG_COLORS: Record<string, string> = {
  rag_retrieval: 'rgb(132,204,22)',
  rag_embedding: 'rgb(163,230,53)',
  rag_index: 'rgb(101,163,13)',
};

export const ActivitySparklines: React.FC<Props> = ({ mcpTimeseries, ragTimeseries, toolTimeseries }) => {
  const sections = useMemo(() => {
    const result: {
      title: string;
      rows: { label: string; icon: string; color: string; data: TimeseriesPoint[] }[];
    }[] = [];

    // Tool calls grouped by tool name
    if (toolTimeseries.length > 0) {
      const byTool = groupBy(toolTimeseries, (p) => p.tool_name ?? 'unknown');
      const rows = Object.entries(byTool)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([name, points], i) => ({
          label: name.length > 14 ? name.slice(0, 12) + '…' : name,
          icon: '⚡',
          color: TOOL_COLORS[i % TOOL_COLORS.length]!,
          data: points,
        }));
      result.push({ title: 'Tool Calls', rows });
    }

    // MCP calls grouped by server+method
    if (mcpTimeseries.length > 0) {
      const byServer = groupBy(mcpTimeseries, (p) => `${p.server_name ?? '?'}:${p.method ?? '?'}`);
      const rows = Object.entries(byServer)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 8)
        .map(([name, points], i) => ({
          label: name.length > 14 ? name.slice(0, 12) + '…' : name,
          icon: '🔌',
          color: TOOL_COLORS[i % TOOL_COLORS.length]!,
          data: points,
        }));
      result.push({ title: 'MCP Servers', rows });
    }

    // RAG events grouped by type
    if (ragTimeseries.length > 0) {
      const byType = groupBy(ragTimeseries, (p) => p.type ?? 'unknown');
      const typeLabels: Record<string, string> = {
        rag_retrieval: 'Retrieval',
        rag_embedding: 'Embedding',
        rag_index: 'Indexing',
      };
      const rows = Object.entries(byType)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([type, points]) => ({
          label: typeLabels[type] ?? type,
          icon: type === 'rag_retrieval' ? '🔍' : type === 'rag_embedding' ? '🧬' : '📥',
          color: RAG_COLORS[type] ?? 'rgb(148,163,184)',
          data: points,
        }));

      // Also add by source if multiple sources
      const bySource = groupBy(ragTimeseries, (p) => p.source ?? 'unknown');
      if (Object.keys(bySource).length > 1) {
        const sourceRows = Object.entries(bySource)
          .sort((a, b) => b[1].length - a[1].length)
          .map(([source, points], i) => ({
            label: source.length > 14 ? source.slice(0, 12) + '…' : source,
            icon: '📦',
            color: TOOL_COLORS[(i + 3) % TOOL_COLORS.length]!,
            data: points,
          }));
        rows.push(...sourceRows);
      }

      result.push({ title: 'RAG Pipeline', rows });
    }

    return result;
  }, [mcpTimeseries, ragTimeseries, toolTimeseries]);

  if (sections.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: 'center', opacity: 0.3, fontFamily: font, fontSize: 10 }}>
        No activity data yet — tool calls, MCP, and RAG events will appear here as sparklines
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font }}>
      {sections.map((section, si) => (
        <div key={si}>
          {/* Section header */}
          <div
            style={{
              fontSize: 8,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'rgba(255,255,255,0.35)',
              padding: '6px 8px 2px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {section.title}
          </div>

          {/* Rows */}
          {section.rows.map((row, ri) => (
            <SparkRow
              key={ri}
              label={row.label}
              icon={row.icon}
              color={row.color}
              sparkData={bucket(row.data)}
              stats={calcStats(row.data)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
