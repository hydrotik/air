import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 350 }}>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const WithRange: Story = {
  render: () => (
    <div style={{ width: 350 }}>
      <Slider defaultValue={[25]} max={100} step={5} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 350 }}>
      <Slider defaultValue={[50]} max={100} disabled />
    </div>
  ),
};
