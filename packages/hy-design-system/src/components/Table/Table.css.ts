import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const tableWrapper = style({
  position: 'relative',
  width: '100%',
  overflowX: 'auto',
  borderRadius: vars.radii.md,
  border: `1px solid ${vars.color.border}`,
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  captionSide: 'bottom',
  fontSize: vars.font.size.sm,
  color: vars.color.text,
});

export const tableCaption = style({
  marginTop: vars.space[3],
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  textAlign: 'center',
});

export const tableHeader = style({
  borderBottom: `1px solid ${vars.color.border}`,
});

export const tableBody = style({
  selectors: {
    '& tr:last-child': {
      borderBottom: 'none',
    },
  },
});

export const tableFooter = style({
  borderTop: `1px solid ${vars.color.border}`,
  backgroundColor: `color-mix(in srgb, ${vars.color.surface} 50%, transparent)`,
  fontWeight: vars.font.weight.medium,
  selectors: {
    '& tr:last-child': {
      borderBottom: 'none',
    },
  },
});

export const tableRow = style({
  borderBottom: `1px solid ${vars.color.border}`,
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-state="selected"]': {
      backgroundColor: vars.color.ghostHover,
    },
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
    },
  },
});

export const tableHead = style({
  padding: `${vars.space[3]} ${vars.space[4]}`,
  textAlign: 'left',
  verticalAlign: 'middle',
  fontWeight: vars.font.weight.semibold,
  color: vars.color.textMuted,
  fontSize: vars.font.size.xs,
  textTransform: 'uppercase',
  letterSpacing: vars.font.letterSpacing.wide,
  whiteSpace: 'nowrap',
  selectors: {
    '&:has([role=checkbox])': { paddingRight: 0 },
    '&[data-align="right"]': { textAlign: 'right' },
    '&[data-align="center"]': { textAlign: 'center' },
  },
});

export const tableCell = style({
  padding: `${vars.space[3]} ${vars.space[4]}`,
  verticalAlign: 'middle',
  selectors: {
    '&:has([role=checkbox])': { paddingRight: 0 },
    '&[data-align="right"]': { textAlign: 'right' },
    '&[data-align="center"]': { textAlign: 'center' },
  },
});
