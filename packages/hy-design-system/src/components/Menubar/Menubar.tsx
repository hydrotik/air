import React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
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
        <svg width="10" height="10" viewBox="0 0 15 15" fill="none" aria-hidden>
          <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3354 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.5553 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
        </svg>
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
        <svg width="8" height="8" viewBox="0 0 15 15" fill="none" aria-hidden>
          <circle cx="7.5" cy="7.5" r="4.5" fill="currentColor" />
        </svg>
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
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginLeft: 'auto' }} aria-hidden>
      <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" />
    </svg>
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
