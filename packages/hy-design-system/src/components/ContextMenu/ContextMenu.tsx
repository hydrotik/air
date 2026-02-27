import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import {
  contextMenuContent,
  contextMenuItem,
  contextMenuCheckboxItem,
  contextMenuRadioItem,
  contextMenuLabel,
  contextMenuSeparator,
  contextMenuShortcut,
  contextMenuSubTrigger,
  contextMenuSubContent,
  contextMenuItemIndicator,
} from './ContextMenu.css';

export const ContextMenu: typeof ContextMenuPrimitive.Root = ContextMenuPrimitive.Root;
export const ContextMenuTrigger: typeof ContextMenuPrimitive.Trigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup: typeof ContextMenuPrimitive.Group = ContextMenuPrimitive.Group;
export const ContextMenuPortal: typeof ContextMenuPrimitive.Portal = ContextMenuPrimitive.Portal;
export const ContextMenuSub: typeof ContextMenuPrimitive.Sub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup: typeof ContextMenuPrimitive.RadioGroup = ContextMenuPrimitive.RadioGroup;

export const ContextMenuContent = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={[contextMenuContent, className].filter(Boolean).join(' ')}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = 'ContextMenuContent';

export const ContextMenuItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={[contextMenuItem, className].filter(Boolean).join(' ')}
    style={inset ? { paddingLeft: '2rem' } : undefined}
    {...props}
  />
));
ContextMenuItem.displayName = 'ContextMenuItem';

export const ContextMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={[contextMenuCheckboxItem, className].filter(Boolean).join(' ')}
    checked={checked}
    style={{ paddingLeft: '2rem' }}
    {...props}
  >
    <span className={contextMenuItemIndicator}>
      <ContextMenuPrimitive.ItemIndicator>
        <svg width="10" height="10" viewBox="0 0 15 15" fill="none" aria-hidden>
          <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3354 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.5553 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

export const ContextMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={[contextMenuRadioItem, className].filter(Boolean).join(' ')}
    style={{ paddingLeft: '2rem' }}
    {...props}
  >
    <span className={contextMenuItemIndicator}>
      <ContextMenuPrimitive.ItemIndicator>
        <svg width="8" height="8" viewBox="0 0 15 15" fill="none" aria-hidden>
          <circle cx="7.5" cy="7.5" r="4.5" fill="currentColor" />
        </svg>
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

export const ContextMenuLabel = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={[contextMenuLabel, className].filter(Boolean).join(' ')}
    style={inset ? { paddingLeft: '2rem' } : undefined}
    {...props}
  />
));
ContextMenuLabel.displayName = 'ContextMenuLabel';

export const ContextMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={[contextMenuSeparator, className].filter(Boolean).join(' ')}
    {...props}
  />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={[contextMenuShortcut, className].filter(Boolean).join(' ')} {...props} />
);
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export const ContextMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={[contextMenuSubTrigger, className].filter(Boolean).join(' ')}
    style={inset ? { paddingLeft: '2rem' } : undefined}
    {...props}
  >
    {children}
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginLeft: 'auto' }} aria-hidden>
      <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" />
    </svg>
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

export const ContextMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={[contextMenuSubContent, className].filter(Boolean).join(' ')}
    {...props}
  />
));
ContextMenuSubContent.displayName = 'ContextMenuSubContent';
