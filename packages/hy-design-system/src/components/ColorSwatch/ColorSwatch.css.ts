import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const colorSwatchStyle = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '1px solid',
    borderColor: `color-mix(in srgb, ${vars.color.border} 60%, transparent)`,
    transition: 'all 150ms ease',
    flexShrink: 0,
    ':hover': {
      borderColor: vars.color.text,
      transform: 'scale(1.05)',
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
    },
  },
  variants: {
    selected: {
      true: {
        borderColor: vars.color.text,
        borderWidth: '2px',
        boxShadow: `0 0 0 1px ${vars.color.background}`,
      },
      false: {},
    },
    size: {
      sm: { width: '24px', height: '24px', borderRadius: vars.radii.sm },
      md: { width: '32px', height: '32px', borderRadius: vars.radii.sm },
      lg: { width: '40px', height: '40px', borderRadius: vars.radii.md },
    },
    shape: {
      square: {},
      circle: { borderRadius: '50%' },
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
    selected: false,
    size: 'md',
    shape: 'square',
    disabled: false,
  },
});
