Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let react = require("react");
let _hydrotik_tokens = require("@hydrotik/tokens");
let react_jsx_runtime = require("react/jsx-runtime");

//#region src/ThemeProvider.tsx
const DEFAULT_THEME = "dark";
const DEFAULT_BRAND = "default";
const DEFAULT_STORAGE_KEY = "hydrotik-theme";
const ThemeContext = (0, react.createContext)({
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
	const [theme, setThemeState] = (0, react.useState)(() => {
		if (typeof window === "undefined") return defaultTheme;
		if (storageKey) try {
			const stored = localStorage.getItem(storageKey);
			if (stored && stored in _hydrotik_tokens.themeClasses) return stored;
		} catch {}
		return defaultTheme;
	});
	const [brand, setBrandState] = (0, react.useState)(defaultBrand);
	const applyTheme = (0, react.useCallback)((next) => {
		const root = document.documentElement;
		Object.values(_hydrotik_tokens.themeClasses).forEach((cls) => root.classList.remove(cls));
		root.classList.add(_hydrotik_tokens.themeClasses[next]);
		root.setAttribute("data-theme", next);
	}, []);
	const setTheme = (0, react.useCallback)((next) => {
		setThemeState(next);
		if (storageKey) try {
			localStorage.setItem(storageKey, next);
		} catch {}
	}, [storageKey]);
	const setBrand = (0, react.useCallback)((next) => {
		setBrandState(next);
		document.documentElement.setAttribute("data-brand", next);
	}, []);
	(0, react.useEffect)(() => {
		applyTheme(theme);
	}, [theme, applyTheme]);
	(0, react.useEffect)(() => {
		document.documentElement.setAttribute("data-brand", brand);
	}, [brand]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThemeContext.Provider, {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
(function() {
  var key = ${JSON.stringify(storageKey)};
  var def = ${JSON.stringify(defaultTheme)};
  var valid = ${JSON.stringify(Object.keys(_hydrotik_tokens.themeClasses))};
  var classes = ${JSON.stringify(_hydrotik_tokens.themeClasses)};
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
	return (0, react.useContext)(ThemeContext);
}

//#endregion
exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.ThemeScript = ThemeScript;
exports.useTheme = useTheme;
//# sourceMappingURL=index.cjs.map