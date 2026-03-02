import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heading } from './Heading';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Page Heading', description: 'A brief description of this section.' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Heading size="sm" title="Small Heading" description="sm size variant" />
      <Heading size="md" title="Medium Heading" description="md size variant" />
      <Heading size="lg" title="Large Heading" description="lg size variant (default)" />
      <Heading size="xl" title="Extra Large Heading" description="xl size variant" />
    </div>
  ),
};

export const TitleOnly: Story = {
  args: { title: 'Title Without Description' },
};

export const AsH1: Story = {
  args: { title: 'Top-Level Heading', description: 'Rendered as an h1 element.', as: 'h1', size: 'xl' },
};
