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

# Visual captures (headless Playwright — no macOS permissions needed)
pnpm capture --route /editorial                            # single route full page
pnpm capture --route /editorial --scroll 2000              # viewport at scroll offset
pnpm capture --route /editorial --element "[role='meter']" # element-level captures
pnpm capture:all                                           # all routes full page
```

## CLI Convention

**Always** use `pnpm turbo run <task> --filter=@hydrotik/<pkg>` — never `pnpm --filter`.
Turbo handles dependency ordering and caching.

## Port Configuration

All ports managed in `@hydrotik/config` (`packages/hy-config/`):
- 3100 — Component Preview
- 4000 — BFF Fastify
- 5100 — Design MCP
- 5200 — AIr Server (Fastify + WebSocket)
- 5201 — AIr Dashboard (Vite dev)
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

## SegmentedRatingBar Component

Segmented bar graph showing presence/coverage across data sources.
Each segment is a small rectangle with 1px gaps between them and 1px border-radius.
Lit segments fill from left to right (like a bar graph). Dim segments show the remaining capacity.

```tsx
import { SegmentedRatingBar } from '@hydrotik/design-system';

// Boolean array mode (contiguous left-to-right for bar graph behavior)
<SegmentedRatingBar sources={[true, true, true, true, false, false, false, false, false, false]} />

// Numeric mode (preferred — auto-fills left-to-right)
<SegmentedRatingBar value={4} total={10} />

// Custom size + color
<SegmentedRatingBar value={7} total={10} size="md" color="primary" />
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
- Label sizes: `xs` (8px), `sm` (9px), `md` (11px), `lg` (13px)
- `marginLeft` prop defaults to `'8px'` for inline-after-name placement
- **Design rules**:
  - Icon is +6px taller than label (xs: 14px, sm: 15px, md: 17px, lg: 19px)
  - Icon nudged up 2px (`translateY(-2px)`) for optical alignment
  - `lineHeight: 0` on both icon and label spans, `alignItems: center` on container
  - No background, no border — flat ink-on-paper aesthetic
  - Monospace font with 1px letter-spacing (forensic/editorial density)

## DataGrid Visual Variants

The DataGrid supports editorial/compact density and visual customization:

```tsx
<DataGrid
  density="editorial" // 'default' | 'compact' | 'editorial'
  borderless // removes outer border + radius
  transparent // transparent background
  headerBorder="thick" // 'thin' | 'thick' | 'none'
  rowSeparator="subtle" // 'full' | 'subtle' | 'none'
  noRowHover // disables row hover highlight
  showToolbar={false} // hides search + column visibility
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

## E-Commerce Components

Migrated from the Vartell/acme design system, rebuilt with vanilla-extract + Hydrotik tokens.

### Price

Currency-formatted price display with discount/original support.

```tsx
import { Price } from '@hydrotik/design-system';

<Price amount={129.99} />                                    // $129.99
<Price amount={99.99} originalAmount={149.99} />             // $149.99 (struck) $99.99 (red)
<Price amount={29.99} currency="EUR" locale="de-DE" />       // 29,99 €
<Price amount={59.99} showCents={false} />                   // $60
<Price amount={129.99} size="xl" />                          // sizes: sm | md | lg | xl
```

### ColorSwatch

Color picker swatch with selection state. Square or circle shape.

```tsx
import { ColorSwatch } from '@hydrotik/design-system';

<ColorSwatch hex="#1a2744" name="Navy" isSelected onClick={handleClick} />
<ColorSwatch hex="#d4c5a9" name="Cream" shape="circle" size="lg" />
<ColorSwatch hex="#000" name="Black" disabled />
```

- Has `aria-pressed` for selection state, `aria-label` from `name`
- Sizes: `sm` (24px), `md` (32px), `lg` (40px)
- Shapes: `square` (default), `circle`

### QuantityPicker

Increment/decrement stepper with min/max bounds.

```tsx
import { QuantityPicker } from '@hydrotik/design-system';

<QuantityPicker quantity={3} onIncrease={inc} onDecrease={dec} min={1} max={10} />
<QuantityPicker quantity={1} onIncrease={inc} onDecrease={dec} size="lg" />
```

- Has `role="group"` with labeled increase/decrease buttons
- Auto-disables buttons at min/max bounds
- Sizes: `sm`, `md`, `lg`

### ProductCard

E-commerce product card with hover image swap, wishlist toggle, and render props.

```tsx
import { ProductCard, ProductCardSkeleton } from '@hydrotik/design-system';

