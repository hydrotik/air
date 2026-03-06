import type { Meta, StoryObj } from '@storybook/react';
import { AddToCartButton } from './AddToCartButton';

const meta: Meta<typeof AddToCartButton> = {
  title: 'E-Commerce/AddToCartButton',
  component: AddToCartButton,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof AddToCartButton>;

export const Default: Story = {
  args: { onAddToCart: () => alert('Added!') },
};

export const Primary: Story = {
  args: { onAddToCart: () => {}, variant: 'primary' },
};

export const Added: Story = {
  args: { onAddToCart: () => {}, quantity: 2 },
};

export const Disabled: Story = {
  args: { onAddToCart: () => {}, disabled: true, children: 'Out of Stock' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 260 }}>
      <AddToCartButton onAddToCart={() => {}} />
      <AddToCartButton onAddToCart={() => {}} variant="primary" />
      <AddToCartButton onAddToCart={() => {}} quantity={3} />
      <AddToCartButton onAddToCart={() => {}} disabled>Out of Stock</AddToCartButton>
    </div>
  ),
};
