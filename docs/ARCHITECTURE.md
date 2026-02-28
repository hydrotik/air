# Hydrotik — Architecture Overview

## Monorepo Structure

This repository is a **pnpm + Turborepo monorepo** containing a design system, shared tooling, and application shells.

```
hydrotik/
├── apps/
│   ├── hy-bff-fastify/          # Node.js BFF API (Fastify 5)
│   ├── hy-component-preview/    # Vite + React component kitchen sink
│   └── hy-storybook/            # Storybook 8 component explorer
│
├── packages/
│   ├── hy-config/               # Cross-project configuration (ports, shared constants)
│   ├── hy-design-system/        # Core UI component library — 46 components (Radix + vanilla-extract)
│   ├── hy-tokens/               # Design token system (vanilla-extract theme contract)
│   ├── hy-theme-provider/       # React ThemeProvider + useTheme + ThemeScript (no-FOUC)
│   ├── hy-design-mcp/           # MCP server with RAG for design decisions & conventions
│   ├── hy-ai-tools/             # LLM context management CLI
│   ├── hy-component-template/   # Scaffold for new components
│   ├── hy-eslint-config/        # Shared ESLint configuration presets
│   ├── hy-jest-config/          # Shared Jest configuration presets
│   ├── hy-prettify-config/      # Shared Prettier configuration
│   ├── hy-tsdown-config/        # Shared tsdown (library bundler) configuration
│   └── hy-typescript-config/   # Shared TypeScript compiler options
│
├── docs/                        # Project documentation (you are here)
├── scripts/                     # Workspace automation scripts
├── package.json                 # Root workspace (devDeps + scripts)
├── pnpm-workspace.yaml          # pnpm workspace members
└── turbo.json                   # Turborepo pipeline configuration
```

---

## Package Manager & Build Orchestration

| Tool | Version | Role |
|---|---|---|
| **pnpm** | 10.30.3 | Package management, workspace symlinks |
| **Turborepo** | 2.8.11 | Task orchestration, caching, pipeline |
| **TypeScript** | ~5.9.3 | Type checking across all packages |
| **Node.js** | ≥20.0.0 | Runtime |

### Workspace Configuration (`pnpm-workspace.yaml`)

All packages and apps are declared as workspace members. pnpm creates symlinks in `node_modules/@hydrotik/*` so each package can import others as `@hydrotik/tokens`, `@hydrotik/design-system`, etc.

Special entries in `onlyBuiltDependencies`:
- `esbuild` — required post-install binary
- `unrs-resolver` — required by some lint tooling

### Turborepo Pipeline (`turbo.json`)

```
build → typecheck + lint (parallel)
test depends on build
storybook / dev are persistent tasks
```

Each package has a `build` script that Turbo caches. Build outputs are cached in `.turbo/` based on input file hashes.

---

## Package Dependency Graph

```
hy-typescript-config  (no deps)
hy-prettify-config    (no deps)
hy-eslint-config      (no deps)
hy-jest-config        (no deps)
hy-tsdown-config      (no deps)
       │
       ▼
hy-tokens             → @vanilla-extract/css
       │
       ▼
hy-theme-provider     → hy-tokens, React (peer)
       │
       ▼
hy-design-system      → hy-tokens, Radix UI, vanilla-extract (React peer)
       │
       ▼
hy-config             (no deps — shared constants)
       │
       ▼
hy-storybook          → hy-design-system, hy-theme-provider, hy-tokens
hy-component-preview  → hy-design-system, hy-theme-provider, hy-tokens, hy-config
```

---

## Library Build System (tsdown)

Library packages (`hy-tokens`, `hy-theme-provider`, `hy-design-system`) are built with **tsdown** using a shared config from `@hydrotik/tsdown-config`:

```ts
// packages/hy-tsdown-config/index.mjs
export function defineLibrary(overrides) {
  return defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],      // dual output
    dts: true,                    // TypeScript declarations
    sourcemap: true,
    external: ['react', 'react-dom', '@radix-ui/*'],
    vitePlugins: [vanillaExtractPlugin()],  // processes .css.ts files
    ...overrides,
  });
}
```

**Output format per package:**

| File | Format |
|---|---|
| `dist/index.mjs` | ESM |
| `dist/index.cjs` | CommonJS |
| `dist/index.d.mts` | ESM type declarations |
| `dist/index.d.cts` | CJS type declarations |

**Important:** `@rolldown/binding-darwin-arm64` must be installed as a workspace devDependency on Apple Silicon Macs (tsdown uses rolldown internally).

---

## TypeScript Configuration Strategy

