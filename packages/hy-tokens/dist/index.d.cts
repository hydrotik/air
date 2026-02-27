//#region src/contract.css.d.ts
/**
 * The theme contract defines the shape of all design tokens as CSS custom
 * properties. Every theme (dark, light, brand variants) must satisfy this
 * contract. Values here are null — they become CSS variable references at
 * compile time (e.g. `var(--color-background, ...)`).
 */
declare const vars: {
  color: {
    background: `var(--${string})`;
    surface: `var(--${string})`;
    surfaceElevated: `var(--${string})`;
    surfaceOverlay: `var(--${string})`;
    border: `var(--${string})`;
    borderSubtle: `var(--${string})`;
    text: `var(--${string})`;
    textMuted: `var(--${string})`;
    textInverse: `var(--${string})`;
    textDisabled: `var(--${string})`;
    primary: `var(--${string})`;
    primaryForeground: `var(--${string})`;
    secondary: `var(--${string})`;
    secondaryForeground: `var(--${string})`;
    destructive: `var(--${string})`;
    destructiveForeground: `var(--${string})`;
    success: `var(--${string})`;
    successForeground: `var(--${string})`;
    warning: `var(--${string})`;
    warningForeground: `var(--${string})`;
    focusRing: `var(--${string})`;
    overlay: `var(--${string})`;
    ghostHover: `var(--${string})`;
    input: `var(--${string})`;
    placeholder: `var(--${string})`;
  };
  space: {
    px: `var(--${string})`;
    '0_5': `var(--${string})`;
    '1': `var(--${string})`;
    '1_5': `var(--${string})`;
    '2': `var(--${string})`;
    '2_5': `var(--${string})`;
    '3': `var(--${string})`;
    '4': `var(--${string})`;
    '5': `var(--${string})`;
    '6': `var(--${string})`;
    '7': `var(--${string})`;
    '8': `var(--${string})`;
    '10': `var(--${string})`;
    '12': `var(--${string})`;
    '14': `var(--${string})`;
    '16': `var(--${string})`;
    '20': `var(--${string})`;
    '24': `var(--${string})`;
    '32': `var(--${string})`;
  };
  radii: {
    none: `var(--${string})`;
    sm: `var(--${string})`;
    md: `var(--${string})`;
    lg: `var(--${string})`;
    xl: `var(--${string})`;
    '2xl': `var(--${string})`;
    full: `var(--${string})`;
  };
  shadow: {
    sm: `var(--${string})`;
    md: `var(--${string})`;
    lg: `var(--${string})`;
    xl: `var(--${string})`;
  };
  font: {
    family: {
      sans: `var(--${string})`;
      mono: `var(--${string})`;
    };
    size: {
      xs: `var(--${string})`;
      sm: `var(--${string})`;
      md: `var(--${string})`;
      lg: `var(--${string})`;
      xl: `var(--${string})`;
      '2xl': `var(--${string})`;
      '3xl': `var(--${string})`;
      '4xl': `var(--${string})`;
    };
    weight: {
      normal: `var(--${string})`;
      medium: `var(--${string})`;
      semibold: `var(--${string})`;
      bold: `var(--${string})`;
    };
    lineHeight: {
      tight: `var(--${string})`;
      snug: `var(--${string})`;
      normal: `var(--${string})`;
      relaxed: `var(--${string})`;
    };
    letterSpacing: {
      tight: `var(--${string})`;
      normal: `var(--${string})`;
      wide: `var(--${string})`;
    };
  };
  motion: {
    duration: {
      instant: `var(--${string})`;
      fast: `var(--${string})`;
      normal: `var(--${string})`;
      slow: `var(--${string})`;
    };
    easing: {
      default: `var(--${string})`;
      in: `var(--${string})`;
      out: `var(--${string})`;
      spring: `var(--${string})`;
    };
  };
  zIndex: {
    base: `var(--${string})`;
    dropdown: `var(--${string})`;
    sticky: `var(--${string})`;
    overlay: `var(--${string})`;
    modal: `var(--${string})`;
    toast: `var(--${string})`;
    tooltip: `var(--${string})`;
  };
};
type Vars = typeof vars;
//#endregion
//#region src/dark.css.d.ts
/**
 * Dark theme (default) — applied via `data-theme="dark"` on `<html>`.
 * Near-black backgrounds, subtle warm-cool neutrals, crisp cyan accent.
 */
declare const darkThemeClass: string;
//#endregion
//#region src/light.css.d.ts
/**
 * Light theme — applied via `data-theme="light"` on `<html>`.
 * Clean whites, soft warm-grey surfaces, same blue accent family.
 */
declare const lightThemeClass: string;
//#endregion
//#region src/themeClasses.d.ts
/**
 * A map from theme name to the generated vanilla-extract class.
 * Usage:
 * ```ts
 * document.documentElement.className = themeClasses['dark'];
 * document.documentElement.setAttribute('data-theme', 'dark');
 * ```
 */
declare const themeClasses: Record<ThemeName, string>;
//#endregion
//#region src/index.d.ts
/** Canonical theme names */
type ThemeName = 'dark' | 'light';
/** Canonical brand names — extend as needed */
type BrandName = 'default';
//#endregion
export { BrandName, ThemeName, type Vars, darkThemeClass, lightThemeClass, themeClasses, vars };
//# sourceMappingURL=index.d.cts.map