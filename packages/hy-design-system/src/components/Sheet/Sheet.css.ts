import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

const overlayShow = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
});

export const sheetOverlay = style({
  backgroundColor: vars.color.overlay,
  position: 'fixed',
  inset: 0,
  zIndex: vars.zIndex.overlay,
  animation: `${overlayShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
});

const slideInFromRight = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

const slideInFromLeft = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' },
});

const slideInFromTop = keyframes({
  from: { transform: 'translateY(-100%)' },
  to: { transform: 'translateY(0)' },
});

const slideInFromBottom = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});

export const sheetContent = recipe({
  base: {
    position: 'fixed',
    zIndex: vars.zIndex.modal,
    backgroundColor: vars.color.surfaceOverlay,
    boxShadow: vars.shadow.xl,
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
  },
  variants: {
    side: {
      right: {
        top: 0,
        right: 0,
        height: '100%',
        width: '400px',
        maxWidth: '100vw',
        borderLeft: `1px solid ${vars.color.border}`,
        animation: `${slideInFromRight} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
      },
      left: {
        top: 0,
        left: 0,
        height: '100%',
        width: '400px',
        maxWidth: '100vw',
        borderRight: `1px solid ${vars.color.border}`,
        animation: `${slideInFromLeft} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
      },
      top: {
        top: 0,
        left: 0,
        right: 0,
        height: 'auto',
        maxHeight: '80vh',
        borderBottom: `1px solid ${vars.color.border}`,
        animation: `${slideInFromTop} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
      },
      bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        height: 'auto',
        maxHeight: '80vh',
        borderTop: `1px solid ${vars.color.border}`,
        animation: `${slideInFromBottom} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
      },
    },
  },
  defaultVariants: { side: 'right' },
});

export const sheetHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
  padding: vars.space['4'],
  paddingBottom: 0,
});

export const sheetFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: vars.space['2'],
  padding: vars.space['4'],
  paddingTop: 0,
});

export const sheetBody = style({
  flex: 1,
  overflow: 'auto',
  padding: vars.space['4'],
});

export const sheetTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.tight,
});

export const sheetDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const sheetClose = style({
  position: 'absolute',
  top: vars.space['4'],
  right: vars.space['4'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: vars.space['8'],
  height: vars.space['8'],
  borderRadius: vars.radii.sm,
  color: vars.color.textMuted,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      color: vars.color.text,
      backgroundColor: vars.color.ghostHover,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
    },
  },
});
