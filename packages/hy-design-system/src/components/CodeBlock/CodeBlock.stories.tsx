import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock, InlineCode } from './CodeBlock';

const meta = {
  title: 'AI/CodeBlock',
  component: CodeBlock,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTS = `import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleSubmit } = useChat({
    maxSteps: 4,
    onToolCall({ toolCall }) {
      console.log('Tool called:', toolCall.toolName);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input value={input} />
    </form>
  );
}`;

const sampleJSON = `{
  "model": "claude-4-sonnet",
  "temperature": 0.7,
  "tools": [
    { "name": "search", "description": "Search the knowledge base" },
    { "name": "calculate", "description": "Perform calculations" }
  ]
}`;

export const TypeScript: Story = {
  args: { children: sampleTS, language: 'typescript' },
};

export const JSON: Story = {
  args: { children: sampleJSON, language: 'json' },
};

export const NoCopy: Story = {
  args: { children: 'echo "Hello World"', language: 'bash', showCopy: false },
};

export const NoLanguage: Story = {
  args: { children: 'const x = 42;', showLanguage: false },
};

export const InlineCodeStory: Story = {
  name: 'Inline Code',
  render: () => (
    <p style={{ fontSize: 14 }}>
      Use the <InlineCode>useChat</InlineCode> hook to stream responses from{' '}
      <InlineCode>streamText()</InlineCode> in your server route.
    </p>
  ),
};
