import { recipe } from '@vanilla-extract/recipes';
import { keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const spinnerRecipe = recipe({
  base: {
    display: 'inline-block',
    borderRadius: vars.radii.full,
    border: '2px solid currentColor',
    borderTopColor: 'transparent',
    animation: `${spin} 0.6s linear infinite`,
    flexShrink: 0,
  },
  variants: {
    size: {
      sm: { width: '14px', height: '14px' },
      md: { width: '20px', height: '20px' },
      lg: { width: '28px', height: '28px' },
      xl: { width: '40px', height: '40px' },
    },
  },
  defaultVariants: { size: 'md' },
});
