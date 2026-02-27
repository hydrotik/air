import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Separator } from './Separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <div style={{ fontSize: '14px', fontWeight: 600 }}>Hydrotik Design System</div>
      <p style={{ fontSize: '13px', opacity: 0.7, margin: '4px 0 12px' }}>
        An open-source UI component library.
      </p>
      <Separator />
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '13px' }}>
        <span>Blog</span>
        <span>Docs</span>
        <span>Source</span>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '24px' }}>
      <span style={{ fontSize: '13px' }}>Blog</span>
      <Separator orientation="vertical" />
      <span style={{ fontSize: '13px' }}>Docs</span>
      <Separator orientation="vertical" />
      <span style={{ fontSize: '13px' }}>Source</span>
    </div>
  ),
};
