import { createThemeContract } from '@vanilla-extract/css';

/**
 * The theme contract defines the shape of all design tokens as CSS custom
 * properties. Every theme (dark, light, brand variants) must satisfy this
 * contract. Values here are null — they become CSS variable references at
 * compile time (e.g. `var(--color-background, ...)`).
 */
export const vars = createThemeContract({
  color: {
    /** Page background — near-black in dark theme */
    background: null,
    /** Primary surface (cards, panels) */
    surface: null,
    /** Slightly elevated surface (popovers, dropdowns) */
    surfaceElevated: null,
    /** Highest elevation surfaces (modals, toasts) */
    surfaceOverlay: null,
    /** Visible border — low contrast but present */
    border: null,
    /** Subtle border for dividers */
    borderSubtle: null,
    /** Primary body text */
    text: null,
    /** Secondary / helper text */
    textMuted: null,
    /** Text on colored backgrounds */
    textInverse: null,
    /** Disabled element text */
    textDisabled: null,
    /** Brand accent (interactive elements) */
    primary: null,
    /** Text on primary accent backgrounds */
    primaryForeground: null,
    /** Secondary interactive */
    secondary: null,
    /** Text on secondary backgrounds */
    secondaryForeground: null,
    /** Destructive / error */
    destructive: null,
    /** Text on destructive backgrounds */
    destructiveForeground: null,
    /** Success state */
    success: null,
    /** Text on success backgrounds */
    successForeground: null,
    /** Warning state */
    warning: null,
    /** Text on warning backgrounds */
    warningForeground: null,
    /** Focus ring outline */
    focusRing: null,
    /** Modal/dialog overlay scrim */
    overlay: null,
    /** Hover/selection highlight */
    ghostHover: null,
    /** Input background */
    input: null,
    /** Placeholder text */
    placeholder: null,
  },
  space: {
    px: null,
    '0_5': null,
    '1': null,
    '1_5': null,
    '2': null,
    '2_5': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '7': null,
    '8': null,
    '9': null,
    '10': null,
    '12': null,
    '14': null,
    '16': null,
    '20': null,
    '24': null,
    '32': null,
  },
  radii: {
    none: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null,
    full: null,
  },
  shadow: {
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  font: {
    family: {
      sans: null,
      mono: null,
    },
    size: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      '2xl': null,
      '3xl': null,
      '4xl': null,
    },
    weight: {
      normal: null,
      medium: null,
      semibold: null,
      bold: null,
    },
    lineHeight: {
      tight: null,
      snug: null,
      normal: null,
      relaxed: null,
    },
    letterSpacing: {
      tight: null,
      normal: null,
      wide: null,
    },
  },
  motion: {
    duration: {
      instant: null,
      fast: null,
      normal: null,
      slow: null,
    },
    easing: {
      default: null,
      in: null,
      out: null,
      spring: null,
    },
  },
  zIndex: {
    base: null,
    dropdown: null,
    sticky: null,
    overlay: null,
    modal: null,
    toast: null,
    tooltip: null,
  },
});

export type Vars = typeof vars;
