# Technology Stack

**Analysis Date:** 2026-02-28

## Languages

**Primary:**
- TypeScript ~5.9.3 — All application and library code

**Secondary:**
- JavaScript — Build scripts, config files (`.mjs`, `.cjs`)
- CSS-in-TypeScript — vanilla-extract `.css.ts` files (compile-time CSS)

## Runtime

**Environment:**
- Node.js ≥20.0.0
- Apple Silicon required for build: `@rolldown/binding-darwin-arm64`

**Package Manager:**
- pnpm 10.30.3 (workspace monorepo)
- Lockfile: `pnpm-lock.yaml`
- Workspace protocol: `workspace:*` for internal dependencies

## Frameworks

**Core:**
- React 19.x — UI framework (peer dependency across all packages)
- Radix UI — Accessible, unstyled primitives (30+ `@radix-ui/react-*` packages)
- vanilla-extract — Zero-runtime CSS-in-TypeScript (`@vanilla-extract/css`, `@vanilla-extract/recipes`)

**Backend:**
- Fastify 5.x — BFF API server (`apps/hy-bff-fastify`)

**Testing:**
- Jest 30 + Testing Library 16 — Unit tests + accessibility (jest-axe)
- Playwright 1.58 — E2E tests (63 tests, 6 spec files)

**Build/Dev:**
- Turborepo 2.8.11 — Task orchestration and caching
- tsdown 0.21.0-beta.2 — Library bundler (rolldown-based, dual ESM/CJS)
- Vite 6.x — App bundler + dev server
- Storybook 8.x — Component explorer (`@storybook/react-vite`)

## Key Dependencies

**Critical (Design System):**
- `@vanilla-extract/css` ^1.18.0 — Theme contract, static CSS extraction
- `@vanilla-extract/recipes` ^0.5.7 — Variant-driven component styles
- `@hydrotik/tokens` — Design token contract (color, space, font, shadow, motion, radii, zIndex)
- `lucide-react` ^0.575.0 — Icon library, re-exported as `Icons`
- `@fontsource-variable/inter` + `@fontsource-variable/jetbrains-mono` — Self-hosted variable fonts

**Critical (Preview App):**
- `react-router-dom` ^7.13.1 — Client-side routing (6 routes)
- `recharts` ^3.7.0 — Charts (area, bar, pie/donut)

**Critical (BFF):**
- `@fastify/swagger` + `@fastify/swagger-ui` — API docs
- `zod` ^4.3.6 + `fastify-type-provider-zod` — Runtime validation

**Tooling:**
- `tsx` — TypeScript script execution (`scripts/visual-capture.ts`)
- `desloppify` — Codebase health scanner (runs on pre-commit)
- `husky` ^9.1.7 + `lint-staged` ^16.2.7 — Pre-commit hooks

## Configuration

**Environment:**
- No `.env` files required for development
- Ports centralized in `@hydrotik/config` (`packages/hy-config/src/ports.ts`)
  - 3100: Component Preview, 4000: BFF, 5100: MCP, 6006: Storybook

**Build:**
- `turbo.json` — Task pipeline (build → typecheck, lint, test, e2e)
- `tsconfig.json` per package (inlined compiler options, tracks shared base)
- `vite.config.ts` — Preview app bundling with vanilla-extract plugin
- `.prettierrc.mjs` — Prettier via `@hydrotik/prettify-config`

## Platform Requirements

**Development:**
- macOS Apple Silicon (primary — `@rolldown/binding-darwin-arm64`)
- Node.js ≥20, pnpm 10.30.3, Playwright browsers

**Production:**
- Library packages: npm-publishable (ESM + CJS + `.d.ts`)
- Apps: Static SPA (Vite build) + Node.js BFF

---

*Stack analysis: 2026-02-28*
*Update after major dependency changes*
