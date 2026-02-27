import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

const overlayShow = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
});

/**
 * Sheet — shadcn v4 aligned.
 * - Overlay: black/50
 * - Content: bg-background (not surfaceOverlay)
 * - Side-based animations
 */
export const sheetOverlay = style({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: vars.color.background,
    boxShadow: vars.shadow.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space['4'],
    outline: 'none',
  },
  variants: {
    side: {
      right: {
        top: 0,
        right: 0,
        height: '100%',
        width: '75%',
        maxWidth: '24rem',
        borderLeft: `1px solid ${vars.color.border}`,
        animation: `${slideInFromRight} 500ms ${vars.motion.easing.default}`,
      },
      left: {
        top: 0,
        left: 0,
        height: '100%',
        width: '75%',
        maxWidth: '24rem',
        borderRight: `1px solid ${vars.color.border}`,
        animation: `${slideInFromLeft} 500ms ${vars.motion.easing.default}`,
      },
      top: {
        top: 0,
        left: 0,
        right: 0,
        height: 'auto',
        borderBottom: `1px solid ${vars.color.border}`,
        animation: `${slideInFromTop} 500ms ${vars.motion.easing.default}`,
      },
      bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        height: 'auto',
        borderTop: `1px solid ${vars.color.border}`,
        animation: `${slideInFromBottom} 500ms ${vars.motion.easing.default}`,
      },
    },
  },
  defaultVariants: { side: 'right' },
});

export const sheetHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['1_5'],
  padding: vars.space['4'],
});

export const sheetFooter = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
  padding: vars.space['4'],
  marginTop: 'auto',
});

export const sheetBody = style({
  flex: 1,
  overflow: 'auto',
  padding: `0 ${vars.space['4']}`,
});

export const sheetTitle = style({
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
});

export const sheetDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
});

export const sheetClose = style({
  position: 'absolute',
  top: vars.space['4'],
  right: vars.space['4'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: vars.space['6'],
  height: vars.space['6'],
  borderRadius: vars.radii.sm,
  color: vars.color.textMuted,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  opacity: '0.7',
  transition: `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      opacity: '1',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
    },
  },
});
