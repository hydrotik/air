import React, { forwardRef } from 'react';
import {
  inputGroupRoot,
  inputGroupColumn,
  inputGroupAddon as addonStyle,
  inputGroupToolbar as toolbarStyle,
  inputGroupInput as inputStyle,
} from './InputGroup.css';

/* ─── InputGroup ─── */

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column layout for textarea + toolbar combos */
  column?: boolean;
}

/**
 * InputGroup — wrapper that provides a unified border, shadow, and
 * border-radius for a group of input-related elements.
 *
 * Children should use `InputGroupInput` for the text field and
 * `InputGroupAddon` / `InputGroupToolbar` for decorations.
 *
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroupAddon>https://</InputGroupAddon>
 *   <InputGroupInput><Input fullWidth /></InputGroupInput>
 * </InputGroup>
 * ```
 */
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, column = false, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={[inputGroupRoot, column && inputGroupColumn, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
);
InputGroup.displayName = 'InputGroup';

/* ─── InputGroupAddon ─── */

export type InputGroupAddonProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * InputGroupAddon — non-interactive text / icon slot inside a group.
 */
export const InputGroupAddon = forwardRef<HTMLSpanElement, InputGroupAddonProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={[addonStyle, className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
InputGroupAddon.displayName = 'InputGroupAddon';

/* ─── InputGroupToolbar ─── */

export type InputGroupToolbarProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * InputGroupToolbar — row at the bottom of a column InputGroup.
 */
export const InputGroupToolbar = forwardRef<HTMLDivElement, InputGroupToolbarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[toolbarStyle, className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
InputGroupToolbar.displayName = 'InputGroupToolbar';

/* ─── inputGroupInput (class name export) ─── */

/**
 * CSS class to strip chrome from an Input/Textarea inside an InputGroup.
 * Apply as `className={inputGroupInputClass}` on the Input/Textarea.
 */
export { inputStyle as inputGroupInputClass };
