import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * SegmentedRatingBar — Segmented bar graph component
 *
 * A horizontal bar divided into N equal segments. Each segment is either
 * "lit" (filled with the accent color) or "dim" (filled with a faint wash
 * of the accent color). Together they form a continuous bar — no gaps —
 * where lit segments indicate presence/coverage across data sources.
 *
 * Design decisions:
 * - Segments have 1px gap between them (visible separation)
 * - Each segment has 1px border-radius (slight curve)
 * - Dim segments use 12% opacity of accent color (visible background)
 * - Lit segments use accent at 85% opacity (punchy but not overpowering)
 * - Bar grows left-to-right: lit segments first, dim segments after
 * - Sizes control segment dimensions; sm is default for inline data tables
 */

export const segmentedRatingBarRecipe = recipe({
  base: {
    display: 'inline-flex',
    gap: '1px',
    flexShrink: 0,
  },
  variants: {
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
    },
    /** Color variant — maps to token palette */
    color: {
      primary: {},
      chart1: {},
      chart2: {},
      chart3: {},
      chart4: {},
      chart5: {},
      destructive: {},
      success: {},
      warning: {},
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'chart2',
  },
});

export type SegmentedRatingBarVariants = RecipeVariants<typeof segmentedRatingBarRecipe>;

/* ── Individual segment (base) ── */
export const segmentBase = style({
  display: 'block',
  flexShrink: 0,
  borderRadius: '1px',
});

/* ── Size-driven segment dimensions ── */
/* Applied via data-size attribute on the container */

/* xs: 4×6 — ultra-compact for dense rosters */
globalStyle(`[data-rating-size="xs"] .${segmentBase}`, {
  width: '4px',
  height: '6px',
});

/* sm: 5×8 — default for inline tables */
globalStyle(`[data-rating-size="sm"] .${segmentBase}`, {
  width: '5px',
  height: '8px',
});

/* md: 6×10 — standalone usage */
globalStyle(`[data-rating-size="md"] .${segmentBase}`, {
  width: '6px',
  height: '10px',
});

/* lg: 8×12 — hero/callout usage */
globalStyle(`[data-rating-size="lg"] .${segmentBase}`, {
  width: '8px',
  height: '12px',
});

/* ── Lit/dim states ── */
/* Color-driven via data-rating-color on container + data-lit on segment */

const colorMap: Record<string, string> = {
  primary: vars.color.primary,
  chart1: vars.color.chart1,
  chart2: vars.color.chart2,
  chart3: vars.color.chart3,
  chart4: vars.color.chart4,
  chart5: vars.color.chart5,
  destructive: vars.color.destructive,
  success: vars.color.success,
  warning: vars.color.warning,
};

for (const [name, token] of Object.entries(colorMap)) {
  /* Lit segment */
  globalStyle(`[data-rating-color="${name}"] .${segmentBase}[data-lit="true"]`, {
    backgroundColor: token,
    opacity: 0.85,
  });
  /* Dim segment */
  globalStyle(`[data-rating-color="${name}"] .${segmentBase}[data-lit="false"]`, {
    backgroundColor: token,
    opacity: 0.12,
  });
}
