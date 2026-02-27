import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const separatorRecipe = recipe({
  base: {
    backgroundColor: vars.color.borderSubtle,
    flexShrink: 0,
  },
  variants: {
    orientation: {
      horizontal: { height: '1px', width: '100%' },
      vertical: { height: '100%', width: '1px' },
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});
