# Getting Started

## Prerequisites

| Requirement         | Version                                                                           |
| ------------------- | --------------------------------------------------------------------------------- |
| Node.js             | ≥ 20.0.0                                                                          |
| pnpm                | 10.30.3 (see note)                                                                |
| macOS Apple Silicon | `@rolldown/binding-darwin-arm64` is a required devDep — already in `package.json` |

**Install pnpm at the required version:**

```bash
corepack enable
corepack prepare pnpm@10.30.3 --activate
```

---

## Initial Setup

```bash
# Clone the repository
git clone <repo-url>
cd hydrotik

# Install all dependencies (workspaces resolved automatically)
pnpm install
```

pnpm will symlink all workspace packages into each other's `node_modules/@hydrotik/` automatically.

---

## Build Core Packages

Packages must be built before apps can consume them. Use Turbo to build in dependency order:

```bash
# Build all packages (tokens → theme-provider → design-system)
pnpm build

# Or build only the design system and its deps
pnpm build --filter @hydrotik/design-system...
```

Individual package builds:

```bash
pnpm build --filter @hydrotik/tokens
pnpm build --filter @hydrotik/theme-provider
pnpm build --filter @hydrotik/design-system
```

---

## Running Storybook

```bash
pnpm turbo run dev --filter=@hydrotik/storybook
```

Opens at `http://localhost:6006`. Storybook uses `@storybook/react-vite` and loads
`ThemeProvider` automatically via the preview decorator. Use the toolbar to toggle dark/light.

Turbo's `dev` task has `"dependsOn": ["^build"]` so tokens, theme-provider, and design-system
are always built before Storybook starts.

See [STORYBOOK.md](./STORYBOOK.md) for full setup details and troubleshooting.

### Dev Server Ports (centralized in `@hydrotik/config`)

| App               | Port | Command                                                   |
| ----------------- | ---- | --------------------------------------------------------- |
| Component Preview | 3100 | `pnpm turbo run dev --filter=@hydrotik/component-preview` |
| BFF Fastify       | 4000 | `pnpm turbo run dev --filter=@hydrotik/bff-fastify`       |
| Design MCP        | 5100 | (auto-started via `.mcp.json`)                            |
| Storybook         | 6006 | `pnpm turbo run dev --filter=@hydrotik/storybook`         |

Port ranges: 3xxx=frontend, 4xxx=backend, 5xxx=tooling, 6xxx=docs.

---

## Running Component Preview

The preview app is a multi-page SPA showcasing every design system component:

```bash
pnpm turbo run dev --filter=@hydrotik/component-preview
```

Opens at `http://localhost:3100`. Pages:

- **DataGrid** (`/`) — Enterprise data grid as default home (full featured, minimal, tree data, loading, empty)
- **Dashboard** (`/dashboard`) — KPI cards, charts, products table
- **Inventory** (`/inventory`) — Sidebar layout with orders, category charts, product management
- **Plugin** (`/plugin`) — TectraScope marketing landing page with hero, features, specs, pricing CTA
- **DataGrid** (`/datagrid`) — DataGrid demo with sorting, filtering, pagination, selection, tree data
- **Editorial** (`/editorial`) — High-density data journalism page with forensic finance narrative, SegmentedRatingBars, FlagTags, timeline chart, 69-entity roster, DataGrids

---

## Type Checking

```bash
# Typecheck all packages
pnpm typecheck

# Typecheck a specific package
pnpm --filter @hydrotik/design-system typecheck
```

---

## Running Tests

### Unit Tests (Jest)

```bash
# Run all unit tests
pnpm test

# Run tests for a specific package
pnpm turbo run test --filter=@hydrotik/design-system

# Run with coverage
pnpm turbo run test --filter=@hydrotik/design-system -- --coverage
```

Tests use Jest 30 + Testing Library 16 + jest-axe for accessibility assertions.

### E2E Tests (Playwright)

```bash
# Run all E2E tests (auto-starts dev server)
pnpm turbo run e2e

# Run with interactive UI
cd apps/hy-component-preview && pnpm e2e:ui

# Install browsers (first time only)
npx playwright install chromium
```

63 E2E tests across 6 spec files: navigation, datagrid, editorial, inventory, plugin, theme.
Config at `apps/hy-component-preview/playwright.config.ts`.

### Visual Capture (Playwright)

Headless Chromium screenshot tool for visual validation — no macOS permissions needed:

