import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
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
        <Check size={16} />
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
        <Circle size={8} fill="currentColor" />
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
    <ChevronRight size={16} style={{ marginLeft: 'auto' }} aria-hidden />
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
