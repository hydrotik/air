import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const enterFromRight = keyframes({
  from: { opacity: '0', transform: 'translateX(200px)' },
  to: { opacity: '1', transform: 'translateX(0)' },
});

const enterFromLeft = keyframes({
  from: { opacity: '0', transform: 'translateX(-200px)' },
  to: { opacity: '1', transform: 'translateX(0)' },
});

const scaleIn = keyframes({
  from: { opacity: '0', transform: 'rotateX(-30deg) scale(0.9)' },
  to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
});

const scaleOut = keyframes({
  from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
  to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
});

export const navigationMenuRoot = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  zIndex: vars.zIndex.dropdown,
});

export const navigationMenuList = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1'],
  listStyle: 'none',
  margin: 0,
  padding: vars.space['1'],
  borderRadius: vars.radii.md,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
});

export const navigationMenuTrigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['1'],
  padding: `${vars.space['2']} ${vars.space['3']}`,
  borderRadius: vars.radii.sm,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
    },
    '&[data-state="open"]': {
      backgroundColor: vars.color.ghostHover,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '-2px',
    },
  },
});

export const navigationMenuLink = style([navigationMenuTrigger, {
  textDecoration: 'none',
}]);

export const navigationMenuContent = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: 'auto',
  selectors: {
    '&[data-motion="from-start"]': {
      animation: `${enterFromLeft} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
    },
    '&[data-motion="from-end"]': {
      animation: `${enterFromRight} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
    },
    '&[data-motion="to-start"]': {
      animation: `${enterFromRight} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
      animationDirection: 'reverse',
    },
    '&[data-motion="to-end"]': {
      animation: `${enterFromLeft} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
      animationDirection: 'reverse',
    },
  },
});

export const navigationMenuViewport = style({
  position: 'relative',
  marginTop: vars.space['2'],
  width: 'var(--radix-navigation-menu-viewport-width)',
  overflow: 'hidden',
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
  boxShadow: vars.shadow.lg,
  height: 'var(--radix-navigation-menu-viewport-height)',
  transition: `width ${vars.motion.duration.normal}, height ${vars.motion.duration.normal}`,
  selectors: {
    '&[data-state="open"]': {
      animation: `${scaleIn} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
    },
    '&[data-state="closed"]': {
      animation: `${scaleOut} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
    },
  },
});

export const navigationMenuIndicator = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: '10px',
  top: '100%',
  overflow: 'hidden',
  zIndex: 1,
  transition: `width ${vars.motion.duration.normal}, transform ${vars.motion.duration.normal}`,
});

export const navigationMenuIndicatorArrow = style({
  position: 'relative',
  top: '70%',
  width: '10px',
  height: '10px',
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
  borderBottomColor: 'transparent',
  borderRightColor: 'transparent',
  transform: 'rotate(45deg)',
  borderRadius: `${vars.radii.sm} 0 0 0`,
});
