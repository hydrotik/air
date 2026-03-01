import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

export const pageRoot = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `${vars.space['8']} ${vars.space['6']}`,
  fontFamily: vars.font.family.sans,
});

export const pageTitle = style({
  fontSize: vars.font.size['3xl'],
  fontWeight: '700',
  color: vars.color.text,
  marginBottom: vars.space['2'],
});

export const pageDescription = style({
  fontSize: vars.font.size.md,
  color: vars.color.textMuted,
  marginBottom: vars.space['8'],
  maxWidth: '640px',
});

export const section = style({
  marginBottom: vars.space['12'],
});

export const sectionTitle = style({
  fontSize: vars.font.size.xl,
  fontWeight: '600',
  color: vars.color.text,
  marginBottom: vars.space['1'],
});

export const sectionDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  marginBottom: vars.space['6'],
});

/* ------------------------------------------------------------------ */
/*  Product Grid                                                       */
/* ------------------------------------------------------------------ */

export const productGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: vars.space['6'],
});

/* ------------------------------------------------------------------ */
/*  Cart Layout                                                        */
/* ------------------------------------------------------------------ */

export const cartLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 340px',
  gap: vars.space['6'],
  alignItems: 'start',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const cartItems = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
});

export const cartSummary = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  padding: vars.space['6'],
  backgroundColor: vars.color.surface,
  position: 'sticky',
  top: vars.space['4'],
});

export const cartSummaryTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: '600',
  color: vars.color.text,
  marginBottom: vars.space['4'],
});

export const cartSummaryRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.space['2']} 0`,
  fontSize: vars.font.size.sm,
  color: vars.color.text,
});

export const cartSummaryTotal = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.space['3']} 0`,
  fontSize: vars.font.size.md,
  fontWeight: '700',
  color: vars.color.text,
  borderTop: `1px solid ${vars.color.border}`,
  marginTop: vars.space['2'],
});

/* ------------------------------------------------------------------ */
/*  Component Showcase                                                 */
/* ------------------------------------------------------------------ */

export const showcaseGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: vars.space['6'],
});

export const showcaseCard = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  padding: vars.space['6'],
  backgroundColor: vars.color.surface,
});

export const showcaseLabel = style({
  fontSize: vars.font.size.xs,
  fontWeight: '500',
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: vars.space['3'],
});

export const showcaseRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['3'],
  flexWrap: 'wrap',
});

export const divider = style({
  height: '1px',
  backgroundColor: vars.color.border,
  margin: `${vars.space['8']} 0`,
});

/* ------------------------------------------------------------------ */
/*  Skeleton Grid                                                      */
/* ------------------------------------------------------------------ */

export const skeletonGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: vars.space['6'],
});
