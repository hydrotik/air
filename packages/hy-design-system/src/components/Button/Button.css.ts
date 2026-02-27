import { recipe } from '@vanilla-extract/recipes';
import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const spinner = style({
  display: 'inline-block',
  width: '1em',
  height: '1em',
  border: `2px solid currentColor`,
  borderTopColor: 'transparent',
  borderRadius: vars.radii.full,
  animation: `${spin} 0.6s linear infinite`,
  flexShrink: 0,
});

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space['2'],
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.medium,
    letterSpacing: vars.font.letterSpacing.wide,
    borderRadius: vars.radii.md,
    border: '1px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: [
      `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    ].join(', '),
    selectors: {
      '&:focus-visible': {
        outline: `2px solid ${vars.color.focusRing}`,
        outlineOffset: '2px',
      },
      '&:disabled, &[aria-disabled="true"]': {
        opacity: '0.45',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryForeground,
        borderColor: vars.color.primary,
        boxShadow: `0 1px 2px rgba(0,0,0,0.3)`,
        selectors: {
          '&:hover:not(:disabled)': {
            filter: 'brightness(1.1)',
          },
          '&:active:not(:disabled)': {
            filter: 'brightness(0.95)',
          },
        },
      },
      secondary: {
        backgroundColor: vars.color.secondary,
        color: vars.color.secondaryForeground,
        borderColor: vars.color.border,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.surfaceElevated,
          },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: vars.color.text,
        borderColor: vars.color.border,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.ghostHover,
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: vars.color.text,
        borderColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.ghostHover,
          },
        },
      },
      destructive: {
        backgroundColor: vars.color.destructive,
        color: vars.color.destructiveForeground,
        borderColor: vars.color.destructive,
        selectors: {
          '&:hover:not(:disabled)': {
            filter: 'brightness(1.1)',
          },
        },
      },
    },
    size: {
      sm: {
        height: vars.space['8'],
        paddingLeft: vars.space['3'],
        paddingRight: vars.space['3'],
        fontSize: vars.font.size.sm,
      },
      md: {
        height: vars.space['10'],
        paddingLeft: vars.space['4'],
        paddingRight: vars.space['4'],
        fontSize: vars.font.size.sm,
      },
      lg: {
        height: vars.space['12'],
        paddingLeft: vars.space['6'],
        paddingRight: vars.space['6'],
        fontSize: vars.font.size.md,
      },
    },
    loading: {
      true: {
        cursor: 'not-allowed',
        opacity: '0.7',
        pointerEvents: 'none',
      },
      false: {},
    },
    fullWidth: {
      true: { width: '100%' },
      false: {},
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    loading: false,
    fullWidth: false,
  },
});
