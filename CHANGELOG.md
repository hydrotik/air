# Changelog

All notable changes are listed here. The format follows Keep a Changelog, and versions follow
semantic versioning.

## Unreleased

### Added

- **`air setup claude-code`**: connects Claude Code in one command. Telemetry settings go to
  `~/.claude/settings.json` (Claude Code ignores them in project settings); the SessionStart hook
  and a status-line bridge go to the project (or the user with `--user`). The bridge sends the
  exact context-window figures, and an existing status line keeps showing. Removes the
  PostToolUse hook of older installs (tool calls were counted twice with telemetry on).
  `--dry-run`, `--force`, `--no-statusline`, `--port`, `--uninstall` (restores what was there).
- **Exact context from the status line**: a heartbeat with context figures becomes the session's
  context reading, and telemetry stops estimating it for that session.
- **OpenTelemetry receiver for Claude Code** (`POST /otlp/v1/logs`, `/otlp/v1/metrics`; OTLP/HTTP
  with JSON). Each API request becomes tokens, cost, latency (with time to first token), context %
  and a turn; each tool result a timed tool call; refused tool calls, API errors and compactions
  are recorded. Identity attributes are dropped; events keyed on `session.id` and
  `event.sequence`, so exporter retries are stored once. Setup in the README.

### Fixed

- The Claude Code SessionStart hook starts the server from `node_modules/@hydrotik/air`; the
  `.bin/air` it tried first is a shell shim under pnpm, which `node` cannot run.
- **Session cost was counted twice** for collectors that send `token_usage` with a cost and a
  `cost` event (the Pi collector): the session total now comes from `cost` events only.
- **Re-delivered events** (same id) are stored once and no longer add to tokens, cost, turns or
  tool counts again, and are not re-broadcast.
- **Session details arriving late** (a SessionStart hook after telemetry, or the reverse) now fill
  in the folder, model and agent instead of being dropped; last activity no longer moves back on
  an out-of-order event.
- Dashboard: Avg latency uses API-call latency when no turn latency is reported; the cost table
  shows a dash for input / output / cache when a source reports only the total.

## 0.2.0 - 2026-10-19

### Security

- **The server listens on `127.0.0.1` by default** (was `0.0.0.0`). `--host 0.0.0.0` or `host`
  in `.air.json` restores network access; the banner then says other machines can connect.
- **Requests from other sites are refused.** REST calls, ingest and WebSocket upgrades that carry
  an `Origin` header other than loopback or the server itself (by IP address) get `403`; CORS
  headers go only to accepted origins. Collectors, the SDK and command-line clients send no
  `Origin` and are unaffected. Add trusted origins with `allowedOrigins` in `.air.json` or
  `--allow-origin`.

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
