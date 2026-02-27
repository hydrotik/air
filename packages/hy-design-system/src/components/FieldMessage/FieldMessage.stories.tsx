import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FieldMessage } from './FieldMessage';

const meta = {
  title: 'Components/FieldMessage',
  component: FieldMessage,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'error', 'success'] },
  },
} satisfies Meta<typeof FieldMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'This is a helpful message.' },
};

export const Error: Story = {
  args: { children: 'This field is required.', variant: 'error' },
};

export const Success: Story = {
  args: { children: 'Looks good!', variant: 'success' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: 300 }}>
      <FieldMessage>Default helper text</FieldMessage>
      <FieldMessage variant="error">This field is required</FieldMessage>
      <FieldMessage variant="success">Username is available</FieldMessage>
    </div>
  ),
};
