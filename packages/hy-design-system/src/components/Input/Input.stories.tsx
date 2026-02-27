import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from './Input';
import { Label } from '../Label/Label';
import { FieldMessage } from '../FieldMessage/FieldMessage';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter text...' },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '320px' }}>
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '320px' }}>
      <Label htmlFor="email-err">Email address</Label>
      <Input id="email-err" type="email" placeholder="you@example.com" error />
      <FieldMessage intent="error">Please enter a valid email address.</FieldMessage>
    </div>
  ),
};

export const WithHelpText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '320px' }}>
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="johndoe" />
      <FieldMessage intent="help">Must be 3–20 characters, letters and numbers only.</FieldMessage>
    </div>
  ),
};

export const Disabled: Story = {
  args: { placeholder: 'Disabled input', disabled: true },
};
