import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const checkboxRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  borderRadius: vars.radii.sm,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.input,
  cursor: 'pointer',
  flexShrink: 0,
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      borderColor: vars.color.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
    },
    '&[data-state="checked"], &[data-state="indeterminate"]': {
      backgroundColor: vars.color.primary,
      borderColor: vars.color.primary,
      color: vars.color.primaryForeground,
    },
    '&:disabled': {
      opacity: '0.45',
      cursor: 'not-allowed',
    },
  },
});

export const checkboxIndicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'currentColor',
});
