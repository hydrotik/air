import React from 'react';
import { Toaster as SonnerToaster, type ExternalToast } from 'sonner';
import './Sonner.css';

export type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

/**
 * Themed toast provider powered by sonner.
 * Place at your app root — uses design system tokens for all toast styling.
 *
 * Usage:
 * ```tsx
 * import { Toaster } from '@hydrotik/design-system';
 * import { toast } from 'sonner';
 *
 * // In app root:
 * <Toaster />
 *
 * // To trigger:
 * toast('Event has been created');
 * toast.success('Saved!');
 * toast.error('Something went wrong');
 * ```
 */
export const Toaster: React.FC<ToasterProps> = ({ theme = 'dark', ...props }) => (
  <SonnerToaster theme={theme} {...props} />
);
Toaster.displayName = 'Toaster';

// Re-export toast function for convenience
export { toast } from 'sonner';
