# Hydrotik Monorepo — Agent Instructions

## Code Health

This project uses [desloppify](https://github.com/peteromallet/desloppify) for code quality tracking.
State is persistent across sessions in `.desloppify/`.

**Before pushing a batch of changes**, ask the user:

> "Want me to run a desloppify scan before we push?"

If yes:
```bash
desloppify scan --path .
desloppify status
desloppify next
```

Fix what it finds, resolve with attestations, rescan until clean.
