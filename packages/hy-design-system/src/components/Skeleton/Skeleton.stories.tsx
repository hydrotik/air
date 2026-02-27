import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 350 }}>
      <Skeleton style={{ height: '16px', width: '60%' }} />
      <Skeleton style={{ height: '16px', width: '100%' }} />
      <Skeleton style={{ height: '16px', width: '80%' }} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: 350 }}>
      <Skeleton style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <Skeleton style={{ height: '14px', width: '70%' }} />
        <Skeleton style={{ height: '14px', width: '50%' }} />
      </div>
    </div>
  ),
};
