export { vars } from './contract.css';
export type { Vars } from './contract.css';
export { darkThemeClass } from './dark.css';
export { lightThemeClass } from './light.css';

/** Canonical theme names */
export type ThemeName = 'dark' | 'light';

/** Canonical brand names — extend as needed */
export type BrandName = 'default';

/**
 * Maps theme name → the generated vanilla-extract CSS class name.
 * Apply this class to `<html>` or any scoping element.
 */
export { themeClasses } from './themeClasses';
