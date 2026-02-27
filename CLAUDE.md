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

The preview at `apps/hy-component-preview` uses a **bento grid layout** modeled after shadcn.com:
- Hero section with title + CTAs
- 17 interactive demo cards in a 12-column responsive CSS Grid
- Cards: PaymentCard, TeamCard, LoadingCard, PriceRangeCard, UrlInputCard, ProgressCard,
  InputStatesCard, TwoFactorCard, AlertCard, SettingsCard, PromptCard, SourceCard,
  ActionButtonsCard, TermsCard, CopilotCard, SurveyCard, ProcessingCard
- Styles in `App.css.ts` using design tokens
- Card components in `src/cards/`
