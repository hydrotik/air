import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { waterfallContainer } from '../dashboard.css';

interface ToolCall {
  tool_call_id: string;
  tool_name: string;
  start_time: number;
  end_time?: number;
  duration_ms?: number;
  is_error: number;
}

interface Props {
  toolCalls: ToolCall[];
}

const TOOL_COLORS: Record<string, string> = {
  read: '#3b82f6',
  bash: '#f59e0b',
  edit: '#10b981',
  write: '#8b5cf6',
  grep: '#06b6d4',
  find: '#ec4899',
  ls: '#64748b',
};

export const ToolWaterfall: React.FC<Props> = ({ toolCalls }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || toolCalls.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const barHeight = 14;
    const gap = 2;
    const labelWidth = 50;
    const durationLabelWidth = 50;
    const margin = { top: 6, right: durationLabelWidth + 6, bottom: 16, left: labelWidth + 6 };
    const height = Math.max(150, toolCalls.length * (barHeight + gap) + margin.top + margin.bottom);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    const minTime = d3.min(toolCalls, (d) => d.start_time) ?? 0;
    const maxTime = d3.max(toolCalls, (d) => d.end_time ?? d.start_time + (d.duration_ms ?? 100)) ?? minTime + 1000;

    const xScale = d3
      .scaleLinear()
      .domain([0, maxTime - minTime])
      .range([margin.left, width - margin.right]);

    // Grid lines
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat((d) => `${d}ms`);
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis as any)
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('font-size', '8px')
      .attr('color', 'rgba(255,255,255,0.3)');

    // Bars
    const bars = svg
      .selectAll('.bar-group')
      .data(toolCalls)
      .join('g')
      .attr('class', 'bar-group')
      .attr('transform', (_, i) => `translate(0,${margin.top + i * (barHeight + gap)})`);

    // Tool name labels
    bars
      .append('text')
      .attr('x', margin.left - 4)
      .attr('y', barHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('fill', 'rgba(255,255,255,0.6)')
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('font-size', '9px')
      .text((d) => d.tool_name);

    // Bars
    bars
      .append('rect')
      .attr('x', (d) => xScale(d.start_time - minTime))
      .attr('width', (d) => {
        const end = d.end_time ?? d.start_time + (d.duration_ms ?? 50);
        return Math.max(2, xScale(end - minTime) - xScale(d.start_time - minTime));
      })
      .attr('height', barHeight)
      .attr('rx', 3)
      .attr('fill', (d) => {
        if (d.is_error) return '#ef4444';
        return TOOL_COLORS[d.tool_name] ?? '#64748b';
      })
      .attr('fill-opacity', 0.8);

    // Duration labels
    bars
      .append('text')
      .attr('x', (d) => {
        const end = d.end_time ?? d.start_time + (d.duration_ms ?? 50);
        return xScale(end - minTime) + 6;
      })
      .attr('y', barHeight / 2)
      .attr('dy', '0.35em')
      .attr('fill', 'rgba(255,255,255,0.4)')
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('font-size', '8px')
      .text((d) => (d.duration_ms != null ? `${d.duration_ms}ms` : '…'));
  }, [toolCalls]);

  if (toolCalls.length === 0) {
    return (
      <div className={waterfallContainer}>
        <div style={{ padding: 24, textAlign: 'center', opacity: 0.5, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          No tool calls recorded
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={waterfallContainer}>
      <svg ref={svgRef} />
    </div>
  );
};
