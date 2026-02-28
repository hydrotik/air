# Integrations

**Analysis Date:** 2026-02-28

## External Services

**Currently: None.** This is a design system monorepo — no external APIs, databases, or auth providers are integrated yet.

### BFF (Planned)
`apps/hy-bff-fastify` is scaffolded with:
- `@fastify/cors` — CORS handling
- `@fastify/helmet` — Security headers
- `@fastify/jwt` — JWT authentication (not connected)
- `@fastify/rate-limit` — Rate limiting
- `@fastify/swagger` + `@fastify/swagger-ui` — API documentation
- `@scalar/fastify-api-reference` — Scalar API reference
- `zod` + `fastify-type-provider-zod` — Runtime validation
- `pino` — Structured logging

**Status:** Build currently fails (rolldown issue). Not connected to any preview app routes.

## Internal Integrations

### MCP Server (`packages/hy-design-mcp`)
- Model Context Protocol server for design decision RAG
- Reads design system source files and docs
- Exposes component information to LLM tools
- Port 5100 (configured in `.mcp.json`)
- Auto-started by Claude Code via `.mcp.json` config

### GSD (Get Shit Done) v1.22.0
- Installed locally at `.claude/`
- 32 slash commands, 11 agents, hooks
- Context engineering + spec-driven development for Claude Code
- Hooks: update checker, context window monitor, statusline

### Desloppify
- Codebase health scanner (Python CLI, installed globally)
- Runs on every `git commit` via husky pre-commit hook
- State tracked in `.desloppify/state-typescript.json`
- 14 detectors: logs, unused, dead exports, deprecated, structural, coupling, cohesion, signatures, test coverage, smells, security, subjective review, boilerplate, duplicates

### hy-ai-tools (`packages/hy-ai-tools`)
- LLM context management CLI
- Commands: `registry`, `validate`, `all`, `salt`, `init`
- Root scripts: `pnpm llm:registry`, `pnpm llm:check`, etc.

## Fonts

Self-hosted via `@fontsource-variable`:
- **Inter Variable** — Primary sans-serif (body, UI)
- **JetBrains Mono Variable** — Monospace (code, editorial, data tables)
- Loaded in `packages/hy-design-system/src/global.css.ts`
- No external font CDN requests

## CI/CD

**Currently: None configured.**
- No GitHub Actions, Vercel, or deployment pipelines
- Turborepo supports remote caching but not configured
- `turbo.json` has CI-aware settings (`forbidOnly`, `retries`, `workers`)

---

*Integrations analysis: 2026-02-28*
*Update when external services are connected*
