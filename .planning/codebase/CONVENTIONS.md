# Code Conventions

**Analysis Date:** 2026-02-28

## Styling Rules

**Zero runtime CSS — vanilla-extract only:**
- No Tailwind, no CSS modules, no styled-components, no emotion
- All styles in `.css.ts` files, statically extracted at build time
- `@vanilla-extract/recipes` for variant-driven components
- `@vanilla-extract/css` for `style()`, `globalStyle()`, `createVar()`
- Token access via `vars.*` from `@hydrotik/tokens`

**Dark-first theming:**
- Default theme is dark (`data-theme="dark"` on `<html>`)
- `ThemeProvider` manages toggle via React context
- `ThemeScript` in `<head>` prevents FOUC (reads localStorage before paint)
- Components never reference raw colors — always `vars.color.*`

**Data-attribute-driven variants:**
- Prefer `[data-*]` selectors over CSS class toggling
- Examples: `[data-theme]`, `[data-density]`, `[data-rating-size]`, `[data-lit]`, `[data-flag-size]`
- Enables zero-JS variant switching and clean DOM inspection

## Component Patterns

**forwardRef + displayName:**
```tsx
export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={recipe({ ...variants })} {...props} />
  ),
);
MyComponent.displayName = 'MyComponent';
```

**Barrel exports:**
- Every component has `index.ts` re-exporting component + types
- `packages/hy-design-system/src/index.ts` is the single public API
- Grouped by category with `// ─── SectionName ───` comment headers

**Radix composition:**
- Wrap Radix primitives, apply vanilla-extract styles
- Preserve all Radix props via spread (`...props`)
- Never override Radix accessibility attributes

**Shared styles:**
- `focus-ring.css.ts` — all focusable elements use the same ring
- `menu-item.css.ts` — DropdownMenu, ContextMenu, Menubar, Select share menu item styles
- `overlay.css.ts` — Dialog, Sheet, AlertDialog share overlay/scrim styles

## Naming

| Entity | Convention | Example |
|--------|-----------|---------|
| Components | PascalCase | `SegmentedRatingBar` |
| Props types | `{Name}Props` | `SegmentedRatingBarProps` |
| Recipe exports | `camelCaseRecipe` | `buttonRecipe` |
| Style exports | `camelCase` | `flagTagIcon`, `segmentBase` |
| CSS variables | `vars.category.token` | `vars.color.primary` |
| Files | PascalCase for components, camelCase for utilities | `Button.tsx`, `focus-ring.css.ts` |
| Data attributes | kebab-case | `data-rating-size`, `data-flag-size` |

## Error Handling

- Components are defensive — no crashes on missing/null props
- DataGrid has explicit `emptyState` and `loading` (skeleton) modes
- BFF uses Zod for runtime validation + Fastify sensible for error responses
- E2E tests use `expect(locator).toBeVisible()` pattern (no fragile waits)

## Git Conventions

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `rename:`
- Pre-commit: lint-staged (ESLint + Prettier) + desloppify scan
- Atomic commits — one logical change per commit
- `--no-verify` escape hatch when needed

## Import Order

1. React / framework imports
2. Third-party libraries (`@radix-ui/*`, `lucide-react`, `recharts`)
3. Workspace packages (`@hydrotik/tokens`, `@hydrotik/design-system`)
4. Local imports (relative paths)
5. Style imports (`*.css.ts`, `*.css`)

## TypeScript

- Strict mode everywhere (`strict: true`, `strictNullChecks: true`)
- No `any` — use generics or `unknown`
- Type-only imports where possible: `import type { ... }`
- DataGrid uses full generics: `DataGridColumn<T>`, `useDataGrid<T>`

---

*Conventions analysis: 2026-02-28*
*Update when coding standards change*
