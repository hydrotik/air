import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CartItem, CartItemSkeleton } from './CartItem';
import { Price } from '../Price/Price';
import { QuantityPicker } from '../QuantityPicker/QuantityPicker';

const meta: Meta<typeof CartItem> = {
  title: 'E-Commerce/CartItem',
  component: CartItem,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof CartItem>;

const mockItem = {
  id: 1,
  name: 'Classic Wool Suit',
  price: 129.99,
  quantity: 2,
  color: 'Navy',
  size: 'M',
  image: 'https://placehold.co/100x100/1a2744/e8e9ec?text=Suit',
};

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <CartItem
        item={mockItem}
        onRemove={() => {}}
        renderQuantityPicker={(item) => (
          <QuantityPicker quantity={item.quantity} onIncrease={() => {}} onDecrease={() => {}} size="sm" />
        )}
        renderPrice={(item) => <Price amount={item.price} size="sm" />}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <CartItemSkeleton />
    </div>
  ),
};
