# Copilot Instructions
## Terminal Usage
Always use the active terminal for commands. Do not create new terminal instances.
Only run terminal commands when the user explicitly requests execution. Otherwise, provide commands for the user to run manually.

## Project Context
This is a React/TypeScript monorepo using:
- PNPM for package management
- TurboRepo for build orchestration
- Salt Design System for UI components

## LLM Context System
This repo uses '.1lm-context.md' files for AI-assisted development:
- **Configuration**: '11mrc.json' - Schema, rules, and discovery patterns
- **Registry**: "docs/11m/index.json" - Auto-generated index of all context files
- **Salt DS Reference**: "docs/11m/salt.json" - Salt Design System documentation
- **Project Contexts**: "**/project.1lm-context.md" - Per-package detailed context
- **Root Context**: 'CLAUDE.md' - Repository-wide guidance for Claude Code
- **AI Tools Package**: 'packages/fdm-ai-tools/*' - CLI and API for LLM context management

### Key Commands
```bash
pnpm llm:check # Validate all LLM context files
pnpm llm:all # Full rebuild with remote Salt DS fetch
pnpm llm:init # Initialize LLM context system in a repo
```
