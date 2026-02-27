import { darkThemeClass } from './dark.css';
import { lightThemeClass } from './light.css';

/**
 * A map from theme name to the generated vanilla-extract class.
 * Usage:
 * ```ts
 * document.documentElement.className = themeClasses['dark'];
 * document.documentElement.setAttribute('data-theme', 'dark');
 * ```
 */
export const themeClasses: Record<'dark' | 'light', string> = {
  dark: darkThemeClass,
  light: lightThemeClass,
};
