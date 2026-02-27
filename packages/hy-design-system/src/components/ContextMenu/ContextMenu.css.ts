import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';
import {
  baseMenuItem,
  baseMenuSeparator,
  baseMenuLabel,
  baseMenuShortcut,
  baseMenuItemIndicator,
} from '../../styles/menu-item.css';

const slideIn = keyframes({
  from: { opacity: '0', transform: 'scale(0.96)' },
  to: { opacity: '1', transform: 'scale(1)' },
});

/**
 * ContextMenu — shadcn v4 aligned.
 * Uses shared menu-item styles.
 */
export const contextMenuContent = style({
  zIndex: vars.zIndex.dropdown,
  minWidth: '8rem',
  overflow: 'hidden',
  borderRadius: vars.radii.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
  padding: vars.space['1'],
  boxShadow: vars.shadow.md,
  animation: `${slideIn} ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
});

export const contextMenuItem = baseMenuItem;
export const contextMenuCheckboxItem = baseMenuItem;
export const contextMenuRadioItem = baseMenuItem;
export const contextMenuLabel = baseMenuLabel;
export const contextMenuSeparator = baseMenuSeparator;
export const contextMenuShortcut = baseMenuShortcut;
export const contextMenuItemIndicator = baseMenuItemIndicator;

export const contextMenuSubTrigger = style([
  baseMenuItem,
  {
    selectors: {
      '&[data-state="open"]': {
        backgroundColor: vars.color.ghostHover,
      },
    },
  },
]);

export const contextMenuSubContent = style([contextMenuContent, {}]);
