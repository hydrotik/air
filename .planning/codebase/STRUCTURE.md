# Directory Structure

**Analysis Date:** 2026-02-28

## Top-Level Layout

```
hydrotik/
├── apps/                           # Consumer applications
│   ├── hy-bff-fastify/             # Fastify 5 BFF API server
│   ├── hy-component-preview/       # Vite + React SPA (6 routes, E2E tests)
│   └── hy-storybook/               # Storybook 8 component explorer
│
├── packages/                       # Shared libraries
│   ├── hy-tokens/                  # Design token contract (vanilla-extract)
│   ├── hy-theme-provider/          # React ThemeProvider + useTheme
│   ├── hy-design-system/           # 46 UI components (Radix + vanilla-extract)
│   ├── hy-config/                  # Cross-project config (ports, constants)
│   ├── hy-design-mcp/              # MCP server with RAG for design decisions
│   ├── hy-ai-tools/                # LLM context management CLI
│   ├── hy-component-template/      # Scaffold for new components
│   ├── hy-eslint-config/           # Shared ESLint presets
│   ├── hy-jest-config/             # Shared Jest presets
│   ├── hy-prettify-config/         # Shared Prettier config
│   ├── hy-tsdown-config/           # Shared tsdown (library bundler) config
│   └── hy-typescript-config/       # Shared TypeScript compiler options
│
├── docs/                           # Project documentation
│   ├── ARCHITECTURE.md             # Architecture overview
│   ├── DESIGN-SYSTEM.md            # Component catalog + conventions
│   ├── GETTING-STARTED.md          # Setup + usage guide
│   └── reference/                  # shadcn/ui reference implementations
│
├── scripts/                        # Workspace automation
│   └── visual-capture.ts           # Headless Playwright screenshot tool
│
├── .claude/                        # GSD (Get Shit Done) v1.22.0
│   ├── commands/gsd/               # 32 slash commands
│   ├── agents/                     # 11 specialized agents
│   ├── hooks/                      # Context monitor, update checker
│   └── get-shit-done/              # Core system (workflows, templates)
│
├── .planning/                      # GSD planning state
│   └── codebase/                   # Codebase mapping documents
│
├── CLAUDE.md                       # Agent instructions (RAG)
├── turbo.json                      # Turborepo pipeline
├── pnpm-workspace.yaml             # Workspace member declarations
└── package.json                    # Root devDeps + scripts
```

## Key Locations

### Design System Components
```
packages/hy-design-system/src/components/{Name}/
├── {Name}.tsx              # React component (forwardRef)
├── {Name}.css.ts           # vanilla-extract styles (recipe)
├── {Name}.stories.tsx      # Storybook stories
├── {Name}.test.tsx         # Jest + Testing Library tests (if present)
└── index.ts                # Barrel re-export
```

### Design Tokens
```
packages/hy-tokens/src/
├── contract.css.ts         # createThemeContract() — token shape
├── dark.css.ts             # Dark theme values
├── light.css.ts            # Light theme values
├── themeClasses.ts         # Theme CSS class exports
└── index.ts                # Barrel export (vars, themes)
```

### Preview App Pages
```
apps/hy-component-preview/src/
├── main.tsx                # React entry point
├── App.tsx                 # Router + nav + theme toggle
├── App.css.ts              # Layout styles
├── pages/
│   ├── DataGridPage.tsx    # / and /datagrid routes
│   ├── DashboardPage.tsx   # /dashboard
│   ├── EcommercePage.tsx   # /inventory (was E-Commerce)
│   ├── PluginPage.tsx      # /plugin
│   ├── EditorialPage.tsx   # /editorial (~41KB, high-density data journalism)
│   └── EditorialPage.css.ts # Editorial styles (~26KB)
├── cards/                  # Demo card components (legacy, from bento grid)
└── sections/               # Component section groupings (legacy, from sink)
```

### E2E Tests
```
apps/hy-component-preview/e2e/
├── editorial.spec.ts       # 14 tests
├── datagrid.spec.ts        # 16 tests (in navigation.spec.ts)
├── inventory.spec.ts       # 12 tests
├── plugin.spec.ts          # 13 tests
├── navigation.spec.ts      # 5 tests
└── theme.spec.ts           # 3 tests
```

## Naming Conventions

| Entity | Pattern | Example |
|--------|---------|---------|
| Package directory | `hy-{name}` | `packages/hy-design-system` |
| Package name | `@hydrotik/{name}` | `@hydrotik/design-system` |
| Component directory | `PascalCase` | `components/SegmentedRatingBar/` |
| Style file | `{Name}.css.ts` | `SegmentedRatingBar.css.ts` |
| Story file | `{Name}.stories.tsx` | `SegmentedRatingBar.stories.tsx` |
| CSS recipe | `camelCaseRecipe` | `segmentedRatingBarRecipe` |
| Token access | `vars.{category}.{token}` | `vars.color.primary` |
| Data attributes | `data-{feature}` | `data-theme`, `data-density`, `data-rating-size` |

---

*Structure analysis: 2026-02-28*
*Update after significant directory changes*
