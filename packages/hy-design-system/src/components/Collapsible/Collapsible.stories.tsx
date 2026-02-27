import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Collapsible',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ width: 350 }}>
        <Collapsible open={open} onOpenChange={setOpen}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>@peduarte starred 3 repositories</span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">{open ? '−' : '+'}</Button>
            </CollapsibleTrigger>
          </div>
          <div style={{ borderRadius: '6px', border: '1px solid var(--border)', padding: '8px 12px', fontSize: '14px', marginTop: '8px' }}>
            @radix-ui/primitives
          </div>
          <CollapsibleContent>
            <div style={{ borderRadius: '6px', border: '1px solid var(--border)', padding: '8px 12px', fontSize: '14px', marginTop: '4px' }}>
              @radix-ui/colors
            </div>
            <div style={{ borderRadius: '6px', border: '1px solid var(--border)', padding: '8px 12px', fontSize: '14px', marginTop: '4px' }}>
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};
