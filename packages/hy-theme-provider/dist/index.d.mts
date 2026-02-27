import * as react from "react";
import { BrandName, ThemeName } from "@hydrotik/tokens";
import * as react_jsx_runtime0 from "react/jsx-runtime";

//#region src/types.d.ts
interface ThemeContextValue {
  /** Current theme name */
  theme: ThemeName;
  /** Current brand name */
  brand: BrandName;
  /** Toggle or directly set theme */
  setTheme: (theme: ThemeName) => void;
  /** Set brand */
  setBrand: (brand: BrandName) => void;
}
interface ThemeProviderProps {
  /** Initial theme. Defaults to 'dark'. */
  defaultTheme?: ThemeName;
  /** Initial brand. Defaults to 'default'. */
  defaultBrand?: BrandName;
  /**
   * Storage key for persisting theme preference.
   * Set to null to disable persistence.
   * @default 'hydrotik-theme'
   */
  storageKey?: string | null;
  children: React.ReactNode;
}
//#endregion
//#region src/ThemeProvider.d.ts
declare const ThemeContext: react.Context<ThemeContextValue>;
/**
 * ThemeProvider — SSR-safe React context that manages theme and brand state.
 *
 * Applies the vanilla-extract theme class + `data-theme` / `data-brand`
 * attributes to `<html>`. Works in Next.js App Router (with 'use client'),
 * Next.js Pages Router, and plain Vite/React apps.
 *
 * To prevent flash-of-unstyled-content (FOUC) in server-rendered apps, add
 * a `<ThemeScript>` in your `<head>` to apply the theme before first paint
 * (see `ThemeScript` export below).
 */
declare function ThemeProvider({
  defaultTheme,
  defaultBrand,
  storageKey,
  children
}: ThemeProviderProps): react_jsx_runtime0.JSX.Element;
/**
 * Inline script that runs before React hydration to apply the stored theme.
 * Prevents flash of wrong theme in SSR apps.
 *
 * Usage (Next.js app/layout.tsx):
 * ```tsx
 * import { ThemeScript } from '@hydrotik/theme-provider';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head><ThemeScript /></head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
declare function ThemeScript({
  storageKey,
  defaultTheme
}: {
  storageKey?: string;
  defaultTheme?: ThemeName;
}): react_jsx_runtime0.JSX.Element;
//#endregion
//#region src/useTheme.d.ts
/**
 * Hook to read and update the current theme and brand.
 *
 * Must be used inside a `<ThemeProvider>`.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, setTheme } = useTheme();
 *   return (
 *     <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
 *       Switch to {theme === 'dark' ? 'light' : 'dark'} mode
 *     </button>
 *   );
 * }
 * ```
 */
declare function useTheme(): ThemeContextValue;
//#endregion
export { type BrandName, ThemeContext, type ThemeContextValue, type ThemeName, ThemeProvider, type ThemeProviderProps, ThemeScript, useTheme };
//# sourceMappingURL=index.d.mts.map