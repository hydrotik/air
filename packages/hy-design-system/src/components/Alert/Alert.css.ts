import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Alert — shadcn v4 aligned.
 * Grid layout: when an SVG icon is present as direct child, the icon gets
 * column 1 (16px wide) and the text gets column 2. Without an icon, column 1
 * collapses to 0.
 */
export const alertRecipe = recipe({
  base: {
    position: 'relative',
    width: '100%',
    borderRadius: vars.radii.lg,
    border: `1px solid ${vars.color.border}`,
    padding: `${vars.space['3']} ${vars.space['4']}`,
    fontSize: vars.font.size.sm,
    lineHeight: vars.font.lineHeight.normal,
    // Grid: icon column auto-collapses when no SVG child
    display: 'grid',
    gridTemplateColumns: '0 1fr',
    gap: `${vars.space['0_5']} 0`,
    alignItems: 'start',
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
      },
      destructive: {
        backgroundColor: vars.color.surface,
        color: vars.color.destructive,
      },
    },
  },
  defaultVariants: { variant: 'default' },
});

/**
 * When the alert has a direct SVG child (icon), expand the grid to fit it.
 * We use a CSS class that the Alert component applies conditionally when
 * an icon prop is provided.
 */
export const alertWithIcon = style({
  gridTemplateColumns: `${vars.space['4']} 1fr`,
  columnGap: vars.space['3'],
});

export const alertIcon = style({
  gridColumn: '1',
  gridRow: '1 / -1',
  width: vars.space['4'],
  height: vars.space['4'],
  marginTop: '2px',
  flexShrink: 0,
  color: 'currentColor',
});

export const alertTitle = style({
  gridColumn: '2',
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: vars.font.letterSpacing.tight,
  minHeight: vars.space['4'],
});

export const alertDescription = style({
  gridColumn: '2',
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.relaxed,
  selectors: {
    // In destructive variant, description is slightly dimmed destructive
    [`${alertRecipe.classNames.variants.variant.destructive} &`]: {
      color: `color-mix(in srgb, ${vars.color.destructive} 90%, transparent)`,
    },
  },
});
