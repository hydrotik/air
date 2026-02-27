import { globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

// Font imports — Inter (sans) and JetBrains Mono (mono)
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';

/**
 * Global baseline styles for the Hydrotik design system.
 * Import this once at your app entry or Storybook preview.
 *
 * Fonts loaded:
 * - Inter Variable (sans-serif) — all weights 100-900
 * - JetBrains Mono Variable (monospace) — all weights 100-800
 */

// Box sizing reset
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

// Document defaults
globalStyle('html', {
  fontSize: '16px',
  textSizeAdjust: '100%',
  WebkitTextSizeAdjust: '100%',
});

globalStyle('body', {
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.normal,
  letterSpacing: vars.font.letterSpacing.normal,
  fontFeatureSettings: "'rlig' 1, 'calt' 1",
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  minHeight: '100dvh',
});

// Typography
globalStyle('h1, h2, h3, h4, h5, h6', {
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: vars.font.letterSpacing.tight,
  color: vars.color.text,
});

globalStyle('p', {
  lineHeight: vars.font.lineHeight.relaxed,
});

globalStyle('code, kbd, samp, pre', {
  fontFamily: vars.font.family.mono,
  fontSize: '0.9em',
});

// Links
globalStyle('a', {
  color: vars.color.primary,
  textDecoration: 'none',
  transition: `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
});

globalStyle('a:hover', {
  opacity: '0.85',
});

// Selection
globalStyle('::selection', {
  backgroundColor: vars.color.primary,
  color: vars.color.primaryForeground,
});

// Focus visible — token-driven ring
globalStyle(':focus-visible', {
  outline: `2px solid ${vars.color.focusRing}`,
  outlineOffset: '2px',
});

// Remove focus outline for mouse users
globalStyle(':focus:not(:focus-visible)', {
  outline: 'none',
});

// Scrollbar (webkit)
globalStyle('::-webkit-scrollbar', {
  width: '8px',
  height: '8px',
});

globalStyle('::-webkit-scrollbar-track', {
  background: vars.color.background,
});

globalStyle('::-webkit-scrollbar-thumb', {
  background: vars.color.border,
  borderRadius: vars.radii.full,
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
  background: vars.color.textMuted,
});

// Reduced motion
globalStyle('*', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms',
      animationIterationCount: '1',
      transitionDuration: '0.01ms',
      scrollBehavior: 'auto',
    },
  },
});

// Images
globalStyle('img, svg, video, canvas, audio, iframe, embed, object', {
  display: 'block',
  verticalAlign: 'middle',
  maxWidth: '100%',
});

// Interactive defaults
globalStyle('button, input, optgroup, select, textarea', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  color: 'inherit',
});

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  background: 'none',
});

globalStyle('button:disabled', {
  cursor: 'not-allowed',
});
