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

export const dialogOverlay = style({
  backgroundColor: vars.color.overlay,
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
  backgroundColor: vars.color.surfaceOverlay,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.xl,
  boxShadow: vars.shadow.xl,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '560px',
  maxHeight: '85vh',
  overflowY: 'auto',
  padding: vars.space['6'],
  zIndex: vars.zIndex.modal,
  animation: `${contentShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
  selectors: {
    '&:focus-visible': {
      outline: 'none',
    },
  },
});

export const dialogHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['1_5'],
  marginBottom: vars.space['5'],
});

export const dialogFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: vars.space['3'],
  marginTop: vars.space['6'],
  paddingTop: vars.space['4'],
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const dialogTitle = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.tight,
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
