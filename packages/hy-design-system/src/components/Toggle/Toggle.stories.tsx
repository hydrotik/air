import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M5.10505 12C4.70805 12 4.4236 11.9177 4.25171 11.7531C4.08335 11.5886 3.99918 11.3481 3.99918 11.0317V3.99251C3.99918 3.67611 4.08335 3.43558 4.25171 3.27094C4.42361 3.10275 4.70805 3.01858 5.10505 3.01858H7.36591C8.33802 3.01858 9.07649 3.19928 9.58133 3.56068C10.0897 3.92208 10.3439 4.44424 10.3439 5.12715C10.3439 5.55842 10.2206 5.93168 9.97393 6.24692C9.73078 6.55862 9.38252 6.79559 8.92914 6.95781V7.01867C9.50196 7.13901 9.93966 7.38662 10.2421 7.76165C10.5481 8.13314 10.7011 8.60019 10.7011 9.1628C10.7011 9.87571 10.4336 10.4389 9.89856 10.8527C9.36353 11.2629 8.60286 11.468 7.61653 11.468L5.10505 12Z" fill="currentColor" />
      </svg>
    </Toggle>
  ),
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M5.67494 3.50017C5.67494 3.25164 5.87641 3.05017 6.12494 3.05017H10.6249C10.8735 3.05017 11.0749 3.25164 11.0749 3.50017C11.0749 3.7487 10.8735 3.95017 10.6249 3.95017H8.75001L6.75001 11.0502H8.62494C8.87347 11.0502 9.07494 11.2516 9.07494 11.5002C9.07494 11.7487 8.87347 11.9502 8.62494 11.9502H4.12494C3.87641 11.9502 3.67494 11.7487 3.67494 11.5002C3.67494 11.2516 3.87641 11.0502 4.12494 11.0502H6.00001L8.00001 3.95017H6.12494C5.87641 3.95017 5.67494 3.7487 5.67494 3.50017Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      </svg>
    </Toggle>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Toggle size="sm" aria-label="Small">S</Toggle>
      <Toggle size="md" aria-label="Medium">M</Toggle>
      <Toggle size="lg" aria-label="Large">L</Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Toggle disabled aria-label="Disabled">
      Disabled
    </Toggle>
  ),
};
