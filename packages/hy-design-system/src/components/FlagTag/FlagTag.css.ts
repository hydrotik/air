import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * FlagTag — Inline status indicator with icon + label
 *
 * Used in forensic/editorial contexts to mark rows as flagged, reviewed,
 * pending, etc. Intentionally minimal: no background, no border — just
 * icon + monospace label in a status color.
 *
 * Design decisions:
 * - No background or border (flat, ink-on-paper feel)
 * - Monospace font with letter-spacing (forensic/editorial density)
 * - Icon sits slightly above text baseline via translateY
 * - Icon is larger than text (14px icon with 9px text) for scannability
 * - Inline-flex so it flows naturally in text or table cells
 */

export const flagTagRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: vars.font.family.mono,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    border: 'none',
    background: 'none',
    padding: 0,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    verticalAlign: 'middle',
  },
  variants: {
    variant: {
      destructive: { color: vars.color.destructive },
      warning: { color: vars.color.warning },
      success: { color: vars.color.success },
      primary: { color: vars.color.primary },
      muted: { color: vars.color.textMuted },
    },
    size: {
      xs: { fontSize: '8px', gap: '3px' },
      sm: { fontSize: '9px', gap: '4px' },
      md: { fontSize: '11px', gap: '5px' },
      lg: { fontSize: '13px', gap: '6px' },
    },
  },
  defaultVariants: {
    variant: 'destructive',
    size: 'sm',
  },
});

export type FlagTagVariants = RecipeVariants<typeof flagTagRecipe>;

export const flagTagIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  lineHeight: 0,
  transform: 'translateY(-2px)',
  selectors: {
    /* Size-aware: icon is 2px taller than label for scannability */
    '[data-flag-size="xs"] &': { fontSize: '14px' },
    '[data-flag-size="sm"] &': { fontSize: '15px' },
    '[data-flag-size="md"] &': { fontSize: '17px' },
    '[data-flag-size="lg"] &': { fontSize: '19px' },
  },
});

export const flagTagLabel = style({
  lineHeight: 0,
});
