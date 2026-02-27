import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ScrollArea } from './ScrollArea';
import { Separator } from '../Separator/Separator';

const meta = {
  title: 'Components/ScrollArea',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const tags = Array.from({ length: 50 }, (_, i) => `Tag ${i + 1}`);

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 280, width: 200, borderRadius: '8px', border: '1px solid var(--border, #2e3038)' }}>
      <div style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div style={{ fontSize: '13px', padding: '4px 0' }}>{tag}</div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
};