Shared base configs live in `@hydrotik/typescript-config/`:

| File | Use case |
|---|---|
| `base.json` | NodeNext + strict, for scripts/config packages |
| `react-library.json` | Bundler resolution + JSX + declarations, for component libraries |
| `app.json` | Bundler resolution + JSX + noEmit, for Vite/Storybook apps |

All library and app `tsconfig.json` files **inline** the compiler options directly (rather than extending via `@hydrotik/typescript-config/...`) to ensure consistent IDE/Pylance resolution. The shared files serve as the canonical source of truth that the inlined values track.

---

## Testing Strategy

### Unit Tests (Jest)

Tests use **Jest 30** with `jest-environment-jsdom` and **Testing Library 16**:

- `@hydrotik/jest-config/base` — Node environment (utilities)
- `@hydrotik/jest-config/react` — jsdom + `@testing-library/jest-dom` (components)
- **jest-axe** — automated accessibility assertions (`toHaveNoViolations`)

Test files live alongside components: `Component/Component.test.tsx`

### E2E Tests (Playwright)

End-to-end tests use **Playwright** with Chromium:

- Config: `apps/hy-component-preview/playwright.config.ts`
- Tests: `apps/hy-component-preview/e2e/*.spec.ts`
- Auto-starts Vite dev server on port 3100
- Turbo task: `e2e` (depends on `build`)

Run: `pnpm turbo run e2e`

---

## Code Quality

| Tool | Config | Purpose |
|---|---|---|
| **ESLint 10** | `@hydrotik/eslint-config` | Lint JS/TS/React |
| **Prettier 3** | `@hydrotik/prettify-config` | Code formatting |
| **Husky** | `.husky/` | Pre-commit hooks |
| **lint-staged** | root `package.json` | Run checks on staged files only |

---

## Apps

### `hy-bff-fastify`
A Fastify 5 backend-for-frontend API server. Configured with:
- `@fastify/cors`, `@fastify/helmet`, `@fastify/jwt`, `@fastify/rate-limit`
- `@fastify/swagger` + `@fastify/swagger-ui` for API documentation
- Structured logging via `pino`
- Environment validation via `dotenv`

### `hy-component-preview`
A Vite + React multi-page SPA modeled after the [shadcn/ui homepage](https://ui.shadcn.com) and [shadcn dashboard-03](https://ui.shadcn.com/examples/dashboard-03). Uses react-router-dom for client-side routing.

**Pages:**

| Route | Page | Description |
|---|---|---|
| `/` | DataGrid | Enterprise data grid as default home — full featured, minimal, tree data, loading, empty |
| `/dashboard` | Dashboard | KPI cards, revenue bar chart, visitors pie chart, products table |
| `/ecommerce` | E-Commerce | Sidebar layout matching dashboard-03: nav + breadcrumbs + KPIs + area chart + category donut + recent orders + products table with filters/pagination |
| `/plugin` | Plugin | TectraScope marketing landing page — hero with gradient tagline + plugin screenshot, feature cards, comparison table, use cases, specs, DAW hosts, CTA |
| `/datagrid` | DataGrid | Enterprise data grid demo with 5 variants: full-featured (200 rows, sorting, filtering, selection, resizing, pagination), minimal, tree data, loading skeleton, empty state |
| `/editorial` | Editorial | High-density data journalism page — forensic finance narrative with 5 narrative sections, SourceRatingBars, FlagTags, interactive timeline chart, 69-entity roster, shell entity + key persons DataGrids (editorial density), vehicle section, source corpus |

**Features:**
- Dark theme default with theme toggle
- Styles via vanilla-extract using design tokens
- recharts v3 for charts (area, bar, pie/donut)
- Port `3100` via `@hydrotik/config`
- SPA fallback configured (`appType: 'spa'` in vite.config.ts)
- **Playwright E2E tests** — 63 tests across 6 spec files (navigation, datagrid, editorial, ecommerce, plugin, theme)

Run: `pnpm turbo run dev --filter=@hydrotik/component-preview`
Test: `pnpm turbo run e2e --filter=@hydrotik/component-preview`

### `hy-storybook`
Storybook 8 powered by `@storybook/react-vite`. Includes:
- `@storybook/addon-essentials` (controls, actions, docs)
- `@storybook/addon-a11y` (accessibility panel)
- Dark/Light theme toggle via `ThemeProvider`
- Stories for: Button, Input, Badge, Card, Dialog, Tabs, Select, Tooltip, Toast, Table, DataGrid, SourceRatingBar, FlagTag, and 30+ more
