import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.96) translateY(-2px)' },
  to: { opacity: 1, transform: 'scale(1) translateY(0)' },
});

export const popoverContent = style({
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  boxShadow: vars.shadow.lg,
  padding: vars.space['4'],
  zIndex: vars.zIndex.dropdown,
  maxWidth: '320px',
  width: 'var(--radix-popover-trigger-width, auto)',
  animationName: fadeIn,
  animationDuration: vars.motion.duration.normal,
  animationTimingFunction: vars.motion.easing.default,
  outline: 'none',
});

export const popoverArrow = style({
  fill: vars.color.surfaceElevated,
  filter: `drop-shadow(0 1px 0 ${vars.color.border})`,
});

export const popoverClose = style({
  position: 'absolute',
  top: vars.space['2'],
  right: vars.space['2'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: vars.radii.sm,
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.textMuted,
  cursor: 'pointer',
  outline: 'none',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}, color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
      color: vars.color.text,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
    },
  },
});
