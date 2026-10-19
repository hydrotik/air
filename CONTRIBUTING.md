# Contributing

This file covers setting up, testing and what a pull request needs.

## Setup

- Node.js 22 or later
- pnpm 10 (pinned in `package.json`; `corepack enable` picks it up)

```bash
git clone https://github.com/hydrotik/air
cd air
pnpm install
git config core.hooksPath .githooks   # the pre-push check (below)
```

## Running

```bash
pnpm build                  # packages/air/dist: server, SDK, shared types
pnpm dev                    # the server from source on 5200, restarting on change
pnpm dev:dashboard          # the dashboard on 5201, proxying to 5200 (needs AIR_DS_SOURCE)
```

The dashboard compiles against a design system that is not published. `AIR_DS_SOURCE` names a
checkout of it; without one, the dashboard's tests still run (on stand-ins under
`packages/dashboard/src/__testing__/`), but it cannot be built or served.

## Checks

```bash
pnpm test:coverage          # both packages, with their coverage floors
pnpm typecheck              # packages/air
pnpm typecheck:dashboard    # needs AIR_DS_SOURCE, with the design system built
pnpm lint:ci && pnpm lint:typed
pnpm format:check
node scripts/check-clean.mjs
```

CI runs all of these except the dashboard typecheck. Coverage floors only go up: when coverage
rises, raise the floor in that package's `jest.config.mjs`.

## What stays out

`scripts/check-clean.mjs` fails on images (except the README screenshot), build output, coverage,
databases, environment files, absolute home paths, and package paths from the design-system
monorepo. The pre-push hook also checks a local list of names (`.clean-terms`, never committed).

## Pull requests

- One change per pull request, with a test when behaviour changes.
- Commit messages follow Conventional Commits (`feat(air): …`, `fix(dashboard): …`).
- User-facing changes get a line in `CHANGELOG.md` under _Unreleased_.
- Version bumps are their own pull request; see [docs/releasing.md](docs/releasing.md).
