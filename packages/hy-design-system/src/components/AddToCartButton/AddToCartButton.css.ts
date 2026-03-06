import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const addToCartRoot = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space['2'],
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.sm,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radii.md,
    transition: 'all 150ms ease',
    ':focus-visible': {
      outline: 'none',
      borderColor: vars.color.focusRing,
      boxShadow: `0 0 0 1px color-mix(in srgb, ${vars.color.focusRing} 25%, transparent)`,
    },
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.background,
        color: vars.color.text,
        borderColor: vars.color.border,
        ':hover': {
          backgroundColor: vars.color.ghostHover,
        },
      },
      primary: {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryForeground,
        borderColor: vars.color.primary,
        ':hover': {
          backgroundColor: `color-mix(in srgb, ${vars.color.primary} 85%, transparent)`,
        },
      },
    },
    size: {
      sm: { height: '28px', padding: `0 ${vars.space['3']}` },
      md: { height: '36px', padding: `0 ${vars.space['4']}` },
      lg: { height: '44px', padding: `0 ${vars.space['6']}` },
    },
    added: {
      true: {
        borderColor: vars.color.success,
        color: vars.color.success,
        backgroundColor: `color-mix(in srgb, ${vars.color.success} 10%, transparent)`,
        cursor: 'default',
        pointerEvents: 'none' as const,
      },
      false: {},
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none' as const,
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    added: false,
    disabled: false,
  },
});

export const addToCartIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
});

export const addToCartBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '18px',
  height: '18px',
  borderRadius: '9px',
  backgroundColor: `color-mix(in srgb, ${vars.color.text} 15%, transparent)`,
  color: vars.color.text,
  fontSize: '11px',
  fontWeight: '600',
  padding: `0 ${vars.space['1']}`,
});
