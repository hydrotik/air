import { render, screen } from '@testing-library/react';
import { TokenFlowChart } from './TokenFlowChart';
import { makeEvent, tokenUsage } from '../__testing__/fixtures';

describe('TokenFlowChart', () => {
  it('shows an empty state without token_usage events', () => {
    render(<TokenFlowChart events={[makeEvent('turn_start', { turnIndex: 1 })]} />);
    expect(screen.getByText('No token usage data yet')).toBeInTheDocument();
  });

  it('draws cache-read, output and input series with K-formatted ticks', () => {
    const { container } = render(
      <TokenFlowChart
        events={[
          tokenUsage(4_000, 500),
          makeEvent('turn_end', { turnIndex: 1, toolCallCount: 0 }),
          tokenUsage(8_000, 1_200, { cacheRead: 3_000 }),
        ]}
      />
    );
    expect(container.querySelectorAll('.recharts-area-curve')).toHaveLength(3);
    const ticks = Array.from(container.querySelectorAll('.recharts-cartesian-axis-tick-value')).map(
      (t) => t.textContent
    );
    expect(ticks[0]).toBe('0');
    expect(ticks.slice(1).every((t) => /^\d+K$/.test(t!))).toBe(true);
  });
});
