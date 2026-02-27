import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const progressRoot = style({
  position: 'relative',
  width: '100%',
  height: '8px',
  overflow: 'hidden',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.secondary,
});

export const progressIndicator = style({
  height: '100%',
  width: '100%',
  backgroundColor: vars.color.primary,
  borderRadius: 'inherit',
  transition: `transform ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
});
