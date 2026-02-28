# Concerns

**Analysis Date:** 2026-02-28

## Technical Debt

### High Priority

**1. BFF build broken**
- `apps/hy-bff-fastify` fails to build (rolldown/tsdown issue)
- Not blocking anything currently — no app depends on it
- Fix: May need rolldown version pin or build tool change

**2. Large JS bundle (preview app)**
- Vite warns about large JS bundle size for `apps/hy-component-preview`
- EditorialPage alone is ~41KB source + ~26KB CSS
- **Mitigation:** Route-level code splitting via `React.lazy()` not yet implemented
- All 6 pages are eagerly loaded in `App.tsx`

**3. Legacy files not cleaned up**
- `HomePage.tsx`, `SinkPage.tsx`, `SinkPage.css.ts` — still present but not routed
- `src/cards/` (30+ card components) and `src/sections/` (14 section components) — orphaned from old bento/sink pages
- E2E specs `home-cards.spec.ts` and `sink.spec.ts` exist for defunct routes
- **Action:** Delete or lazy-load after confirming no references

### Medium Priority

**4. Missing `space['3_5']` token**
- Token contract doesn't include a `3.5` (14px) space token
- `EditorialPage.css.ts` uses `vars.space['4']` as fallback throughout
- **Action:** Add `space['3_5']` to token contract if needed more broadly

**5. Incomplete unit test coverage**
- Not all 46 components have Jest unit tests
- No formal coverage threshold enforced
- Storybook stories serve as visual regression baseline but aren't automated
- **Action:** Add jest-axe tests to all components, set coverage floor

**6. No CI/CD pipeline**
- No GitHub Actions for build/test/deploy
- Turbo remote caching not configured
- No preview deploys for PRs
- **Action:** Set up GitHub Actions with Turbo

### Low Priority

**7. Storybook build not verified**
- `apps/hy-storybook` exists with config but `build-storybook` not regularly tested
- Some stories may have import issues after renames (SourceRatingBar → SegmentedRatingBar)
- **Action:** Verify `pnpm build-storybook` passes

**8. DataGrid not yet replacing Table in all pages**
- DashboardPage and EcommercePage still use basic `<Table>` component
- DataGrid was intended to replace them
- **Action:** Swap Table → DataGrid in dashboard + inventory pages

## Security

- No secrets in codebase (no `.env` files, no API keys)
- Desloppify security detector: clean (0 findings)
- BFF has `@fastify/helmet` + `@fastify/rate-limit` scaffolded
- Claude Code deny-list not configured (consider for sensitive files)

## Performance

- **Strengths:**
  - Zero-runtime CSS (vanilla-extract) — no style recalculation
  - Static theme switching (data attribute, no re-render tree)
  - Turbo build caching reduces rebuild time

- **Concerns:**
  - No virtual scrolling in DataGrid (renders all rows)
  - EditorialPage renders 69-entity roster + DataGrid on same page
  - recharts v3 re-renders on every prop change (no memoization)
  - No `React.lazy()` code splitting in preview app

## Fragile Areas

- **EditorialPage** (~41KB) — Largest single file, complex data generation with seeded PRNG, tightly coupled layout
- **DataGrid component** (~2800 lines across 6 files) — Complex state machine, many feature combinations
- **Token contract** — Changing token shape requires updating both theme files + all consumers
- **Monorepo build order** — If tsdown/rolldown has issues, entire build chain breaks (happened with BFF)

---

*Concerns analysis: 2026-02-28*
*Update after addressing debt or discovering new issues*
