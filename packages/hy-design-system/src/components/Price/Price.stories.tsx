import type { Meta, StoryObj } from '@storybook/react';
import { Price } from './Price';

const meta: Meta<typeof Price> = {
  title: 'E-Commerce/Price',
  component: Price,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Price>;

export const Default: Story = { args: { amount: 129.99 } };

export const WithDiscount: Story = {
  args: { amount: 99.99, originalAmount: 149.99 },
};

export const Euro: Story = {
  args: { amount: 29.99, currency: 'EUR', locale: 'de-DE' },
};

export const NoCents: Story = {
  args: { amount: 59.99, showCents: false },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Price amount={99.99} size="sm" />
      <Price amount={99.99} size="md" />
      <Price amount={99.99} size="lg" />
      <Price amount={99.99} size="xl" />
    </div>
  ),
};
