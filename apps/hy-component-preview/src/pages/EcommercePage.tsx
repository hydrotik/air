import { useState } from 'react';
import {
  Price,
  ColorSwatch,
  QuantityPicker,
  ProductCard,
  ProductCardSkeleton,
  CartItem,
  CartItemSkeleton,
  AddToCartButton,
  Button,
  Badge,
} from '@hydrotik/design-system';
import type { ProductCardProduct, CartItemData } from '@hydrotik/design-system';
import {
  pageRoot,
  pageTitle,
  pageDescription,
  section,
  sectionTitle,
  sectionDescription,
  productGrid,
  cartLayout,
  cartItems,
  cartSummary,
  cartSummaryTitle,
  cartSummaryRow,
  cartSummaryTotal,
  showcaseGrid,
  showcaseCard,
  showcaseLabel,
  showcaseRow,
  divider,
  skeletonGrid,
} from './EcommercePage.css';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const MOCK_PRODUCTS: ProductCardProduct[] = [
  {
    id: 1,
    name: 'Cream Velvet Suit',
    price: 129.99,
    thumbnailSrc: '/images/products/1-cream-velvet-suit-thumbnail.jpg',
    alternateSrc: '/images/products/1-cream-velvet-suit-alternate.jpg',
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Taupe', hex: '#B38B6D' },
      { name: 'Navy', hex: '#000080' },
    ],
    href: '#',
  },
  {
    id: 2,
    name: 'Black Houndstooth Worker Suit',
    price: 99.99,
    thumbnailSrc: '/images/products/2-black-houndstooth-worker-suit-thumbnail.jpg',
    alternateSrc: '/images/products/2-black-houndstooth-worker-suit-alternate.jpg',
    colors: [{ name: 'Black', hex: '#1B1B1B' }],
    href: '#',
  },
  {
    id: 3,
    name: 'Taupe Velvet Suit',
    price: 129.99,
    originalPrice: 159.99,
    thumbnailSrc: '/images/products/3-taupe-velvet-suit-thumbnail.jpg',
    alternateSrc: '/images/products/3-taupe-velvet-suit-alternate.jpg',
    colors: [
      { name: 'Taupe', hex: '#B38B6D' },
      { name: 'Cream', hex: '#FFFDD0' },
    ],
    href: '#',
  },
  {
    id: 5,
    name: 'Blue Slim Classic Suit',
    price: 149.99,
    thumbnailSrc: '/images/products/5-blue-slim-classic-suit-thumbnail.jpg',
    alternateSrc: '/images/products/5-blue-slim-classic-suit-alternate.jpg',
    colors: [
      { name: 'Blue', hex: '#1E3A5F' },
      { name: 'Charcoal', hex: '#36454F' },
    ],
    href: '#',
  },
  {
    id: 8,
    name: 'Camel Twill Double-Breasted Suit',
    price: 179.99,
    thumbnailSrc: '/images/products/8-camel-twill-double-breasted-suit-thumbnail.jpg',
    alternateSrc: '/images/products/8-camel-twill-double-breasted-suit-alternate.jpg',
    colors: [{ name: 'Camel', hex: '#C19A6B' }],
    href: '#',
  },
  {
    id: 11,
    name: 'Beige Jersey Blazer',
    price: 89.99,
    originalPrice: 119.99,
    thumbnailSrc: '/images/products/11-beige-jersey-blazer-thumbnail.jpg',
    alternateSrc: '/images/products/11-beige-jersey-blazer-alternate.jpg',
    colors: [
      { name: 'Beige', hex: '#D2B48C' },
      { name: 'Stone', hex: '#928E85' },
    ],
    href: '#',
  },
  {
    id: 15,
    name: 'Sage Herringbone Jersey Blazer',
    price: 109.99,
    thumbnailSrc: '/images/products/15-sage-herringbone-jersey-blazer-thumbnail.jpg',
    alternateSrc: '/images/products/15-sage-herringbone-jersey-blazer-alternate.jpg',
    colors: [{ name: 'Sage', hex: '#8A9A5B' }],
    href: '#',
  },
  {
    id: 20,
    name: 'Slim Fit White Textured Shirt',
    price: 59.99,
    thumbnailSrc: '/images/products/20-slim-fit-white-textured-shirt-thumbnail.jpg',
    alternateSrc: '/images/products/20-slim-fit-white-textured-shirt-alternate.jpg',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
    ],
    href: '#',
  },
];

