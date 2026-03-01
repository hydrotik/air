import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Price } from './Price';

expect.extend(toHaveNoViolations);

describe('Price', () => {
  it('renders a formatted price', () => {
    render(<Price amount={129.99} />);
    expect(screen.getByText(/\$129\.99/)).toBeInTheDocument();
  });

  it('renders with different currency', () => {
    render(<Price amount={29.99} currency="EUR" locale="de-DE" />);
    // Euro formatting
    expect(screen.getByText(/29,99/)).toBeInTheDocument();
  });

  it('hides cents when showCents is false', () => {
    render(<Price amount={59.99} showCents={false} />);
    const text = screen.getByText(/\$60/).textContent;
    expect(text).not.toMatch(/\.99/);
  });

  it('shows original price when originalAmount is provided', () => {
    render(<Price amount={99.99} originalAmount={149.99} />);
    expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();
    expect(screen.getByText(/\$149\.99/)).toBeInTheDocument();
  });

  it('renders original price as a separate element', () => {
    render(<Price amount={99.99} originalAmount={149.99} />);
    // Both prices rendered — original and discount
    expect(screen.getByText(/\$149\.99/)).toBeInTheDocument();
    expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg', 'xl'] as const)('renders size=%s', (size) => {
    render(<Price amount={59.99} size={size} />);
    expect(screen.getByText(/\$59\.99/)).toBeInTheDocument();
  });

  it('forwards className', () => {
    const { container } = render(<Price amount={10} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Price amount={129.99} originalAmount={149.99} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
