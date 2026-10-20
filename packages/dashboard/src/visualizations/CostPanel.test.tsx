import { render, screen, within } from '@testing-library/react';
import { CostPanel } from './CostPanel';

const breakdownRow = {
  model: 'opus',
  provider: 'anthropic',
  event_count: 12,
  total_input_cost: 1.5,
  total_output_cost: 0.0456,
  total_cache_read_cost: 0.002,
  total_cache_write_cost: 0.003,
  total_cost: 1.5506,
  cumulative_cost: 1.5506,
  budget_limit: null,
  budget_exceeded: 0,
};

const point = (cumulative: number, budget: number | null = null) => ({
  timestamp: 0,
  total_cost: 0.1,
  cumulative_cost: cumulative,
  model: 'opus',
  budget_limit: budget,
});

describe('CostPanel', () => {
  it('shows an empty state with no data', () => {
    render(<CostPanel breakdown={[]} timeseries={[]} />);
    expect(screen.getByText('No cost data recorded yet')).toBeInTheDocument();
  });

  it('tabulates cost per model with magnitude-aware precision', () => {
    render(<CostPanel breakdown={[breakdownRow]} timeseries={[]} />);
    const headers = screen.getAllByRole('columnheader').map((h) => h.textContent);
    expect(headers).toEqual(['Model', 'Events', 'Input', 'Output', 'Cache', 'Total']);
    const cells = within(screen.getAllByRole('row')[1]!)
      .getAllByRole('cell')
      .map((c) => c.textContent);
    expect(cells).toEqual(['opus', '12', '$1.50', '$0.046', '$0.0050', '$1.55']);
  });

  it('shows a dash for the split when a source reports only the total', () => {
    const totalOnly = {
      ...breakdownRow,
      total_input_cost: 0,
      total_output_cost: 0,
      total_cache_read_cost: 0,
      total_cache_write_cost: 0,
      total_cost: 0.1282,
    };
    render(<CostPanel breakdown={[totalOnly]} timeseries={[]} />);
    const cells = within(screen.getAllByRole('row')[1]!)
      .getAllByRole('cell')
      .map((c) => c.textContent);
    expect(cells).toEqual(['opus', '12', '—', '—', '—', '$0.128']);
  });

  it('hides the table in compact mode', () => {
    render(<CostPanel breakdown={[breakdownRow]} timeseries={[]} compact />);
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('draws the cumulative chart only with more than two points', () => {
    const { container, rerender } = render(
      <CostPanel breakdown={[]} timeseries={[point(0.1), point(0.2)]} />
    );
    expect(container.querySelector('.recharts-wrapper')).toBeNull();

    rerender(<CostPanel breakdown={[]} timeseries={[point(0.1), point(0.2), point(0.3)]} />);
    expect(container.querySelectorAll('.recharts-area-curve')).toHaveLength(1);
    expect(container.querySelector('.recharts-reference-line')).toBeNull();
  });

  it('draws the budget line once spend reaches the budget', () => {
    const { container } = render(
      <CostPanel breakdown={[]} timeseries={[point(1), point(2, 2.5), point(3, 2.5)]} />
    );
    expect(container.querySelector('.recharts-label')).toHaveTextContent('Budget $2.5');
  });

  // BUG: the Y axis auto-fits to the cumulative cost only, and Recharts discards a
  // ReferenceLine outside the domain, so the budget line is invisible until spend has
  // already reached it, i.e. exactly when a budget warning would be useful it is missing.
  // Fix: `ifOverflow="extendDomain"` on the ReferenceLine (or include the budget in the domain).
  it.failing('draws the budget line while spend is still under budget', () => {
    const { container } = render(
      <CostPanel breakdown={[]} timeseries={[point(1), point(2, 5), point(3, 5)]} />
    );
    expect(container.querySelector('.recharts-label')).toHaveTextContent('Budget $5');
  });
});
