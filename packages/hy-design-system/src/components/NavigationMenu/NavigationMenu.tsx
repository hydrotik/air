import React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import {
  navigationMenuRoot,
  navigationMenuList,
  navigationMenuTrigger,
  navigationMenuLink,
  navigationMenuContent,
  navigationMenuViewport,
  navigationMenuIndicator,
  navigationMenuIndicatorArrow,
} from './NavigationMenu.css';

export const NavigationMenu = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={[navigationMenuRoot, className].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = 'NavigationMenu';

export const NavigationMenuList = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={[navigationMenuList, className].filter(Boolean).join(' ')}
    {...props}
  />
));
NavigationMenuList.displayName = 'NavigationMenuList';

export const NavigationMenuItem: typeof NavigationMenuPrimitive.Item = NavigationMenuPrimitive.Item;

export const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={[navigationMenuTrigger, className].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
    <svg width="10" height="10" viewBox="0 0 15 15" fill="none" aria-hidden style={{ transition: 'transform 200ms', transform: 'var(--radix-navigation-menu-trigger-open, rotate(0deg))' }}>
      <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" />
    </svg>
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

export const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={[navigationMenuContent, className].filter(Boolean).join(' ')}
    {...props}
  />
));
NavigationMenuContent.displayName = 'NavigationMenuContent';

export const NavigationMenuLink = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={[navigationMenuLink, className].filter(Boolean).join(' ')}
    {...props}
  />
));
NavigationMenuLink.displayName = 'NavigationMenuLink';

export const NavigationMenuViewport = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div style={{ position: 'absolute', left: 0, top: '100%', display: 'flex', justifyContent: 'center', width: '100%' }}>
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={[navigationMenuViewport, className].filter(Boolean).join(' ')}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

export const NavigationMenuIndicator = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={[navigationMenuIndicator, className].filter(Boolean).join(' ')}
    {...props}
  >
    <div className={navigationMenuIndicatorArrow} />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';
