import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const radioGroupRoot = style({
  display: 'grid',
  gap: vars.space['2'],
});

export const radioGroupItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  borderRadius: vars.radii.full,
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
    '&[data-state="checked"]': {
      borderColor: vars.color.primary,
    },
    '&:disabled': {
      opacity: '0.45',
      cursor: 'not-allowed',
    },
  },
});

export const radioGroupIndicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&::after': {
      content: '""',
      display: 'block',
      width: '8px',
      height: '8px',
      borderRadius: vars.radii.full,
      backgroundColor: vars.color.primary,
    },
  },
});
