import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const priceRoot = style({
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: vars.space['2'],
  fontFamily: vars.font.family.sans,
});

export const priceAmount = recipe({
  base: {
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-0.01em',
  },
  variants: {
    variant: {
      current: {
        color: vars.color.text,
        fontWeight: '600',
      },
      original: {
        color: `color-mix(in srgb, ${vars.color.text} 50%, transparent)`,
        fontWeight: '400',
        textDecoration: 'line-through',
      },
      discount: {
        color: vars.color.destructive,
        fontWeight: '600',
      },
    },
    size: {
      sm: { fontSize: vars.font.size.sm },
      md: { fontSize: vars.font.size.md },
      lg: { fontSize: vars.font.size.lg },
      xl: { fontSize: vars.font.size.xl },
    },
  },
  defaultVariants: {
    variant: 'current',
    size: 'md',
  },
});
