import { render, screen } from '@testing-library/react';
import { KpiCard } from './KpiCard';

describe('KpiCard', () => {
  it('renders label, value and sub-label', () => {
    render(<KpiCard label="Total Cost" value="$0.1235" sub="this session" />);
    expect(screen.getByText('Total Cost')).toBeInTheDocument();
    expect(screen.getByText('$0.1235')).toBeInTheDocument();
    expect(screen.getByText('this session')).toBeInTheDocument();
  });

  it('renders numeric values as-is', () => {
    render(<KpiCard label="Turns" value={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('omits the sub-label when none is given', () => {
    const { container } = render(<KpiCard label="Turns" value={3} />);
    expect(container.querySelector('.kpiSub')).toBeNull();
  });

  it('applies the accent colour to the value only', () => {
    render(<KpiCard label="Context" value="91.0%" color="#ef4444" />);
    expect(screen.getByText('91.0%')).toHaveStyle({ color: '#ef4444' });
    expect(screen.getByText('Context')).not.toHaveAttribute('style');
  });
});
