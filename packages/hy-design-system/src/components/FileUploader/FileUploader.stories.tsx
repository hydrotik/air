import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FileUploader } from './FileUploader';

const meta = {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof FileUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ maxWidth: 500 }}>
        <FileUploader value={files} onValueChange={setFiles} />
      </div>
    );
  },
};

export const MultipleFiles: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ maxWidth: 500 }}>
        <FileUploader
          value={files}
          onValueChange={setFiles}
          maxFiles={5}
          multiple
        />
      </div>
    );
  },
};

export const LargeFileSize: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ maxWidth: 500 }}>
        <FileUploader
          value={files}
          onValueChange={setFiles}
          maxSize={1024 * 1024 * 10}
          accept={{ 'application/pdf': [], 'image/*': [] }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <FileUploader disabled />
    </div>
  ),
};
