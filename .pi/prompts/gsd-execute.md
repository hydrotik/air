---
description: "GSD: Execute phase — implement all plans with atomic commits"
---
Load the GSD skill and execute execute-phase.

Read `.claude/get-shit-done/workflows/execute-phase.md` for the full workflow.
Read `.claude/agents/gsd-executor.md` for the executor agent prompt.

Phase to execute: $1

Execute the workflow:
1. Read all `{phase}-{N}-PLAN.md` files from `.planning/`
2. Execute each plan sequentially (pi doesn't have parallel subagents)
3. For each task in each plan: implement, verify, atomic git commit
4. After all plans: verify phase goals are met
5. Write: `{phase}-{N}-SUMMARY.md`, `{phase}-VERIFICATION.md` to `.planning/`

Git commit format: `feat({phase}-{plan}): {task description}`
