import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Switch — shadcn v4 aligned.
 * - Unchecked: bg-input (border-ish color)
 * - Checked: bg-primary
 * - Border transparent, shadow-xs, rounded-full
 * - Default: 32x18px, thumb 16px
 */
export const switchRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  width: '32px',
  height: '18px',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.border,
  border: '1px solid transparent',
  padding: 0,
  cursor: 'pointer',
  flexShrink: 0,
  boxShadow: vars.shadow.xs,
  outline: 'none',
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: vars.color.primary,
    },
    '&:focus-visible': {
      borderColor: vars.color.focusRing,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
    },
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
});

export const switchThumb = style({
  display: 'block',
  width: '16px',
  height: '16px',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.background,
  boxShadow: vars.shadow.sm,
  pointerEvents: 'none',
  transition: `transform ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-state="checked"]': {
      transform: 'translateX(calc(100% - 2px))',
    },
    '&[data-state="unchecked"]': {
      transform: 'translateX(0)',
    },
  },
});
