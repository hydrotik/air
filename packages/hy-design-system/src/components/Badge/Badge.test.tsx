import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Badge } from './Badge';

expect.extend(toHaveNoViolations);

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it.each(['default', 'secondary', 'destructive', 'outline', 'success', 'warning'] as const)(
    'renders variant=%s',
    (variant) => {
      render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
    },
  );

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('merges className', () => {
    render(<Badge className="custom">Text</Badge>);
    expect(screen.getByText('Text').className).toContain('custom');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Badge>Accessible</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
