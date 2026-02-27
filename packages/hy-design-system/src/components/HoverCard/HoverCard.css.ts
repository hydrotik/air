import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const slideIn = keyframes({
  from: { opacity: '0', transform: 'translateY(2px)' },
  to: { opacity: '1', transform: 'translateY(0)' },
});

export const hoverCardContent = style({
  zIndex: vars.zIndex.dropdown,
  width: '320px',
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
  padding: vars.space['4'],
  boxShadow: vars.shadow.lg,
  outline: 'none',
  animation: `${slideIn} ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
});
