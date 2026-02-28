---
description: "GSD: Plan phase — research + create atomic task plans + verify"
---
Load the GSD skill and execute plan-phase.

Read `.claude/get-shit-done/workflows/plan-phase.md` for the full workflow.
Read `.claude/agents/gsd-planner.md` for the planner agent prompt.
Read `.claude/agents/gsd-plan-checker.md` for the checker agent prompt.
Read `.planning/ROADMAP.md`, `.planning/STATE.md`, and `.planning/{phase}-CONTEXT.md` if they exist.

Phase to plan: $1

Execute the workflow:
1. Research how to implement this phase (guided by CONTEXT.md decisions)
2. Create 2-3 atomic task plans with XML structure (action, files, verify, done)
3. Verify plans against requirements
4. Write: `{phase}-RESEARCH.md`, `{phase}-{N}-PLAN.md` to `.planning/`
