import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const page = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
  backgroundColor: vars.color.background,
});

export const navbar = style({
  position: 'sticky',
  top: 0,
  zIndex: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `0 ${vars.space['6']}`,
  height: '52px',
  borderBottom: `1px solid ${vars.color.border}`,
  backdropFilter: 'blur(12px)',
  backgroundColor: `color-mix(in srgb, ${vars.color.background} 85%, transparent)`,
});

export const hero = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: `80px ${vars.space['6']} 64px`,
  maxWidth: '720px',
  margin: '0 auto',
});

export const heroTitle = style({
  fontSize: 'clamp(32px, 5vw, 48px)',
  fontWeight: 700,
  letterSpacing: '-0.025em',
  lineHeight: 1.1,
  margin: 0,
  color: vars.color.text,
});

export const heroSubtitle = style({
  fontSize: vars.font.size.lg,
  color: vars.color.textMuted,
  lineHeight: 1.6,
  marginTop: vars.space['4'],
  maxWidth: '540px',
});

/* 3-column grid matching shadcn: grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl */
export const bentoGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space['4'],
  padding: `0 ${vars.space['6']} 80px`,
  maxWidth: '56rem', /* max-w-4xl = 896px */
  width: '100%',
  margin: '0 auto',
  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

/* Cell base: rounded-lg border bg-card text-card-foreground shadow-sm */
export const cell = style({
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  padding: vars.space['4'],
  overflow: 'hidden',
});

export const cellNoBorder = style({
  padding: vars.space['4'],
  overflow: 'hidden',
});

/* Span helpers */
export const colSpan2 = style({
  '@media': {
    '(min-width: 768px)': { gridColumn: 'span 2' },
  },
});

export const colSpan3 = style({
  '@media': {
    '(min-width: 768px)': { gridColumn: 'span 3' },
  },
});

export const rowSpan2 = style({
  '@media': {
    '(min-width: 768px)': { gridRow: 'span 2' },
  },
});

export const rowSpan3 = style({
  '@media': {
    '(min-width: 768px)': { gridRow: 'span 3' },
  },
});

/* Section label */
export const sectionLabel = style({
  fontSize: vars.font.size.sm,
  fontWeight: 500,
  color: vars.color.textMuted,
  display: 'flex',
  alignItems: 'center',
  padding: `${vars.space['2']} 0`,
});

/* ─── Nav links ─── */
export const navLinks = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1'],
});

export const navLink = style({
  fontSize: vars.font.size.sm,
  fontWeight: 500,
  color: vars.color.textMuted,
  textDecoration: 'none',
  padding: `${vars.space['1']} ${vars.space['3']}`,
  borderRadius: vars.radii.md,
  transition: 'color 0.15s, background-color 0.15s',
  ':hover': {
    color: vars.color.text,
    backgroundColor: vars.color.secondary,
  },
});

export const navLinkActive = style({
  color: vars.color.text,
  backgroundColor: vars.color.secondary,
});

/* ─── Input group helpers ─── */

/**
 * Prefix/suffix addon that sits flush next to an Input.
 * Matches Input token values: height, border, bg, font, shadow.
 */
export const inputAddon = style({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  height: vars.space['8'],
  padding: `0 ${vars.space['2_5']}`,
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  backgroundColor: vars.color.input,
  border: `1px solid ${vars.color.border}`,
  boxSizing: 'border-box',
});

export const inputAddonStart = style({
  borderRadius: `${vars.radii.md} 0 0 ${vars.radii.md}`,
  borderRight: 'none',
});

export const inputAddonEnd = style({
  borderRadius: `0 ${vars.radii.md} ${vars.radii.md} 0`,
  borderLeft: 'none',
});

/** Input that sits in the middle of a group (no border-radius) */
export const inputGroupMiddle = style({
  borderRadius: '0 !important',
  flex: 1,
});

/** Input that starts a group (right side flush) */
export const inputGroupStart = style({
  borderRadius: `${vars.radii.md} 0 0 ${vars.radii.md} !important`,
  flex: 1,
});

/** Input that ends a group (left side flush) */
export const inputGroupEnd = style({
  borderRadius: `0 ${vars.radii.md} ${vars.radii.md} 0 !important`,
  flex: 1,
});

/** Wrapper border that contains a textarea + toolbar */
export const fieldContainer = style({
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  overflow: 'hidden',
});

/** Toolbar row below a textarea in a field container */
export const fieldToolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1'],
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  borderTop: `1px solid color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
});
