import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlertCircle, Terminal, CheckCircle2, TriangleAlert } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive'] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 450 }}>
      <Alert icon={<Terminal size={16} />}>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div style={{ width: 450 }}>
      <Alert variant="destructive" icon={<AlertCircle size={16} />}>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div style={{ width: 450 }}>
      <Alert>
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          This alert has no icon — the grid collapses gracefully.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
