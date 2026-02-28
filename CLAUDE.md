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
| `/` | DataGrid | Enterprise data grid as default home — full featured, minimal, tree data, loading, empty |
| `/dashboard` | Dashboard | KPI cards, revenue bar chart, visitors pie chart, products table |
| `/ecommerce` | E-Commerce | Sidebar nav, KPI cards, area chart, category donut, recent orders, products table |
| `/plugin` | Plugin | TectraScope marketing landing page — hero, features, comparison, specs, CTA |
| `/datagrid` | DataGrid | Enterprise data grid demo — full featured, minimal, tree data, loading, empty |
| `/editorial` | Editorial | High-density data journalism — forensic finance narrative with DataGrids, SourceRatingBars, FlagTags, timeline chart, entity roster |

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
- Tests: `apps/hy-component-preview/e2e/` (6 spec files, 63 tests)
- Auto-starts dev server on port 3100 via `webServer` config
- Chromium only (add Firefox/WebKit projects as needed)
- Artifacts: `playwright-report/`, `test-results/` (gitignored)

## SourceRatingBar Component

Segmented bar graph showing presence/coverage across data sources.
Each segment is a small rectangle with 1px gaps between them and 1px border-radius.
Lit segments fill from left to right (like a bar graph). Dim segments show the remaining capacity.

```tsx
import { SourceRatingBar } from '@hydrotik/design-system';

// Boolean array mode (contiguous left-to-right for bar graph behavior)
<SourceRatingBar sources={[true, true, true, true, false, false, false, false, false, false]} />

// Numeric mode (preferred — auto-fills left-to-right)
<SourceRatingBar value={4} total={10} />

// Custom size + color
<SourceRatingBar value={7} total={10} size="md" color="primary" />
```

- Sizes: `xs` (4×6), `sm` (5×8), `md` (6×10), `lg` (8×12)
- Colors: `primary`, `chart1`–`chart5`, `destructive`, `success`, `warning`
- Has `role="meter"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Segments are data-attribute-driven: `[data-rating-size]`, `[data-rating-color]`, `[data-lit]`
- **Design rules**:
  - 1px gap between segments (visible separation)
  - 1px border-radius on each segment (slight curve)
  - Lit segments at 85% accent opacity, dim at 12% (visible background wash)
  - Bar grows left-to-right: lit first, dim after (bar graph, not scatter)
  - Reference: epstein-forensic-finance narratives page source bars

## FlagTag Component

Minimal inline status flag — icon + monospace label in a status color.
No background, no border — flat forensic/editorial aesthetic.

```tsx
import { FlagTag } from '@hydrotik/design-system';

<FlagTag />                                          // ⚠ FLAG (destructive)
<FlagTag label="FLAGGED" marginLeft="0" />           // ⚠ FLAGGED
<FlagTag variant="warning" label="REVIEW" icon="🔍" /> // custom variant/icon
```

- Variants: `destructive`, `warning`, `success`, `primary`, `muted`
- Sizes: `xs` (8px), `sm` (9px), `md` (11px), `lg` (13px)
- Icon is always slightly larger than text for scannability
- `marginLeft` prop defaults to `'8px'` for inline-after-name placement

## DataGrid Visual Variants

The DataGrid supports editorial/compact density and visual customization:

```tsx
<DataGrid
  density="editorial"        // 'default' | 'compact' | 'editorial'
  borderless                 // removes outer border + radius
  transparent                // transparent background
  headerBorder="thick"       // 'thin' | 'thick' | 'none'
  rowSeparator="subtle"      // 'full' | 'subtle' | 'none'
  noRowHover                 // disables row hover highlight
  showToolbar={false}        // hides search + column visibility
/>
```

All variants are data-attribute-driven CSS (zero runtime overhead):
- `[data-density="editorial"]` — mono uppercase headers, 10px header font, 6px body padding, 13px body font
- `[data-borderless]` — no outer border or radius
- `[data-transparent]` — transparent bg
- `[data-header-border="thick"]` — 2px blue header separator
- `[data-row-separator="subtle"]` — 4% opacity row lines

## InputGroup Component

The design system exports `InputGroup`, `InputGroupAddon`, `InputGroupToolbar`, and `inputGroupInputClass`.
Uses the **wrapper pattern** (not per-element border hacks):
- `<InputGroup>` owns border, shadow, radius, bg, focus-within ring
- `<InputGroupAddon>` for text/icon slots
- `<InputGroupToolbar>` for bottom toolbar rows (textarea combos)
- `inputGroupInputClass` strips chrome from child `<Input>`/`<Textarea>`
