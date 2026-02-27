import { style, globalStyle } from '@vanilla-extract/css';
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
  fontSize: 'clamp(32px, 5vw, 52px)',
  fontWeight: 800,
  letterSpacing: '-0.035em',
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

export const bentoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: vars.space['4'],
  padding: `0 ${vars.space['6']} 80px`,
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: 'repeat(6, 1fr)',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

/* Grid span helpers */
export const span12 = style({ gridColumn: 'span 12', '@media': { '(max-width: 1024px)': { gridColumn: 'span 6' }, '(max-width: 640px)': { gridColumn: 'span 1' } } });
export const span8 = style({ gridColumn: 'span 8', '@media': { '(max-width: 1024px)': { gridColumn: 'span 6' }, '(max-width: 640px)': { gridColumn: 'span 1' } } });
export const span6 = style({ gridColumn: 'span 6', '@media': { '(max-width: 1024px)': { gridColumn: 'span 3' }, '(max-width: 640px)': { gridColumn: 'span 1' } } });
export const span4 = style({ gridColumn: 'span 4', '@media': { '(max-width: 1024px)': { gridColumn: 'span 3' }, '(max-width: 640px)': { gridColumn: 'span 1' } } });
export const span6Center = style({ gridColumn: '4 / span 6', '@media': { '(max-width: 1024px)': { gridColumn: 'span 6' }, '(max-width: 640px)': { gridColumn: 'span 1' } } });

export const stackColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['4'],
});

export const centerContent = style({
  display: 'flex',
  alignItems: 'center',
});

export const centerPad = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space['3'],
});
