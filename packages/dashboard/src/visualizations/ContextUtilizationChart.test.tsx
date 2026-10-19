import { render, screen } from '@testing-library/react';
import { ContextUtilizationChart } from './ContextUtilizationChart';

const snap = (utilization: number) => ({
  timestamp: 0,
  tokens_used: utilization * 2_000,
  context_window: 200_000,
  utilization,
});

describe('ContextUtilizationChart', () => {
  it('shows an empty state with no snapshots', () => {
    render(<ContextUtilizationChart snapshots={[]} />);
    expect(screen.getByText('No context snapshots yet')).toBeInTheDocument();
  });

  it('plots utilisation on a fixed 0–100% axis with the 80% warning line', () => {
    const { container } = render(
      <ContextUtilizationChart snapshots={[snap(10), snap(45), snap(120)]} />
    );
    const ticks = Array.from(container.querySelectorAll('.recharts-cartesian-axis-tick-value')).map(
      (t) => t.textContent
    );
    expect(ticks).toEqual(['0%', '25%', '50%', '75%', '100%']);
    expect(container.querySelector('.recharts-label')).toHaveTextContent('80%');
    expect(container.querySelectorAll('.recharts-reference-line')).toHaveLength(2);
    expect(container.querySelectorAll('.recharts-area-curve')).toHaveLength(1);
  });
});
