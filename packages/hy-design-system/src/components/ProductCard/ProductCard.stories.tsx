import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard, ProductCardSkeleton } from './ProductCard';
import { Price } from '../Price/Price';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';

const meta: Meta<typeof ProductCard> = {
  title: 'E-Commerce/ProductCard',
  component: ProductCard,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

const mockProduct = {
  id: 1,
  name: 'Classic Wool Suit',
  price: 129.99,
  thumbnailSrc: 'https://placehold.co/300x400/1a2744/e8e9ec?text=Suit',
  alternateSrc: 'https://placehold.co/300x400/2e3038/e8e9ec?text=Suit+Alt',
  colors: ['#1a2744', '#d4c5a9', '#000'],
};

export const Default: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <ProductCard
        product={mockProduct}
        isWishlisted={false}
        onWishlistToggle={() => {}}
        renderPrice={(p) => <Price amount={p.price} size="sm" />}
        renderActions={(p) => <AddToCartButton onAddToCart={() => {}} />}
      />
    </div>
  ),
};

export const Wishlisted: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <ProductCard
        product={mockProduct}
        isWishlisted={true}
        onWishlistToggle={() => {}}
        renderPrice={(p) => <Price amount={p.price} size="sm" />}
        renderActions={(p) => <AddToCartButton onAddToCart={() => {}} />}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <ProductCardSkeleton />
    </div>
  ),
};
