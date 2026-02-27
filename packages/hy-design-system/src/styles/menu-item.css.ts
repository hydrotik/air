import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Shared menu item styles used by DropdownMenu, ContextMenu, Command, Menubar, Select.
 * Extracted to reduce boilerplate duplication across menu-like components.
 */

/** Base menu item — flex row with hover highlight */
export const baseMenuItem = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  borderRadius: vars.radii.sm,
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  cursor: 'default',
  outline: 'none',
  userSelect: 'none',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-highlighted]': {
      backgroundColor: vars.color.ghostHover,
    },
    '&[data-disabled]': {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  },
});

/** Menu separator line */
export const baseMenuSeparator = style({
  height: '1px',
  margin: `${vars.space['1']} -${vars.space['1']}`,
  backgroundColor: vars.color.borderSubtle,
});

/** Menu label (group header) */
export const baseMenuLabel = style({
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
});

/** Menu shortcut text */
export const baseMenuShortcut = style({
  marginLeft: 'auto',
  fontSize: vars.font.size.xs,
  letterSpacing: vars.font.letterSpacing.wide,
  color: vars.color.textMuted,
});

/** Item indicator container (for checkboxes/radios) */
export const baseMenuItemIndicator = style({
  position: 'absolute',
  left: vars.space['2'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
});
