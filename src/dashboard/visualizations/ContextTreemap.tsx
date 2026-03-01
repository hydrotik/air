import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { ContextSegment } from '../../shared/events';
import { treemapContainer } from '../dashboard.css';

interface Props {
  segments: ContextSegment[];
  totalTokens: number;
  contextWindow: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  system_prompt: '#6366f1',    // indigo
  context_files: '#8b5cf6',    // violet
  skills: '#a855f7',           // purple
  user_messages: '#3b82f6',    // blue
  assistant_messages: '#06b6d4', // cyan
  tool_results: '#f59e0b',     // amber
  compaction_summary: '#10b981', // emerald
  custom_messages: '#ec4899',   // pink
  thinking: '#64748b',         // slate
};

export const ContextTreemap: React.FC<Props> = ({ segments, totalTokens, contextWindow }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || segments.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 200;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    // Add "unused" capacity as a segment
    const usedTokens = segments.reduce((sum, s) => sum + s.estimatedTokens, 0);
    const unusedTokens = Math.max(0, contextWindow - usedTokens);

    const data = {
      name: 'context',
      children: [
        ...segments.map((s) => ({
          name: s.label,
          value: s.estimatedTokens,
          category: s.category,
        })),
        ...(unusedTokens > 0
          ? [{ name: 'Available Capacity', value: unusedTokens, category: 'unused' as const }]
          : []),
      ],
    };

    const root = d3
      .hierarchy(data)
      .sum((d: any) => d.value)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    d3.treemap<typeof data>()
      .size([width, height])
      .padding(2)
      .round(true)(root as any);

    const leaf = svg
      .selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', (d: any) => `translate(${d.x0},${d.y0})`);

    // Rectangles
    leaf
      .append('rect')
      .attr('width', (d: any) => Math.max(0, d.x1 - d.x0))
      .attr('height', (d: any) => Math.max(0, d.y1 - d.y0))
      .attr('rx', 3)
      .attr('fill', (d: any) => {
        const cat = d.data.category;
        if (cat === 'unused') return 'rgba(255,255,255,0.04)';
        return CATEGORY_COLORS[cat] ?? '#64748b';
      })
      .attr('fill-opacity', (d: any) => (d.data.category === 'unused' ? 0.3 : 0.8))
      .attr('stroke', (d: any) => (d.data.category === 'unused' ? 'rgba(255,255,255,0.08)' : 'none'))
      .style('cursor', 'pointer')
      .on('mouseover', function () {
        d3.select(this).attr('fill-opacity', 1);
      })
      .on('mouseout', function (_, d: any) {
        d3.select(this).attr('fill-opacity', d.data.category === 'unused' ? 0.3 : 0.8);
      });

    // Labels (only for boxes large enough)
    leaf
      .filter((d: any) => d.x1 - d.x0 > 50 && d.y1 - d.y0 > 22)
      .append('text')
      .attr('x', 4)
      .attr('y', 12)
      .attr('fill', '#fff')
      .attr('font-size', '9px')
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('font-weight', 600)
      .text((d: any) => d.data.name);

    // Token count labels
    leaf
      .filter((d: any) => d.x1 - d.x0 > 50 && d.y1 - d.y0 > 34)
      .append('text')
      .attr('x', 4)
      .attr('y', 23)
      .attr('fill', 'rgba(255,255,255,0.6)')
      .attr('font-size', '8px')
      .attr('font-family', "'JetBrains Mono', monospace")
      .text((d: any) => `${formatTokens(d.data.value)} · ${((d.data.value / contextWindow) * 100).toFixed(1)}%`);
  }, [segments, totalTokens, contextWindow]);

  if (segments.length === 0) {
    return (
      <div className={treemapContainer}>
        <div style={{ padding: 24, textAlign: 'center', opacity: 0.5, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          Waiting for context data…
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={treemapContainer}>
      <svg ref={svgRef} />
    </div>
  );
};

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