<ProductCard
  product={{ id: 1, name: 'Suit', price: 129.99, thumbnailSrc: '...', alternateSrc: '...' }}
  isWishlisted={false}
  onWishlistToggle={(p) => toggle(p.id)}
  renderPrice={(p) => <Price amount={p.price} />}
  renderActions={(p) => <AddToCartButton onAddToCart={() => add(p)} />}
/>
<ProductCardSkeleton />  // loading state
```

- Dual-image hover swap (both images stacked, CSS opacity transition — no flash)
- Wishlist heart icon (lucide `Heart`, filled when wishlisted)
- `renderPrice` and `renderActions` render props for composition
- Colors data passed through `product.colors` for consumer rendering

### CartItem

Shopping cart line item with image, variant info, remove action, and render props.

```tsx
import { CartItem, CartItemSkeleton } from '@hydrotik/design-system';

<CartItem
  item={{ id: 1, name: 'Suit', price: 129.99, quantity: 2, color: 'Navy', size: 'M', image: '...' }}
  onRemove={() => remove(1)}
  renderQuantityPicker={(item) => <QuantityPicker quantity={item.quantity} ... />}
  renderPrice={(item) => <Price amount={item.price} />}
/>
<CartItemSkeleton />  // loading state
```

### AddToCartButton

CTA button with quantity badge and added/disabled states.

```tsx
import { AddToCartButton } from '@hydrotik/design-system';

<AddToCartButton onAddToCart={handleAdd} />                           // + ADD TO CART
<AddToCartButton onAddToCart={handleAdd} variant="primary" />         // blue primary
<AddToCartButton onAddToCart={handleAdd} quantity={2} />              // ✓ ADDED (2) — disabled
<AddToCartButton onAddToCart={handleAdd} disabled>Out of Stock</AddToCartButton>
```

- Variants: `default` (outline), `primary` (filled)
- Shows check icon + quantity badge when `quantity > 0`
- Auto-disables when added or explicitly disabled
- Has `aria-label` for accessibility

## Component Preview Routes

| Route         | Page       | Description                                                                                                                            |
| ------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `/`           | DataGrid   | Enterprise data grid as default home                                                                                                   |
| `/dashboard`  | Dashboard  | KPI cards, revenue bar chart, visitors pie chart, products table                                                                       |
| `/inventory`  | Inventory  | Sidebar nav, KPI cards, area chart, category donut, recent orders, products table                                                      |
| `/ecommerce`  | E-Commerce | Product grid with hover swap, shopping cart, component showcase, loading states                                                        |
| `/plugin`     | Plugin     | TectraScope marketing landing page                                                                                                     |
| `/datagrid`   | DataGrid   | Enterprise data grid demo                                                                                                              |
| `/editorial`  | Editorial  | High-density data journalism with DataGrids, SegmentedRatingBars, FlagTags, timeline chart                                             |

## AIr Publishing

`@hydrotik/air` is published to **npm** and **GitHub Packages**. Source lives in `packages/hy-ai-rum/`, synced to public repo `hydrotik/air`.

For the full publishing runbook (local + CI, dual registry, npm auth, troubleshooting):
- `.planning/PUBLISHING.md`

Quick local publish:
```bash
pnpm turbo run build --filter=@hydrotik/air
cd packages/hy-ai-rum && pnpm run test
npm version patch && npm login && npm publish --access public
cd ../.. && git add -A && git commit --no-verify -m "release(air): v$(node -p \"require('./packages/hy-ai-rum/package.json').version\")"
VERSION=$(node -p "require('./packages/hy-ai-rum/package.json').version") && git tag "air-v$VERSION" && git push origin main --tags
git subtree push --prefix=packages/hy-ai-rum air-public main
```

## Deep Reference

For architecture, testing, directory structure, and tooling details, read on-demand:
- `.planning/codebase/STACK.md` — Full technology inventory
- `.planning/codebase/ARCHITECTURE.md` — Layers, data flow, key abstractions
- `.planning/codebase/STRUCTURE.md` — Directory layout, file patterns, naming
- `.planning/codebase/CONVENTIONS.md` — Code style, imports, git, TypeScript rules
- `.planning/codebase/TESTING.md` — Jest, Playwright, visual capture, Storybook
- `.planning/codebase/INTEGRATIONS.md` — MCP, GSD, desloppify, fonts, CI/CD
- `.planning/codebase/CONCERNS.md` — Tech debt, security, performance, fragile areas
- `.planning/PUBLISHING.md` — npm + GitHub Packages publish runbook
