import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const overlayShow = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
});

const contentShow = keyframes({
  from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.95)' },
  to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
});

/**
 * Dialog — shadcn v4 aligned.
 * - Overlay: black/50
 * - Content: bg-background (not surfaceOverlay)
 * - gap-4, p-6, rounded-lg
 */
export const dialogOverlay = style({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  inset: 0,
  zIndex: vars.zIndex.overlay,
  animation: `${overlayShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-state="closed"]': {
      animationDirection: 'reverse',
    },
  },
});

export const dialogContent = style({
  backgroundColor: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  boxShadow: vars.shadow.lg,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '32rem',
  maxHeight: '85vh',
  overflowY: 'auto',
  padding: vars.space['6'],
  zIndex: vars.zIndex.modal,
  display: 'grid',
  gap: vars.space['4'],
  animation: `${contentShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
  outline: 'none',
});

export const dialogHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
});

export const dialogFooter = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: vars.space['2'],
  '@media': {
    'screen and (min-width: 640px)': {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
});

export const dialogTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  lineHeight: '1',
  margin: 0,
});

export const dialogDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.normal,
  margin: 0,
});

export const dialogClose = style({
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
