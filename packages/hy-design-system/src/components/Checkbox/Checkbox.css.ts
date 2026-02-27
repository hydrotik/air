import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Checkbox — shadcn v4 aligned.
 * 16px square, rounded-[4px], shadow-xs, primary bg when checked.
 */
export const checkboxRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  borderRadius: '4px',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.input,
  boxShadow: vars.shadow.xs,
  cursor: 'pointer',
  flexShrink: 0,
  outline: 'none',
  transition: `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:focus-visible': {
      borderColor: vars.color.focusRing,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
    },
    '&[data-state="checked"], &[data-state="indeterminate"]': {
      backgroundColor: vars.color.primary,
      borderColor: vars.color.primary,
      color: vars.color.primaryForeground,
    },
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
});

export const checkboxIndicator = style({
  display: 'grid',
  placeContent: 'center',
  color: 'currentColor',
});
