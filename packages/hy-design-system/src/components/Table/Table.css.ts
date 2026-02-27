import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Table — shadcn v4 aligned.
 * - Simple overflow wrapper, no border on wrapper
 * - th: text-foreground, font-medium, no uppercase, h-10
 * - Hover: bg-muted/50 (ghostHover)
 * - Selected: bg-muted (secondary)
 */
export const tableWrapper = style({
  position: 'relative',
  width: '100%',
  overflowX: 'auto',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  captionSide: 'bottom',
  fontSize: vars.font.size.sm,
  color: vars.color.text,
});

export const tableCaption = style({
  marginTop: vars.space['4'],
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  textAlign: 'center',
});

export const tableHeader = style({
  borderBottom: `1px solid ${vars.color.border}`,
});

export const tableBody = style({});

globalStyle(`${tableBody} tr:last-child`, {
  borderBottom: 'none',
});

export const tableFooter = style({
  borderTop: `1px solid ${vars.color.border}`,
  backgroundColor: `color-mix(in srgb, ${vars.color.secondary} 50%, transparent)`,
  fontWeight: vars.font.weight.medium,
});

globalStyle(`${tableFooter} tr:last-child`, {
  borderBottom: 'none',
});

export const tableRow = style({
  borderBottom: `1px solid ${vars.color.border}`,
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-state="selected"]': {
      backgroundColor: vars.color.secondary,
    },
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
    },
  },
});

export const tableHead = style({
  height: vars.space['10'],
  padding: `0 ${vars.space['2']}`,
  textAlign: 'left',
  verticalAlign: 'middle',
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  whiteSpace: 'nowrap',
  selectors: {
    '&:has([role=checkbox])': { paddingRight: 0 },
  },
});

export const tableCell = style({
  padding: vars.space['2'],
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  selectors: {
    '&:has([role=checkbox])': { paddingRight: 0 },
  },
});
