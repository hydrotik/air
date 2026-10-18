#!/usr/bin/env node
/**
 * AIr — Claude Code Hooks Installer
 *
 * Copies hook scripts and updates .claude/settings.json to wire up AIr telemetry.
 *
 * Usage:
 *   npx air-install-claude-code        # install in current project
 *   node install.cjs                   # run directly
 *
 * Everything here is CommonJS with a .cjs extension, so it runs the same whether
 * or not the project it is installed into declares "type": "module".
 */

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const hooksDir = path.join(projectRoot, '.claude', 'hooks');
const settingsPath = path.join(projectRoot, '.claude', 'settings.json');

// Ensure .claude/hooks exists
fs.mkdirSync(hooksDir, { recursive: true });

// Copy hook scripts
const srcDir = __dirname;
const hooks = ['session-start.cjs', 'post-tool-use.cjs'];

for (const hook of hooks) {
  const src = path.join(srcDir, hook);
  const dest = path.join(hooksDir, `air-${hook}`);
  fs.copyFileSync(src, dest);
  console.log(`  ✓ Copied ${hook} → .claude/hooks/air-${hook}`);
}

// Update settings.json
let settings = {};
if (fs.existsSync(settingsPath)) {
  settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
}

if (!settings.hooks) settings.hooks = {};

// Earlier versions installed the hooks as .js, which Node reads as ESM in a
// "type": "module" project; point any such entry at the .cjs copies above.
for (const entries of Object.values(settings.hooks)) {
  for (const entry of Array.isArray(entries) ? entries : []) {
    for (const hook of entry.hooks ?? []) {
      if (typeof hook.command === 'string') {
        hook.command = hook.command.replace(
          /(\.claude\/hooks\/air-(?:session-start|post-tool-use))\.js\b/,
          '$1.cjs'
        );
      }
    }
  }
}

// Add SessionStart hook
const sessionStartHook = {
  hooks: [{ type: 'command', command: 'node .claude/hooks/air-session-start.cjs' }],
};
if (!settings.hooks.SessionStart) {
  settings.hooks.SessionStart = [sessionStartHook];
} else {
  const existing = settings.hooks.SessionStart;
  const alreadyInstalled = existing.some((h) =>
    h.hooks?.some((hh) => hh.command?.includes('air-session-start'))
  );
  if (!alreadyInstalled) {
    existing.push(sessionStartHook);
  }
}

// Add PostToolUse hook
const postToolHook = {
  hooks: [{ type: 'command', command: 'node .claude/hooks/air-post-tool-use.cjs' }],
};
if (!settings.hooks.PostToolUse) {
  settings.hooks.PostToolUse = [postToolHook];
} else {
  const existing = settings.hooks.PostToolUse;
  const alreadyInstalled = existing.some((h) =>
    h.hooks?.some((hh) => hh.command?.includes('air-post-tool-use'))
  );
  if (!alreadyInstalled) {
    existing.push(postToolHook);
  }
}

fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
console.log(`  ✓ Updated .claude/settings.json`);

console.log(`
  ⚡ AIr hooks installed for Claude Code!

  Start the server:  npx air
  Dashboard:         http://localhost:5200
`);
