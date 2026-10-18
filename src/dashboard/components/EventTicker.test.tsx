import { act, render, screen } from '@testing-library/react';
import { EventTicker } from './EventTicker';
import { makeEvent } from '../__testing__/fixtures';

const toolEnd = (toolName: string, extra: Record<string, unknown> = {}) =>
  makeEvent('tool_call_end', { toolName, durationMs: 15, isError: false, ...extra });

describe('EventTicker', () => {
  afterEach(() => jest.useRealTimers());

  it('shows a waiting state until a key event arrives', () => {
    render(<EventTicker events={[makeEvent('turn_start', { turnIndex: 1 })]} />);
    expect(screen.getByText('Waiting for events…')).toBeInTheDocument();
  });

  it('shows the latest successful tool call', () => {
    render(<EventTicker events={[toolEnd('read'), toolEnd('edit')]} />);
    expect(screen.getByText('TOOL')).toBeInTheDocument();
    expect(screen.getByText('edit ✓ 15ms')).toBeInTheDocument();
    expect(screen.queryByText('read ✓ 15ms')).toBeNull();
  });

  it('labels failures as errors', () => {
    render(<EventTicker events={[toolEnd('bash', { isError: true })]} />);
    expect(screen.getByText('ERROR')).toBeInTheDocument();
    expect(screen.getByText('bash ✗ failed')).toBeInTheDocument();
  });

  it('surfaces compactions with formatted token counts', () => {
    render(<EventTicker events={[makeEvent('compaction', { tokensBefore: 182_500 })]} />);
    expect(screen.getByText('COMPACT')).toBeInTheDocument();
    expect(screen.getByText('182.5K tokens → summary')).toBeInTheDocument();
  });

  it('treats any errored event as a key event', () => {
    render(
      <EventTicker
        events={[makeEvent('mcp_response', { isError: true, serverName: 'fs', method: 'x' })]}
      />
    );
    expect(screen.getByText('ERROR')).toBeInTheDocument();
    expect(screen.getByText('mcp_response')).toBeInTheDocument();
  });

  it('animates the previous event out and removes it after 300ms', () => {
    jest.useFakeTimers();
    const first = toolEnd('read');
    const { rerender, container } = render(<EventTicker events={[first]} />);
    rerender(<EventTicker events={[first, toolEnd('write')]} />);

    expect(container.querySelector('.tickerItemExit')).toHaveTextContent('read ✓ 15ms');
    expect(container.querySelector('.tickerItemEnter')).toHaveTextContent('write ✓ 15ms');

    act(() => jest.advanceTimersByTime(300));
    expect(container.querySelector('.tickerItemExit')).toBeNull();
  });

  // Regression: a non-key event (e.g. a heartbeat) arriving during the 300ms exit animation
  // used to cancel the exit timer without re-arming it, leaving the item on screen forever.
  it('removes the exiting item even if a non-key event arrives mid-animation', () => {
    jest.useFakeTimers();
    const first = toolEnd('read');
    const second = toolEnd('write');
    const { rerender, container } = render(<EventTicker events={[first]} />);
    rerender(<EventTicker events={[first, second]} />);
    act(() => jest.advanceTimersByTime(100));
    rerender(<EventTicker events={[first, second, makeEvent('heartbeat')]} />);

    act(() => jest.advanceTimersByTime(1_000));
    expect(container.querySelector('.tickerItemExit')).toBeNull();
  });
});
