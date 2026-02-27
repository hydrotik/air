import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Shared overlay/modal styles used by Dialog, AlertDialog, and Sheet.
 * Extracted to reduce boilerplate duplication across modal components.
 */

const overlayShow = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
});

const contentShow = keyframes({
  from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.95)' },
  to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
});

/** Standard modal overlay — rgba(0,0,0,0.5) per shadcn convention */
export const baseOverlay = style({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  inset: 0,
  zIndex: vars.zIndex.overlay,
  animation: `${overlayShow} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
});

/** Standard centered modal content container */
export const baseModalContent = style({
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

/** Shared modal header layout */
export const baseModalHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
});

/** Shared responsive modal footer */
export const baseModalFooter = style({
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

/** Shared modal title */
export const baseModalTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.tight,
});

/** Shared modal description */
export const baseModalDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.relaxed,
});
