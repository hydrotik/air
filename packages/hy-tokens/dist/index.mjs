import { createTheme, createThemeContract } from "@vanilla-extract/css";

//#region src/contract.css.ts
/**
* The theme contract defines the shape of all design tokens as CSS custom
* properties. Every theme (dark, light, brand variants) must satisfy this
* contract. Values here are null — they become CSS variable references at
* compile time (e.g. `var(--color-background, ...)`).
*/
const vars = createThemeContract({
	color: {
		background: null,
		surface: null,
		surfaceElevated: null,
		surfaceOverlay: null,
		border: null,
		borderSubtle: null,
		text: null,
		textMuted: null,
		textInverse: null,
		textDisabled: null,
		primary: null,
		primaryForeground: null,
		secondary: null,
		secondaryForeground: null,
		destructive: null,
		destructiveForeground: null,
		success: null,
		successForeground: null,
		warning: null,
		warningForeground: null,
		focusRing: null,
		overlay: null,
		ghostHover: null,
		input: null,
		placeholder: null,
		chart1: null,
		chart2: null,
		chart3: null,
		chart4: null,
		chart5: null
	},
	space: {
		px: null,
		"0_5": null,
		"1": null,
		"1_5": null,
		"2": null,
		"2_5": null,
		"3": null,
		"4": null,
		"5": null,
		"6": null,
		"7": null,
		"8": null,
		"9": null,
		"10": null,
		"12": null,
		"14": null,
		"16": null,
		"20": null,
		"24": null,
		"32": null
	},
	radii: {
		none: null,
		sm: null,
		md: null,
		lg: null,
		xl: null,
		"2xl": null,
		full: null
	},
	shadow: {
		xs: null,
		sm: null,
		md: null,
		lg: null,
		xl: null
	},
	font: {
		family: {
			sans: null,
			mono: null
		},
		size: {
			xs: null,
			sm: null,
			md: null,
			lg: null,
			xl: null,
			"2xl": null,
			"3xl": null,
			"4xl": null
		},
		weight: {
			normal: null,
			medium: null,
			semibold: null,
			bold: null
		},
		lineHeight: {
			tight: null,
			snug: null,
			normal: null,
			relaxed: null
		},
		letterSpacing: {
			tight: null,
			normal: null,
			wide: null
		}
	},
	motion: {
		duration: {
			instant: null,
			fast: null,
			normal: null,
			slow: null
		},
		easing: {
			default: null,
			in: null,
			out: null,
			spring: null
		}
	},
	zIndex: {
		base: null,
		dropdown: null,
		sticky: null,
		overlay: null,
		modal: null,
		toast: null,
		tooltip: null
	}
});

//#endregion
//#region src/dark.css.ts
/**
* Dark theme (default) — applied via `data-theme="dark"` on `<html>`.
* Near-black backgrounds, subtle warm-cool neutrals, crisp cyan accent.
*/
const darkThemeClass = createTheme(vars, {
	color: {
		background: "#0e0f11",
		surface: "#17181c",
		surfaceElevated: "#1f2025",
		surfaceOverlay: "#26272d",
		border: "#2e3038",
		borderSubtle: "#22242a",
		text: "#e8e9ec",
		textMuted: "#8b8d98",
		textInverse: "#0e0f11",
		textDisabled: "#4a4c56",
		primary: "#3b82f6",
		primaryForeground: "#ffffff",
		secondary: "#2e3038",
		secondaryForeground: "#c9cad4",
		destructive: "#ef4444",
		destructiveForeground: "#ffffff",
		success: "#22c55e",
		successForeground: "#ffffff",
		warning: "#f59e0b",
		warningForeground: "#0e0f11",
		focusRing: "#3b82f6",
		overlay: "rgba(0, 0, 0, 0.7)",
		ghostHover: "rgba(255, 255, 255, 0.05)",
		input: "#1f2025",
		placeholder: "#5c5e6b",
		chart1: "#2563eb",
		chart2: "#60a5fa",
		chart3: "#34d399",
		chart4: "#facc15",
		chart5: "#fb923c"
	},
	space: {
		px: "1px",
		"0_5": "0.125rem",
		"1": "0.25rem",
		"1_5": "0.375rem",
		"2": "0.5rem",
		"2_5": "0.625rem",
		"3": "0.75rem",
		"4": "1rem",
		"5": "1.25rem",
		"6": "1.5rem",
		"7": "1.75rem",
		"8": "2rem",
		"9": "2.25rem",
		"10": "2.5rem",
		"12": "3rem",
		"14": "3.5rem",
		"16": "4rem",
		"20": "5rem",
		"24": "6rem",
		"32": "8rem"
	},
	radii: {
		none: "0",
		sm: "0.25rem",
		md: "0.375rem",
		lg: "0.5rem",
		xl: "0.75rem",
		"2xl": "1rem",
		full: "9999px"
	},
	shadow: {
		xs: "0 1px 1px rgba(0,0,0,0.3)",
		sm: "0 1px 2px rgba(0,0,0,0.4)",
		md: "0 4px 8px rgba(0,0,0,0.5)",
		lg: "0 8px 24px rgba(0,0,0,0.6)",
		xl: "0 20px 48px rgba(0,0,0,0.7)"
	},
	font: {
		family: {
			sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
			mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, Consolas, monospace"
		},
		size: {
			xs: "0.75rem",
			sm: "0.875rem",
			md: "1rem",
			lg: "1.125rem",
			xl: "1.25rem",
			"2xl": "1.5rem",
			"3xl": "1.875rem",
			"4xl": "2.25rem"
		},
		weight: {
			normal: "400",
			medium: "500",
			semibold: "600",
			bold: "700"
		},
		lineHeight: {
			tight: "1.25",
			snug: "1.375",
			normal: "1.5",
			relaxed: "1.75"
		},
		letterSpacing: {
			tight: "-0.025em",
			normal: "0em",
			wide: "0.025em"
		}
	},
	motion: {
		duration: {
			instant: "0ms",
			fast: "100ms",
			normal: "200ms",
			slow: "350ms"
		},
		easing: {
			default: "cubic-bezier(0.16, 1, 0.3, 1)",
			in: "cubic-bezier(0.4, 0, 1, 1)",
			out: "cubic-bezier(0, 0, 0.2, 1)",
			spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
		}
	},
	zIndex: {
		base: "0",
		dropdown: "1000",
		sticky: "1100",
		overlay: "1200",
		modal: "1300",
		toast: "1400",
		tooltip: "1500"
	}
});

