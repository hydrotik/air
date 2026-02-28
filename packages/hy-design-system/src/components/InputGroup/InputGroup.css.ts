import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * InputGroup — shadcn v4 aligned.
 *
 * The wrapper div owns border, shadow, border-radius, and background.
 * Child inputs/textareas strip their own chrome via `inputGroupInput`.
 */
export const inputGroupRoot = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  borderRadius: vars.radii.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.input,
  boxShadow: vars.shadow.xs,
  height: vars.space['8'],
  minWidth: 0,
  transition: 'color 0.15s, box-shadow 0.15s',
  selectors: {
    '&:focus-within': {
      borderColor: vars.color.focusRing,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
    },
  },
});

/** Auto-height variant (for textareas) */
export const inputGroupColumn = style({
  flexDirection: 'column',
  height: 'auto',
});

/**
 * Addon — text, icon, or button slot next to the input.
 */
export const inputGroupAddon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space['1'],
  padding: `0 ${vars.space['3']}`,
  fontSize: vars.font.size.sm,
  fontWeight: '500',
  color: vars.color.textMuted,
  whiteSpace: 'nowrap',
  userSelect: 'none',
  flexShrink: 0,
});

/**
 * Toolbar — row at the end of a column-layout group (below textarea).
 */
export const inputGroupToolbar = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: vars.space['1'],
  width: '100%',
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  borderTop: `1px solid color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
});

/**
 * Strip all chrome from an Input or Textarea inside an InputGroup.
 * The group wrapper provides the visual container.
 */
export const inputGroupInput = style({
  border: 'none !important',
  borderRadius: '0 !important',
  backgroundColor: 'transparent !important',
  boxShadow: 'none !important',
  outline: 'none !important',
  flex: 1,
  minWidth: 0,
});
