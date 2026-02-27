import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Textarea } from './Textarea';
import { Label } from '../Label/Label';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 350 }}>
      <Textarea placeholder="Type your message here." />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: 350, display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 350 }}>
      <Textarea placeholder="Disabled textarea" disabled />
    </div>
  ),
};
