import { render, screen, within } from '@testing-library/react';
import { LatencyPanel } from './LatencyPanel';

const stat = (fields: Record<string, unknown> = {}) => ({
  operation: 'turn',
  sample_count: 8,
  avg_ms: 1234.6,
  min_ms: 200.2,
  max_ms: 4000.9,
  avg_ttft_ms: 310.4,
  model: 'opus',
  provider: 'anthropic',
  ...fields,
});

const point = (total_ms: number) => ({
  timestamp: 0,
  total_ms,
  ttft_ms: null,
  operation: 'turn',
  model: 'opus',
});

describe('LatencyPanel', () => {
  it('shows an empty state with no data', () => {
    render(<LatencyPanel stats={[]} timeseries={[]} />);
    expect(screen.getByText('No latency data recorded yet')).toBeInTheDocument();
  });

  it('tabulates rounded latency per operation', () => {
    render(
      <LatencyPanel
        stats={[stat(), stat({ operation: 'tool_call', avg_ttft_ms: null })]}
        timeseries={[]}
      />
    );
    const [, turn, tool] = screen.getAllByRole('row');
    expect(
      within(turn!)
        .getAllByRole('cell')
        .map((c) => c.textContent)
    ).toEqual(['turn', '8', '1235ms', '200ms', '4001ms', '310ms']);
    expect(within(tool!).getAllByRole('cell')[5]).toHaveTextContent('—');
  });

  it('hides the table in compact mode', () => {
    render(<LatencyPanel stats={[stat()]} timeseries={[]} compact />);
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('draws the latency chart with ms ticks once there are more than two points', () => {
    const { container } = render(
      <LatencyPanel stats={[]} timeseries={[point(100), point(250), point(400)]} />
    );
    expect(container.querySelectorAll('.recharts-area-curve')).toHaveLength(1);
    const ticks = Array.from(container.querySelectorAll('.recharts-cartesian-axis-tick-value'));
    expect(ticks.length).toBeGreaterThan(0);
    expect(ticks.every((t) => t.textContent!.endsWith('ms'))).toBe(true);
  });
});
