import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FlagTag } from './FlagTag';

expect.extend(toHaveNoViolations);

describe('FlagTag', () => {
  it('renders with default props', () => {
    render(<FlagTag data-testid="flag" />);
    const flag = screen.getByTestId('flag');
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveTextContent('⚠');
    expect(flag).toHaveTextContent('FLAG');
  });

  it('renders custom icon and label', () => {
    render(<FlagTag icon="🔍" label="REVIEW" data-testid="flag" />);
    const flag = screen.getByTestId('flag');
    expect(flag).toHaveTextContent('🔍');
    expect(flag).toHaveTextContent('REVIEW');
  });

  it('applies marginLeft style', () => {
    render(<FlagTag marginLeft="16px" data-testid="flag" />);
    expect(screen.getByTestId('flag')).toHaveStyle({ marginLeft: '16px' });
  });

  it('defaults marginLeft to 8px', () => {
    render(<FlagTag data-testid="flag" />);
    expect(screen.getByTestId('flag')).toHaveStyle({ marginLeft: '8px' });
  });

  it.each(['destructive', 'warning', 'success', 'primary', 'muted'] as const)(
    'renders variant=%s',
    (variant) => {
      render(<FlagTag variant={variant} data-testid="flag" />);
      expect(screen.getByTestId('flag')).toBeInTheDocument();
    },
  );

  it.each(['xs', 'sm', 'md', 'lg'] as const)('renders size=%s', (size) => {
    render(<FlagTag size={size} data-testid="flag" />);
    expect(screen.getByTestId('flag')).toHaveAttribute('data-flag-size', size);
  });

  it('accepts React node as icon', () => {
    render(<FlagTag icon={<span data-testid="custom-icon">★</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('merges className', () => {
    render(<FlagTag className="custom-class" data-testid="flag" />);
    expect(screen.getByTestId('flag').className).toContain('custom-class');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<FlagTag />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
