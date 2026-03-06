import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuantityPicker } from './QuantityPicker';

const meta: Meta<typeof QuantityPicker> = {
  title: 'E-Commerce/QuantityPicker',
  component: QuantityPicker,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof QuantityPicker>;

export const Default: Story = {
  render: () => {
    const [qty, setQty] = useState(1);
    return (
      <QuantityPicker
        quantity={qty}
        onIncrease={() => setQty((q) => Math.min(10, q + 1))}
        onDecrease={() => setQty((q) => Math.max(1, q - 1))}
        min={1}
        max={10}
      />
    );
  },
};

export const AtMin: Story = {
  args: { quantity: 1, min: 1, max: 10, onIncrease: () => {}, onDecrease: () => {} },
};

export const AtMax: Story = {
  args: { quantity: 10, min: 1, max: 10, onIncrease: () => {}, onDecrease: () => {} },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <QuantityPicker quantity={3} onIncrease={() => {}} onDecrease={() => {}} size="sm" />
      <QuantityPicker quantity={3} onIncrease={() => {}} onDecrease={() => {}} size="md" />
      <QuantityPicker quantity={3} onIncrease={() => {}} onDecrease={() => {}} size="lg" />
    </div>
  ),
};
