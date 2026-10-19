#!/usr/bin/env node
/**
 * check-clean.mjs — what this repository must never contain, checked on every push and PR.
 *
 *   node scripts/check-clean.mjs [--all] [--require-terms] [--path <dir>]
 *
 * By default it checks tracked files (git ls-files); --all checks every file on disk, and --path
 * checks a directory instead of the repository (the release workflow scans the packed tarball and
 * the dashboard archive this way).
 *
 * Fails (exit 1) on:
 *   - images, fonts and binaries, except the screenshots listed in ALLOWED_FILES
 *   - build output, coverage, local databases, environment files
 *   - absolute home-directory paths
 *   - paths from a design-system monorepo's package layout (`forbiddenPaths`): the dashboard
 *     compiles against one, and its layout must not leak into this repository
 *   - a denylist of names that must not appear, matched case-insensitively on word boundaries.
 *     The list is never committed or uploaded (it would publish the names): it lives in a
 *     git-ignored `.clean-terms` file on the maintainer's machine (or AIR_CLEAN_TERMS,
 *     comma-separated), and the pre-push hook (.githooks/pre-push) runs this check with
 *     `--require-terms` before every push. CI runs it without the denylist.
 * Binary-looking files and lockfiles are skipped for the text checks.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('..', import.meta.url));
const pathArg = process.argv.indexOf('--path');
const root = pathArg > 0 ? resolve(process.argv[pathArg + 1] ?? '.') : repo;
const scanDir = pathArg > 0;

const ALLOWED_FILES = new Set(['docs/dashboard.png']);
const FORBIDDEN_FILES = [
  /\.(png|jpe?g|gif|webp|avif|bmp|ico|woff2?|ttf|otf|wasm)$/i,
  /\.(db|sqlite|sqlite3)(-wal|-shm|-journal)?$/i,
  /(^|\/)(coverage|\.desloppify|\.turbo)\//,
  /(^|\/)\.DS_Store$/,
  /(^|\/)\.env/,
];
// Build output may not be committed; a scanned tarball is nothing but build output.
if (!scanDir) FORBIDDEN_FILES.push(/(^|\/)dist\//);
const forbiddenPaths = [/\bpackages\/hy-[a-z]/, /\bapps\/hy-[a-z]/];
const HOME = /(?:^|[\s"'`(=])\/(?:Users|home)\/[A-Za-z0-9._-]+\//;
const SKIP_TEXT = /(^|\/)pnpm-lock\.yaml$|\.(png|jpe?g|gif|webp|ico|woff2?|ttf|otf|wasm)$/i;
/** Files that describe these rules and so must name the patterns. */
const SELF = new Set(['scripts/check-clean.mjs', '.gitignore', '.clean-terms']);

function files() {
  if (scanDir || process.argv.includes('--all') || !existsSync(join(repo, '.git'))) {
    const out = [];
    const walk = (d) => {
      for (const e of readdirSync(d, { withFileTypes: true })) {
        if (['node_modules', '.git'].includes(e.name)) continue;
        const p = join(d, e.name);
        if (e.isDirectory()) walk(p);
        else out.push(relative(root, p).split('\\').join('/'));
      }
    };
    walk(root);
    return out;
  }
  return execFileSync('git', ['ls-files', '-z'], { cwd: repo, encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);
}

function terms() {
  const list = (process.env.AIR_CLEAN_TERMS ?? '').split(',');
  const f = join(repo, '.clean-terms');
  if (existsSync(f)) list.push(...readFileSync(f, 'utf8').split(/\r?\n/));
  return [...new Set(list.map((t) => t.trim()).filter((t) => t && !t.startsWith('#')))];
}

if (process.argv.includes('--require-terms') && !terms().length) {
  console.error(
    '[check-clean] no denylist: create .clean-terms (one name per line) before pushing'
  );
  process.exit(1);
}

const problems = [];
const denylist = terms().map(
  (t) => new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
);
for (const f of files()) {
  if (ALLOWED_FILES.has(f)) continue;
  if (FORBIDDEN_FILES.some((re) => re.test(f))) {
    problems.push(`${f}: this kind of file stays out of the repository`);
    continue;
  }
  if (SELF.has(f) || SKIP_TEXT.test(f)) continue;
  let text;
  try {
    if (statSync(join(root, f)).size > 8 * 1024 * 1024) continue;
    text = readFileSync(join(root, f), 'utf8');
  } catch {
    continue;
  }
  if (text.includes('\u0000')) continue; // binary
  text.split('\n').forEach((line, i) => {
    const at = `${f}:${i + 1}`;
    if (HOME.test(line)) problems.push(`${at}: absolute home path`);
    for (const re of forbiddenPaths)
      if (re.test(line)) problems.push(`${at}: a design-system monorepo path (${re.source})`);
    for (const re of denylist) if (re.test(line)) problems.push(`${at}: denylisted name`);
  });
}

if (problems.length) {
  console.error(`[check-clean] ${problems.length} problem(s):`);
  for (const p of problems.slice(0, 200)) console.error(`  ${p}`);
  process.exit(1);
}
console.log(
  `[check-clean] ok · ${
    denylist.length
      ? `${denylist.length} denylisted names checked`
      : "no denylist here (names are checked by the pre-push hook on the maintainer's machine)"
  }`
);
