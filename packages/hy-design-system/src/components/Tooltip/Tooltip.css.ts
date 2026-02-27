import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

export const tooltipContent = style({
  backgroundColor: vars.color.text,
  color: vars.color.background,
  borderRadius: vars.radii.sm,
  padding: `${vars.space[1]} ${vars.space[2]}`,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.normal,
  maxWidth: '280px',
  zIndex: vars.zIndex.tooltip,
  boxShadow: vars.shadow.sm,
  animationName: fadeIn,
  animationDuration: vars.motion.duration.fast,
  animationTimingFunction: vars.motion.easing.default,
  userSelect: 'none',
});

export const tooltipArrow = style({
  fill: vars.color.text,
});
