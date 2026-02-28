# Testing

**Analysis Date:** 2026-02-28

## Framework

| Layer | Tool | Config |
|-------|------|--------|
| Unit | Jest 30 + Testing Library 16 | `@hydrotik/jest-config/react` |
| Accessibility | jest-axe 10 | `toHaveNoViolations()` |
| E2E | Playwright 1.58 (Chromium) | `apps/hy-component-preview/playwright.config.ts` |
| Visual | Playwright (headless screenshots) | `scripts/visual-capture.ts` |

## Unit Test Structure

Tests live alongside components:
```
packages/hy-design-system/src/components/Button/
├── Button.tsx
├── Button.css.ts
├── Button.test.tsx       # Unit + accessibility tests
└── Button.stories.tsx    # Storybook stories (visual testing)
```

**Jest config hierarchy:**
- `@hydrotik/jest-config/base` — Node environment (utilities, scripts)
- `@hydrotik/jest-config/react` — jsdom + `@testing-library/jest-dom` + jest-axe

**Pattern:**
```tsx
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

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

## E2E Test Structure

**Config:** `apps/hy-component-preview/playwright.config.ts`
- Browser: Chromium only
- Base URL: `http://localhost:3100`
- Auto-starts Vite dev server
- Screenshots: only on failure
- Trace: on first retry

**Test inventory (63 tests):**

| File | Tests | What it covers |
|------|-------|----------------|
| `editorial.spec.ts` | 14 | Header, stats bar, narrative sections, timeline, roster, DataGrid, vehicles, source corpus, footer |
| `datagrid.spec.ts` | 16 | Full-featured grid, sorting, filtering, pagination, row selection, column resizing, tree data, loading, empty |
| `inventory.spec.ts` | 12 | KPI cards, area chart, donut chart, orders table, product filters, sidebar nav |
| `plugin.spec.ts` | 13 | Hero section, feature cards, comparison table, specs, CTA, DAW hosts |
| `navigation.spec.ts` | 5 | All routes reachable, navbar links, direct URL access |
| `theme.spec.ts` | 3 | Dark default, toggle to light, persistence |

**Run commands:**
```bash
pnpm turbo run e2e                                    # all E2E tests
cd apps/hy-component-preview && npx playwright test    # direct
npx playwright test e2e/editorial.spec.ts              # single file
npx playwright test --ui                               # interactive mode
```

## Visual Testing

**Headless Playwright screenshot tool:** `scripts/visual-capture.ts`

```bash
pnpm capture --route /editorial                        # full page
pnpm capture --route /editorial --scroll 5500          # viewport at offset
pnpm capture --route /editorial --element "[role='meter']" --padding 20  # element
pnpm capture:all                                       # all routes
```

- 2× device scale (Retina quality)
- Output: `/tmp/hydrotik-captures/`
- No Playwright Test assertions — pure screenshot capture for manual review

## Storybook Stories

Stories live alongside components: `{Name}.stories.tsx`

**Current stories include:**
- Button, Input, Badge, Card, Alert, Dialog, Tabs, Select, Tooltip, Toast, Table
- DataGrid (11 stories: Default, Compact, Editorial, Borderless, Loading, Empty, etc.)
- SegmentedRatingBar (8 stories: Default, Numeric, AllSizes, AllColors, FillLevels, etc.)
- FlagTag (6 stories: Default, AllVariants, AllSizes, InlineAfterName, TableContext, etc.)

**Storybook config:** `apps/hy-storybook/.storybook/`
- `main.ts` — globs `packages/hy-design-system/src/**/*.stories.@(ts|tsx)`
- `preview.tsx` — wraps stories in `ThemeProvider` (dark/light toggle)
- Addons: essentials, a11y, docs

## Test Coverage

- Unit tests: per-component (not all components have tests yet)
- E2E tests: 63 tests covering all 6 routes
- Visual: manual via `pnpm capture` + human review
- Accessibility: jest-axe in unit tests + `@storybook/addon-a11y` in Storybook
- No formal coverage threshold enforced yet

## Mocking

- **Jest:** `jest-environment-jsdom` for DOM APIs
- **Playwright:** Real Vite dev server (auto-started, port 3100)
- **No API mocking** — preview app uses static data, BFF not integrated yet

---

*Testing analysis: 2026-02-28*
*Update after adding new test infrastructure*
