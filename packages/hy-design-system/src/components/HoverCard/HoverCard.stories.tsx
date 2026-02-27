import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard';
import { Avatar, AvatarFallback } from '../Avatar/Avatar';

const meta = {
  title: 'Components/HoverCard',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" style={{ textDecoration: 'underline', fontSize: '14px' }}>@hydrotik</a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Avatar><AvatarFallback>HY</AvatarFallback></Avatar>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Hydrotik</h4>
            <p style={{ fontSize: '13px', margin: '4px 0 0', opacity: 0.7 }}>
              Design system built with vanilla-extract and Radix UI.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
