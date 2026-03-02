# Publishing Guide

## @hydrotik/air → npm + GitHub Packages

### Prerequisites (one-time setup)
- npm account with 2FA enabled (passkey/Touch ID works): `npm profile get`
- `@hydrotik` npm org created at npmjs.com
- `NPM_TOKEN` secret in `hydrotik/hydrotik` repo (granular token with bypass 2FA, `write` on `@hydrotik/air`)
- `AIR_DEPLOY_KEY` secret for subtree sync to `hydrotik/air` public repo

### Quick Publish (after making changes)

```bash
# 1. Build + test
pnpm turbo run build --filter=@hydrotik/air
cd packages/hy-ai-rum && pnpm run test

# 2. Bump version
npm version patch   # or minor / major

# 3. Login (2-hour session) and publish
npm login
npm publish --access public
# → browser opens for passkey/Touch ID auth

# 4. Commit, tag, push
cd ../..
git add -A
git commit --no-verify -m "release(air): v$(node -p \"require('./packages/hy-ai-rum/package.json').version\")"
VERSION=$(node -p "require('./packages/hy-ai-rum/package.json').version")
git tag "air-v$VERSION"
git push origin main --tags

# 5. Sync to public repo
git subtree push --prefix=packages/hy-ai-rum air-public main
```

### CI Publish (automated)

The GitHub Actions workflow `publish-air.yml` handles everything:

**Via manual dispatch:**
1. Go to **github.com/hydrotik/hydrotik → Actions → "Publish AIr to npm + GitHub Packages"**
2. Click **Run workflow** → select `patch` / `minor` / `major`
3. Workflow: bumps version → builds → tests → publishes to npm + GitHub Packages → commits → tags → syncs public repo

**Via tag push:**
```bash
git tag air-v0.2.0 && git push origin air-v0.2.0
```

### Dual Registry

| Registry | URL | Auth | Consumers |
|----------|-----|------|-----------|
| **npmjs.com** | `registry.npmjs.org` | `NPM_TOKEN` secret (CI) or session + passkey (local) | `npm install @hydrotik/air` |
| **GitHub Packages** | `npm.pkg.github.com` | `GITHUB_TOKEN` (CI, automatic) | `npm install @hydrotik/air --registry=https://npm.pkg.github.com` |

### npm 11 Auth Notes (Dec 2025 changes)

- Classic tokens are **permanently revoked** — cannot be used
- `npm login` creates a **2-hour session token** (stored in `~/.npmrc`)
- New packages **enforce 2FA by default** — passkey/Touch ID works via browser prompt
- Stale tokens in `~/.npmrc` will block fresh sessions — delete them if stuck
- `--otp` flag requires a TOTP authenticator app (passkey uses browser flow instead)
- For CI: create a **granular access token** at npmjs.com with "Bypass 2FA" enabled

### Subtree Sync (monorepo → public repo)

The `packages/hy-ai-rum/` directory is synced to `github.com/hydrotik/air` via:

1. **Post-commit hook** — automatic on any commit touching `packages/hy-ai-rum/**`
2. **GitHub Actions** — `sync-air.yml` triggers on push to main (belt and suspenders)
3. **Manual** — `git subtree push --prefix=packages/hy-ai-rum air-public main`

The public repo is the **consumer-facing** repo (README, issues, stars). The monorepo is the **source of truth**.

### Troubleshooting

**"Access token expired or revoked"**
Delete stale tokens: `sed -i '' '/_authToken/d' ~/.npmrc` then `npm login` again.

**403 Forbidden on publish**
Check: `npm profile get` — 2FA must be `auth-and-writes`. If using passkey, don't pass `--otp`.

**Session expires during build**
The `prepublishOnly` script runs build+test which can take time. Pre-build first, then login+publish.

**GitHub Packages publish fails**
The workflow uses `GITHUB_TOKEN` which has automatic `packages: write` permission. No extra setup needed.
