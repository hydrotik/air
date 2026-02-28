import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/* ─── Layout ─── */
export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const section = style({
  padding: `80px ${vars.space['6']}`,
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
  '@media': {
    '(max-width: 768px)': {
      padding: `48px ${vars.space['4']}`,
    },
  },
});

export const sectionAlt = style({
  backgroundColor: vars.color.surface,
  borderTop: `1px solid ${vars.color.border}`,
  borderBottom: `1px solid ${vars.color.border}`,
});

/* ─── Hero ─── */
export const hero = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: `100px ${vars.space['6']} 0`,
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
  '@media': {
    '(max-width: 768px)': {
      padding: `64px ${vars.space['4']} 0`,
    },
  },
});

export const heroBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  padding: `${vars.space['1']} ${vars.space['3']}`,
  borderRadius: vars.radii.full,
  border: `1px solid ${vars.color.border}`,
  fontSize: vars.font.size.xs,
  fontWeight: 500,
  color: vars.color.textMuted,
  marginBottom: vars.space['6'],
  backgroundColor: `color-mix(in srgb, ${vars.color.primary} 8%, transparent)`,
});

export const heroTitle = style({
  fontSize: 'clamp(36px, 6vw, 64px)',
  fontWeight: 700,
  letterSpacing: '-0.035em',
  lineHeight: 1.05,
  margin: 0,
  color: vars.color.text,
  maxWidth: '800px',
});

export const heroAccent = style({
  background: `linear-gradient(135deg, ${vars.color.primary}, ${vars.color.chart3})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const heroSubtitle = style({
  fontSize: vars.font.size.lg,
  color: vars.color.textMuted,
  lineHeight: 1.7,
  marginTop: vars.space['5'],
  maxWidth: '600px',
});

export const heroCtas = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['3'],
  marginTop: vars.space['8'],
  flexWrap: 'wrap',
  justifyContent: 'center',
});

/* ─── Hero Image ─── */
export const heroImageWrapper = style({
  position: 'relative',
  maxWidth: '1100px',
  width: '100%',
  margin: '64px auto 0',
  padding: `0 ${vars.space['6']}`,
  '@media': {
    '(max-width: 768px)': {
      padding: `0 ${vars.space['4']}`,
      margin: '40px auto 0',
    },
  },
});

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const heroImage = style({
  width: '100%',
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px ${vars.color.border}`,
  display: 'block',
});

export const heroGlow = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
  height: '60%',
  transform: 'translate(-50%, -50%)',
  background: `radial-gradient(ellipse, color-mix(in srgb, ${vars.color.primary} 15%, transparent), transparent 70%)`,
  filter: 'blur(60px)',
  pointerEvents: 'none',
  zIndex: -1,
});

/* ─── Format badges ─── */
export const formatRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  marginTop: vars.space['6'],
  flexWrap: 'wrap',
  justifyContent: 'center',
});

/* ─── Stats row ─── */
export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: vars.space['6'],
  textAlign: 'center',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: vars.space['4'],
    },
  },
});

export const statValue = style({
  fontSize: 'clamp(28px, 4vw, 40px)',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: vars.color.text,
});

export const statLabel = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  marginTop: vars.space['1'],
});

/* ─── Feature grid ─── */
export const featureGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space['4'],
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const featureCard = style({
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  padding: vars.space['6'],
  transition: 'border-color 0.2s, box-shadow 0.2s',
  ':hover': {
    borderColor: `color-mix(in srgb, ${vars.color.primary} 40%, ${vars.color.border})`,
    boxShadow: `0 0 0 1px color-mix(in srgb, ${vars.color.primary} 20%, transparent)`,
  },
});

