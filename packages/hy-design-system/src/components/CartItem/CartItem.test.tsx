import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CartItem, CartItemSkeleton } from './CartItem';
import type { CartItemData } from './CartItem';

expect.extend(toHaveNoViolations);

const mockItem: CartItemData = {
  id: 1,
  name: 'Cream Velvet Suit',
  price: 129.99,
  quantity: 2,
  color: 'Cream',
  size: 'M',
  image: '/images/products/1-cream-velvet-suit-thumbnail.jpg',
};

describe('CartItem', () => {
  it('renders item name', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByText('Cream Velvet Suit')).toBeInTheDocument();
  });

  it('renders item image', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByAltText('Cream Velvet Suit')).toBeInTheDocument();
  });

  it('renders variant info (color and size)', () => {
    const { container } = render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    // Variant text appears in the rendered output
    expect(container.textContent).toContain('Cream');
    expect(container.textContent).toContain('M');
  });

  it('renders price', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByText(/\$129\.99/)).toBeInTheDocument();
  });

  it('renders remove button', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();
    render(<CartItem item={mockItem} onRemove={onRemove} />);
    await user.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders custom price via renderPrice prop', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={jest.fn()}
        renderPrice={() => <span>Custom Price</span>}
      />,
    );
    expect(screen.getByText('Custom Price')).toBeInTheDocument();
  });

  it('renders custom quantity picker via renderQuantityPicker prop', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={jest.fn()}
        renderQuantityPicker={() => <span>Custom Picker</span>}
      />,
    );
    expect(screen.getByText('Custom Picker')).toBeInTheDocument();
  });

  it('renders without image when not provided', () => {
    const item = { ...mockItem, image: undefined };
    render(<CartItem item={item} onRemove={jest.fn()} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders without variant info when not provided', () => {
    const item = { ...mockItem, color: undefined, size: undefined };
    render(<CartItem item={item} onRemove={jest.fn()} />);
    expect(screen.getByText('Cream Velvet Suit')).toBeInTheDocument();
  });

  it('forwards className', () => {
    const { container } = render(
      <CartItem item={mockItem} onRemove={jest.fn()} className="custom" />,
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <CartItem item={mockItem} onRemove={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('CartItemSkeleton', () => {
  it('renders skeleton elements', () => {
    const { container } = render(<CartItemSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<CartItemSkeleton />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
