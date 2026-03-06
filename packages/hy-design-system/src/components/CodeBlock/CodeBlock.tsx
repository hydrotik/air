import React from 'react';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { codeBlockWrapper, codeBlockPre, copyButton, languageBadge, inlineCode } from './CodeBlock.css';

export interface CodeBlockProps {
  /** Code string to display */
  children: string;
  /** Programming language (for display badge) */
  language?: string;
  /** Show copy button (default: true) */
  showCopy?: boolean;
  /** Show language badge (default: true) */
  showLanguage?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Code block with optional copy button and language badge.
 * For use in chat/AI contexts — renders a `<pre><code>` block.
 *
 * Note: This component does NOT include syntax highlighting by default.
 * Consumers can wrap the code with their preferred highlighter
 * (e.g. Prism, Shiki, highlight.js).
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ children, language, showCopy = true, showLanguage = true, className }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const codeString = String(children).replace(/\n$/, '');

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard API not available (e.g. in tests)
      }
    };

    return (
      <div ref={ref} className={[codeBlockWrapper, className].filter(Boolean).join(' ')}>
        {showLanguage && language && (
          <span className={languageBadge}>{language}</span>
        )}
        {showCopy && (
          <button
            type="button"
            className={copyButton}
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy code'}
          >
            {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
        <pre className={codeBlockPre}>
          <code>{codeString}</code>
        </pre>
      </div>
    );
  },
);
CodeBlock.displayName = 'CodeBlock';

/**
 * Inline code styling — for use in markdown renderers.
 */
export const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={[inlineCode, className].filter(Boolean).join(' ')}
    {...props}
  />
));
InlineCode.displayName = 'InlineCode';
