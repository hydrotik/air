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

/**
 * Button recipe — shadcn v4 aligned.
 * - `default` = primary CTA (was `primary`)
 * - Added `link` variant
 * - Uses `shadow.xs` on applicable variants
 * - High-density sizing (sm=28, md=32, lg=40)
 */
export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space['2'],
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.medium,
    letterSpacing: vars.font.letterSpacing.normal,
    fontSize: vars.font.size.sm,
    borderRadius: vars.radii.md,
    border: '1px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    outline: 'none',
    transition: [
      `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    ].join(', '),
    selectors: {
      '&:focus-visible': {
        borderColor: vars.color.focusRing,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
      },
      '&:disabled, &[aria-disabled="true"]': {
        opacity: '0.5',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryForeground,
        borderColor: vars.color.primary,
        selectors: {
          '&:hover:not(:disabled)': {
            filter: 'brightness(0.9)',
          },
        },
      },
      destructive: {
        backgroundColor: vars.color.destructive,
        color: vars.color.destructiveForeground,
        borderColor: vars.color.destructive,
        selectors: {
          '&:hover:not(:disabled)': {
            filter: 'brightness(0.9)',
          },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: vars.color.text,
        borderColor: vars.color.border,
        boxShadow: vars.shadow.xs,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.ghostHover,
          },
        },
      },
      secondary: {
        backgroundColor: vars.color.secondary,
        color: vars.color.secondaryForeground,
        selectors: {
          '&:hover:not(:disabled)': {
            filter: 'brightness(0.8)',
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
      link: {
        backgroundColor: 'transparent',
        color: vars.color.primary,
        borderColor: 'transparent',
        textDecoration: 'none',
        selectors: {
          '&:hover:not(:disabled)': {
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          },
        },
      },
    },
    size: {
      sm: {
        height: vars.space['7'],
        paddingLeft: vars.space['3'],
        paddingRight: vars.space['3'],
        fontSize: vars.font.size.xs,
        gap: vars.space['1_5'],
      },
      md: {
        height: vars.space['8'],
        paddingLeft: vars.space['3'],
        paddingRight: vars.space['3'],
        fontSize: vars.font.size.sm,
      },
      lg: {
        height: vars.space['10'],
        paddingLeft: vars.space['5'],
        paddingRight: vars.space['5'],
        fontSize: vars.font.size.sm,
      },
      icon: {
        width: vars.space['8'],
        height: vars.space['8'],
        padding: 0,
      },
      'icon-sm': {
        width: vars.space['7'],
        height: vars.space['7'],
        padding: 0,
      },
      'icon-lg': {
        width: vars.space['10'],
        height: vars.space['10'],
        padding: 0,
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
    variant: 'default',
    size: 'md',
    loading: false,
    fullWidth: false,
  },
});
