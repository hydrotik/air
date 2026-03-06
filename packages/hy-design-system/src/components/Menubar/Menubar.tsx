import React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { IconCheck, IconChevronRight, IconCircle } from '@tabler/icons-react';
import {
  menubarRoot,
  menubarTrigger,
  menubarContent,
  menubarItem,
  menubarSeparator,
  menubarLabel,
  menubarShortcut,
  menubarSubTrigger,
  menubarSubContent,
  menubarCheckboxItem,
  menubarRadioItem,
  menubarItemIndicator,
} from './Menubar.css';

export const Menubar = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={[menubarRoot, className].filter(Boolean).join(' ')}
    {...props}
  />
));
Menubar.displayName = 'Menubar';

export const MenubarMenu: typeof MenubarPrimitive.Menu = MenubarPrimitive.Menu;
export const MenubarGroup: typeof MenubarPrimitive.Group = MenubarPrimitive.Group;
export const MenubarPortal: typeof MenubarPrimitive.Portal = MenubarPrimitive.Portal;
export const MenubarSub: typeof MenubarPrimitive.Sub = MenubarPrimitive.Sub;
export const MenubarRadioGroup: typeof MenubarPrimitive.RadioGroup = MenubarPrimitive.RadioGroup;

export const MenubarTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={[menubarTrigger, className].filter(Boolean).join(' ')}
    {...props}
  />
));
MenubarTrigger.displayName = 'MenubarTrigger';

export const MenubarContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = 'start', alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={[menubarContent, className].filter(Boolean).join(' ')}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = 'MenubarContent';

export const MenubarItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={[menubarItem, className].filter(Boolean).join(' ')}
    style={inset ? { paddingLeft: '2rem' } : undefined}
    {...props}
  />
));
MenubarItem.displayName = 'MenubarItem';

export const MenubarCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={[menubarCheckboxItem, className].filter(Boolean).join(' ')}
    checked={checked}
    style={{ paddingLeft: '2rem' }}
    {...props}
  >
    <span className={menubarItemIndicator}>
      <MenubarPrimitive.ItemIndicator>
        <IconCheck size={16} />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

export const MenubarRadioItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={[menubarRadioItem, className].filter(Boolean).join(' ')}
    style={{ paddingLeft: '2rem' }}
    {...props}
  >
    <span className={menubarItemIndicator}>
      <MenubarPrimitive.ItemIndicator>
        <IconCircle size={8} fill="currentColor" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = 'MenubarRadioItem';

export const MenubarLabel = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={[menubarLabel, className].filter(Boolean).join(' ')}
    style={inset ? { paddingLeft: '2rem' } : undefined}
    {...props}
  />
));
MenubarLabel.displayName = 'MenubarLabel';

export const MenubarSeparator = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={[menubarSeparator, className].filter(Boolean).join(' ')}
    {...props}
  />
));
MenubarSeparator.displayName = 'MenubarSeparator';

export const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={[menubarShortcut, className].filter(Boolean).join(' ')} {...props} />
);
MenubarShortcut.displayName = 'MenubarShortcut';

export const MenubarSubTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={[menubarSubTrigger, className].filter(Boolean).join(' ')}
    style={inset ? { paddingLeft: '2rem' } : undefined}
    {...props}
  >
    {children}
    <IconChevronRight size={16} style={{ marginLeft: 'auto' }} aria-hidden />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = 'MenubarSubTrigger';

export const MenubarSubContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={[menubarSubContent, className].filter(Boolean).join(' ')}
    {...props}
  />
));
MenubarSubContent.displayName = 'MenubarSubContent';
