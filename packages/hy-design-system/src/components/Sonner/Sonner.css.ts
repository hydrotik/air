import { globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Global styles for sonner toasts — targets the generated class names.
 * Sonner renders outside of React component scope, so we use globalStyle.
 */
globalStyle('[data-sonner-toaster] [data-sonner-toast]', {
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  borderColor: vars.color.border,
  boxShadow: vars.shadow.lg,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
});

globalStyle('[data-sonner-toaster] [data-sonner-toast] [data-description]', {
  color: vars.color.textMuted,
});

globalStyle('[data-sonner-toaster] [data-sonner-toast] [data-button]', {
  backgroundColor: vars.color.primary,
  color: vars.color.primaryForeground,
});

globalStyle('[data-sonner-toaster] [data-sonner-toast] [data-cancel]', {
  backgroundColor: vars.color.secondary,
  color: vars.color.secondaryForeground,
});

globalStyle('[data-sonner-toaster] [data-sonner-toast][data-type="success"]', {
  backgroundColor: vars.color.success,
  color: vars.color.successForeground,
  borderColor: vars.color.success,
});

globalStyle('[data-sonner-toaster] [data-sonner-toast][data-type="error"]', {
  backgroundColor: vars.color.destructive,
  color: vars.color.destructiveForeground,
  borderColor: vars.color.destructive,
});

globalStyle('[data-sonner-toaster] [data-sonner-toast][data-type="warning"]', {
  backgroundColor: vars.color.warning,
  color: vars.color.warningForeground,
  borderColor: vars.color.warning,
});
