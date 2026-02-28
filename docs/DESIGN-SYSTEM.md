# Hydrotik Design System

## Overview

The Hydrotik design system is a **CSS-in-TypeScript** component library with **46 components** covering the full [shadcn/ui](https://ui.shadcn.com) scope plus enterprise-grade additions. Built on:

| Layer | Technology |
|---|---|
| Design tokens | `@vanilla-extract/css` `createThemeContract` + `createTheme` |
| Theming | `@hydrotik/theme-provider` React context + `data-theme` attribute |
| Components | Radix UI primitives + vanilla-extract styles |
| Variants | `@vanilla-extract/recipes` |
| Icons | `lucide-react` (re-exported as `Icons`) |
| Fonts | Inter Variable (sans) + JetBrains Mono Variable (mono) via `@fontsource-variable` |

No Tailwind. No runtime CSS injection. All styles are statically extracted at build time. **Dark mode first.**

---

## Fonts & Icons

### Fonts

Fonts are loaded automatically when you import the global styles:

```ts
import '@hydrotik/design-system/src/global.css';
```

| Font | Token | Usage |
|---|---|---|
| **Inter Variable** | `vars.font.family.sans` | All body text, headings, UI |
| **JetBrains Mono Variable** | `vars.font.family.mono` | Code, kbd, monospace elements |

Both are bundled via `@fontsource-variable` — no external CDN requests.

### Icons

All [Lucide](https://lucide.dev) icons are available:

```tsx
import { Icons } from '@hydrotik/design-system';

<Icons.Search className="..." />
<Icons.ChevronDown />
<Icons.Settings size={20} />
```

---

## Token System (`@hydrotik/tokens`)

### Architecture

```
createThemeContract(contract)   →  vars (typed CSS variable references)
createTheme(contract, darkMap)  →  darkThemeClass (CSS class with :root vars)
createTheme(contract, lightMap) →  lightThemeClass (CSS class with :root vars)
```

`vars` is a strongly-typed object. All components import `vars` and reference tokens like `vars.color.primary`, `vars.font.size.md`, etc. **No raw hex values appear in component files.**

### Token Categories

```ts
// Colors
vars.color.background           // page background
vars.color.surface              // card / panel
vars.color.surfaceElevated      // popovers, dropdowns
vars.color.surfaceOverlay       // modals, toasts
vars.color.border               // standard border
vars.color.borderSubtle         // subtle dividers
vars.color.text                 // primary text
vars.color.textMuted            // secondary text
vars.color.textInverse          // text on colored backgrounds
vars.color.textDisabled         // disabled text
vars.color.primary              // brand accent
vars.color.primaryForeground    // text on primary
vars.color.secondary            // secondary interactive
vars.color.secondaryForeground  // text on secondary
vars.color.destructive          // error / danger
vars.color.destructiveForeground
vars.color.success              // success state
vars.color.successForeground
vars.color.warning              // warning state
vars.color.warningForeground
vars.color.focusRing            // keyboard focus outline
vars.color.overlay              // modal overlay scrim
vars.color.ghostHover           // hover highlight
vars.color.input                // input background
vars.color.placeholder          // placeholder text

// Typography
vars.font.family.sans | mono
vars.font.size.xs | sm | md | lg | xl | 2xl | 3xl | 4xl
vars.font.weight.normal | medium | semibold | bold
vars.font.lineHeight.tight | snug | normal | relaxed
vars.font.letterSpacing.tight | normal | wide

// Spacing (rem-based)
vars.space.px | 0_5 | 1 | 1_5 | 2 | 2_5 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 12 | 14 | 16 | 20 | 24 | 32

// Radii
vars.radii.none | sm | md | lg | xl | 2xl | full

// Shadows (4-step elevation)
vars.shadow.sm | md | lg | xl

// Motion
vars.motion.duration.instant | fast | normal | slow
vars.motion.easing.default | in | out | spring

// Z-Index
vars.zIndex.base | dropdown | sticky | overlay | modal | toast | tooltip
```

### Adding/Changing Tokens

1. Update the contract in `packages/hy-tokens/src/contract.css.ts`
2. Update both theme maps: `dark.css.ts` and `light.css.ts`
3. Rebuild: `pnpm build --filter @hydrotik/tokens`

---

## Theme Provider (`@hydrotik/theme-provider`)

### Usage

```tsx
import { ThemeProvider } from '@hydrotik/theme-provider';

function Root() {
  return (
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  );
}
```

### `useTheme` hook

```tsx
const { theme, setTheme } = useTheme();
```

### `ThemeScript` (prevent FOUC)

```tsx
<head>
  <ThemeScript />
</head>
```

### How it works

`ThemeProvider` applies a CSS class (`darkThemeClass` or `lightThemeClass`) to `<html>`. vanilla-extract maps CSS variables in that class to the correct values. Switching themes swaps the class → all `vars.*` tokens update via CSS custom properties.

---

## Component Catalog (46 components)

### Layout & Structure

| Component | Built On | Description |
|---|---|---|
| **AspectRatio** | `@radix-ui/react-aspect-ratio` | Constrain child to a ratio |
| **Card** | Native | Surface container with Header, Title, Description, Content, Footer |
| **Separator** | `@radix-ui/react-separator` | Horizontal or vertical divider |
| **ScrollArea** | `@radix-ui/react-scroll-area` | Custom scrollbars, both orientations |
| **Collapsible** | `@radix-ui/react-collapsible` | Show/hide content section |
| **Skeleton** | Native | Pulsing placeholder for loading states |

### Typography & Display

| Component | Description |
|---|---|
| **Typography** | H1–H4, P, Lead, Large, Small, Muted, InlineCode, Blockquote, Ul, Ol, Hr |
| **Badge** | Inline status indicator — default, primary, success, warning, error |
| **Kbd** | Keyboard shortcut display — sm, md sizes |
| **Spinner** | Loading animation — sm, md, lg, xl sizes |
| **Avatar** | Profile image with fallback — sm, md, lg, xl sizes |

### Form Controls

| Component | Built On | Description |
|---|---|---|
| **Button** | Native + Slot | primary, secondary, outline, ghost, destructive × sm, md, lg |
| **Input** | Native | Text input with focus ring |
| **InputGroup** | Native | Wrapper pattern: group owns border/shadow/radius; children stripped of chrome |
| **Textarea** | Native | Multi-line text input |
| **Checkbox** | `@radix-ui/react-checkbox` | Check/uncheck with indicator |
| **RadioGroup** | `@radix-ui/react-radio-group` | Radio button group |
| **Switch** | `@radix-ui/react-switch` | Toggle switch with sliding thumb |
| **Slider** | `@radix-ui/react-slider` | Range slider with thumb |
| **Select** | `@radix-ui/react-select` | Dropdown select menu |
| **Toggle** | `@radix-ui/react-toggle` | Pressable toggle — default, outline variants |
| **ToggleGroup** | `@radix-ui/react-toggle-group` | Grouped toggles |
| **Label** | `@radix-ui/react-label` | Form label |
| **FieldMessage** | Native | Validation/help message — default, error, success |
| **Progress** | `@radix-ui/react-progress` | Progress bar indicator |

### Overlays & Dialogs

| Component | Built On | Description |
|---|---|---|
| **Dialog** | `@radix-ui/react-dialog` | Modal with focus trap + scroll lock |
| **AlertDialog** | `@radix-ui/react-alert-dialog` | Confirmation dialog (no click-outside dismiss) |
| **Sheet** | `@radix-ui/react-dialog` | Slide-in panel — top, right, bottom, left |
| **Popover** | `@radix-ui/react-popover` | Floating content panel |
| **HoverCard** | `@radix-ui/react-hover-card` | Content on hover |
| **Tooltip** | `@radix-ui/react-tooltip` | Hover tooltip (includes own Provider) |
| **Toast** | `@radix-ui/react-toast` | Notifications via provider + hook |

### Navigation

| Component | Built On | Description |
|---|---|---|
| **Tabs** | `@radix-ui/react-tabs` | Tabbed content panels |
| **Accordion** | `@radix-ui/react-accordion` | Expandable content sections |
| **Breadcrumb** | Native + Slot | Navigation breadcrumbs with separator + ellipsis |
| **Pagination** | Native | Page navigation with prev/next + links |
| **NavigationMenu** | `@radix-ui/react-navigation-menu` | Site-level navigation with viewport |

### Menus

| Component | Built On | Description |
|---|---|---|
| **DropdownMenu** | `@radix-ui/react-dropdown-menu` | Action menu with checkbox, radio, sub-menus |
| **ContextMenu** | `@radix-ui/react-context-menu` | Right-click menu with full sub-menu support |
| **Menubar** | `@radix-ui/react-menubar` | App-style menu bar |
| **Command** | Native | Searchable command palette shell |

### Data Display

| Component | Description |
|---|---|
| **Table** | Wrapper, Header, Body, Footer, Row, Head, Cell, Caption |
| **Alert** | Feedback banner — default, destructive, success, warning |
| **SegmentedRatingBar** | Segmented bar graph — left-to-right fill showing coverage across N data sources. 1px gap between segments, 1px border-radius per segment. Lit segments at 85% accent, dim at 12%. Boolean array or value/total. Sizes: xs, sm, md, lg. Colors: all chart tokens + primary, destructive, success, warning. `role="meter"` with ARIA. |
| **FlagTag** | Inline status flag — icon + mono label, no background/border. Icon is +6px taller than label, nudged up 2px for optical alignment. Variants: destructive, warning, success, primary, muted. Sizes: xs (label 8px / icon 14px), sm (9/15), md (11/17), lg (13/19). Default: ⚠ FLAG in destructive red. |

---

## CSS-in-TypeScript Patterns

### Style recipe (variants)

```ts
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const buttonRecipe = recipe({
  base: {
    borderRadius: vars.radii.md,
    fontWeight: vars.font.weight.medium,
  },
  variants: {
    variant: {
      primary: { backgroundColor: vars.color.primary },
      ghost: { backgroundColor: 'transparent' },
    },
    size: {
      sm: { padding: `${vars.space[2]} ${vars.space[3]}` },
      md: { padding: `${vars.space[3]} ${vars.space[4]}` },
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});
```

### Global styles

```ts
import { globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

globalStyle('body', {
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
});
```

**Rules:**
- `style()` selectors can ONLY target `&` (self) — never children
- For child selectors: `globalStyle(\`${parentClass} child\`, { ... })`
- `globalStyle` calls cannot be nested inside top-level `@media`
- Use `@media` within a `style()` block instead

### Component conventions

1. Always use `React.forwardRef`
2. Accept `className` prop — merge: `[recipe(), className].filter(Boolean).join(' ')`
3. Spread `...props` on the root element
4. Set `displayName`
5. Export the props interface
6. Only use `vars.*` tokens — no hardcoded values
7. Add `typeof` annotations when re-exporting Radix primitives directly

### Focus & accessibility

- `:focus-visible` → `outline: 2px solid ${vars.color.focusRing}`, `outlineOffset: '2px'`
- Disabled → `opacity: '0.45'`, `cursor: 'not-allowed'`, `pointerEvents: 'none'`
- All tests must include `jest-axe`: `expect(await axe(container)).toHaveNoViolations()`

### Component file structure

```
ComponentName/
├── ComponentName.tsx            # React component (forwardRef)
├── ComponentName.styles.ts      # vanilla-extract styles (recipe + style)
├── ComponentName.jest.tsx        # Tests: Jest + Testing Library + jest-axe
├── ComponentName.stories.tsx     # Storybook stories
└── index.ts                      # Barrel re-exports
```

> **Note:** New components use `.styles.ts` / `.jest.tsx`. Some existing components still use `.css.ts` / `.test.tsx` — these will be migrated.
