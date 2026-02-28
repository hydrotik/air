---
description: "GSD: Verify work — user acceptance testing for a phase"
---
Load the GSD skill and execute verify-work.

Read `.claude/get-shit-done/workflows/verify-work.md` for the full workflow.

Phase to verify: $1

Execute the workflow:
1. Read the phase's ROADMAP entry and VERIFICATION.md
2. Extract testable deliverables (what the user should be able to do now)
3. Walk through each one at a time — ask the user to confirm yes/no
4. If something fails, diagnose and create fix plans
5. Write: `{phase}-UAT.md` to `.planning/`
