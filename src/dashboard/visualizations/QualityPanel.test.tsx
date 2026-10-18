import { render, screen } from '@testing-library/react';
import { QualityPanel } from './QualityPanel';

const stat = (fields: Record<string, unknown> = {}) => ({
  model: 'opus',
  provider: 'anthropic',
  eval_count: 10,
  avg_response_tokens: 400,
  avg_tool_success_rate: 0.97,
  total_retries: 3,
  total_follow_ups: 1,
  avg_response_latency_ms: 900,
  avg_cache_hit_rate: 0.456,
  avg_user_rating: null,
  rated_count: 0,
  ...fields,
});

const point = (rate: number) => ({
  timestamp: 0,
  turn_index: 1,
  tool_success_rate: rate,
  response_latency_ms: 100,
  cache_hit_rate: 0.5,
  user_rating: null,
  had_retry: 0,
  had_immediate_follow_up: 0,
});

describe('QualityPanel', () => {
  it('shows an empty state with no data', () => {
    render(<QualityPanel stats={[]} timeseries={[]} />);
    expect(screen.getByText('No evaluation data yet')).toBeInTheDocument();
  });

  it('summarises each model as percentages and retry count', () => {
    render(<QualityPanel stats={[stat()]} timeseries={[]} />);
    expect(screen.getByText('opus')).toBeInTheDocument();
    expect(screen.getByText('97%')).toBeInTheDocument();
    expect(screen.getByText('46%')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText(/rated/)).toBeNull();
  });

  it.each([
    [0.96, '#22c55e'],
    [0.85, '#f59e0b'],
    [0.5, '#ef4444'],
  ])('colours a tool success rate of %s as %s', (rate, color) => {
    render(<QualityPanel stats={[stat({ avg_tool_success_rate: rate })]} timeseries={[]} />);
    expect(screen.getByText(`${Math.round(rate * 100)}%`)).toHaveStyle({ color });
  });

  it('renders the rating as stars when present', () => {
    render(
      <QualityPanel stats={[stat({ avg_user_rating: 3.6, rated_count: 7 })]} timeseries={[]} />
    );
    expect(screen.getByText('★★★★☆')).toBeInTheDocument();
    expect(screen.getByText('7 rated')).toBeInTheDocument();
  });

  it('draws success and cache series once there are more than two points', () => {
    const { container, rerender } = render(
      <QualityPanel stats={[]} timeseries={[point(1), point(0.5)]} />
    );
    expect(container.querySelector('.recharts-wrapper')).toBeNull();
    rerender(<QualityPanel stats={[]} timeseries={[point(1), point(0.5), point(0.75)]} />);
    expect(container.querySelectorAll('.recharts-area-curve')).toHaveLength(2);
  });
});
