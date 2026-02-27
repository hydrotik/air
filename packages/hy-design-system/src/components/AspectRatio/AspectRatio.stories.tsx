import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AspectRatio } from './AspectRatio';

const meta = {
  title: 'Components/AspectRatio',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Ratio16x9: Story = {
  render: () => (
    <div style={{ width: 450 }}>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          16 : 9
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <AspectRatio ratio={1}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          1 : 1
        </div>
      </AspectRatio>
    </div>
  ),
};
