import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['6'],
  padding: `${vars.space['6']} ${vars.space['6']} 80px`,
  maxWidth: '1400px',
  width: '100%',
  margin: '0 auto',
});

/* ─── Hero ─── */
export const hero = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['4'],
  padding: `${vars.space['10']} ${vars.space['6']}`,
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  background: `linear-gradient(135deg, color-mix(in srgb, ${vars.color.primary} 8%, transparent), color-mix(in srgb, ${vars.color.background} 100%, transparent))`,
  overflow: 'hidden',
});

export const heroTitle = style({
  fontSize: 'clamp(28px, 4vw, 44px)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1.05,
  margin: 0,
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
});

export const heroAccent = style({
  color: vars.color.primary,
});

export const heroSub = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  margin: 0,
  lineHeight: 1.6,
  maxWidth: '520px',
});

export const statsRow = style({
  display: 'flex',
  gap: vars.space['6'],
  flexWrap: 'wrap',
  marginTop: vars.space['1'],
});

export const stat = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: vars.space['1'],
});

export const statNumber = style({
  fontSize: vars.font.size.xl,
  fontWeight: 700,
  color: vars.color.text,
  fontFamily: vars.font.family.mono,
  letterSpacing: '-0.02em',
});

export const statLabel = style({
  fontSize: '10px',
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontFamily: vars.font.family.mono,
});

/* ─── Masonry grid ─── */
export const masonry = style({
  columnCount: 3,
  columnGap: '12px',
  '@media': {
    '(max-width: 1024px)': { columnCount: 2 },
    '(max-width: 640px)': { columnCount: 1 },
  },
});

export const masonryItem = style({
  breakInside: 'avoid',
  marginBottom: '12px',
  display: 'inline-block',
  width: '100%',
});

/* ─── Section cards ─── */
export const sectionCard = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  backgroundColor: vars.color.surface,
  overflow: 'hidden',
});

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 10px',
  borderBottom: `1px solid ${vars.color.border}`,
  backgroundColor: `color-mix(in srgb, ${vars.color.background} 50%, transparent)`,
});

export const sectionLabel = style({
  fontSize: '10px',
  fontWeight: 600,
  color: vars.color.textMuted,
  fontFamily: vars.font.family.mono,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const sectionTag = style({
  fontSize: '9px',
  fontFamily: vars.font.family.mono,
  color: vars.color.primary,
  backgroundColor: `color-mix(in srgb, ${vars.color.primary} 12%, transparent)`,
  padding: '1px 5px',
  borderRadius: vars.radii.sm,
});

export const sectionBody = style({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

/* ─── Demo helpers ─── */
export const demoRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '6px',
});

export const demoCol = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
});

/* ─── Category filter ─── */
export const filterRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
});
