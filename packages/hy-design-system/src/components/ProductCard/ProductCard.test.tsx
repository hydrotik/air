import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ProductCard, ProductCardSkeleton } from './ProductCard';
import type { ProductCardProduct } from './ProductCard';

expect.extend(toHaveNoViolations);

const mockProduct: ProductCardProduct = {
  id: 1,
  name: 'Cream Velvet Suit',
  price: 129.99,
  thumbnailSrc: '/images/products/1-cream-velvet-suit-thumbnail.jpg',
  alternateSrc: '/images/products/1-cream-velvet-suit-alternate.jpg',
  colors: [
    { name: 'Navy', hex: '#1a2744' },
    { name: 'Cream', hex: '#d4c5a9' },
  ],
};

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Cream Velvet Suit')).toBeInTheDocument();
  });

  it('renders product image', () => {
    render(<ProductCard product={mockProduct} />);
    const img = screen.getByAltText('Cream Velvet Suit');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProduct.thumbnailSrc);
  });

  it('passes color data through to product for render props', () => {
    render(
      <ProductCard
        product={mockProduct}
        renderActions={(p) => (
          <div>{p.colors?.map((c) => <span key={c.hex}>{c.name}</span>)}</div>
        )}
      />,
    );
    expect(screen.getByText('Navy')).toBeInTheDocument();
    expect(screen.getByText('Cream')).toBeInTheDocument();
  });

  it('renders wishlist button', () => {
    render(
      <ProductCard product={mockProduct} onWishlistToggle={jest.fn()} />,
    );
    expect(screen.getByRole('button', { name: /wishlist/i })).toBeInTheDocument();
  });

  it('calls onWishlistToggle when wishlist button is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(<ProductCard product={mockProduct} onWishlistToggle={onToggle} />);
    await user.click(screen.getByRole('button', { name: /wishlist/i }));
    expect(onToggle).toHaveBeenCalledWith(mockProduct);
  });

  it('renders custom actions via renderActions prop', () => {
    render(
      <ProductCard
        product={mockProduct}
        renderActions={() => <button>Custom Action</button>}
      />,
    );
    expect(screen.getByRole('button', { name: /custom action/i })).toBeInTheDocument();
  });

  it('renders custom price via renderPrice prop', () => {
    render(
      <ProductCard
        product={mockProduct}
        renderPrice={(p) => <span>${p.price}</span>}
      />,
    );
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  it('renders product link when href is provided', () => {
    const product = { ...mockProduct, href: '/products/1' };
    render(<ProductCard product={product} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('forwards className', () => {
    const { container } = render(
      <ProductCard product={mockProduct} className="custom" />,
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('ProductCardSkeleton', () => {
  it('renders skeleton elements', () => {
    const { container } = render(<ProductCardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ProductCardSkeleton />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
