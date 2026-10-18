import { fireEvent, render, screen } from '@testing-library/react';
import { SessionSelector } from './SessionSelector';
import { NOW, makeSession } from '../__testing__/fixtures';

describe('SessionSelector', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(NOW);
  });
  afterEach(() => jest.restoreAllMocks());

  it('shows an empty state with no sessions', () => {
    render(<SessionSelector sessions={[]} activeSessionId={null} onSelect={() => {}} />);
    expect(screen.getByText('No sessions recorded')).toBeInTheDocument();
  });

  it('renders provider/model, the last two cwd segments and counts', () => {
    render(
      <SessionSelector sessions={[makeSession()]} activeSessionId={null} onSelect={() => {}} />
    );
    expect(screen.getByText('anthropic/sonnet-4')).toBeInTheDocument();
    expect(screen.getByText('projects/air-demo')).toBeInTheDocument();
    expect(screen.getByText('6 turns · 17 tools · $0.123')).toBeInTheDocument();
    expect(screen.getByText('5m ago')).toBeInTheDocument();
    expect(screen.getByText('CC')).toBeInTheDocument();
  });

  it('omits the cost when it is zero', () => {
    render(
      <SessionSelector
        sessions={[makeSession({ totalCost: 0 })]}
        activeSessionId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('6 turns · 17 tools')).toBeInTheDocument();
  });

  it.each([
    [30_000, 'just now'],
    [2 * 3_600_000, '2h ago'],
    [3 * 86_400_000, '3d ago'],
  ])('formats a last event %dms ago as "%s"', (age, label) => {
    render(
      <SessionSelector
        sessions={[makeSession({ lastEventTime: NOW - age })]}
        activeSessionId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it.each([
    ['pi', 'π'],
    ['codex', 'CX'],
    ['sdk', 'SDK'],
    ['something-else', '?'],
  ])('badges agent %s as %s', (agent, badge) => {
    render(
      <SessionSelector
        sessions={[makeSession({ agent })]}
        activeSessionId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText(badge)).toBeInTheDocument();
  });

  it('highlights the active session and reports selections', () => {
    const onSelect = jest.fn();
    render(
      <SessionSelector
        sessions={[
          makeSession({ sessionId: 's1', model: 'model-a' }),
          makeSession({ sessionId: 's2', model: 'model-b' }),
        ]}
        activeSessionId="s1"
        onSelect={onSelect}
      />
    );
    const rowA = screen.getByText('anthropic/model-a').closest('.sessionItem')!;
    const rowB = screen.getByText('anthropic/model-b').closest('.sessionItem')!;
    expect(rowA).toHaveClass('sessionItemActive');
    expect(rowB).not.toHaveClass('sessionItemActive');

    fireEvent.click(screen.getByText('anthropic/model-b'));
    expect(onSelect).toHaveBeenCalledWith('s2');
  });
});
