---
name: gsd
description: "GSD (Get Shit Done) — spec-driven development system. Project planning, phase execution, and verification. Use when the user says /gsd or asks to plan, execute, or verify project work. Commands: map-codebase, new-project, discuss-phase, plan-phase, execute-phase, verify-work, quick, progress, pause-work, resume-work, add-phase, add-todo, debug."
---

# GSD — Get Shit Done

A spec-driven development system adapted from [get-shit-done](https://github.com/gsd-build/get-shit-done) for pi.

## Overview

GSD provides structured project planning and execution:

1. **Map codebase** → Analyze existing code into structured documents
2. **New project** → Questions → Research → Requirements → Roadmap
3. **Discuss phase** → Capture implementation decisions before planning
4. **Plan phase** → Research + atomic task plans with verification steps
5. **Execute phase** → Implement plans with atomic commits
6. **Verify work** → User acceptance testing

All state lives in `.planning/` — tracked in git.

## Commands

### Core Workflow

| Command | What it does |
|---------|-------------|
| `/skill:gsd map-codebase` | Analyze existing codebase → `.planning/codebase/` (7 docs) |
| `/skill:gsd new-project` | Full init: questions → research → requirements → roadmap |
| `/skill:gsd discuss-phase N` | Capture implementation decisions before planning |
| `/skill:gsd plan-phase N` | Research + plan + verify for a phase |
| `/skill:gsd execute-phase N` | Execute all plans, verify when complete |
| `/skill:gsd verify-work N` | Manual user acceptance testing |
| `/skill:gsd quick` | Ad-hoc task with GSD guarantees (atomic commits) |

### Navigation & Management

| Command | What it does |
|---------|-------------|
| `/skill:gsd progress` | Where am I? What's next? |
| `/skill:gsd add-phase` | Append phase to roadmap |
| `/skill:gsd insert-phase N` | Insert urgent work between phases |
| `/skill:gsd remove-phase N` | Remove future phase |
| `/skill:gsd add-todo` | Capture idea for later |
| `/skill:gsd check-todos` | List pending todos |
| `/skill:gsd pause-work` | Create handoff for session break |
| `/skill:gsd resume-work` | Restore from last session |
| `/skill:gsd debug` | Systematic debugging with persistent state |
| `/skill:gsd complete-milestone` | Archive milestone, tag release |
| `/skill:gsd new-milestone` | Start next version |

## Execution Model (pi adaptation)

GSD was designed for Claude Code's `Task` subagent tool. In pi, we adapt:

- **No parallel subagents** — Execute plans sequentially (pi doesn't have `Task`)
- **Fresh context via `/compact`** — When context gets heavy, compact before next plan
- **Same guarantees** — Atomic commits, state tracking, verification steps
- **Same artifacts** — PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md, PLAN.md, SUMMARY.md

### How to execute a command

When the user invokes a GSD command, follow this process:

1. **Read the workflow file** from `.claude/get-shit-done/workflows/{command}.md`
2. **Read any referenced templates** from `.claude/get-shit-done/templates/`
3. **Read the agent prompt** from `.claude/agents/gsd-{agent}.md` if the workflow spawns agents
4. **Execute the workflow steps** sequentially, adapting any `Task()` calls to inline execution
5. **Write artifacts** to `.planning/` per the workflow instructions
6. **Commit** planning docs per GSD conventions: `docs({phase}): {description}`

### Adapting Task() calls

When a GSD workflow says to spawn a `Task(subagent_type="gsd-planner", ...)`:

1. Read the agent file: `.claude/agents/gsd-planner.md`
2. Read the prompt/template it references
3. Execute the agent's instructions inline (you ARE the agent)
4. Write the output files the agent would write
5. Continue to the next step in the workflow

### State Management

GSD tracks state in `.planning/STATE.md`. Before any command:
```bash
cat .planning/STATE.md 2>/dev/null
```

After any command that changes state, update STATE.md with:
- Current phase and status
- Decisions made
- Blockers or issues
- What's next

### Git Conventions

```
docs(init): initialize project planning
docs(01): research phase 1
docs(01-01): plan — {plan name}
feat(01-01): {task description}
docs(01): verify phase 1
```

## File Locations

| Path | Contents |
|------|----------|
| `.planning/PROJECT.md` | Project vision and scope |
| `.planning/REQUIREMENTS.md` | Scoped v1/v2 requirements |
| `.planning/ROADMAP.md` | Phases and progress |
| `.planning/STATE.md` | Current state, decisions, blockers |
| `.planning/codebase/` | 7 codebase mapping documents |
| `.planning/research/` | Research output per phase |
| `.planning/{N}-CONTEXT.md` | Phase discussion decisions |
| `.planning/{N}-RESEARCH.md` | Phase research findings |
| `.planning/{N}-{M}-PLAN.md` | Atomic task plans |
| `.planning/{N}-{M}-SUMMARY.md` | Execution summaries |
| `.planning/{N}-VERIFICATION.md` | Phase verification results |
| `.planning/{N}-UAT.md` | User acceptance test results |
| `.planning/quick/` | Quick mode plans and summaries |
| `.planning/todos/` | Captured ideas for later |

## References

For detailed workflow instructions, read:
- Workflow: `.claude/get-shit-done/workflows/{command}.md`
- Agent prompts: `.claude/agents/gsd-{agent}.md`
- Templates: `.claude/get-shit-done/templates/`
- Config: `.claude/get-shit-done/references/`
