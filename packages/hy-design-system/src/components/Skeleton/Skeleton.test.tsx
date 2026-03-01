import React from 'react';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders a div', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('merges className', () => {
    const { container } = render(<Skeleton className="custom" />);
    expect((container.firstChild as HTMLElement).className).toContain('custom');
  });

  it('applies style overrides', () => {
    const { container } = render(<Skeleton style={{ width: 100, height: 20 }} />);
    expect(container.firstChild).toHaveStyle({ width: '100px', height: '20px' });
  });
});