```bash
# Full page screenshot of a route
pnpm capture --route /editorial

# Viewport at a specific scroll position
pnpm capture --route /editorial --scroll 5500

# Element-level captures (every matching element)
pnpm capture --route /editorial --element "[role='meter']" --padding 20

# All routes
pnpm capture:all

# Custom viewport + theme
pnpm capture --route /editorial --viewport 1920x1080 --theme light
```

Output: `/tmp/hydrotik-captures/`. 2× Retina device scale.

---

## Linting & Formatting

```bash
# Lint all packages
pnpm lint

# Format all files
pnpm format

# Check formatting without writing
pnpm format:check
```

### Pre-Commit Hooks (Husky)

Every `git commit` automatically runs:

1. **lint-staged** — ESLint `--fix` + Prettier on staged files
2. **desloppify scan** — TypeScript codebase health scan (14 detectors, score tracking)

To bypass (escape hatch): `git commit --no-verify`

---

## Adding a New Component

1. **Create the component directory**

```
packages/hy-design-system/src/components/MyComponent/
├── MyComponent.tsx            # React component (forwardRef)
├── MyComponent.styles.ts      # vanilla-extract styles
├── MyComponent.jest.tsx        # Tests (Jest + Testing Library + jest-axe)
├── MyComponent.stories.tsx     # Storybook stories
└── index.ts                    # Barrel re-exports
```

> **File naming:** Styles use `.styles.ts`, tests use `.jest.tsx`, stories use `.stories.tsx`.

2. **Write styles (`MyComponent.styles.ts`)**

```ts
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const myComponentRecipe = recipe({
  base: {
    fontFamily: vars.font.family.sans,
    color: vars.color.text,
  },
  variants: {
    // define your variants
  },
});
```

3. **Write the component (`MyComponent.tsx`)**

```tsx
import React from 'react';
import { myComponentRecipe } from './MyComponent.styles';

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // your props
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[myComponentRecipe(), className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);

MyComponent.displayName = 'MyComponent';
```

4. **Create the barrel export (`index.ts`)**

```ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

5. **Add to the package barrel (`src/index.ts`)**

```ts
// Append to packages/hy-design-system/src/index.ts
export * from './components/MyComponent';
```

6. **Write tests (`MyComponent.jest.tsx`)**

```tsx
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders content', () => {
    render(<MyComponent>Hello</MyComponent>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<MyComponent>Hello</MyComponent>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

7. **Rebuild and verify**

```bash
pnpm build --filter @hydrotik/design-system
pnpm --filter @hydrotik/design-system typecheck
pnpm --filter @hydrotik/design-system test
```

---

## Adding a New Design Token

1. **Define in the contract** (`packages/hy-tokens/src/contract.css.ts`):

```ts
export const contract = createThemeContract({
  color: {
    myNewToken: null, // add here
  },
});
```

2. **Add values to both themes** (`dark.css.ts` and `light.css.ts`):

```ts
// In both files, add inside the appropriate section:
color: {
  myNewToken: '#value-for-this-theme',
}
```

3. **Rebuild tokens**:

```bash
pnpm build --filter @hydrotik/tokens
```

Now `vars.color.myNewToken` is available across all components with full TypeScript type-checking.

---

## Package Naming Conventions

| Pattern             | Example                           |
| ------------------- | --------------------------------- |
| Package directory   | `packages/hy-my-package/`         |
| `package.json` name | `@hydrotik/my-package`            |
| pnpm filter flag    | `--filter @hydrotik/my-package`   |
| Turbo task cache    | keyed to `name` in `package.json` |

---

## Useful pnpm Commands

```bash
# Add a dependency to a specific package
pnpm add some-library --filter @hydrotik/design-system

# Add a devDependency to root
pnpm add -D some-tool -w

# Add a workspace package as a dependency
pnpm add @hydrotik/tokens --filter @hydrotik/design-system --workspace

# Remove a dependency
pnpm remove some-library --filter @hydrotik/design-system

# Run any script in all packages
pnpm -r run build
```

---

## IDE Setup (VS Code)

The workspace uses **self-contained tsconfig files** (no `extends` from workspace packages). This ensures Pylance and TypeScript Language Server resolve all types correctly without additional configuration.

Recommended extensions:

- **ESLint** — `dbaeumer.vscode-eslint`
- **Prettier** — `esbenp.prettier-vscode`
- **Tailwind CSS IntelliSense** — not used in this project
- **vanilla-extract** — community syntax highlighting for `.css.ts` files

The workspace settings in `.vscode/settings.json` configure the correct formatter and ESLint integration automatically.
