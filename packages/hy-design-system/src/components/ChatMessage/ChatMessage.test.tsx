import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChatMessage, ChatMessagePair, ChatContainer, ChatInputContainer, ChatEmptyState } from './ChatMessage';

describe('ChatMessage', () => {
  it('renders user message with default label', () => {
    render(<ChatMessage role="user">Hello?</ChatMessage>);
    expect(screen.getByText('Hello?')).toBeInTheDocument();
    expect(screen.getByText('Question:')).toBeInTheDocument();
  });

  it('renders assistant message with default label', () => {
    render(<ChatMessage role="assistant">Hi there!</ChatMessage>);
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
    expect(screen.getByText('Answer:')).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(<ChatMessage role="user" label="You">Query</ChatMessage>);
    expect(screen.getByText('You:')).toBeInTheDocument();
  });

  it('renders avatar when provided', () => {
    render(<ChatMessage role="assistant" avatar="AI">Response</ChatMessage>);
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ChatMessage ref={ref} role="user">Test</ChatMessage>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('ChatMessagePair', () => {
  it('renders question and answer', () => {
    render(<ChatMessagePair question="Q?" answer="A!" />);
    expect(screen.getByText('Q?')).toBeInTheDocument();
    expect(screen.getByText('A!')).toBeInTheDocument();
  });

  it('shows loading when no answer', () => {
    render(<ChatMessagePair question="Q?" loading={<span>Loading...</span>} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows fallback when no answer or loading', () => {
    render(<ChatMessagePair question="Q?" />);
    expect(screen.getByText('No answer yet.')).toBeInTheDocument();
  });
});

describe('ChatContainer', () => {
  it('renders children', () => {
    render(<ChatContainer><p>Content</p></ChatContainer>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

describe('ChatEmptyState', () => {
  it('renders title and description', () => {
    render(<ChatEmptyState title="Hello" description="Ask anything" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Ask anything')).toBeInTheDocument();
  });

  it('renders default title', () => {
    render(<ChatEmptyState />);
    expect(screen.getByText('What can I help with?')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<ChatEmptyState icon={<span data-testid="icon">🤖</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
