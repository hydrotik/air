import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const sliderRoot = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  touchAction: 'none',
  userSelect: 'none',
  alignItems: 'center',
  cursor: 'pointer',
  selectors: {
    '&[data-disabled]': {
      opacity: '0.45',
      cursor: 'not-allowed',
    },
  },
});

export const sliderTrack = style({
  position: 'relative',
  height: '6px',
  width: '100%',
  overflow: 'hidden',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.secondary,
});

export const sliderRange = style({
  position: 'absolute',
  height: '100%',
  backgroundColor: vars.color.primary,
  borderRadius: 'inherit',
});

export const sliderThumb = style({
  display: 'block',
  width: '16px',
  height: '16px',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.primaryForeground,
  border: `2px solid ${vars.color.primary}`,
  boxShadow: vars.shadow.sm,
  transition: `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      boxShadow: `0 0 0 4px rgba(59, 130, 246, 0.2)`,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
    },
  },
});
