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
  // System prompt sub-sections
  sp_base: '#6366f1',          // indigo
  sp_claude_md: '#818cf8',     // indigo-light
  sp_skills: '#a855f7',        // purple
  sp_tools: '#7c3aed',         // violet
  sp_prompt_templates: '#8b5cf6', // violet-light
  sp_extensions: '#c084fc',    // purple-light
  sp_other: '#6366f1',         // indigo
  system_prompt: '#6366f1',    // indigo (legacy)
  context_files: '#8b5cf6',    // violet
  skills: '#a855f7',           // purple
  // Messages
  user_messages: '#3b82f6',    // blue
  assistant_messages: '#06b6d4', // cyan
  tool_results: '#f59e0b',     // amber (legacy blob)
  compaction_summary: '#10b981', // emerald
  custom_messages: '#ec4899',   // pink
  thinking: '#64748b',         // slate
  // File-level tool results
  tr_gsd: '#f97316',           // orange
  tr_desloppify: '#fb923c',    // orange-light
  tr_source_code: '#eab308',   // yellow
  tr_config: '#a3a3a3',        // neutral
  tr_docs: '#d97706',          // amber-dark
  tr_tests: '#84cc16',         // lime
  tr_styles: '#14b8a6',        // teal
  tool_results_other: '#ca8a04', // yellow-dark
};

export const ContextTreemap: React.FC<Props> = ({ segments, totalTokens, contextWindow }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || segments.length === 0) return;

    const container = containerRef.current;
    const tooltip = tooltipRef.current!;
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
      .on('mouseover', function (_event, d: any) {
        d3.select(this).attr('fill-opacity', 1);
        const cat = d.data.category;
        const color = cat === 'unused' ? 'rgba(255,255,255,0.5)' : (CATEGORY_COLORS[cat] ?? '#64748b');
        const pct = ((d.data.value / contextWindow) * 100).toFixed(1);
        tooltip.innerHTML = `
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
            <span style="width:8px;height:8px;border-radius:2px;background:${color};flex-shrink:0"></span>
            <span style="font-weight:600;color:#fff;font-size:10px">${d.data.name}</span>
          </div>
          <div style="color:rgba(255,255,255,0.7);font-size:9px">
            ${formatTokens(d.data.value)} tokens · ${pct}% of window
          </div>
        `;
        tooltip.style.opacity = '1';
      })
      .on('mousemove', function (event: MouseEvent) {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // Position tooltip, flip if near right/bottom edge
        const tipW = 180;
        const tipH = 48;
        const left = x + tipW + 12 > width ? x - tipW - 8 : x + 12;
        const top = y + tipH + 12 > height ? y - tipH - 8 : y + 12;
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
      })
      .on('mouseout', function (_, d: any) {
        d3.select(this).attr('fill-opacity', d.data.category === 'unused' ? 0.3 : 0.8);
        tooltip.style.opacity = '0';
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
      .style('pointer-events', 'none')
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
      .style('pointer-events', 'none')
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
    <div ref={containerRef} className={treemapContainer} style={{ position: 'relative' }}>
      <svg ref={svgRef} />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.15s ease',
          background: 'rgba(10, 10, 15, 0.95)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 6,
          padding: '6px 10px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          whiteSpace: 'nowrap',
          zIndex: 10,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      />
    </div>
  );
};

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
