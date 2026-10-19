/**
 * Where the design system lives. The dashboard is built on @hydrotik/design-system, which is not
 * published: AIR_DS_SOURCE points at a checkout of the monorepo that contains it, and this finds
 * the design system, its tokens and its theme provider there by package name.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

export function designSystem() {
  const source = process.env.AIR_DS_SOURCE;
  if (!source || !existsSync(source)) {
    throw new Error(
      'set AIR_DS_SOURCE to a checkout of the design-system monorepo (see docs/releasing.md)'
    );
  }
  const pkgs = {};
  for (const group of ['packages', 'apps']) {
    const dir = path.join(source, group);
    if (!existsSync(dir)) continue;
    for (const d of readdirSync(dir, { withFileTypes: true })) {
      const pj = path.join(dir, d.name, 'package.json');
      if (!d.isDirectory() || !existsSync(pj)) continue;
      try {
        pkgs[JSON.parse(readFileSync(pj, 'utf8')).name] = path.join(dir, d.name);
      } catch {
        // not a package
      }
    }
  }
  const need = (name) => {
    if (!pkgs[name]) throw new Error(`${name} not found in ${source}`);
    return pkgs[name];
  };
  return {
    source,
    designSystem: need('@hydrotik/design-system'),
    tokens: need('@hydrotik/tokens'),
    themeProvider: need('@hydrotik/theme-provider'),
  };
}
