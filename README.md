# AIr

Local observability for AI coding agents: context window use, tool calls, token cost, latency,
compaction and drift, streamed to a dashboard on your machine. Collectors for Pi, Claude Code and
Codex, and an SDK for MCP servers, RAG pipelines and custom tools.

```bash
npx @hydrotik/air            # server and dashboard on http://localhost:5200
```

The package documentation is in [`packages/air/README.md`](packages/air/README.md), and the
integration guide in [`packages/air/INTEGRATION_PROMPT_README.md`](packages/air/INTEGRATION_PROMPT_README.md).

## Repository

| Path                 | What                                                              |
| -------------------- | ----------------------------------------------------------------- |
| `packages/air`       | `@hydrotik/air` on npm: server, CLI, SDK, collectors              |
| `packages/dashboard` | The dashboard (private), built into `packages/air/dist/dashboard` |
| `scripts`            | `check-clean.mjs`: what this repository must never contain        |
| `docs/releasing.md`  | How a release is built and published                              |

```bash
pnpm install
pnpm build          # server, SDK, shared types
pnpm test           # both packages
pnpm dev            # server on 5200, restarts on change
```

The dashboard is built on a design system that is not published; building or serving it needs
a checkout of that design system (`AIR_DS_SOURCE`, see [`docs/releasing.md`](docs/releasing.md)).
Its tests run without it.

See [CONTRIBUTING.md](CONTRIBUTING.md) to work on AIr and [SECURITY.md](SECURITY.md) to report a
problem.

## License

MIT
