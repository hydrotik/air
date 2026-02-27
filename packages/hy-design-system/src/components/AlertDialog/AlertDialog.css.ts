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
 * AlertDialog — shadcn v4 aligned.
 * Same as Dialog but without close button.
 */
export const alertDialogOverlay = style({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  inset: 0,
  zIndex: vars.zIndex.overlay,
  animation: `${overlayShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
});

export const alertDialogContent = style({
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
  padding: vars.space['6'],
  zIndex: vars.zIndex.modal,
  display: 'grid',
  gap: vars.space['4'],
  animation: `${contentShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
  outline: 'none',
});

export const alertDialogHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
});

export const alertDialogFooter = style({
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

export const alertDialogTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.tight,
});

export const alertDialogDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.relaxed,
});
