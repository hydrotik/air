import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';
import {
  baseOverlay,
  baseModalContent,
  baseModalHeader,
  baseModalFooter,
  baseModalTitle,
  baseModalDescription,
} from '../../styles/overlay.css';

/**
 * Dialog — shadcn v4 aligned.
 * Uses shared overlay/modal styles.
 */
export const dialogOverlay = baseOverlay;
export const dialogContent = baseModalContent;
export const dialogHeader = baseModalHeader;
export const dialogFooter = baseModalFooter;
export const dialogTitle = baseModalTitle;
export const dialogDescription = baseModalDescription;

export const dialogClose = style({
  position: 'absolute',
  right: vars.space['4'],
  top: vars.space['4'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radii.sm,
  opacity: '0.7',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  color: vars.color.text,
  transition: `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      opacity: '1',
    },
  },
});
