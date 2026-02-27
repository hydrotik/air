import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from './Toast';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Toast',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function ToastDemo({
  variant = 'default' as 'default' | 'success' | 'destructive' | 'warning',
  title: titleText = 'Notification',
  description: descText = 'Your action was completed.',
}) {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show Toast</Button>
      <Toast variant={variant} open={open} onOpenChange={setOpen} duration={4000}>
        <ToastTitle>{titleText}</ToastTitle>
        <ToastDescription>{descText}</ToastDescription>
        <ToastAction altText="Undo" asChild>
          <Button variant="outline" size="sm">Undo</Button>
        </ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const Success: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="Profile saved"
      description="Your changes have been saved successfully."
    />
  ),
};

export const Destructive: Story = {
  render: () => (
    <ToastDemo
      variant="destructive"
      title="Something went wrong"
      description="Your session has expired. Please sign in again."
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastDemo
      variant="warning"
      title="Storage almost full"
      description="You've used 90% of your allocated storage."
    />
  ),
};
