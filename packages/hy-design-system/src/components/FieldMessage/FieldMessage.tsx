import React from 'react';
import { fieldMessageRecipe } from './FieldMessage.css';

export interface FieldMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'error' | 'success';
}

export const FieldMessage = React.forwardRef<HTMLParagraphElement, FieldMessageProps>(
  ({ variant = 'default', className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={[fieldMessageRecipe({ variant }), className].filter(Boolean).join(' ')}
      role={variant === 'error' ? 'alert' : undefined}
      {...props}
    >
      {children}
    </p>
  ),
);

FieldMessage.displayName = 'FieldMessage';
