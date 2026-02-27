import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const kbdRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: vars.font.family.mono,
    fontWeight: vars.font.weight.medium,
    borderRadius: vars.radii.sm,
    border: `1px solid ${vars.color.border}`,
    backgroundColor: vars.color.secondary,
    color: vars.color.text,
    boxShadow: `0 1px 0 1px ${vars.color.borderSubtle}`,
    whiteSpace: 'nowrap',
    lineHeight: '1',
  },
  variants: {
    size: {
      sm: {
        height: '20px',
        minWidth: '20px',
        padding: `0 ${vars.space['1']}`,
        fontSize: vars.font.size.xs,
      },
      md: {
        height: '24px',
        minWidth: '24px',
        padding: `0 ${vars.space['1_5']}`,
        fontSize: vars.font.size.xs,
      },
    },
  },
  defaultVariants: { size: 'md' },
});
