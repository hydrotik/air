import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Slider — shadcn v4 aligned.
 * Track: bg-muted (secondary), h-1.5
 * Range: bg-primary
 * Thumb: white bg, primary border, ring on hover/focus
 */
export const sliderRoot = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  touchAction: 'none',
  userSelect: 'none',
  alignItems: 'center',
  selectors: {
    '&[data-disabled]': {
      opacity: '0.5',
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
});

export const sliderThumb = style({
  display: 'block',
  width: '16px',
  height: '16px',
  borderRadius: vars.radii.full,
  backgroundColor: '#ffffff',
  border: `2px solid ${vars.color.primary}`,
  boxShadow: vars.shadow.sm,
  transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  outline: 'none',
  selectors: {
    '&:hover': {
      boxShadow: `0 0 0 4px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
    },
    '&:focus-visible': {
      boxShadow: `0 0 0 4px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
    },
    '&:disabled': {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  },
});
