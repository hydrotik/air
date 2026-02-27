import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Progress — shadcn v4 aligned.
 * Track: primary/20 (20% of primary color)
 * Indicator: solid primary
 * Height: 8px (h-2)
 */
export const progressRoot = style({
  position: 'relative',
  width: '100%',
  height: '8px',
  overflow: 'hidden',
  borderRadius: vars.radii.full,
  backgroundColor: `color-mix(in srgb, ${vars.color.primary} 20%, transparent)`,
});

export const progressIndicator = style({
  height: '100%',
  width: '100%',
  flex: 1,
  backgroundColor: vars.color.primary,
  transition: `all ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
});
