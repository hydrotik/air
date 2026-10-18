import { render, screen, within } from '@testing-library/react';
import { PromptPanel } from './PromptPanel';

const variant = (fields: Record<string, unknown> = {}) => ({
  prompt_hash: 'abc',
  variant: 'terse-v2',
  category: 'refactor',
  model: 'opus',
  sample_count: 25,
  goal_rate: 0.84,
  avg_turns: 3.25,
  avg_tokens: 15_400,
  avg_cost: 0.0234,
  avg_latency_ms: 900,
  avg_tool_error_rate: 0.15,
  compaction_rate: 0,
  avg_rating: 4.26,
  rated_count: 5,
  ...fields,
});

describe('PromptPanel', () => {
  it('shows a hint when there are no rated prompts', () => {
    render(<PromptPanel variants={[]} />);
    expect(screen.getByText('air.ratePrompt()')).toBeInTheDocument();
  });

  it('renders a row per variant with formatted metrics', () => {
    render(<PromptPanel variants={[variant()]} />);
    const cells = within(screen.getAllByRole('row')[1]!).getAllByRole('cell');
    expect(cells.map((c) => c.textContent)).toEqual([
      'terse-v2',
      'refactor',
      '25',
      '84%',
      '3.3',
      '15.4K',
      '$0.023',
      '15%',
      '4.3 ★',
    ]);
    expect(cells[7]).toHaveStyle({ color: '#ef4444' });
    expect(screen.getByText(/SHA-256 hash/)).toBeInTheDocument();
  });

  it.each([
    [0.9, '#22c55e'],
    [0.6, '#f59e0b'],
    [0.2, '#ef4444'],
  ])('colours a goal rate of %s as %s', (goal_rate, color) => {
    render(<PromptPanel variants={[variant({ goal_rate })]} />);
    expect(screen.getByText(`${Math.round(goal_rate * 100)}%`)).toHaveStyle({ color });
  });

  it('shows a dash for unrated variants and small costs at 4dp', () => {
    render(
      <PromptPanel variants={[variant({ avg_rating: null, avg_cost: 0.0012, avg_tokens: 812 })]} />
    );
    const cells = within(screen.getAllByRole('row')[1]!).getAllByRole('cell');
    expect(cells[8]).toHaveTextContent('—');
    expect(cells[6]).toHaveTextContent('$0.0012');
    expect(cells[5]).toHaveTextContent('812');
  });
});
