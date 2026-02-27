# @hydrotik/tokens — Token Architecture

## Overview

This package implements a **token-first, constraint-based design system** using [vanilla-extract](https://vanilla-extract.style/) CSS-in-TypeScript. All design decisions live as TypeScript values that compile to CSS custom properties at build time.

---

## Architecture

```
src/
  contract.css.ts    → createThemeContract — defines CSS var shape (no values)
  dark.css.ts        → createTheme(contract, darkValues) — default theme
  light.css.ts       → createTheme(contract, lightValues)
  themeClasses.ts    → Record<ThemeName, string> mapping
  index.ts           → public exports
```

### How it works

1. **`createThemeContract(vars)`** defines the shape. Each key becomes a CSS custom property reference like `var(--color-background)`. No values are set here.
2. **`createTheme(contract, values)`** fills in actual values and returns a CSS class. When that class is applied to `<html>`, all `var(...)` references resolve to the theme values.
3. **Components** import `vars` from `@hydrotik/tokens` and reference tokens like `vars.color.background`. vanilla-extract compiles these to the actual CSS var expressions.

### Theme switching

Themes are switched by updating the class on `<html>`:

```html
<!-- Dark (default) -->
<html class="dark_theme_abc123" data-theme="dark" data-brand="default">

<!-- Light -->
<html class="light_theme_xyz456" data-theme="light" data-brand="default">
```

The `data-theme` and `data-brand` attributes are for runtime logic (JS queries, CSS selectors). The vanilla-extract class is what actually controls the CSS variable values.

---

## Token Categories

### `vars.color`

| Token                | Dark                          | Light                        | Purpose                        |
|----------------------|-------------------------------|------------------------------|--------------------------------|
| `background`         | `#0e0f11`                     | `#f8f9fb`                    | Page background                |
| `surface`            | `#17181c`                     | `#ffffff`                    | Card / panel background        |
| `surfaceElevated`    | `#1f2025`                     | `#ffffff`                    | Elevated elements              |
| `surfaceOverlay`     | `#26272d`                     | `#ffffff`                    | Modals, toasts                 |
| `border`             | `#2e3038`                     | `#e2e4ea`                    | Standard border                |
| `borderSubtle`       | `#22242a`                     | `#eeeff3`                    | Subtle dividers                |
| `text`               | `#e8e9ec`                     | `#111216`                    | Body text                      |
| `textMuted`          | `#8b8d98`                     | `#6b6f7e`                    | Secondary text                 |
| `primary`            | `#3b82f6`                     | `#2563eb`                    | Brand accent                   |
| `destructive`        | `#ef4444`                     | `#dc2626`                    | Errors / destructive actions   |
| `success`            | `#22c55e`                     | `#16a34a`                    | Success state                  |
| `warning`            | `#f59e0b`                     | `#d97706`                    | Warning state                  |
| `focusRing`          | `#3b82f6`                     | `#2563eb`                    | Focus outline                  |

### `vars.space`

8-point-based scale: `px`, `0_5`→`0.125rem` … `32`→`8rem`.

### `vars.radii`

`none`, `sm` (4px), `md` (6px), `lg` (8px), `xl` (12px), `2xl` (16px), `full` (9999px).

### `vars.shadow`

4-step elevation scale. Dark theme uses high-opacity shadows; light theme uses low-opacity.

### `vars.font`

`family.sans`, `family.mono`, size scale xs→4xl, weights normal→bold, lineHeight tight→relaxed.

### `vars.motion`

Duration: `instant`(0), `fast`(100ms), `normal`(200ms), `slow`(350ms).  
Easing: `default` (ease-out-expo), `in`, `out`, `spring`.

### `vars.zIndex`

Layering scale: `base`(0) → `dropdown`(1000) → `tooltip`(1500).

---

## Adding a new theme / brand

1. Create `src/my-brand.css.ts`:

```ts
import { createTheme } from '@vanilla-extract/css';
import { vars } from './contract.css';

export const myBrandThemeClass = createTheme(vars, {
  color: {
    background: '#...',
    primary: '#...',
    // ... all required keys
  },
  // ... all other categories
});
```

2. Export it from `src/themeClasses.ts`:

```ts
import { myBrandThemeClass } from './my-brand.css';

export type ThemeName = 'dark' | 'light' | 'my-brand';

export const themeClasses: Record<ThemeName, string> = {
  dark: darkThemeClass,
  light: lightThemeClass,
  'my-brand': myBrandThemeClass,
};
```

3. Update `ThemeName` and `BrandName` in `src/index.ts`.

4. The `ThemeProvider` in `@hydrotik/theme-provider` will automatically support the new value once you update `ThemeName`.

---

## Usage in components

```ts
// In a vanilla-extract .css.ts file:
import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  padding: vars.space['6'],
  boxShadow: vars.shadow.md,
  color: vars.color.text,
});
```

No hardcoded hex values. No Tailwind classes. Pure CSS variables, fully typed.
