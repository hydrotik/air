import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { TypingAnimation } from './TypingAnimation';

// Use fake timers
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('TypingAnimation', () => {
  it('renders empty initially', () => {
    render(<TypingAnimation text="Hello world" />);
    // Before any timers fire, cursor should be visible
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('shows first word after first tick', () => {
    render(<TypingAnimation text="Hello world" speed={100} />);
    act(() => { jest.advanceTimersByTime(150); });
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
  });

  it('calls onComplete when done', () => {
    const onComplete = jest.fn();
    render(<TypingAnimation text="Hi" speed={50} onComplete={onComplete} />);
    // Advance enough to type 1 word and finish
    act(() => { jest.advanceTimersByTime(500); });
    expect(onComplete).toHaveBeenCalled();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TypingAnimation ref={ref} text="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('hides cursor when showCursor is false', () => {
    render(<TypingAnimation text="Test" showCursor={false} />);
    expect(screen.queryByText('|')).not.toBeInTheDocument();
  });
});
