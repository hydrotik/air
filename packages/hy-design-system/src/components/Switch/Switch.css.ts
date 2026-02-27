import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const switchRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  width: '36px',
  height: '20px',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.secondary,
  border: 'none',
  padding: '2px',
  cursor: 'pointer',
  flexShrink: 0,
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: vars.color.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
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
  backgroundColor: vars.color.primaryForeground,
  boxShadow: vars.shadow.sm,
  transition: `transform ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-state="checked"]': {
      transform: 'translateX(16px)',
    },
  },
});
