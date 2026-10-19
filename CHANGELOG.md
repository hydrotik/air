# Changelog

All notable changes are listed here. The format follows Keep a Changelog, and versions follow
semantic versioning.

## Unreleased

### Added

- **Compact dashboard** (`?compact=true`): KPI row, tabs for overview, errors, sessions,
  integrations and drift, and a one-line event ticker. The groundwork for the desktop panel.

### Changed

- **Repository.** `github.com/hydrotik/air` is the source of AIr, with its own CI and release
  workflow. Releases are published from GitHub Actions with npm trusted publishing and
  provenance. GitHub Packages is no longer published to.
- **CLI bins and Claude Code hooks are CommonJS (`.cjs`).** `air-install-claude-code` and
  `air-codex-watcher` no longer fail with `require is not defined`. The installer copies hooks as
  `air-*.cjs` and migrates settings entries from the old `.js` names.
- **SDK option types** accept an explicit `undefined` for optional fields (for callers on
  `exactOptionalPropertyTypes`). Existing callers compile unchanged.

### Fixed

- Dashboard: the live socket no longer reconnects forever after the page unmounts; live events are
  no longer counted twice in token flow; the event ticker no longer sticks during its exit
  animation; a slow response for a previously selected session no longer overwrites the current
  one; the compact page no longer refetches in a loop.
- Dashboard: the drift panel no longer crashes when it goes from empty to non-empty.
- Server: WebSocket collector frames are decoded by type.
- Codex watcher: a failed `--replay` reports the error and exits 1.

## 0.1.1 - 2026-03-13

## 0.1.0 - 2026-03-01

First release.
