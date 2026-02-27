import React from 'react';
import {
  commandRoot,
  commandInput,
  commandInputField,
  commandInputIcon,
  commandList,
  commandEmpty,
  commandGroup,
  commandGroupHeading,
  commandItem,
  commandSeparator,
  commandShortcut,
} from './Command.css';

/**
 * Command palette — a simple searchable list component.
 * For a full cmdk-style experience, pair with the `cmdk` package.
 * This provides the styled shell + primitives.
 */

export const Command = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[commandRoot, className].filter(Boolean).join(' ')} {...props} />
  ),
);
Command.displayName = 'Command';

export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, icon, ...props }, ref) => (
    <div className={commandInput}>
      <div className={commandInputIcon}>
        {icon ?? (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
            <path
              d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <input
        ref={ref}
        className={[commandInputField, className].filter(Boolean).join(' ')}
        type="text"
        role="combobox"
        {...props}
      />
    </div>
  ),
);
CommandInput.displayName = 'CommandInput';

export const CommandList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[commandList, className].filter(Boolean).join(' ')} role="listbox" {...props} />
  ),
);
CommandList.displayName = 'CommandList';

export const CommandEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[commandEmpty, className].filter(Boolean).join(' ')} {...props} />
  ),
);
CommandEmpty.displayName = 'CommandEmpty';

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
}

export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => (
    <div ref={ref} className={[commandGroup, className].filter(Boolean).join(' ')} role="group" {...props}>
      {heading && <div className={commandGroupHeading}>{heading}</div>}
      {children}
    </div>
  ),
);
CommandGroup.displayName = 'CommandGroup';

export const CommandItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[commandItem, className].filter(Boolean).join(' ')}
      role="option"
      tabIndex={0}
      {...props}
    />
  ),
);
CommandItem.displayName = 'CommandItem';

export const CommandSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[commandSeparator, className].filter(Boolean).join(' ')} role="separator" {...props} />
  ),
);
CommandSeparator.displayName = 'CommandSeparator';

export const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={[commandShortcut, className].filter(Boolean).join(' ')} {...props} />
);
CommandShortcut.displayName = 'CommandShortcut';
