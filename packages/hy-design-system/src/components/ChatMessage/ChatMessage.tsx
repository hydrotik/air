import React from 'react';
import {
  messageContainer,
  messageCard,
  messageBubble,
  messageLabel,
  messageContent,
  avatarRow,
  avatarIcon,
  avatarLabel,
  inputContainer,
  inputForm,
  emptyState,
  emptyStateTitle,
  emptyStateDescription,
} from './ChatMessage.css';

const cx = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

/* ─── ChatMessage ──────────────────────────────────────────────────────── */

export interface ChatMessageProps {
  /** Role of the message sender */
  role: 'user' | 'assistant' | 'system';
  /** Message content (rendered as children for flexibility) */
  children: React.ReactNode;
  /** Optional avatar label (e.g. initials or name) */
  avatar?: string;
  /** Optional label override (default: "Question" / "Answer") */
  label?: string;
  /** Additional className */
  className?: string;
}

export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ role, children, avatar, label, className }, ref) => {
    const defaultLabel = role === 'user' ? 'Question' : role === 'assistant' ? 'Answer' : 'System';

    return (
      <div ref={ref} className={cx(messageBubble({ role: role === 'system' ? 'assistant' : role }), className)}>
        {avatar && (
          <div className={avatarRow}>
            <div className={avatarIcon}>{avatar}</div>
            <span className={avatarLabel}>{label || defaultLabel}</span>
          </div>
        )}
        {!avatar && <div className={messageLabel}>{label || defaultLabel}:</div>}
        <div className={messageContent}>{children}</div>
      </div>
    );
  },
);
ChatMessage.displayName = 'ChatMessage';

/* ─── ChatMessagePair ──────────────────────────────────────────────────── */

export interface ChatMessagePairProps {
  /** User question content */
  question: React.ReactNode;
  /** Assistant answer content (if available) */
  answer?: React.ReactNode;
  /** Loading indicator to show when answer is pending */
  loading?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export const ChatMessagePair = React.forwardRef<HTMLDivElement, ChatMessagePairProps>(
  ({ question, answer, loading, className }, ref) => (
    <div ref={ref} className={cx(messageCard, className)}>
      <ChatMessage role="user">{question}</ChatMessage>
      <ChatMessage role="assistant">
        {answer || loading || <span>No answer yet.</span>}
      </ChatMessage>
    </div>
  ),
);
ChatMessagePair.displayName = 'ChatMessagePair';

/* ─── ChatContainer ────────────────────────────────────────────────────── */

export interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ChatContainer = React.forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx(messageContainer, className)} {...props}>
      {children}
    </div>
  ),
);
ChatContainer.displayName = 'ChatContainer';

/* ─── ChatInputContainer ───────────────────────────────────────────────── */

export interface ChatInputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ChatInputContainer = React.forwardRef<HTMLDivElement, ChatInputContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx(inputContainer, className)} {...props}>
      <div className={inputForm}>{children}</div>
    </div>
  ),
);
ChatInputContainer.displayName = 'ChatInputContainer';

/* ─── ChatEmptyState ───────────────────────────────────────────────────── */

export interface ChatEmptyStateProps {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Icon or illustration */
  icon?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export const ChatEmptyState = React.forwardRef<HTMLDivElement, ChatEmptyStateProps>(
  ({ title = 'What can I help with?', description, icon, className }, ref) => (
    <div ref={ref} className={cx(emptyState, className)}>
      {icon && <div>{icon}</div>}
      <h2 className={emptyStateTitle}>{title}</h2>
      {description && <p className={emptyStateDescription}>{description}</p>}
    </div>
  ),
);
ChatEmptyState.displayName = 'ChatEmptyState';
