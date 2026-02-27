import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta = {
  title: 'Components/ToggleGroup',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">U</ToggleGroupItem>
    </ToggleGroup>
  ),
};
