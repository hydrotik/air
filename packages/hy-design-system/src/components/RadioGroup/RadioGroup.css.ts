import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * RadioGroup — shadcn v4 aligned.
 * 16px circle, shadow-xs, primary border when checked, inner dot.
 */
export const radioGroupRoot = style({
  display: 'grid',
  gap: vars.space['2'],
  width: '100%',
});

export const radioGroupItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  aspectRatio: '1',
  borderRadius: vars.radii.full,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.xs,
  cursor: 'pointer',
  flexShrink: 0,
  outline: 'none',
  transition: `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:focus-visible': {
      borderColor: vars.color.focusRing,
      boxShadow: `0 0 0 1px color-mix(in srgb, ${vars.color.focusRing} 25%, transparent)`,
    },
    '&[data-state="checked"]': {
      borderColor: vars.color.primary,
    },
    '&:disabled': {
      opacity: '0.5',
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
