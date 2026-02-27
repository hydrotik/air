import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

const slideInFromRight = keyframes({
  from: { transform: 'translateX(calc(100% + 24px))' },
  to: { transform: 'translateX(0)' },
});

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: 'translateX(calc(100% + 24px))' },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export const toastViewport = style({
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
  padding: vars.space['4'],
  maxWidth: '380px',
  margin: 0,
  listStyle: 'none',
  zIndex: vars.zIndex.toast,
  outline: 'none',
});

export const toast = recipe({
  base: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'start',
    gap: `${vars.space['1_5']} ${vars.space['2']}`,
    padding: vars.space['3'],
    borderRadius: vars.radii.md,
    border: `1px solid ${vars.color.border}`,
    backgroundColor: vars.color.surface,
    boxShadow: vars.shadow.lg,
    overflow: 'hidden',
    animationDuration: vars.motion.duration.normal,
    animationTimingFunction: vars.motion.easing.default,
    selectors: {
      '&[data-state="open"]': {
        animationName: slideInFromRight,
      },
      '&[data-state="closed"]': {
        animationName: `${fadeOut}, ${swipeOut}`,
      },
      '&[data-swipe="move"]': {
        transform: 'translateX(var(--radix-toast-swipe-move-x))',
      },
      '&[data-swipe="cancel"]': {
        transform: 'translateX(0)',
        transition: `transform ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
      },
      '&[data-swipe="end"]': {
        animationName: swipeOut,
      },
    },
  },
  variants: {
    variant: {
      default: {},
      success: {
        borderColor: vars.color.success,
      },
      destructive: {
        borderColor: vars.color.destructive,
        backgroundColor: `color-mix(in srgb, ${vars.color.destructive} 8%, ${vars.color.surface})`,
      },
      warning: {
        borderColor: vars.color.warning,
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const toastTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.tight,
});

export const toastDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.relaxed,
  gridColumn: '2',
});

export const toastAction = style({
  gridColumn: '2',
  display: 'inline-flex',
  alignSelf: 'end',
});

export const toastClose = style({
  position: 'absolute',
  top: vars.space[2],
  right: vars.space[2],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  borderRadius: vars.radii.sm,
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.textMuted,
  cursor: 'pointer',
  outline: 'none',
  opacity: 0,
  transition: `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '[data-state="open"] &': {
      opacity: 1,
    },
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
      color: vars.color.text,
      opacity: 1,
    },
    '&:focus-visible': {
      opacity: 1,
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: '1px',
    },
  },
});

export const toastIcon = style({
  gridRow: '1 / -1',
  marginTop: '1px',
});
