import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const fieldMessageRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: vars.space['1'],
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.normal,
  },
  variants: {
    variant: {
      default: { color: vars.color.textMuted },
      error: { color: vars.color.destructive },
      success: { color: vars.color.success },
    },
  },
  defaultVariants: { variant: 'default' },
});
