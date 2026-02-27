import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const pulse = keyframes({
  '0%, 100%': { opacity: '1' },
  '50%': { opacity: '0.5' },
});

export const skeleton = style({
  borderRadius: vars.radii.md,
  backgroundColor: vars.color.secondary,
  animation: `${pulse} 2s ${vars.motion.easing.default} infinite`,
});
