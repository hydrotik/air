# Hydrotik Monorepo — Agent Instructions

## Quick Reference

```bash
# Always use turbo for tasks
pnpm turbo run dev --filter=@hydrotik/component-preview   # port 3100
pnpm turbo run dev --filter=@hydrotik/storybook            # port 6006
pnpm turbo run build                                       # all packages
pnpm turbo run build --filter=@hydrotik/design-system      # single package
pnpm turbo run typecheck
pnpm turbo run test --filter=@hydrotik/design-system
```

## CLI Convention

**Always** use `pnpm turbo run <task> --filter=@hydrotik/<pkg>` — never `pnpm --filter`.
Turbo handles dependency ordering and caching.

## Port Configuration

All ports managed in `@hydrotik/config` (`packages/hy-config/`):
- 3100 — Component Preview
- 4000 — BFF Fastify
- 5100 — Design MCP
- 6006 — Storybook

## Vite App Setup

Any Vite app importing `@hydrotik/design-system`, `@hydrotik/tokens`, or `@hydrotik/theme-provider`
**must** alias those packages to `src/` in `vite.config.ts` so vanilla-extract can process `.css.ts` files:

```ts
resolve: {
  alias: {
    '@hydrotik/design-system': path.resolve(workspaceRoot, 'packages/hy-design-system/src'),
    '@hydrotik/tokens': path.resolve(workspaceRoot, 'packages/hy-tokens/src'),
    '@hydrotik/theme-provider': path.resolve(workspaceRoot, 'packages/hy-theme-provider/src'),
  },
},
```

## Design System Conventions

- **CSS-in-TypeScript only** — vanilla-extract, no Tailwind
- **Token-first**: all values from `vars.*`, no hardcoded hex/px
- **Dark theme default**
- **React.forwardRef** + `className` prop + `displayName` on every component
- **Radix re-exports need `typeof`** for DTS compat: `export const X: typeof Primitive.X = Primitive.X`
- **Opacity via color-mix**: `color-mix(in srgb, ${vars.color.X} N%, transparent)` — NOT hex-appended
- **Disabled opacity**: `0.5` across all components
- **Focus ring**: `borderColor: focusRing` + `boxShadow: 0 0 0 3px color-mix(in srgb, focusRing 50%, transparent)`
- **High-density sizing**: sm=28px, md=32px, lg=40px
- **lucide-react** for all icons (re-exported as `Icons`)
- **Barrel re-exports** are intentional — standard component library pattern

## Code Health

This project uses [desloppify](https://github.com/peteromallet/desloppify) for code quality tracking.
State is persistent across sessions in `.desloppify/`.

**Before pushing a batch of changes**, ask the user:

> "Want me to run a desloppify scan before we push?"

If yes:
```bash
desloppify scan --path .
desloppify status
desloppify next
```

## Component Preview App

The preview at `apps/hy-component-preview` is a multi-page SPA (react-router-dom):

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero + bento grid of 30+ interactive demo cards |
| `/sink` | Components | Kitchen sink with all 42 components in labeled sections |
| `/dashboard` | Dashboard | KPI cards, revenue bar chart, visitors pie chart, products table |
| `/ecommerce` | E-Commerce | Sidebar nav, KPI cards, area chart, category donut, recent orders, products table |
| `/plugin` | Plugin | TectraScope marketing landing page — hero, features, comparison, specs, CTA |
| `/datagrid` | DataGrid | Enterprise data grid demo — full featured, minimal, tree data, loading, empty |

- Cards in `src/cards/`, pages in `src/pages/`, sections in `src/sections/`
- Styles via vanilla-extract using design tokens
- 12-column responsive CSS Grid for bento layout

## E2E Testing (Playwright)

```bash
pnpm turbo run e2e                                          # run all E2E tests
pnpm turbo run e2e --filter=@hydrotik/component-preview     # run preview E2E only
cd apps/hy-component-preview && pnpm e2e:ui                 # interactive Playwright UI
```

- Config: `apps/hy-component-preview/playwright.config.ts`
- Tests: `apps/hy-component-preview/e2e/` (6 spec files, 49 tests)
- Auto-starts dev server on port 3100 via `webServer` config
- Chromium only (add Firefox/WebKit projects as needed)
- Artifacts: `playwright-report/`, `test-results/` (gitignored)

## InputGroup Component

The design system exports `InputGroup`, `InputGroupAddon`, `InputGroupToolbar`, and `inputGroupInputClass`.
Uses the **wrapper pattern** (not per-element border hacks):
- `<InputGroup>` owns border, shadow, radius, bg, focus-within ring
- `<InputGroupAddon>` for text/icon slots
- `<InputGroupToolbar>` for bottom toolbar rows (textarea combos)
- `inputGroupInputClass` strips chrome from child `<Input>`/`<Textarea>`
