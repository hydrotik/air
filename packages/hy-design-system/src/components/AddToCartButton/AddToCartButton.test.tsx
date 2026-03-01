import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AddToCartButton } from './AddToCartButton';

expect.extend(toHaveNoViolations);

describe('AddToCartButton', () => {
  it('renders default label', () => {
    render(<AddToCartButton onAddToCart={jest.fn()} />);
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('renders custom children as visible text', () => {
    render(<AddToCartButton onAddToCart={jest.fn()}>Buy Now</AddToCartButton>);
    expect(screen.getByText(/buy now/i)).toBeInTheDocument();
  });

  it('calls onAddToCart when clicked', async () => {
    const user = userEvent.setup();
    const onAddToCart = jest.fn();
    render(<AddToCartButton onAddToCart={onAddToCart} />);
    await user.click(screen.getByRole('button'));
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('shows added state with quantity badge', () => {
    render(<AddToCartButton onAddToCart={jest.fn()} quantity={2} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('is disabled when quantity > 0 (already added)', () => {
    render(<AddToCartButton onAddToCart={jest.fn()} quantity={1} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onAddToCart when disabled', async () => {
    const user = userEvent.setup();
    const onAddToCart = jest.fn();
    render(<AddToCartButton onAddToCart={onAddToCart} disabled />);
    await user.click(screen.getByRole('button'));
    expect(onAddToCart).not.toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<AddToCartButton onAddToCart={jest.fn()} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it.each(['default', 'primary'] as const)('renders variant=%s', (variant) => {
    render(<AddToCartButton onAddToCart={jest.fn()} variant={variant} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s', (size) => {
    render(<AddToCartButton onAddToCart={jest.fn()} size={size} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('forwards className', () => {
    render(<AddToCartButton onAddToCart={jest.fn()} className="custom" />);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  it('forwards style', () => {
    render(<AddToCartButton onAddToCart={jest.fn()} style={{ width: '100%' }} />);
    expect(screen.getByRole('button')).toHaveStyle({ width: '100%' });
  });

  it('has no a11y violations', async () => {
    const { container } = render(<AddToCartButton onAddToCart={jest.fn()} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no a11y violations in added state', async () => {
    const { container } = render(<AddToCartButton onAddToCart={jest.fn()} quantity={3} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
