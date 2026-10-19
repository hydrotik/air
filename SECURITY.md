# Security

## Reporting a vulnerability

Report security problems privately, through GitHub's private vulnerability reporting on the
repository: <https://github.com/hydrotik/air/security/advisories/new>. Do not open a public issue.

Include what you found, how to reproduce it, and what an attacker could do with it. Reports are
acknowledged, reporters are kept informed, and credited in the advisory unless they prefer not to
be named.

## Supported versions

AIr is at 0.x. Fixes go into the latest release only.

## How AIr is meant to run

AIr is a developer tool that runs on your own machine.

- **The server has no authentication.** Any process that can reach its port can read the stored
  sessions and send events.
- **It listens on `127.0.0.1` by default.** `--host 0.0.0.0` (or `host` in `.air.json`) opens it
  to other machines; use that only on a network you trust.
- **It refuses other sites.** A request or WebSocket upgrade that carries an `Origin` header is
  accepted only from loopback origins, from the server's own origin reached by IP address, or from
  origins listed in `allowedOrigins` / `--allow-origin`; anything else gets `403`. A host _name_
  matching the server is not enough, which blocks DNS rebinding. Requests without an `Origin`
  header (collectors, the SDK, command-line tools) are accepted.
- **Redaction.** Events are redacted before they are stored (`--redaction`, default `preview`:
  previews truncated, keys, tokens, emails and connection strings scrubbed). Prompts are stored as
  hashes. Redaction is pattern-based and is not a guarantee.
- **Storage.** Sessions are kept in a SQLite file under `~/.hydrotik/air/`.
