import { darkThemeClass } from './dark.css';
import { lightThemeClass } from './light.css';
import type { ThemeName } from './index';

/**
 * A map from theme name to the generated vanilla-extract class.
 * Usage:
 * ```ts
 * document.documentElement.className = themeClasses['dark'];
 * document.documentElement.setAttribute('data-theme', 'dark');
 * ```
 */
export const themeClasses: Record<ThemeName, string> = {
  dark: darkThemeClass,
  light: lightThemeClass,
};
