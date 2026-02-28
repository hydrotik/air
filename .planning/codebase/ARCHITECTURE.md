# Architecture

**Analysis Date:** 2026-02-28

## Pattern

**Monorepo with shared design token contract.**

All UI is driven by a single theme contract (`@hydrotik/tokens`). Components consume tokens via `vars.color.*`, `vars.space.*`, etc. Themes (dark/light) assign values to the contract. No runtime CSS — everything is statically extracted at build time.

## Layers

```
┌─────────────────────────────────────────────────┐
│  Apps (consumers)                                │
│  hy-component-preview  hy-storybook  hy-bff      │
├─────────────────────────────────────────────────┤
│  Design System (@hydrotik/design-system)         │
│  46 components — Radix + vanilla-extract          │
├─────────────────────────────────────────────────┤
│  Theme Provider (@hydrotik/theme-provider)        │
│  ThemeProvider, useTheme, ThemeScript (no-FOUC)   │
├─────────────────────────────────────────────────┤
│  Tokens (@hydrotik/tokens)                        │
│  Theme contract + dark.css.ts + light.css.ts      │
├─────────────────────────────────────────────────┤
│  Shared Config (eslint, prettier, tsdown, ts)     │
└─────────────────────────────────────────────────┘
```

## Data Flow

**Theming:**
1. `@hydrotik/tokens` defines a `createThemeContract()` → CSS custom properties
2. `dark.css.ts` / `light.css.ts` assign values via `createGlobalTheme()`
3. `ThemeProvider` sets `data-theme` attribute on `<html>`
4. Components read `vars.*` tokens — CSS vars resolve to current theme values
5. No runtime JS for theming — only a `data-theme` attribute swap

**Component Composition:**
1. Radix UI provides headless, accessible primitives
2. vanilla-extract `recipe()` generates static CSS classes with variants
3. Components wrap Radix + apply recipe classes
4. `forwardRef` pattern throughout for composability

**Build Pipeline:**
1. Turbo resolves dependency graph: tokens → theme-provider → design-system → apps
2. tsdown bundles libraries (rolldown + vanilla-extract plugin)
3. Vite bundles apps (vanilla-extract Vite plugin)
4. Output: ESM + CJS + `.d.ts` for libraries, static SPA for apps

## Key Abstractions

**Token Contract (`packages/hy-tokens/src/contract.css.ts`):**
- Single source of truth for all design tokens
- Categories: color (28 tokens), space (11), font (3 families, 8 sizes, 6 weights), radii (6), shadow (5), motion (3), zIndex (6)
- Type-safe: `vars.color.primary` is `string` resolved to `var(--color-primary)`

**Shared Styles (`packages/hy-design-system/src/styles/`):**
- `focus-ring.css.ts` — Consistent focus indicator across all interactive components
- `menu-item.css.ts` — Shared menu item styles for DropdownMenu, ContextMenu, Menubar, Select
- `overlay.css.ts` — Shared overlay/scrim styles for Dialog, Sheet, AlertDialog

**DataGrid Architecture:**
- Headless core engine (`core.ts`, ~891 lines) — framework-agnostic, pure functions
- React hook (`useDataGrid.ts`) — connects core to React state
- Styled component (`DataGrid.tsx`, ~816 lines) — 12 compound sub-components
- Features: multi-sort, column filters, global search, pagination, row selection, column resizing, column pinning, tree data, inline editing, custom cell renderers

**Editorial Density System:**
- `densityShift` CSS custom property adds +1px to all font sizes via `calc()`
- Tokenized as the "editorial" DataGrid density variant
- `data-density="editorial"` attribute on DataGrid enables the shift

## Entry Points

**Library:** `packages/hy-design-system/src/index.ts` — barrel exports all 46 components + types
**Preview App:** `apps/hy-component-preview/src/main.tsx` → `App.tsx` (react-router-dom)
**BFF:** `apps/hy-bff-fastify/src/index.ts` — Fastify server bootstrap
**Storybook:** `apps/hy-storybook/.storybook/main.ts` + `preview.tsx`
**MCP:** `packages/hy-design-mcp/src/index.ts` — MCP server with RAG

---

*Architecture analysis: 2026-02-28*
*Update after significant structural changes*
