import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Tooltip',
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.FC) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip with helpful context.</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '32px', placeItems: 'center' }}>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline" size="sm">Top</Button></TooltipTrigger>
        <TooltipContent side="top"><p>Tooltip on top</p></TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline" size="sm">Right</Button></TooltipTrigger>
        <TooltipContent side="right"><p>Tooltip on right</p></TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline" size="sm">Bottom</Button></TooltipTrigger>
        <TooltipContent side="bottom"><p>Tooltip on bottom</p></TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline" size="sm">Left</Button></TooltipTrigger>
        <TooltipContent side="left"><p>Tooltip on left</p></TooltipContent>
      </Tooltip>
    </div>
  ),
};
