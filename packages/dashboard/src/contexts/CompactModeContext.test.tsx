import { render, screen } from '@testing-library/react';
import { CompactModeProvider, useCompactMode } from './CompactModeContext';

const Probe = () => <span>{useCompactMode() ? 'compact' : 'full'}</span>;

describe('CompactModeContext', () => {
  it('defaults to non-compact without a provider', () => {
    render(<Probe />);
    expect(screen.getByText('full')).toBeInTheDocument();
  });

  it.each([
    [true, 'compact'],
    [false, 'full'],
  ])('provides value=%s', (value, text) => {
    render(
      <CompactModeProvider value={value}>
        <Probe />
      </CompactModeProvider>
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('lets the nearest provider win', () => {
    render(
      <CompactModeProvider value>
        <CompactModeProvider value={false}>
          <Probe />
        </CompactModeProvider>
      </CompactModeProvider>
    );
    expect(screen.getByText('full')).toBeInTheDocument();
  });
});
