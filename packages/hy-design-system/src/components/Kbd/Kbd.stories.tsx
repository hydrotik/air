import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Kbd } from './Kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '⌘' },
};

export const Shortcut: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', fontSize: '14px' }}>
      <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Kbd size="sm">Ctrl</Kbd>
      <Kbd size="md">Shift</Kbd>
    </div>
  ),
};

export const CommonShortcuts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', fontSize: '13px' }}>
        Copy: <Kbd>⌘</Kbd><Kbd>C</Kbd>
      </div>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', fontSize: '13px' }}>
        Paste: <Kbd>⌘</Kbd><Kbd>V</Kbd>
      </div>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', fontSize: '13px' }}>
        Search: <Kbd>⌘</Kbd><Kbd>K</Kbd>
      </div>
    </div>
  ),
};
