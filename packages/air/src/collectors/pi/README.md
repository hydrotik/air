# AIr Collector — Pi Extension

Streams telemetry from [pi](https://github.com/mariozechner/pi-coding-agent) coding agent sessions
to the AIr dashboard. `@hydrotik/air` is a pi package: its `package.json` names the extension
(`"pi": { "extensions": ["./dist/collectors/pi/index.js"] }`), so pi's own package manager installs
it. The source is `src/collector/` in this package.

## Install

For every project (global pi settings, `~/.pi/agent/settings.json`):

```bash
pi install npm:@hydrotik/air
```

For one project (`.pi/settings.json`, installed under `.pi/npm/`; commit the settings file and pi
installs the package for everyone who opens the project):

```bash
pi install -l npm:@hydrotik/air
```

Then start a new pi session, or `/reload` in a running one. `pi list` shows the package;
`pi update npm:@hydrotik/air` updates it and `pi remove npm:@hydrotik/air` (with `-l` for a
project) removes it.

A global pi install runs `npm install -g @hydrotik/air`, which also provides the `air` command.
If `@hydrotik/air` is already installed some other way, point pi at that copy instead of installing
a second one:

```bash
pi install "$(npm root -g)/@hydrotik/air"
```

To try it for one run without installing: `pi -e npm:@hydrotik/air`. From a clone of this
repository: `pi -e packages/air/src/collector/index.ts` (pi compiles TypeScript itself), or
`pi install ./packages/air` after `pnpm build`.

### Upgrading from a copied extension

Earlier versions were installed by copying a folder into `.pi/extensions/` or
`~/.pi/agent/extensions/`. Delete that copy (for example `~/.pi/agent/extensions/air-collector`)
when you install the package, or every event is sent twice.

## When it runs

Loading the extension only registers its event handlers. When a session starts
(`session_start`), the collector:

1. checks whether the AIr server answers (`GET /api/health`) on `AIR_PORT`;
2. if not, starts one as a **detached background process**, from the first of: the `@hydrotik/air`
   package the collector was loaded from (same version), the project's
   `node_modules/@hydrotik/air`, the global `air` command. It waits up to 3 seconds for each;
3. connects the WebSocket and starts a heartbeat every 10 seconds.

`session_shutdown` sends `session_end`, stops the heartbeat and closes the connection; pi loads a
fresh copy of the extension for each session (`/new`, `/resume`, `/fork`, `/reload`). The server
keeps running after pi exits.

The collector never blocks or fails pi. Events sent before the connection opens, or while the
server is down, wait in a queue (the latest 200) and are sent when it connects; heartbeats are not
queued. Every new connection starts with the session's `session_start`, so a restarted server
learns the session again (the server stores an event id once). It reconnects every 5 seconds.

## Configuration

| Env Variable    | Default                                  | Description                                                                         |
| --------------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| `AIR_URL`       | `ws://localhost:<AIR_PORT>/ws/collector` | Server WebSocket endpoint                                                           |
| `AIR_PORT`      | `5200`                                   | Server port, for the URL and auto-start. Anything but 1–65535: a warning, then 5200 |
| `AIR_ENABLED`   | `true`                                   | Set to `"false"` to disable collection                                              |
| `AIR_AUTOSTART` | `true`                                   | Set to `"false"` to never start the server                                          |

## What It Collects

| Event             | Source                           | Data                                                          |
| ----------------- | -------------------------------- | ------------------------------------------------------------- |
| Session           | `session_start/shutdown`         | pi's session id, cwd, model, `agent: "pi"`                    |
| Tool calls        | `tool_execution_start/end`       | Name, duration, I/O size, errors                              |
| Turns             | `turn_start/end`                 | Index, tool count per turn, turn latency                      |
| Token usage       | Assistant message `.usage`       | Input, output, cache read/write, cost                         |
| Cost              | `.usage.cost`, else AIr pricing  | Per turn and cumulative                                       |
| Output evaluation | Each turn                        | Tool success rate, cache hit rate, response latency           |
| Context usage     | `ctx.getContextUsage()`          | Real token count, utilization %                               |
| Context breakdown | `ctx.sessionManager.getBranch()` | Per category: system prompt sections, messages, files by kind |
| Compactions       | `session_compact`                | Tokens before, summary length                                 |
| Model changes     | `model_select`                   | Previous/new model, trigger source                            |
