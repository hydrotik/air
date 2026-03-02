import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          title="Confirm Action"
          description="Are you sure you want to proceed? This action cannot be undone."
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '16px' }}>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const TitleOnly: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Simple Modal</Button>
        <Modal
          title="Information"
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          <p>This modal has no description, just content.</p>
        </Modal>
      </>
    );
  },
};
