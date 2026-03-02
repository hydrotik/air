import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToolCallIndicator } from './ToolCallIndicator';

const meta = {
  title: 'AI/ToolCallIndicator',
  component: ToolCallIndicator,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolCallIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithToolName: Story = {
  args: { toolName: 'getInformation' },
};

export const Search: Story = {
  args: { toolName: 'rag_search' },
};

export const SaveToDb: Story = {
  args: { toolName: 'addResource' },
};

export const CustomLabel: Story = {
  args: { label: 'Analyzing code', toolName: 'codeAnalysis' },
};

export const NoBadge: Story = {
  args: { toolName: 'search', showBadge: false },
};

export const AllTools: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <ToolCallIndicator />
      <ToolCallIndicator toolName="getInformation" />
      <ToolCallIndicator toolName="addResource" />
      <ToolCallIndicator toolName="search" />
      <ToolCallIndicator toolName="rag_search" />
      <ToolCallIndicator toolName="rag_sync" />
      <ToolCallIndicator toolName="generateImage" />
      <ToolCallIndicator toolName="calculate" />
      <ToolCallIndicator toolName="customTool" label="Running custom tool" />
    </div>
  ),
};
