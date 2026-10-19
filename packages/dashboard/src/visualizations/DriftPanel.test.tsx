import { render, screen, within } from '@testing-library/react';
import { DriftPanel } from './DriftPanel';
import { NOW } from '../__testing__/fixtures';

let nextId = 1;
const drift = (fields: Record<string, unknown> = {}) => ({
  id: nextId++,
  session_id: 's1',
  timestamp: NOW - 5 * 60_000,
  metric: 'latency',
  model: 'opus',
  provider: 'anthropic',
  baseline: 812.4,
  current_val: 1650.6,
  deviation_pct: 103.2,
  direction: 'increase',
  severity: 'critical',
  window_size: 20,
  threshold: 50,
  ...fields,
});

const summary = (fields: Record<string, unknown> = {}) => ({
  metric: 'cost',
  severity: 'warning',
  event_count: 4,
  avg_deviation_pct: 30,
  max_deviation_pct: 45,
  first_seen: NOW - 3_600_000,
  last_seen: NOW,
  ...fields,
});

describe('DriftPanel', () => {
  beforeEach(() => jest.spyOn(Date, 'now').mockReturnValue(NOW));
  afterEach(() => jest.restoreAllMocks());

  it('shows a stable-baseline message with no data', () => {
    render(<DriftPanel events={[]} summary={[]} />);
    expect(screen.getByText('No drift detected — baselines are stable')).toBeInTheDocument();
  });

  it('renders summary badges per metric/severity', () => {
    render(<DriftPanel events={[]} summary={[summary(), summary({ metric: 'unknown_metric' })]} />);
    expect(screen.getByText('cost')).toBeInTheDocument();
    expect(screen.getAllByText('×4')).toHaveLength(2);
    expect(screen.getByText('📈')).toBeInTheDocument();
    expect(screen.queryByTestId('data-grid')).toBeNull();
  });

  it('formats values by metric in the event grid', () => {
    render(
      <DriftPanel
        summary={[]}
        events={[
          drift(),
          drift({
            metric: 'cost',
            baseline: 0.01,
            current_val: 0.004,
            deviation_pct: -60,
            direction: 'decrease',
            severity: 'warning',
            timestamp: NOW - 2 * 3_600_000,
          }),
          drift({
            metric: 'cache_hit_rate',
            baseline: 0.9,
            current_val: 0.42,
            timestamp: NOW - 86_400_000 * 2,
          }),
          drift({
            metric: 'token_usage',
            baseline: 950,
            current_val: 2_400,
            timestamp: NOW - 86_400_000 * 3,
          }),
        ]}
      />
    );
    const rows = within(screen.getByTestId('data-grid')).getAllByRole('row').slice(1);
    const cells = (i: number) =>
      within(rows[i]!)
        .getAllByRole('cell')
        .map((c) => c.textContent);
    expect(cells(0)).toEqual([
      '↑',
      '⏱ latency',
      'critical',
      '812ms',
      '1651ms',
      '+103%',
      'opus',
      '5m ago',
    ]);
    expect(cells(1)).toEqual([
      '↓',
      '💰 cost',
      'warning',
      '$0.0100',
      '$0.0040',
      '-60%',
      'opus',
      '2h ago',
    ]);
    expect(cells(2).slice(3, 5)).toEqual(['90.0%', '42.0%']);
    expect(cells(3).slice(3, 5)).toEqual(['950', '2.4K']);
    expect(cells(3)[7]).toBe('3d ago');
  });

  it('sorts newest first and caps at 20 rows', () => {
    const events = Array.from({ length: 25 }, (_, i) =>
      drift({ timestamp: NOW - i * 1_000, model: `m${i}` })
    ).reverse();
    render(<DriftPanel events={events} summary={[]} />);
    const rows = within(screen.getByTestId('data-grid')).getAllByRole('row').slice(1);
    expect(rows).toHaveLength(20);
    expect(rows[0]).toHaveTextContent('m0');
    expect(rows[19]).toHaveTextContent('m19');
  });

  it('survives going from empty to populated (stable hook order)', () => {
    const { rerender } = render(<DriftPanel events={[]} summary={[]} />);
    rerender(<DriftPanel events={[drift()]} summary={[]} />);
    expect(screen.getByTestId('data-grid')).toBeInTheDocument();
    rerender(<DriftPanel events={[]} summary={[]} />);
    expect(screen.getByText(/baselines are stable/)).toBeInTheDocument();
  });
});
