import React, { forwardRef } from 'react';
import { textarea } from './Textarea.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={[textarea, className].filter(Boolean).join(' ')}
      aria-invalid={error || undefined}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
