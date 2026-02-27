import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { buttonRecipe, spinner } from './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state — shows spinner, disables interaction */
  loading?: boolean;
  /** Stretch to fill container */
  fullWidth?: boolean;
  /**
   * When true, renders as a child element (Radix Slot pattern).
   * Useful for rendering as `<a>` or `<Link>`.
   */
  asChild?: boolean;
}

/**
 * Button — primary interactive element.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Save changes</Button>
 * <Button variant="outline" loading>Submitting...</Button>
 * <Button asChild><a href="/dashboard">Go to dashboard</a></Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      asChild = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const classes = buttonRecipe({ variant, size, loading, fullWidth });

    return (
      <Comp
        ref={ref}
        className={[classes, className].filter(Boolean).join(' ')}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={spinner} aria-hidden="true" />}
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
