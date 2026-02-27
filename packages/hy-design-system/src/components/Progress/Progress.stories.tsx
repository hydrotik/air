import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Progress value={60} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Progress value={0} />
    </div>
  ),
};

export const Full: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Progress value={100} />
    </div>
  ),
};

export const Various: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <span style={{ fontSize: '13px', marginBottom: '4px', display: 'block' }}>25%</span>
        <Progress value={25} />
      </div>
      <div>
        <span style={{ fontSize: '13px', marginBottom: '4px', display: 'block' }}>50%</span>
        <Progress value={50} />
      </div>
      <div>
        <span style={{ fontSize: '13px', marginBottom: '4px', display: 'block' }}>75%</span>
        <Progress value={75} />
      </div>
    </div>
  ),
};
