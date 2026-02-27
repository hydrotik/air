import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const paginationNav = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

export const paginationContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1'],
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const paginationItem = style({
  display: 'inline-flex',
});

export const paginationLink = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space['1'],
    minWidth: vars.space['10'],
    height: vars.space['10'],
    paddingLeft: vars.space['3'],
    paddingRight: vars.space['3'],
    borderRadius: vars.radii.md,
    border: `1px solid transparent`,
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.medium,
    color: vars.color.text,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.ghostHover,
      },
      '&:focus-visible': {
        outline: `2px solid ${vars.color.focusRing}`,
        outlineOffset: '2px',
      },
    },
  },
  variants: {
    isActive: {
      true: {
        borderColor: vars.color.border,
        backgroundColor: vars.color.ghostHover,
      },
      false: {},
    },
  },
  defaultVariants: { isActive: false },
});

export const paginationEllipsis = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: vars.space['10'],
  height: vars.space['10'],
  color: vars.color.textMuted,
  fontSize: vars.font.size.sm,
});
