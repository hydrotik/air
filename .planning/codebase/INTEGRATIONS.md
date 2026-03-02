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
- TF-IDF search over chunked knowledge base (`rag-store.json`)
- Tools: `rag_sync`, `rag_search`, `rag_get`, `rag_list`, `get_tokens`, `get_component`, `check_token_usage`
- Port 5100 (configured in `.mcp.json`)
- Auto-started by Claude Code via `.mcp.json` config
- **AIr instrumented**: emits RAG telemetry via HTTP to `POST /api/rag/*`
  - `rag_search` → retrieval events (query, result count, duration, corpus size)
  - `rag_sync` → index events (chunk count, estimated tokens, duration)
  - `rag_get` → retrieval events (direct chunk lookup)
  - Telemetry is fire-and-forget (never blocks MCP responses)
  - Controlled via `AIR_ENABLED=false` to disable

### AIr Observability (`packages/hy-ai-rum`)
- Real-time AI agent telemetry: token tracking, cost, latency, output quality, drift detection
- Dashboard: React 19 + Vite 6 + Recharts + D3
- Server: Fastify + SQLite (WAL mode) + WebSocket
- Collectors: Pi, Claude Code, Codex CLI, SDK
- Config: `.air.json` at monorepo root
- Port 5200 (configured in `@hydrotik/config`)
- **Published**: `@hydrotik/air` on npm + GitHub Packages (see `.planning/PUBLISHING.md`)
- **Public repo**: `github.com/hydrotik/air` — subtree-synced via post-commit hook + CI
  - Sync: automatic on commit to `packages/hy-ai-rum/**`
  - Manual: `git subtree push --prefix=packages/hy-ai-rum air-public main`
  - CI: `sync-air.yml` + `publish-air.yml` workflows
- **BYORAG integration**: `.air.json` declares providers, HTTP API for any language, SDK for TypeScript
  - Provider registry with auto-discovery
  - Simplified endpoints: `POST /api/rag/retrieval`, `/api/rag/embedding`, `/api/rag/index`
  - Dashboard: Integrations panel, RAG Pipeline stats, live event feed
  - Integration Guide: `INTEGRATION_PROMPT_README.md` (copy-paste prompt for AI agents)
- **Security**: 3-level redaction (none/preview/full), SHA-256 prompt hashing, no raw content storage
- **Drift detection**: auto-alerts when latency, cost, or quality shifts from baseline

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

### GitHub Actions
- **`sync-air.yml`** — Syncs `packages/hy-ai-rum/` to public `hydrotik/air` repo
  - Triggers: push to main (paths: `packages/hy-ai-rum/**`) + `workflow_dispatch`
  - Uses `AIR_DEPLOY_KEY` secret for SSH auth
- **`publish-air.yml`** — Publishes `@hydrotik/air` to npm + GitHub Packages
  - Triggers: `workflow_dispatch` (pick patch/minor/major) + tag push (`air-v*`)
  - Dual registry: npmjs.com (`NPM_TOKEN` secret) + GitHub Packages (`GITHUB_TOKEN`)
  - Auto: version bump → build → test → publish both → commit → tag → sync public repo

### Secrets Required
| Secret | Purpose | Where to create |
|--------|---------|-----------------|
| `NPM_TOKEN` | Publish to npmjs.com | npmjs.com → Access Tokens → Granular (bypass 2FA, write on `@hydrotik/air`) |
| `AIR_DEPLOY_KEY` | Subtree push to `hydrotik/air` | SSH deploy key with write access |

### Not Yet Configured
- No Vercel or deployment pipelines
- Turborepo supports remote caching but not configured
- `turbo.json` has CI-aware settings (`forbidOnly`, `retries`, `workers`)

---

*Integrations analysis: 2026-02-28*
*Update when external services are connected*
