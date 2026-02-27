'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { themeClasses } from '@hydrotik/tokens';
import type { ThemeContextValue, ThemeProviderProps, ThemeName, BrandName } from './types';

const DEFAULT_THEME: ThemeName = 'dark';
const DEFAULT_BRAND: BrandName = 'default';
const DEFAULT_STORAGE_KEY = 'hydrotik-theme';

export const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  brand: DEFAULT_BRAND,
  setTheme: () => {},
  setBrand: () => {},
});

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
export function ThemeProvider({
  defaultTheme = DEFAULT_THEME,
  defaultBrand = DEFAULT_BRAND,
  storageKey = DEFAULT_STORAGE_KEY,
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    if (storageKey) {
      try {
        const stored = localStorage.getItem(storageKey) as ThemeName | null;
        if (stored && stored in themeClasses) return stored;
      } catch {
        // localStorage unavailable (private browsing etc.)
      }
    }
    return defaultTheme;
  });

  const [brand, setBrandState] = useState<BrandName>(defaultBrand);

  const applyTheme = useCallback(
    (next: ThemeName) => {
      const root = document.documentElement;

      // Remove all known theme classes
      Object.values(themeClasses).forEach((cls) => root.classList.remove(cls));

      // Apply the new theme class
      root.classList.add(themeClasses[next]);

      // Keep data attributes in sync for CSS selectors + JS queries
      root.setAttribute('data-theme', next);
    },
    [],
  );

  const setTheme = useCallback(
    (next: ThemeName) => {
      setThemeState(next);
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, next);
        } catch {
          // ignore
        }
      }
    },
    [storageKey],
  );

  const setBrand = useCallback((next: BrandName) => {
    setBrandState(next);
    document.documentElement.setAttribute('data-brand', next);
  }, []);

  // Apply theme to DOM whenever state changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Apply brand to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand);
  }, [brand]);

  return (
    <ThemeContext.Provider value={{ theme, brand, setTheme, setBrand }}>
      {children}
    </ThemeContext.Provider>
  );
}

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
export function ThemeScript({
  storageKey = DEFAULT_STORAGE_KEY,
  defaultTheme = DEFAULT_THEME,
}: {
  storageKey?: string;
  defaultTheme?: ThemeName;
}) {
  const script = `
(function() {
  var key = ${JSON.stringify(storageKey)};
  var def = ${JSON.stringify(defaultTheme)};
  var valid = ${JSON.stringify(Object.keys(themeClasses))};
  var classes = ${JSON.stringify(themeClasses)};
  var stored;
  try { stored = localStorage.getItem(key); } catch(e) {}
  var theme = (stored && valid.indexOf(stored) !== -1) ? stored : def;
  var root = document.documentElement;
  Object.values(classes).forEach(function(c) { root.classList.remove(c); });
  root.classList.add(classes[theme]);
  root.setAttribute('data-theme', theme);
  root.setAttribute('data-brand', 'default');
})();
  `.trim();

  // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional inline script for theme initialization
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
