import React from 'react';
import { fieldMessageRecipe } from './FieldMessage.css';

export interface FieldMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  intent?: 'error' | 'help' | 'success';
}

export const FieldMessage = React.forwardRef<HTMLParagraphElement, FieldMessageProps>(
  ({ intent = 'help', className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={[fieldMessageRecipe({ intent }), className].filter(Boolean).join(' ')}
      role={intent === 'error' ? 'alert' : undefined}
      {...props}
    >
      {children}
    </p>
  ),
);

FieldMessage.displayName = 'FieldMessage';
