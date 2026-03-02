import React, { useState } from 'react';
import {
  Heading,
  Separator,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Input,
  Badge,
  ChatMessage,
  ChatMessagePair,
  ChatContainer,
  ChatInputContainer,
  ChatEmptyState,
  CodeBlock,
  InlineCode,
  TypingAnimation,
  ToolCallIndicator,
} from '@hydrotik/design-system';
import { Bot, Send, Sparkles, Wrench, MessageSquare, Code2, Type } from 'lucide-react';
import * as s from './AIToolsPage.css';

/* ─── Mock conversation data ───────────────────────────────────────────── */

const mockConversation = [
  {
    question: 'What design tokens are available for typography?',
    answer:
      'The design system provides font tokens for `family` (sans, mono), `size` (xs through 4xl), `weight` (normal, medium, semibold, bold), `lineHeight` (tight, snug, normal, relaxed), and `letterSpacing` (tight, normal, wide). All are accessed via `vars.font.*`.',
  },
  {
    question: 'How do I use the Chart component?',
    answer: `You can use the ChartContainer component to wrap any recharts chart. Define a ChartConfig to map data keys to labels and colors, then use CSS variables for the fills and strokes.`,
  },
];

const sampleCode = `import { useChat } from 'ai/react';
import { ChatContainer, ChatMessagePair, ToolCallIndicator } from '@hydrotik/design-system';

export function AIChat() {
  const { messages, input, handleSubmit, isLoading } = useChat({
    maxSteps: 4,
    onToolCall({ toolCall }) {
      console.log('Tool:', toolCall.toolName);
    },
  });

  return (
    <ChatContainer>
      {messages.map((msg) => (
        <ChatMessagePair
          key={msg.id}
          question={msg.content}
          answer={msg.role === 'assistant' ? msg.content : undefined}
          loading={isLoading ? <ToolCallIndicator /> : undefined}
        />
      ))}
    </ChatContainer>
  );
}`;

/* ─── Page Component ───────────────────────────────────────────────────── */

export function AIToolsPage() {
  const [typingKey, setTypingKey] = useState(0);
  const [showTyping, setShowTyping] = useState(true);

  return (
    <div className={s.page}>
      <Heading
        title="AI Tools"
        description="Streaming components for LLM tool calling, chat interfaces, and AI-powered features."
        size="xl"
        as="h1"
      />

      <Separator />

      {/* ─── Chat Demo ──────────────────────────────────────────── */}
      <div className={s.section}>
        <h2 className={s.sectionTitle}>
          <MessageSquare size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: -3 }} />
          Chat Interface
        </h2>
        <div className={s.chatDemo}>
          <div className={s.chatScroll}>
            <ChatContainer>
              <ChatEmptyState
                icon={<Bot size={32} />}
                title="What can I help with?"
                description="Ask about the design system, architecture, or component APIs."
              />
              {mockConversation.map((pair, i) => (
                <ChatMessagePair
                  key={i}
                  question={pair.question}
                  answer={pair.answer}
                />
              ))}
              <ChatMessagePair
                question="Can you search the knowledge base for form validation patterns?"
                loading={<ToolCallIndicator toolName="rag_search" />}
              />
            </ChatContainer>
          </div>
          <div className={s.chatInput}>
            <ChatInputContainer>
              <Input placeholder="Ask me anything..." style={{ flex: 1 }} />
              <Button size="icon">
                <Send size={16} />
              </Button>
            </ChatInputContainer>
          </div>
        </div>
      </div>

      {/* ─── Component Showcase ──────────────────────────────────── */}
      <div className={s.section}>
        <h2 className={s.sectionTitle}>
          <Sparkles size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: -3 }} />
          Component Showcase
        </h2>
        <div className={s.grid}>
          {/* Code Block */}
          <div className={s.componentShowcase}>
            <span className={s.showcaseLabel}>
              <Code2 size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} />
              CodeBlock
            </span>
            <CodeBlock language="typescript">{sampleCode}</CodeBlock>
          </div>

          {/* Inline Code */}
          <div className={s.componentShowcase}>
            <span className={s.showcaseLabel}>
              <Code2 size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} />
              InlineCode
            </span>
            <p style={{ fontSize: 14, lineHeight: 1.8, margin: 0 }}>
              Use the <InlineCode>useChat</InlineCode> hook with{' '}
              <InlineCode>maxSteps: 4</InlineCode> to enable multi-step tool calling.
              Import from <InlineCode>ai/react</InlineCode> and pair with{' '}
              <InlineCode>streamText()</InlineCode> on the server.
            </p>
          </div>

          {/* Typing Animation */}
          <div className={s.componentShowcase}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={s.showcaseLabel}>
                <Type size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} />
                TypingAnimation
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowTyping(false);
                  setTimeout(() => {
                    setTypingKey((k) => k + 1);
                    setShowTyping(true);
                  }, 50);
                }}
              >
                Replay
              </Button>
            </div>
            {showTyping && (
              <TypingAnimation
                key={typingKey}
                text="The design system provides a comprehensive set of components for building AI-powered interfaces. Each component is built with vanilla-extract for type-safe, token-driven styling."
                speed={80}
              />
            )}
          </div>

          {/* Tool Call Indicators */}
          <div className={s.componentShowcase}>
            <span className={s.showcaseLabel}>
              <Wrench size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} />
              ToolCallIndicator
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <ToolCallIndicator />
              <ToolCallIndicator toolName="getInformation" />
              <ToolCallIndicator toolName="rag_search" />
              <ToolCallIndicator toolName="addResource" />
              <ToolCallIndicator toolName="generateImage" />
            </div>
          </div>

          {/* Chat Message Roles */}
          <div className={s.componentShowcase}>
            <span className={s.showcaseLabel}>
              <MessageSquare size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} />
              ChatMessage Roles
            </span>
            <ChatMessage role="user" avatar="DA" label="User">
              How do I add a new component?
            </ChatMessage>
            <ChatMessage role="assistant" avatar="AI" label="Assistant">
              Create a folder under <InlineCode>src/components/</InlineCode> with the component, styles, stories, tests, and index files.
            </ChatMessage>
          </div>

          {/* Badges for AI Features */}
          <div className={s.componentShowcase}>
            <span className={s.showcaseLabel}>AI Status Badges</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Badge variant="default">Streaming</Badge>
              <Badge variant="secondary">Tool Call</Badge>
              <Badge variant="success">Complete</Badge>
              <Badge variant="warning">Rate Limited</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="outline">Pending</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Integration Example ─────────────────────────────────── */}
      <div className={s.section}>
        <h2 className={s.sectionTitle}>
          <Code2 size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: -3 }} />
          Integration Example
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Vercel AI SDK + Hydrotik Components</CardTitle>
            <CardDescription>
              Combine the AI SDK's streaming hooks with design system components for production chat interfaces.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="typescript">{sampleCode}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
