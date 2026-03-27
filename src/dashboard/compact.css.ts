import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

// ─── Shell ──────────────────────────────────────────────────────────────

export const compactShell = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
});

export const compactHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '4px 12px',
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  height: '32px',
  flexShrink: 0,
  boxSizing: 'border-box',
});

export const compactHeaderLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const compactHeaderRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

// ─── Tab Bar ────────────────────────────────────────────────────────────

export const compactTabBar = style({
  display: 'flex',
  gap: 0,
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  flexShrink: 0,
  height: '28px',
  boxSizing: 'border-box',
});

export const compactTab = style({
  all: 'unset',
  cursor: 'pointer',
  padding: '4px 12px',
  fontFamily: vars.font.family.mono,
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: vars.color.textMuted,
  borderBottom: '2px solid transparent',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1,
  ':hover': {
    color: vars.color.text,
    background: `color-mix(in srgb, ${vars.color.primary} 5%, transparent)`,
  },
});

export const compactTabActive = style({
  color: vars.color.text,
  borderBottomColor: vars.color.primary,
});

// ─── Content Area ───────────────────────────────────────────────────────

export const compactMain = style({
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const compactTabContent = style({
  flex: 1,
  overflowY: 'auto',
  padding: '6px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

// ─── KPI Row ────────────────────────────────────────────────────────────

export const compactKpiRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '4px',
  '@media': {
    '(max-width: 900px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const compactKpiCard = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.sm,
  padding: '5px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
});

export const compactKpiLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: '8px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: vars.color.textMuted,
  lineHeight: 1,
});

export const compactKpiValue = style({
  fontSize: '16px',
  fontWeight: 700,
  fontFamily: vars.font.family.mono,
  color: vars.color.text,
  lineHeight: 1.2,
});

// ─── Visualization Grid ─────────────────────────────────────────────────

export const compactVizGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '4px',
});

export const compactVizCell = style({
  height: '150px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

// ─── Panels ─────────────────────────────────────────────────────────────

export const compactPanel = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.sm,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const compactPanelHeader = style({
  padding: '3px 8px',
  borderBottom: `1px solid ${vars.color.border}`,
  fontFamily: vars.font.family.mono,
  fontSize: '9px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: vars.color.textMuted,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  lineHeight: 1,
  flexShrink: 0,
});

export const compactPanelBody = style({
  flex: 1,
  overflow: 'auto',
  padding: '4px',
});

// ─── Two-Column Layout ──────────────────────────────────────────────────

export const compactTwoCol = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '4px',
  flex: 1,
  overflow: 'hidden',
});

// ─── Ticker Slot ────────────────────────────────────────────────────────

export const compactTickerSlot = style({
  height: '28px',
  borderTop: `1px solid ${vars.color.border}`,
  flexShrink: 0,
  overflow: 'hidden',
  background: vars.color.surface,
});

// ─── Ticker Animation ───────────────────────────────────────────────────

export const tickerEnterKeyframes = keyframes({
  from: { transform: 'translateY(100%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

export const tickerExitKeyframes = keyframes({
  from: { transform: 'translateY(0)', opacity: 1 },
  to: { transform: 'translateY(-100%)', opacity: 0 },
});

export const tickerContainer = style({
  height: '28px',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
});

export const tickerItem = style({
  position: 'absolute',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: vars.font.family.mono,
  fontSize: '10px',
  padding: '0 8px',
  boxSizing: 'border-box',
});

export const tickerItemEnter = style({
  animation: `${tickerEnterKeyframes} 300ms ease-out forwards`,
});

export const tickerItemExit = style({
  animation: `${tickerExitKeyframes} 300ms ease-out forwards`,
});

// ─── Empty State ────────────────────────────────────────────────────────

export const compactEmptyState = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  color: vars.color.textMuted,
  fontFamily: vars.font.family.mono,
  fontSize: '11px',
  textAlign: 'center',
  flex: 1,
});

// ─── Session Summary Bar ────────────────────────────────────────────────

export const compactSessionSummary = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '4px 8px',
  fontFamily: vars.font.family.mono,
  fontSize: '10px',
  color: vars.color.textMuted,
  borderTop: `1px solid ${vars.color.border}`,
  flexShrink: 0,
});
