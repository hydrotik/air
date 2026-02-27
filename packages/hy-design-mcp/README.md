# @hydrotik/design-mcp

MCP server with a built-in RAG knowledge base for Hydrotik design decisions. Syncs tokens, styling conventions, component source, and documentation into searchable chunks. AI coding assistants query this to stay aligned with project conventions.

## RAG Architecture

The server maintains a `rag-store.json` file containing chunked knowledge from:
- **Static conventions** — component file structure, authoring rules, styling patterns, accessibility, theming, testing, variant patterns, package imports
- **Live token source** — contract, dark theme, light theme (read from `@hydrotik/tokens`)
- **Live component source** — every component's `.tsx` and `.styles.ts` files
- **Documentation** — all markdown files from `docs/`

Search uses TF-IDF with title/tag boosting — no embeddings or external services needed.

### Auto-sync
The store auto-syncs on first boot. Run `rag_sync` manually after changing tokens, components, or docs.

## Tools

| Tool | Description |
|---|---|
| `rag_sync` | Rebuild the RAG store from live repo state |
| `rag_search` | TF-IDF search across all knowledge (query, optional category filter, topK) |
| `rag_get` | Get a specific chunk by ID |
| `rag_list` | List all chunks, optionally filtered by category |
| `get_tokens` | Read live token source files (contract / dark / light / all) |
| `get_component` | Read live component source code by name |
| `check_token_usage` | Validate a CSS value against token conventions |

## Prompts

| Prompt | Description |
|---|---|
| `new_component` | Scaffold a component with the correct file structure |
| `review_styles` | Review a `.styles.ts` file for convention compliance |

## Component File Convention

```
ComponentName/
├── ComponentName.tsx            # React component (forwardRef)
├── ComponentName.styles.ts      # vanilla-extract styles
├── ComponentName.jest.tsx        # Tests (Jest + Testing Library + jest-axe)
├── ComponentName.stories.tsx     # Storybook stories
└── index.ts                      # Barrel re-exports
```

Key naming rules:
- Styles → `.styles.ts` (not `.css.ts`)
- Tests → `.jest.tsx` (not `.test.tsx`)
- Stories → `.stories.tsx`

## Setup

Configured in `.mcp.json` at the repo root:

```json
{
  "mcpServers": {
    "hydrotik-design": {
      "command": "node",
      "args": ["packages/hy-design-mcp/dist/index.mjs"]
    }
  }
}
```

## Build

```bash
pnpm --filter @hydrotik/design-mcp build
```

## RAG Categories

| Category | What's in it |
|---|---|
| `conventions` | File structure, authoring rules, styling, accessibility, theming, testing, variants, imports |
| `tokens` | Token contract + dark/light theme values (live source) |
| `components` | Every component's source code (live) |
| `docs` | All markdown docs from `docs/` |
| `architecture` | Monorepo stack, dependency graph, build system, key commands |
