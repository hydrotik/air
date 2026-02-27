import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { avatarRoot, avatarImage, avatarFallback } from './Avatar.css';

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ size = 'md', className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={[avatarRoot({ size }), className].filter(Boolean).join(' ')}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

export const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={[avatarImage, className].filter(Boolean).join(' ')}
    {...props}
  />
));
AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={[avatarFallback, className].filter(Boolean).join(' ')}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';