export const featureIcon = style({
  width: '40px',
  height: '40px',
  borderRadius: vars.radii.md,
  backgroundColor: `color-mix(in srgb, ${vars.color.primary} 12%, transparent)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.primary,
  marginBottom: vars.space['4'],
});

export const featureTitle = style({
  fontSize: vars.font.size.md,
  fontWeight: 600,
  color: vars.color.text,
  marginBottom: vars.space['2'],
});

export const featureDesc = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: 1.6,
});

/* ─── Spec list ─── */
export const specGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space['4'],
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const specCard = style({
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  padding: vars.space['5'],
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
});

export const specRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: vars.font.size.sm,
  padding: `${vars.space['2']} 0`,
  borderBottom: `1px solid color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
  selectors: {
    '&:last-child': { borderBottom: 'none' },
  },
});

export const specLabel = style({
  color: vars.color.textMuted,
});

export const specValue = style({
  color: vars.color.text,
  fontWeight: 500,
  fontFamily: vars.font.family.mono,
  fontSize: vars.font.size.xs,
});

/* ─── Section headings ─── */
export const sectionHeading = style({
  fontSize: 'clamp(24px, 4vw, 36px)',
  fontWeight: 700,
  letterSpacing: '-0.025em',
  color: vars.color.text,
  margin: 0,
  textAlign: 'center',
});

export const sectionSubheading = style({
  fontSize: vars.font.size.md,
  color: vars.color.textMuted,
  marginTop: vars.space['3'],
  textAlign: 'center',
  maxWidth: '540px',
  margin: `${vars.space['3']} auto 0`,
  lineHeight: 1.6,
});

export const sectionHeader = style({
  marginBottom: vars.space['10'],
});

/* ─── Use cases ─── */
export const useCaseGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space['4'],
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const useCaseCard = style({
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  padding: vars.space['6'],
  backgroundColor: vars.color.surface,
});

export const useCaseTitle = style({
  fontSize: vars.font.size.md,
  fontWeight: 600,
  color: vars.color.text,
  marginBottom: vars.space['3'],
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
});

export const useCaseQuote = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: 1.7,
  fontStyle: 'italic',
});

/* ─── Comparison table ─── */
export const comparisonWrapper = style({
  overflowX: 'auto',
});

export const comparisonTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: vars.font.size.sm,
});

globalStyle(`${comparisonTable} th`, {
  textAlign: 'left',
  padding: `${vars.space['3']} ${vars.space['4']}`,
  borderBottom: `2px solid ${vars.color.border}`,
  color: vars.color.text,
  fontWeight: 600,
  whiteSpace: 'nowrap',
});

globalStyle(`${comparisonTable} td`, {
  padding: `${vars.space['3']} ${vars.space['4']}`,
  borderBottom: `1px solid color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
  color: vars.color.textMuted,
});

globalStyle(`${comparisonTable} td:first-child`, {
  color: vars.color.text,
  fontWeight: 500,
});

/* ─── Feature bullet list ─── */
export const bulletGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: `${vars.space['2']} ${vars.space['6']}`,
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const bulletItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.space['3'],
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: 1.6,
  padding: `${vars.space['2']} 0`,
});

export const bulletCheck = style({
  color: vars.color.chart3,
  flexShrink: 0,
  marginTop: '2px',
});

/* ─── CTA section ─── */
export const ctaSection = style({
  textAlign: 'center',
  padding: `100px ${vars.space['6']}`,
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
});

export const ctaTitle = style({
  fontSize: 'clamp(28px, 4vw, 44px)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  color: vars.color.text,
  margin: 0,
});

export const ctaSubtitle = style({
  fontSize: vars.font.size.lg,
  color: vars.color.textMuted,
  marginTop: vars.space['4'],
  lineHeight: 1.6,
});

/* ─── Footer ─── */
export const footer = style({
  borderTop: `1px solid ${vars.color.border}`,
  padding: `${vars.space['8']} ${vars.space['6']}`,
  textAlign: 'center',
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
});

/* ─── Hosts grid ─── */
export const hostsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: vars.space['4'],
  textAlign: 'center',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const hostCard = style({
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  padding: `${vars.space['5']} ${vars.space['3']}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space['2'],
});

export const hostName = style({
  fontSize: vars.font.size.sm,
  fontWeight: 500,
  color: vars.color.text,
});

export const hostFormat = style({
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
});
