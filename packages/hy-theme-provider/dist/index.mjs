import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { themeClasses } from "@hydrotik/tokens";
import { jsx } from "react/jsx-runtime";

//#region src/ThemeProvider.tsx
const DEFAULT_THEME = "dark";
const DEFAULT_BRAND = "default";
const DEFAULT_STORAGE_KEY = "hydrotik-theme";
const ThemeContext = createContext({
	theme: DEFAULT_THEME,
	brand: DEFAULT_BRAND,
	setTheme: () => {},
	setBrand: () => {}
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
function ThemeProvider({ defaultTheme = DEFAULT_THEME, defaultBrand = DEFAULT_BRAND, storageKey = DEFAULT_STORAGE_KEY, children }) {
	const [theme, setThemeState] = useState(() => {
		if (typeof window === "undefined") return defaultTheme;
		if (storageKey) try {
			const stored = localStorage.getItem(storageKey);
			if (stored && stored in themeClasses) return stored;
		} catch {}
		return defaultTheme;
	});
	const [brand, setBrandState] = useState(defaultBrand);
	const applyTheme = useCallback((next) => {
		const root = document.documentElement;
		Object.values(themeClasses).forEach((cls) => root.classList.remove(cls));
		root.classList.add(themeClasses[next]);
		root.setAttribute("data-theme", next);
	}, []);
	const setTheme = useCallback((next) => {
		setThemeState(next);
		if (storageKey) try {
			localStorage.setItem(storageKey, next);
		} catch {}
	}, [storageKey]);
	const setBrand = useCallback((next) => {
		setBrandState(next);
		document.documentElement.setAttribute("data-brand", next);
	}, []);
	useEffect(() => {
		applyTheme(theme);
	}, [theme, applyTheme]);
	useEffect(() => {
		document.documentElement.setAttribute("data-brand", brand);
	}, [brand]);
	return /* @__PURE__ */ jsx(ThemeContext.Provider, {
		value: {
			theme,
			brand,
			setTheme,
			setBrand
		},
		children
	});
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
function ThemeScript({ storageKey = DEFAULT_STORAGE_KEY, defaultTheme = DEFAULT_THEME }) {
	return /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: `
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
  `.trim() } });
}

//#endregion
//#region src/useTheme.ts
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
function useTheme() {
	return useContext(ThemeContext);
}

//#endregion
export { ThemeContext, ThemeProvider, ThemeScript, useTheme };
//# sourceMappingURL=index.mjs.map