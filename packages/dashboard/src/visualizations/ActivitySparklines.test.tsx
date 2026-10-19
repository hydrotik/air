import { render, screen } from '@testing-library/react';
import { ActivitySparklines } from './ActivitySparklines';

const point = (fields: Record<string, unknown>) => ({ timestamp: 0, duration_ms: 100, ...fields });

function row(label: string): HTMLElement {
  // label span → label wrapper → row
  return screen.getByText(label).parentElement!.parentElement as HTMLElement;
}

describe('ActivitySparklines', () => {
  it('shows an empty state with no timeseries', () => {
    render(<ActivitySparklines mcpTimeseries={[]} ragTimeseries={[]} toolTimeseries={[]} />);
    expect(screen.getByText(/No activity data yet/)).toBeInTheDocument();
  });

  it('groups tool calls by name, busiest first, with count/avg/last stats', () => {
    const { container } = render(
      <ActivitySparklines
        mcpTimeseries={[]}
        ragTimeseries={[]}
        toolTimeseries={[
          point({ tool_name: 'read', duration_ms: 10 }),
          point({ tool_name: 'bash', duration_ms: 100 }),
          point({ tool_name: 'bash', duration_ms: 201 }),
          point({ tool_name: 'bash', duration_ms: 300, is_error: 1 }),
        ]}
      />
    );
    expect(screen.getByText('Tool Calls')).toBeInTheDocument();
    expect(screen.queryByText('MCP Servers')).toBeNull();

    const labels = Array.from(container.querySelectorAll('span[style*="font-weight: 600"]'))
      .map((s) => s.textContent)
      .filter((t) => t === 'read' || t === 'bash');
    expect(labels).toEqual(['bash', 'read']);

    const bash = row('bash');
    expect(bash).toHaveTextContent('count3');
    expect(bash).toHaveTextContent('avg200ms');
    expect(bash).toHaveTextContent('last300ms');
    expect(bash).toHaveTextContent('err1');
    expect(bash.querySelector('polyline')).not.toBeNull();

    // a single point cannot be drawn as a line
    const read = row('read');
    expect(read).not.toHaveTextContent('err');
    expect(read.querySelector('svg')).toBeNull();
    expect(read).toHaveTextContent('—');
  });

  it('truncates long labels', () => {
    render(
      <ActivitySparklines
        mcpTimeseries={[]}
        ragTimeseries={[]}
        toolTimeseries={[point({ tool_name: 'a_really_long_tool_name' })]}
      />
    );
    expect(screen.getByText('a_really_lon…')).toBeInTheDocument();
  });

  it('groups MCP calls by server:method and caps at 8 rows', () => {
    const mcp = Array.from({ length: 10 }, (_, i) =>
      point({ server_name: `s${i}`, method: 'call' })
    );
    render(<ActivitySparklines mcpTimeseries={mcp} ragTimeseries={[]} toolTimeseries={[]} />);
    expect(screen.getByText('MCP Servers')).toBeInTheDocument();
    expect(screen.getByText('s0:call')).toBeInTheDocument();
    expect(screen.getByText('s7:call')).toBeInTheDocument();
    expect(screen.queryByText('s8:call')).toBeNull();
  });

  it('labels RAG rows by type, adding per-source rows when there are several sources', () => {
    const { rerender } = render(
      <ActivitySparklines
        mcpTimeseries={[]}
        toolTimeseries={[]}
        ragTimeseries={[
          point({ type: 'rag_retrieval', source: 'docs' }),
          point({ type: 'rag_embedding', source: 'docs' }),
        ]}
      />
    );
    expect(screen.getByText('RAG Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Retrieval')).toBeInTheDocument();
    expect(screen.getByText('Embedding')).toBeInTheDocument();
    expect(screen.queryByText('docs')).toBeNull();

    rerender(
      <ActivitySparklines
        mcpTimeseries={[]}
        toolTimeseries={[]}
        ragTimeseries={[
          point({ type: 'rag_index', source: 'docs' }),
          point({ type: 'rag_index', source: 'wiki' }),
        ]}
      />
    );
    expect(screen.getByText('Indexing')).toBeInTheDocument();
    expect(screen.getByText('docs')).toBeInTheDocument();
    expect(screen.getByText('wiki')).toBeInTheDocument();
  });

  it('buckets long series to at most 40 sparkline points', () => {
    const tool = Array.from({ length: 400 }, (_, i) =>
      point({ tool_name: 'read', duration_ms: i })
    );
    const { container } = render(
      <ActivitySparklines mcpTimeseries={[]} ragTimeseries={[]} toolTimeseries={tool} />
    );
    const points = container.querySelector('polyline')!.getAttribute('points')!.split(' ');
    expect(points).toHaveLength(40);
    expect(row('read')).toHaveTextContent('count400');
  });
});
