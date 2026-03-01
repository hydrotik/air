import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const quantityPickerRoot = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radii.md,
    overflow: 'hidden',
    fontFamily: vars.font.family.sans,
    fontVariantNumeric: 'tabular-nums',
    backgroundColor: vars.color.background,
  },
  variants: {
    size: {
      sm: { height: '28px' },
      md: { height: '32px' },
      lg: { height: '40px' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const quantityButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '100%',
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.text,
  cursor: 'pointer',
  fontSize: vars.font.size.md,
  fontWeight: '500',
  transition: 'background-color 150ms ease',
  ':hover': {
    backgroundColor: vars.color.ghostHover,
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  ':focus-visible': {
    outline: 'none',
    backgroundColor: vars.color.ghostHover,
  },
  selectors: {
    '&:first-of-type': {
      borderRight: `1px solid ${vars.color.border}`,
    },
    '&:last-of-type': {
      borderLeft: `1px solid ${vars.color.border}`,
    },
  },
});

export const quantityDisplay = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.text,
    fontWeight: '500',
    userSelect: 'none',
  },
  variants: {
    size: {
      sm: {
        minWidth: '28px',
        fontSize: vars.font.size.xs,
        padding: `0 ${vars.space['1']}`,
      },
      md: {
        minWidth: '36px',
        fontSize: vars.font.size.sm,
        padding: `0 ${vars.space['2']}`,
      },
      lg: {
        minWidth: '44px',
        fontSize: vars.font.size.md,
        padding: `0 ${vars.space['3']}`,
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