//#endregion
//#region src/light.css.ts
/**
* Light theme — applied via `data-theme="light"` on `<html>`.
* Clean whites, soft warm-grey surfaces, same blue accent family.
*/
const lightThemeClass = createTheme(vars, {
	color: {
		background: "#f8f9fb",
		surface: "#ffffff",
		surfaceElevated: "#ffffff",
		surfaceOverlay: "#ffffff",
		border: "#e2e4ea",
		borderSubtle: "#eeeff3",
		text: "#111216",
		textMuted: "#6b6f7e",
		textInverse: "#ffffff",
		textDisabled: "#b0b3bf",
		primary: "#2563eb",
		primaryForeground: "#ffffff",
		secondary: "#f1f2f5",
		secondaryForeground: "#374151",
		destructive: "#dc2626",
		destructiveForeground: "#ffffff",
		success: "#16a34a",
		successForeground: "#ffffff",
		warning: "#d97706",
		warningForeground: "#ffffff",
		focusRing: "#2563eb",
		overlay: "rgba(0, 0, 0, 0.4)",
		ghostHover: "rgba(0, 0, 0, 0.04)",
		input: "#ffffff",
		placeholder: "#9ca3af",
		chart1: "#2563eb",
		chart2: "#60a5fa",
		chart3: "#34d399",
		chart4: "#facc15",
		chart5: "#fb923c"
	},
	space: {
		px: "1px",
		"0_5": "0.125rem",
		"1": "0.25rem",
		"1_5": "0.375rem",
		"2": "0.5rem",
		"2_5": "0.625rem",
		"3": "0.75rem",
		"4": "1rem",
		"5": "1.25rem",
		"6": "1.5rem",
		"7": "1.75rem",
		"8": "2rem",
		"9": "2.25rem",
		"10": "2.5rem",
		"12": "3rem",
		"14": "3.5rem",
		"16": "4rem",
		"20": "5rem",
		"24": "6rem",
		"32": "8rem"
	},
	radii: {
		none: "0",
		sm: "0.25rem",
		md: "0.375rem",
		lg: "0.5rem",
		xl: "0.75rem",
		"2xl": "1rem",
		full: "9999px"
	},
	shadow: {
		xs: "0 1px 1px rgba(0,0,0,0.04)",
		sm: "0 1px 2px rgba(0,0,0,0.06)",
		md: "0 4px 8px rgba(0,0,0,0.08)",
		lg: "0 8px 24px rgba(0,0,0,0.1)",
		xl: "0 20px 48px rgba(0,0,0,0.14)"
	},
	font: {
		family: {
			sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
			mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, Consolas, monospace"
		},
		size: {
			xs: "0.75rem",
			sm: "0.875rem",
			md: "1rem",
			lg: "1.125rem",
			xl: "1.25rem",
			"2xl": "1.5rem",
			"3xl": "1.875rem",
			"4xl": "2.25rem"
		},
		weight: {
			normal: "400",
			medium: "500",
			semibold: "600",
			bold: "700"
		},
		lineHeight: {
			tight: "1.25",
			snug: "1.375",
			normal: "1.5",
			relaxed: "1.75"
		},
		letterSpacing: {
			tight: "-0.025em",
			normal: "0em",
			wide: "0.025em"
		}
	},
	motion: {
		duration: {
			instant: "0ms",
			fast: "100ms",
			normal: "200ms",
			slow: "350ms"
		},
		easing: {
			default: "cubic-bezier(0.16, 1, 0.3, 1)",
			in: "cubic-bezier(0.4, 0, 1, 1)",
			out: "cubic-bezier(0, 0, 0.2, 1)",
			spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
		}
	},
	zIndex: {
		base: "0",
		dropdown: "1000",
		sticky: "1100",
		overlay: "1200",
		modal: "1300",
		toast: "1400",
		tooltip: "1500"
	}
});

//#endregion
//#region src/themeClasses.ts
/**
* A map from theme name to the generated vanilla-extract class.
* Usage:
* ```ts
* document.documentElement.className = themeClasses['dark'];
* document.documentElement.setAttribute('data-theme', 'dark');
* ```
*/
const themeClasses = {
	dark: darkThemeClass,
	light: lightThemeClass
};

//#endregion
export { darkThemeClass, lightThemeClass, themeClasses, vars };
//# sourceMappingURL=index.mjs.map