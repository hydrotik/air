import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toaster } from './Sonner';
import { toast } from 'sonner';
import { Button } from '../Button';

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button onClick={() => toast('Event has been created')}>Default Toast</Button>
      <Button onClick={() => toast.success('Changes saved successfully!')}>Success</Button>
      <Button onClick={() => toast.error('Something went wrong')}>Error</Button>
      <Button onClick={() => toast.warning('Please review your input')}>Warning</Button>
      <Button
        onClick={() =>
          toast('Event created', {
            description: 'Monday, January 3rd at 6:00 PM',
            action: { label: 'Undo', onClick: () => {} },
          })
        }
      >
        With Action
      </Button>
      <Button
        onClick={() => {
          const promise = new Promise((resolve) => setTimeout(resolve, 2000));
          toast.promise(promise, {
            loading: 'Loading...',
            success: 'Data loaded!',
            error: 'Failed to load',
          });
        }}
      >
        Promise
      </Button>
    </div>
  ),
};
