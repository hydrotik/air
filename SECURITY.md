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

- **The server has no authentication.** Anything that can reach its port can read the stored
  sessions and send events.
- **It listens on all interfaces by default** (`--host 0.0.0.0`). On a shared network, start it
  with `--host 127.0.0.1`.
- **CORS allows any origin.** A web page open in a browser on the same machine can call the API.
- **Redaction.** Events are redacted before they are stored (`--redaction`, default `preview`:
  previews truncated, keys, tokens, emails and connection strings scrubbed). Prompts are stored as
  hashes. Redaction is pattern-based and is not a guarantee.
- **Storage.** Sessions are kept in a SQLite file under `~/.hydrotik/air/`.
