# Storybook — Setup & Development Guide

## Overview

Storybook lives at `apps/hy-storybook` and renders stories sourced directly from
`packages/hy-design-system/src/**/*.stories.tsx`. It uses `@storybook/react-vite` (Storybook 8)
with vanilla-extract CSS processed at runtime by Vite.

---

## Running Storybook

```bash
# From the repo root — builds all workspace deps first, then starts Storybook
pnpm turbo run dev --filter=@hydrotik/storybook
```

Opens at **http://localhost:6006**.

Turbo resolves the dependency graph automatically:

```
@hydrotik/tokens:build
    └── @hydrotik/design-system:build
    └── @hydrotik/theme-provider:build
            └── @hydrotik/storybook:dev  ← starts after all builds complete
```

---

## Architecture

### Vite Configuration (`apps/hy-storybook/.storybook/main.ts`)

Because Storybook's Vite dev server defaults to treating `apps/hy-storybook/` as its root,
files from `packages/` would be blocked as out-of-root by Vite's security restrictions.
The `viteFinal` config handles this in three ways:

#### 1. `server.fs.allow`
Expands Vite's file-serving scope to the entire monorepo root:

```ts
config.server.fs = { allow: [workspaceRoot] };
```

#### 2. Source aliases for workspace packages
Maps all three workspace packages to their `src/` directories so Vite processes them directly
without needing a `dist/` build. This also enables full HMR across packages:

```ts
config.resolve.alias = {
  '@hydrotik/design-system': path.resolve(workspaceRoot, 'packages/hy-design-system/src'),
  '@hydrotik/tokens':         path.resolve(workspaceRoot, 'packages/hy-tokens/src'),
  '@hydrotik/theme-provider': path.resolve(workspaceRoot, 'packages/hy-theme-provider/src'),
};
```

#### 3. vanilla-extract Vite plugin
Processes all `.css.ts` files at dev-server runtime:

```ts
config.plugins.push(vanillaExtractPlugin());
```

> **Note:** `main.ts` is evaluated by Storybook via `esbuild-register` as CommonJS, so
> `__dirname` is injected automatically. Do **not** redeclare it with `fileURLToPath`.

---

### Preview (`apps/hy-storybook/.storybook/preview.tsx`)

- Wraps every story in `ThemeProvider` via a global decorator
- Toolbar switcher toggles `dark` / `light` theme
- Imports `@hydrotik/design-system/global.css.ts` as a side effect to apply baseline styles
  (box-sizing reset, background, typography using design tokens)

```tsx
import '@hydrotik/design-system/global.css.ts';
```

This resolves to `packages/hy-design-system/src/global.css.ts` via the Vite alias above.

---

### TypeScript (`apps/hy-storybook/tsconfig.json`)

Includes all three workspace package source directories so TS resolves them from source:

```json
"include": [
  ".storybook",
  "../../packages/hy-design-system/src",
  "../../packages/hy-tokens/src",
  "../../packages/hy-theme-provider/src"
]
```

> Path is `../../packages/` (not `../../../`) — `tsconfig.json` is in `apps/hy-storybook/`,
> two levels from the repo root.

---

## vanilla-extract Rules

vanilla-extract's `style()` function only allows selectors that target the class itself (`&`).
Selectors targeting **child elements** are not allowed and will throw at build time.

**Wrong:**
```ts
export const tableBody = style({
  selectors: {
    '& tr:last-child': { borderBottom: 'none' }, // ❌ targets a child element
  },
});
```

**Correct — use `globalStyle` with the scoped class as the parent:**
```ts
export const tableBody = style({});

globalStyle(`${tableBody} tr:last-child`, {
  borderBottom: 'none', // ✅
});
```

---

## Turbo Filter Cheatsheet

```bash
# Start Storybook (builds deps first)
pnpm turbo run dev --filter=@hydrotik/storybook

# Build only the design system and its dependencies
pnpm turbo run build --filter=@hydrotik/design-system

# Build the design system and everything that depends on it
pnpm turbo run build --filter=@hydrotik/design-system...

# Build only packages changed since the last commit
pnpm turbo run build --filter=[HEAD^1]

# Run tests for the design system
pnpm turbo run test --filter=@hydrotik/design-system
```

---

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `Importing a module script failed` | Vite blocked out-of-root file | Ensure `server.fs.allow` includes workspace root in `main.ts` |
| `Identifier '__dirname' has already been declared` | Redeclared `__dirname` in `main.ts` | Remove manual `__dirname` — Storybook's esbuild-register injects it |
| `Invalid selector: & tr:last-child` | Child selector in `style()` | Move to `globalStyle(\`${parent} tr:last-child\`, { ... })` |
| Stories not found | Path in `stories` glob wrong | Glob in `main.ts` is relative to the `.storybook/` dir, not the project root |
