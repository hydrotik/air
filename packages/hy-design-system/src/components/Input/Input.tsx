import React, { forwardRef, useId } from 'react';
import { inputRecipe, inputWrapperRecipe } from './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Label text — renders accessible <label> */
  label?: string;
  /** Helper / error message below input */
  message?: string;
  /** Renders message in error state */
  error?: boolean;
  /** Stretch to fill container */
  fullWidth?: boolean;
}

/**
 * Input — text input with optional label and field message.
 *
 * @example
 * ```tsx
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * <Input label="Username" error message="Username is taken" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = 'md',
      label,
      message,
      error = false,
      fullWidth = false,
      className,
      id: idProp,
      disabled,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const messageId = `${id}-message`;

    return (
      <div className={inputWrapperRecipe({ fullWidth })}>
        {label && (
          <label htmlFor={id} style={{ fontSize: 'var(--font-size-sm, 0.875rem)', fontWeight: 500 }}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={[inputRecipe({ size: inputSize }), className].filter(Boolean).join(' ')}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={message ? messageId : undefined}
          {...props}
        />
        {message && (
          <p
            id={messageId}
            role={error ? 'alert' : undefined}
            style={{
              fontSize: 'var(--font-size-xs, 0.75rem)',
              color: error ? 'var(--color-destructive)' : 'var(--color-text-muted)',
            }}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
