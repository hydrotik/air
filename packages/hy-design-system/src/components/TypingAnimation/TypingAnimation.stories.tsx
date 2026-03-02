import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TypingAnimation } from './TypingAnimation';

const meta = {
  title: 'AI/TypingAnimation',
  component: TypingAnimation,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof TypingAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'RAG is a technique that enhances LLM responses by retrieving relevant context from external knowledge bases before generating an answer.',
  },
};

export const Fast: Story = {
  args: {
    text: 'This types out very quickly, simulating a fast streaming response.',
    speed: 50,
  },
};

export const Slow: Story = {
  args: {
    text: 'This types more slowly, simulating a deliberate, thoughtful response.',
    speed: 300,
  },
};

export const NoCursor: Story = {
  args: {
    text: 'This animation has no cursor indicator.',
    showCursor: false,
  },
};

export const LongText: Story = {
  args: {
    text: 'The Vercel AI SDK provides a unified API for working with large language models. It supports streaming responses, tool calling, structured output, and multi-step conversations. You can use it with OpenAI, Anthropic, Google, and many other providers. The SDK handles the complexity of streaming protocols, allowing you to focus on building great user experiences.',
    speed: 80,
  },
};
