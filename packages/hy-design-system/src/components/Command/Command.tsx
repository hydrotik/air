import React from 'react';
import { IconSearch } from '@tabler/icons-react';
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
        {icon ?? <IconSearch size={15} />}
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