const MOCK_CART: CartItemData[] = [
  {
    id: 1,
    name: 'Cream Velvet Suit',
    price: 129.99,
    quantity: 1,
    color: 'Cream',
    size: 'M',
    image: '/images/products/1-cream-velvet-suit-thumbnail.jpg',
    href: '#',
  },
  {
    id: 5,
    name: 'Blue Slim Classic Suit',
    price: 149.99,
    quantity: 2,
    color: 'Blue',
    size: 'L',
    image: '/images/products/5-blue-slim-classic-suit-thumbnail.jpg',
    href: '#',
  },
  {
    id: 20,
    name: 'Slim Fit White Textured Shirt',
    price: 59.99,
    quantity: 1,
    color: 'White',
    size: 'S',
    image: '/images/products/20-slim-fit-white-textured-shirt-thumbnail.jpg',
    href: '#',
  },
];

const COLOR_OPTIONS = [
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Taupe', hex: '#B38B6D' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Black', hex: '#1B1B1B' },
  { name: 'Blue', hex: '#1E3A5F' },
  { name: 'Camel', hex: '#C19A6B' },
  { name: 'Sage', hex: '#8A9A5B' },
  { name: 'White', hex: '#FFFFFF' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function EcommercePage() {
  const [wishlisted, setWishlisted] = useState<Set<number>>(new Set([3]));
  const [cartQuantities, setCartQuantities] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 1,
    5: 0,
    8: 0,
    11: 0,
    15: 0,
    20: 0,
  });
  const [selectedColor, setSelectedColor] = useState('Navy');
  const [demoQuantity, setDemoQuantity] = useState(3);
  const [cart, setCart] = useState(MOCK_CART);

  const toggleWishlist = (product: ProductCardProduct) => {
    setWishlisted((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
  };

  const addToCart = (productId: number) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 12.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className={pageRoot}>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <h1 className={pageTitle}>E-Commerce Components</h1>
      <p className={pageDescription}>
        Commerce-ready UI components migrated from the Vartell design system — rebuilt with
        vanilla-extract tokens and dark-first theming.
      </p>

      {/* ── Product Grid ────────────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>Product Grid</h2>
        <p className={sectionDescription}>
          ProductCard with hover image swap, wishlist toggle, color swatches, and add-to-cart
          actions.
        </p>
        <div className={productGrid}>
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlisted.has(product.id)}
              onWishlistToggle={toggleWishlist}
              renderPrice={(p) => (
                <Price
                  amount={p.price}
                  originalAmount={p.originalPrice}
                  size="sm"
                />
              )}
              renderSwatches={(p) =>
                p.colors?.map((c) => (
                  <ColorSwatch
                    key={c.name}
                    hex={c.hex}
                    name={c.name}
                    size="sm"
                  />
                ))
              }
              renderActions={(p) => (
                <AddToCartButton
                  quantity={cartQuantities[p.id] || 0}
                  onAddToCart={() => addToCart(p.id)}
                  size="sm"
                  style={{ width: '100%' }}
                />
              )}
            />
          ))}
        </div>
      </div>

      <div className={divider} />

      {/* ── Shopping Cart ───────────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>Shopping Cart</h2>
        <p className={sectionDescription}>
          CartItem with image, variant info, quantity picker, remove action, and order summary.
        </p>
        <div className={cartLayout}>
          <div className={cartItems}>
            {cart.map((item) => (
              <CartItem
                key={`${item.id}-${item.color}-${item.size}`}
                item={item}
                onRemove={() => removeFromCart(item.id)}
                renderQuantityPicker={(ci) => (
                  <QuantityPicker
                    quantity={ci.quantity}
                    size="sm"
                    onIncrease={() =>
                      setCart((prev) =>
                        prev.map((c) =>
                          c.id === ci.id ? { ...c, quantity: c.quantity + 1 } : c
                        )
                      )
                    }
                    onDecrease={() =>
                      setCart((prev) =>
                        prev.map((c) =>
                          c.id === ci.id && c.quantity > 1
                            ? { ...c, quantity: c.quantity - 1 }
                            : c
                        )
                      )
                    }
                  />
                )}
                renderPrice={(ci) => <Price amount={ci.price} size="sm" />}
              />
            ))}
            {cart.length === 0 && (
              <p style={{ color: 'var(--color-muted-foreground)', fontStyle: 'italic' }}>
                Cart is empty — add items from the product grid above.
              </p>
            )}
          </div>

          <div className={cartSummary}>
            <h3 className={cartSummaryTitle}>Order Summary</h3>
            <div className={cartSummaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={cartSummaryRow}>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={cartSummaryRow}>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className={cartSummaryTotal}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button style={{ width: '100%', marginTop: '16px' }}>
              Checkout
            </Button>
          </div>
        </div>
      </div>

      <div className={divider} />

      {/* ── Component Showcase ──────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>Component Showcase</h2>
        <p className={sectionDescription}>
          Individual e-commerce primitives — Price, ColorSwatch, QuantityPicker, AddToCartButton.
        </p>
        <div className={showcaseGrid}>
          {/* Price */}
          <div className={showcaseCard}>
            <div className={showcaseLabel}>Price</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Price amount={129.99} size="xl" />
              <Price amount={99.99} originalAmount={149.99} size="lg" />
              <Price amount={59.99} size="md" />
              <Price amount={29.99} size="sm" currency="EUR" locale="de-DE" />
            </div>
          </div>

          {/* ColorSwatch */}
          <div className={showcaseCard}>
            <div className={showcaseLabel}>Color Swatch</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-muted-foreground)', marginBottom: '6px' }}>
                  Square (default)
                </div>
                <div className={showcaseRow}>
                  {COLOR_OPTIONS.map((c) => (
                    <ColorSwatch
                      key={c.name}
                      hex={c.hex}
                      name={c.name}
                      isSelected={selectedColor === c.name}
                      onClick={() => setSelectedColor(c.name)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-muted-foreground)', marginBottom: '6px' }}>
                  Circle + Sizes
                </div>
                <div className={showcaseRow}>
                  {COLOR_OPTIONS.slice(0, 4).map((c) => (
                    <ColorSwatch
                      key={c.name}
                      hex={c.hex}
                      name={c.name}
                      shape="circle"
                      size="lg"
                      isSelected={selectedColor === c.name}
                      onClick={() => setSelectedColor(c.name)}
                    />
                  ))}
                </div>
              </div>
              <Badge variant="outline">Selected: {selectedColor}</Badge>
            </div>
          </div>

          {/* QuantityPicker */}
          <div className={showcaseCard}>
            <div className={showcaseLabel}>Quantity Picker</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className={showcaseRow}>
                <QuantityPicker
                  quantity={demoQuantity}
                  onIncrease={() => setDemoQuantity((q) => q + 1)}
                  onDecrease={() => setDemoQuantity((q) => q - 1)}
                  size="sm"
                />
                <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>sm</span>
              </div>
              <div className={showcaseRow}>
                <QuantityPicker
                  quantity={demoQuantity}
                  onIncrease={() => setDemoQuantity((q) => q + 1)}
                  onDecrease={() => setDemoQuantity((q) => q - 1)}
                  size="md"
                />
                <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>md</span>
              </div>
              <div className={showcaseRow}>
                <QuantityPicker
                  quantity={demoQuantity}
                  onIncrease={() => setDemoQuantity((q) => q + 1)}
                  onDecrease={() => setDemoQuantity((q) => q - 1)}
                  size="lg"
                />
                <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>lg</span>
              </div>
            </div>
          </div>

          {/* AddToCartButton */}
          <div className={showcaseCard}>
            <div className={showcaseLabel}>Add to Cart Button</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AddToCartButton quantity={0} onAddToCart={() => {}} />
              <AddToCartButton quantity={0} onAddToCart={() => {}} variant="primary" />
              <AddToCartButton quantity={2} onAddToCart={() => {}}>Added to Cart</AddToCartButton>
              <AddToCartButton quantity={0} onAddToCart={() => {}} disabled>
                Out of Stock
              </AddToCartButton>
            </div>
          </div>
        </div>
      </div>

      <div className={divider} />

      {/* ── Loading States ──────────────────────────────────────────── */}
      <div className={section}>
        <h2 className={sectionTitle}>Loading States</h2>
        <p className={sectionDescription}>
          Skeleton loading patterns for ProductCard and CartItem.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div className={showcaseLabel}>Product Card Skeletons</div>
            <div className={skeletonGrid}>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          </div>
          <div>
            <div className={showcaseLabel}>Cart Item Skeletons</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
              <CartItemSkeleton />
              <CartItemSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
