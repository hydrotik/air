import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ChatMessage, ChatMessagePair, ChatContainer, ChatInputContainer, ChatEmptyState } from './ChatMessage';
import { Input } from '../Input';
import { Button } from '../Button';
import { IconRobot, IconSend } from '@tabler/icons-react';

const meta = {
  title: 'AI/ChatMessage',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleMessage: Story = {
  render: () => (
    <ChatContainer>
      <ChatMessage role="user">What is retrieval augmented generation?</ChatMessage>
      <ChatMessage role="assistant">
        RAG is a technique that enhances LLM responses by retrieving relevant context from
        external knowledge bases before generating an answer. It combines the power of
        retrieval systems with generative AI.
      </ChatMessage>
    </ChatContainer>
  ),
};

export const MessagePair: Story = {
  render: () => (
    <ChatContainer>
      <ChatMessagePair
        question="How do I implement tool calling?"
        answer="You can use the `maxSteps` option in the useChat hook along with tool definitions in your server route. Each tool call creates a new step in the conversation."
      />
    </ChatContainer>
  ),
};

export const WithAvatars: Story = {
  render: () => (
    <ChatContainer>
      <ChatMessage role="user" avatar="DA">
        Show me an example of streaming.
      </ChatMessage>
      <ChatMessage role="assistant" avatar="AI">
        Here's a basic streaming example using the Vercel AI SDK...
      </ChatMessage>
    </ChatContainer>
  ),
};

export const EmptyStateStory: Story = {
  name: 'Empty State',
  render: () => (
    <ChatEmptyState
      icon={<IconRobot size={32} />}
      title="What can I help with?"
      description="Ask me anything about your codebase, architecture, or design system."
    />
  ),
};

export const FullChat: Story = {
  name: 'Full Chat Layout',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <ChatContainer>
          <ChatEmptyState
            icon={<IconRobot size={32} />}
            title="What can I help with?"
          />
          <ChatMessagePair
            question="What components are available?"
            answer="The design system includes over 50 components: Button, Card, Dialog, DataGrid, Chart, Sidebar, Form, and more. All built with vanilla-extract for type-safe CSS."
          />
          <ChatMessagePair
            question="How do I use the Chart component?"
            loading={<span style={{ color: 'var(--color-text-muted)' }}>Thinking...</span>}
          />
        </ChatContainer>
      </div>
      <div style={{ padding: '16px' }}>
        <ChatInputContainer>
          <Input placeholder="Ask me anything..." style={{ flex: 1 }} />
          <Button size="icon"><IconSend size={16} /></Button>
        </ChatInputContainer>
      </div>
    </div>
  ),
};
