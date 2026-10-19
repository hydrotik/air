# Releasing

For maintainers. A release is a pushed tag `vX.Y.Z`. The `release` workflow
(`.github/workflows/release.yml`) builds the server, collects the dashboard and publishes
`@hydrotik/air` to npm with provenance. Nothing is published from a laptop, and no npm token is
stored anywhere.

## Versions

`packages/air/package.json` carries the version. Change it in a pull request, together with
`CHANGELOG.md`; the workflow never commits. After the pull request is merged, tag the merge commit:

```bash
git switch main && git pull
git tag v0.2.0 && git push origin v0.2.0
```

The workflow's first job fails the release if the tag (without the `v`) and
`packages/air/package.json` differ. A tag with a prerelease suffix (`v0.3.0-rc.1`) publishes under
the npm dist-tag `next`; any other tag publishes under `latest`.

The private `packages/dashboard` keeps version `0.0.0`: it is never published on its own.

## What the workflow does

1. **verify**: checks the version as above.
2. **test**: `check-clean`, build, tests and typecheck of `packages/air`.
3. **dashboard**: produces `packages/air/dist/dashboard/` (see below) and scans it with
   `check-clean --path`.
4. **publish**, in the `npm` environment: builds the server, adds the dashboard, packs the package
   and scans the unpacked tarball, then runs `npm publish --provenance --access public`. A version
   that is already on npm is skipped, so a failed run can be re-run and a dry run of a released
   version still checks everything.

Running the workflow by hand (`workflow_dispatch`) on a tag ref does the same. The `dry_run` input
runs `npm publish --dry-run`. A dry run may also run on a branch: with no tag to compare, it uses
the version in `packages/air/package.json`, and when no dashboard source is available it packs a
placeholder `index.html` (with a warning) instead of failing:

```bash
gh workflow run release.yml --ref <branch> -f dry_run=true
```

Run one on the release pull request's branch before merging it.

## The dashboard

The dashboard is built on `@hydrotik/design-system`, which is not published, so CI cannot always
build it. The dashboard job takes the first of these that is available, and fails with a message
naming all three if none is:

1. **The `AIR_DS_SOURCE` secret.** A git URL, credentials included, of the design-system
   monorepo. The job clones it (at the branch or tag in the `AIR_DS_REF` variable, if set),
   installs its dependencies and runs `pnpm build:dashboard`.
2. **The `dashboard_artifact_url` input** of a manual run: a URL of an `air-dashboard.tar.gz`.
3. **A release asset** named `air-dashboard.tar.gz` on the GitHub release for the tag.

For 2 and 3, build the dashboard locally, scan it with the denylist, and pack it:

```bash
pnpm install
pnpm build:dashboard          # with AIR_DS_SOURCE=<path to the design-system checkout>
node scripts/check-clean.mjs --require-terms --path packages/air/dist/dashboard
COPYFILE_DISABLE=1 tar czf air-dashboard.tar.gz -C packages/air/dist dashboard
```

The tarball must contain only a top-level `dashboard/` folder with `index.html` in it; the job
rejects anything else. (`COPYFILE_DISABLE=1` keeps macOS `._*` files out.)

Attach it when creating the release. Creating the release also creates and pushes the tag, which
starts the workflow:

```bash
gh release create v0.2.0 air-dashboard.tar.gz --target main --title v0.2.0 --notes-file <notes>
```

If the tag is already pushed and the dashboard job failed, upload the asset and re-run the failed
jobs:

```bash
gh release upload v0.2.0 air-dashboard.tar.gz
gh run rerun <run id> --failed
```

## npm: trusted publishing

The publish job's GitHub OIDC identity is exchanged for a short-lived publish token (npm 11.5.1 or
later, `id-token: write`). On npmjs.com, `@hydrotik/air` → _Settings_:

- **Trusted Publisher**: GitHub Actions, organization or user `hydrotik`, repository `air`,
  workflow filename `release.yml`, environment `npm`. Under _Allowed actions_, tick
  **Direct npm publish**.
- **Publishing access**: _Require two-factor authentication and disallow tokens_.

npm checks that `repository.url` in `packages/air/package.json` matches the repository the
workflow runs in (`https://github.com/hydrotik/air`).

The `npm` environment (_Settings → Environments_ on GitHub) holds no secrets. Add required
reviewers to hold each release for approval before anything is published.

If the first publish after setting up the trusted publisher fails with `ENEEDAUTH`, re-run the
failed job (`gh run rerun <run id> --failed`); it has succeeded on the second attempt before.

## The denylist

`scripts/check-clean.mjs` runs in CI without names. The names that must never appear live only in
a git-ignored `.clean-terms` file (one per line) on the maintainer's machine; the pre-push hook
runs the check with them. Enable the hook once per clone:

```bash
git config core.hooksPath .githooks
```
