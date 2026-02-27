import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import {
  dropdownContent,
  dropdownItem,
  dropdownDestructiveItem,
  dropdownLabel,
  dropdownSeparator,
  dropdownItemIndicator,
  dropdownCheckboxItem,
  dropdownRadioItem,
  dropdownSubTrigger,
  dropdownSubContent,
  dropdownShortcut,
} from './DropdownMenu.css';

export const DropdownMenu: typeof DropdownMenuPrimitive.Root = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger: typeof DropdownMenuPrimitive.Trigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup: typeof DropdownMenuPrimitive.Group = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal: typeof DropdownMenuPrimitive.Portal = DropdownMenuPrimitive.Portal;
export const DropdownMenuRadioGroup: typeof DropdownMenuPrimitive.RadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={[dropdownSubTrigger, className].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
    <ChevronRight size={16} style={{ marginLeft: 'auto' }} aria-hidden />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={[dropdownSubContent, className].filter(Boolean).join(' ')}
    sideOffset={2}
    alignOffset={-4}
    {...props}
  />
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

export const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      className={[dropdownContent, className].filter(Boolean).join(' ')}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

export const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { destructive?: boolean }
>(({ className, destructive, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={[destructive ? dropdownDestructiveItem : dropdownItem, className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={[dropdownCheckboxItem, className].filter(Boolean).join(' ')}
    checked={checked}
    {...props}
  >
    <span className={dropdownItemIndicator}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check size={16} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

export const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={[dropdownRadioItem, className].filter(Boolean).join(' ')}
    {...props}
  >
    <span className={dropdownItemIndicator}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle size={8} fill="currentColor" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

export const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={[dropdownLabel, className].filter(Boolean).join(' ')}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={[dropdownSeparator, className].filter(Boolean).join(' ')}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={[dropdownShortcut, className].filter(Boolean).join(' ')} {...props} />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export const DropdownMenuSub: typeof DropdownMenuPrimitive.Sub = DropdownMenuPrimitive.Sub;
