#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  statSync,
  mkdirSync,
} from 'node:fs';
import { join, resolve, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const MONO_ROOT = resolve(__dirname, '..', '..', '..');
const RAG_DIR = join(MONO_ROOT, 'packages/hy-design-mcp');
const RAG_STORE_PATH = join(RAG_DIR, 'rag-store.json');

function safeRead(path: string): string | null {
  try {
    return readFileSync(path, 'utf-8');
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// RAG STORE — chunk-based knowledge base with TF-IDF search
// ═══════════════════════════════════════════════════════════════════════════

interface RagChunk {
  id: string;
  category: string; // tokens | conventions | components | architecture | docs
  title: string;
  content: string;
  tags: string[];
  source: string; // file path or "static"
  hash: string; // content hash for dedup / change detection
  updatedAt: string;
}

interface RagStore {
  version: number;
  syncedAt: string;
  chunks: RagChunk[];
}

function loadRagStore(): RagStore {
  if (existsSync(RAG_STORE_PATH)) {
    try {
      return JSON.parse(readFileSync(RAG_STORE_PATH, 'utf-8'));
    } catch {
      // corrupt — recreate
    }
  }
  return { version: 1, syncedAt: '', chunks: [] };
}

function saveRagStore(store: RagStore): void {
  mkdirSync(dirname(RAG_STORE_PATH), { recursive: true });
  writeFileSync(RAG_STORE_PATH, JSON.stringify(store, null, 2));
}

function contentHash(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

function makeChunk(
  category: string,
  title: string,
  content: string,
  tags: string[],
  source: string,
): RagChunk {
  return {
    id: `${category}::${title.toLowerCase().replace(/\s+/g, '-')}`,
    category,
    title,
    content,
    tags,
    source,
    hash: contentHash(content),
    updatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// TF-IDF search (no external deps)
// ---------------------------------------------------------------------------
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_.\-/]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function tfidfSearch(query: string, chunks: RagChunk[], topK = 8): RagChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return chunks.slice(0, topK);

  // Build document frequencies
  const df: Record<string, number> = {};
  const chunkTokenSets = chunks.map((c) => {
    const tokens = new Set(tokenize(`${c.title} ${c.tags.join(' ')} ${c.content}`));
    for (const t of tokens) df[t] = (df[t] ?? 0) + 1;
    return tokens;
  });

  const N = chunks.length || 1;

  // Score each chunk
  const scored = chunks.map((chunk, i) => {
    const tokenSet = chunkTokenSets[i]!;
    let score = 0;
    for (const qt of queryTokens) {
      if (tokenSet.has(qt)) {
        const idf = Math.log(N / (df[qt] ?? 1));
        score += idf;
      }
      // Partial match bonus (prefix)
      for (const dt of tokenSet) {
        if (dt.startsWith(qt) && dt !== qt) {
          score += 0.3 * Math.log(N / (df[dt] ?? 1));
        }
      }
    }
    // Boost title & tag matches
    const titleLower = chunk.title.toLowerCase();
    const tagStr = chunk.tags.join(' ').toLowerCase();
    for (const qt of queryTokens) {
      if (titleLower.includes(qt)) score += 2;
      if (tagStr.includes(qt)) score += 1.5;
    }
    return { chunk, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((s) => s.score > 0)
    .map((s) => s.chunk);
}

// ═══════════════════════════════════════════════════════════════════════════
// SYNC — builds the RAG store from live repo state
// ═══════════════════════════════════════════════════════════════════════════

function syncRagStore(): { added: number; updated: number; total: number } {
  const store = loadRagStore();
  const existingById = new Map(store.chunks.map((c) => [c.id, c]));
  const newChunks: RagChunk[] = [];
  let added = 0;
  let updated = 0;

  function upsert(chunk: RagChunk) {
    const existing = existingById.get(chunk.id);
    if (!existing) {
      added++;
    } else if (existing.hash !== chunk.hash) {
      updated++;
    }
    newChunks.push(chunk);
  }

  // ── 1. Component file conventions ──────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Component File Structure',
      `# Component File Structure Convention

Every component lives in its own folder under \`packages/hy-design-system/src/components/\`.
The folder name is the PascalCase component name (e.g. \`Button/\`, \`Dialog/\`).

## Required files per component:

\`\`\`
ComponentName/
├── ComponentName.tsx            # React component (forwardRef)
├── ComponentName.styles.ts      # vanilla-extract styles (recipe + style)
├── ComponentName.jest.tsx       # Tests: Jest + Testing Library + jest-axe
├── ComponentName.stories.tsx    # Storybook stories
└── index.ts                     # Barrel re-exports
\`\`\`

## Rules:
- The folder name MUST match the component name exactly (PascalCase)
- Style file extension is \`.styles.ts\` (NOT \`.css.ts\`)
- Test file extension is \`.jest.tsx\` (NOT \`.test.tsx\`)
- Stories file extension is \`.stories.tsx\`
- The \`index.ts\` re-exports the component and its types
- Every component is exported from the package barrel at \`src/index.ts\`
`,
      ['component', 'file', 'structure', 'convention', 'folder', 'naming', 'styles', 'jest', 'stories'],
      'static',
    ),
  );

  // ── 2. Component authoring conventions ─────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Component Authoring Rules',
      `# Component Authoring Rules

1. **Always use \`React.forwardRef\`** — every component forwards refs
2. **Accept \`className\` prop** — merge: \`[recipe(), className].filter(Boolean).join(' ')\`
3. **Spread remaining props** via \`...props\` on the root element
4. **Set \`displayName\`** — \`ComponentName.displayName = 'ComponentName'\`
5. **Export the props interface** alongside the component
6. **Import tokens** — \`import { vars } from '@hydrotik/tokens'\`
7. **No hardcoded values** — all colors, spacing, radii, shadows, fonts, motion come from \`vars.*\`
`,
      ['component', 'react', 'forwardRef', 'className', 'displayName', 'props', 'authoring'],
      'static',
    ),
  );

  // ── 3. Styling conventions ─────────────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Styling Conventions',
      `# Styling Conventions

## Tech Stack
- **vanilla-extract** CSS-in-TypeScript — statically extracted at build time
- **No Tailwind**, no runtime CSS injection, no CSS modules
- **@vanilla-extract/recipes** for variant-based components
- **@vanilla-extract/css** \`style()\` for single-class styles

## Style File Pattern (\`.styles.ts\`)
\`\`\`ts
import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const myRecipe = recipe({
  base: { /* token-only values */ },
  variants: { variant: { ... }, size: { ... } },
  defaultVariants: { variant: 'primary', size: 'md' },
});
\`\`\`

## vanilla-extract Rules
- \`style()\` selectors can ONLY target \`&\` (self) — never children
- For child selectors: \`globalStyle(\\\`\${parentClass} child\\\`, { ... })\`
- \`globalStyle\` cannot be nested inside top-level \`@media\`
- Use \`@media\` within a \`style()\` block instead

## Token Usage
\`\`\`ts
// ✅ CORRECT
backgroundColor: vars.color.surface
padding: vars.space['4']
borderRadius: vars.radii.md
fontSize: vars.font.size.sm
transition: \\\`color \${vars.motion.duration.fast} \${vars.motion.easing.default}\\\`

// ❌ WRONG — never
backgroundColor: '#17181c'
padding: '1rem'
borderRadius: '6px'
\`\`\`
`,
      ['styling', 'vanilla-extract', 'css', 'recipe', 'style', 'tokens', 'vars', 'convention'],
      'static',
    ),
  );

  // ── 4. Focus & accessibility ───────────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Accessibility Conventions',
      `# Accessibility Conventions

- All interactive elements MUST have \`:focus-visible\` styles
- Focus ring: \`outline: 2px solid \${vars.color.focusRing}, outlineOffset: '2px'\`
- Disabled: \`opacity: '0.45', cursor: 'not-allowed', pointerEvents: 'none'\`
- Tests MUST include: \`expect(await axe(container)).toHaveNoViolations()\`
- Use Radix UI primitives for built-in keyboard/screen reader support
`,
      ['accessibility', 'a11y', 'focus', 'disabled', 'axe', 'keyboard', 'screen-reader'],
      'static',
    ),
  );

  // ── 5. Theming ─────────────────────────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Theming',
      `# Theming

- Dark theme is the **default**
- Themes switch via CSS class on \`<html>\` + \`data-theme\` attribute
- \`ThemeProvider\` manages theme state via React context
- \`ThemeScript\` prevents FOUC in SSR (reads \`localStorage.theme\` before paint)
- All \`vars.*\` tokens auto-update when the class changes — no JS re-render needed
- Import: \`import { ThemeProvider, useTheme, ThemeScript } from '@hydrotik/theme-provider'\`
`,
      ['theme', 'dark', 'light', 'ThemeProvider', 'useTheme', 'ThemeScript', 'FOUC'],
      'static',
    ),
  );

  // ── 6. Package references ──────────────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Package Imports',
      `# Package Import References

- Tokens: \`import { vars } from '@hydrotik/tokens'\`
- Theme: \`import { ThemeProvider, useTheme, ThemeScript } from '@hydrotik/theme-provider'\`
- Components: \`import { Button, Card, Dialog, ... } from '@hydrotik/design-system'\`
- Package dir: \`packages/hy-<name>/\`
- package.json name: \`@hydrotik/<name>\`
- pnpm filter: \`--filter @hydrotik/<name>\`
`,
      ['import', 'package', 'hydrotik', 'tokens', 'theme-provider', 'design-system'],
      'static',
    ),
  );

  // ── 7. Variant patterns ────────────────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Variant Patterns',
      `# Variant Patterns

Use \`recipe()\` with \`base\`, \`variants\`, \`defaultVariants\`.

Common variant axes:
- **variant** — visual style (primary, secondary, outline, ghost, destructive)
- **size** — sm | md | lg

Button variants: primary, secondary, outline, ghost, destructive
Badge variants: default, primary, success, warning, error
FieldMessage variants: default, error, success
Toast variants: default, success, error, warning
`,
      ['variant', 'recipe', 'primary', 'secondary', 'ghost', 'destructive', 'size'],
      'static',
    ),
  );

  // ── 8. Sync tokens from live source ────────────────────────────────────
  const contractSrc = safeRead(join(MONO_ROOT, 'packages/hy-tokens/src/contract.css.ts'));
  if (contractSrc) {
    upsert(
      makeChunk(
        'tokens',
        'Token Contract',
        `# Token Contract (contract.css.ts)\n\nThis defines the shape of all CSS variables. Every theme must satisfy this.\n\n\`\`\`ts\n${contractSrc}\n\`\`\``,
        ['contract', 'createThemeContract', 'vars', 'css-variables', 'token'],
        'packages/hy-tokens/src/contract.css.ts',
      ),
    );
  }

  const darkSrc = safeRead(join(MONO_ROOT, 'packages/hy-tokens/src/dark.css.ts'));
  if (darkSrc) {
    upsert(
      makeChunk(
        'tokens',
        'Dark Theme Values',
        `# Dark Theme (dark.css.ts)\n\n\`\`\`ts\n${darkSrc}\n\`\`\``,
        ['dark', 'theme', 'color', 'token', 'values'],
        'packages/hy-tokens/src/dark.css.ts',
      ),
    );
  }

  const lightSrc = safeRead(join(MONO_ROOT, 'packages/hy-tokens/src/light.css.ts'));
  if (lightSrc) {
    upsert(
      makeChunk(
        'tokens',
        'Light Theme Values',
        `# Light Theme (light.css.ts)\n\n\`\`\`ts\n${lightSrc}\n\`\`\``,
        ['light', 'theme', 'color', 'token', 'values'],
        'packages/hy-tokens/src/light.css.ts',
      ),
    );
  }

  // ── 9. Sync component info from live filesystem ────────────────────────
  const componentsDir = join(MONO_ROOT, 'packages/hy-design-system/src/components');
  try {
    const componentDirs = readdirSync(componentsDir).filter((name) =>
      statSync(join(componentsDir, name)).isDirectory(),
    );

    for (const name of componentDirs) {
      const dir = join(componentsDir, name);
      const files = readdirSync(dir);

      // Read the main .tsx file for quick summary
      const mainFile =
        files.find((f) => f === `${name}.tsx`) ?? files.find((f) => f.endsWith('.tsx') && !f.includes('test') && !f.includes('jest') && !f.includes('stories'));
      const mainSrc = mainFile ? safeRead(join(dir, mainFile)) : null;

      // Read the styles file
      const styleFile =
        files.find((f) => f === `${name}.styles.ts`) ??
        files.find((f) => f === `${name}.css.ts`) ??
        files.find((f) => f.endsWith('.styles.ts') || f.endsWith('.css.ts'));
      const styleSrc = styleFile ? safeRead(join(dir, styleFile)) : null;

      let content = `# ${name} Component\n\nFiles: ${files.join(', ')}\n`;
      if (mainSrc) content += `\n## Component Source\n\`\`\`tsx\n${mainSrc}\n\`\`\`\n`;
      if (styleSrc) content += `\n## Styles Source\n\`\`\`ts\n${styleSrc}\n\`\`\`\n`;

      const tags = [
        'component',
        name.toLowerCase(),
        ...(mainSrc?.includes('forwardRef') ? ['forwardRef'] : []),
        ...(mainSrc?.includes('radix') || mainSrc?.includes('@radix-ui') ? ['radix'] : []),
        ...(styleSrc?.includes('recipe') ? ['recipe', 'variants'] : []),
      ];

      upsert(
        makeChunk(
          'components',
          `Component: ${name}`,
          content,
          tags,
          `packages/hy-design-system/src/components/${name}/`,
        ),
      );
    }
  } catch {
    // components dir doesn't exist yet
  }

  // ── 10. Sync documentation markdown files ──────────────────────────────
  const docsDir = join(MONO_ROOT, 'docs');
  try {
    const docFiles = readdirSync(docsDir).filter((f) => f.endsWith('.md'));
    for (const file of docFiles) {
      const content = safeRead(join(docsDir, file));
      if (!content) continue;
      const title = file.replace('.md', '');
      upsert(
        makeChunk(
          'docs',
          `Doc: ${title}`,
          content,
          ['documentation', title.toLowerCase(), ...tokenize(title)],
          `docs/${file}`,
        ),
      );
    }
  } catch {
    // docs dir doesn't exist
  }

  // ── 11. Architecture basics ────────────────────────────────────────────
  upsert(
    makeChunk(
      'architecture',
      'Monorepo Architecture',
      `# Monorepo Architecture

- **pnpm** 10.30.3 + **Turborepo** 2.8.11 + **TypeScript** ~5.9.3 + **Node.js** ≥ 20
- Library builds via **tsdown** → ESM + CJS dual output with TypeScript declarations
- vanilla-extract Vite plugin processes \`.styles.ts\` files at build time
- External: react, react-dom, @radix-ui/*

## Dependency graph
\`\`\`
hy-tokens → vanilla-extract
hy-theme-provider → hy-tokens + React
hy-design-system → hy-tokens + Radix UI + vanilla-extract + React
hy-storybook → hy-design-system + hy-theme-provider + hy-tokens
\`\`\`

## Key commands (always use \`pnpm turbo run\`)
- \`pnpm turbo run build\` — build all (topo order)
- \`pnpm turbo run dev --filter=@hydrotik/component-preview\` — Kitchen sink (port 3100)
- \`pnpm turbo run dev --filter=@hydrotik/storybook\` — Storybook (port 6006)
- \`pnpm turbo run typecheck\` / \`pnpm turbo run test\` / \`pnpm turbo run lint\`
`,
      ['architecture', 'monorepo', 'pnpm', 'turborepo', 'tsdown', 'build', 'dependency'],
      'static',
    ),
  );

  // ── 12. Testing conventions ────────────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Testing Conventions',
      `# Testing Conventions

- **Jest 30** + **jsdom** + **Testing Library 16** + **jest-axe**
- Test files live alongside components: \`ComponentName/ComponentName.jest.tsx\`
- File extension: \`.jest.tsx\` (NOT \`.test.tsx\`)

## Test template:
\`\`\`tsx
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders content', () => {
    render(<MyComponent>Hello</MyComponent>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<MyComponent>Hello</MyComponent>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
\`\`\`
`,
      ['testing', 'jest', 'testing-library', 'axe', 'accessibility', 'test'],
      'static',
    ),
  );

  // ── 13. Fonts & Icons ──────────────────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Fonts and Icons',
      `# Fonts & Icons

## Fonts
Both fonts are bundled via \`@fontsource-variable\` — no external CDN.
Loaded automatically by importing the global styles:
\`\`\`ts
import '@hydrotik/design-system/src/global.css';
\`\`\`

| Font | Token | Package |
|---|---|---|
| **Inter Variable** (sans) | \`vars.font.family.sans\` | \`@fontsource-variable/inter\` |
| **JetBrains Mono Variable** (mono) | \`vars.font.family.mono\` | \`@fontsource-variable/jetbrains-mono\` |

## Icons
All [Lucide](https://lucide.dev) icons are available via re-export:
\`\`\`tsx
import { Icons } from '@hydrotik/design-system';

<Icons.Search size={16} />
<Icons.ChevronDown />
<Icons.Settings />
<Icons.X />
\`\`\`

Common icons used in the design system:
- Close buttons: \`Icons.X\`
- Chevrons: \`Icons.ChevronDown\`, \`Icons.ChevronRight\`, \`Icons.ChevronLeft\`
- Search: \`Icons.Search\`
- Loading: use the \`<Spinner />\` component instead
- Check: \`Icons.Check\`
- Info/Warning/Error: \`Icons.Info\`, \`Icons.AlertTriangle\`, \`Icons.AlertCircle\`
`,
      ['fonts', 'icons', 'inter', 'jetbrains-mono', 'lucide', 'fontsource', 'typography'],
      'static',
    ),
  );

  // ── 14. Component catalog summary ──────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Component Catalog',
      `# Component Catalog — 42 Components

## Layout & Structure
- AspectRatio, Card, Separator, ScrollArea, Collapsible, Skeleton

## Typography & Display
- Typography (H1–H4, P, Lead, Large, Small, Muted, InlineCode, Blockquote, Ul, Ol, Hr)
- Badge, Kbd, Spinner, Avatar

## Form Controls
- Button, Input, Textarea, Checkbox, RadioGroup, Switch, Slider
- Select, Toggle, ToggleGroup, Label, FieldMessage, Progress

## Overlays & Dialogs
- Dialog, AlertDialog, Sheet (slide-in panel, 4 sides)
- Popover, HoverCard, Tooltip, Toast

## Navigation
- Tabs, Accordion, Breadcrumb, Pagination, NavigationMenu

## Menus
- DropdownMenu, ContextMenu, Menubar, Command

## Data Display
- Table, Alert

All components:
- Built on Radix UI primitives (where applicable)
- Styled with vanilla-extract + \`vars.*\` design tokens
- Dark mode first
- \`React.forwardRef\`, \`className\` merge, \`displayName\`
- Exported from \`@hydrotik/design-system\`
`,
      ['catalog', 'components', 'list', 'all', 'inventory', '42'],
      'static',
    ),
  );

  // ── 15. Radix re-export convention ─────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Radix Re-export Convention',
      `# Radix Primitive Re-export Convention

When re-exporting Radix primitives directly (without wrapping in forwardRef),
you MUST add a \`typeof\` annotation to prevent DTS build errors:

\`\`\`ts
// ✅ CORRECT — typeof annotation
export const Dialog: typeof DialogPrimitive.Root = DialogPrimitive.Root;
export const DialogTrigger: typeof DialogPrimitive.Trigger = DialogPrimitive.Trigger;

// ❌ WRONG — will fail DTS generation
export const Dialog = DialogPrimitive.Root;
\`\`\`

This is required because tsdown/rolldown cannot infer the type without a reference
to the internal Radix context module, which isn't portable.
`,
      ['radix', 'typeof', 'export', 'primitive', 'dts', 'convention'],
      'static',
    ),
  );

  // ── 16. Turborepo CLI Conventions ──────────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Turborepo CLI Conventions',
      `# Turborepo CLI Conventions

## Standard command format

Always use \`pnpm turbo run\` with \`--filter\` for task execution:

\`\`\`bash
pnpm turbo run <task> --filter=@hydrotik/<package-name>
\`\`\`

### Common commands
\`\`\`bash
# Dev servers
pnpm turbo run dev --filter=@hydrotik/component-preview   # Kitchen sink — port 3100
pnpm turbo run dev --filter=@hydrotik/storybook            # Storybook — port 6006
pnpm turbo run dev --filter=@hydrotik/bff-fastify          # BFF API — port 4000

# Build
pnpm turbo run build                                       # Build everything (topo order)
pnpm turbo run build --filter=@hydrotik/design-system      # Build single package
pnpm turbo run build --filter=@hydrotik/tokens...          # Build package + its deps

# Quality
pnpm turbo run typecheck                                   # Typecheck all
pnpm turbo run test --filter=@hydrotik/design-system       # Test single package
pnpm turbo run lint                                        # Lint all
\`\`\`

### Rules
- **Never use \`pnpm --filter\`** for running tasks — always \`pnpm turbo run\`
- Turbo handles dependency ordering (\`dependsOn: ["^build"]\`)
- Dev tasks are \`persistent: true\` and \`cache: false\` in turbo.json
- Build outputs are cached: \`dist/**\`, \`build/**\`, \`storybook-static/**\`
`,
      ['turborepo', 'turbo', 'cli', 'pnpm', 'filter', 'dev', 'build', 'command', 'convention'],
      'static',
    ),
  );

  // ── 17. Centralized Port Configuration ────────────────────────────────
  upsert(
    makeChunk(
      'architecture',
      'Port Configuration',
      `# Centralized Port Configuration

All dev server ports are managed in \`@hydrotik/config\` (\`packages/hy-config/\`).

## Port assignments
| App                  | Port | Constant                 |
|----------------------|------|--------------------------|
| Component Preview    | 3100 | \`ports.componentPreview\` |
| BFF Fastify          | 4000 | \`ports.bffFastify\`       |
| Design MCP           | 5100 | \`ports.designMcp\`        |
| Storybook            | 6006 | \`ports.storybook\`        |

## Port ranges (convention)
- **3000–3099** — Frontend apps
- **4000–4099** — Backend services / BFFs
- **5000–5099** — Tooling (MCP, etc.)
- **6000–6099** — Documentation / Storybook

## Usage in Vite configs
\`\`\`ts
import { ports } from '@hydrotik/config/ports';

export default defineConfig({
  server: { port: ports.componentPreview },
});
\`\`\`

Note: \`@hydrotik/config/ports\` exports CJS (\`ports.cjs\`) for Node/Vite config
compatibility, plus TypeScript source for app code.
`,
      ['port', 'config', 'vite', 'server', 'dev', 'architecture', 'convention'],
      'static',
    ),
  );

  // ── 18. Vite Source Aliases Convention ─────────────────────────────────
  upsert(
    makeChunk(
      'conventions',
      'Vite Source Aliases',
      `# Vite Source Aliases Convention

Any Vite-based app that imports from \`@hydrotik/design-system\`, \`@hydrotik/tokens\`,
or \`@hydrotik/theme-provider\` **must** alias those packages to their \`src/\` directories.
This is required so the vanilla-extract Vite plugin can process \`.css.ts\` files directly.

Without these aliases, Vite imports the pre-built \`dist/\` which contains raw
\`createVar()\` / \`createThemeContract()\` calls that fail outside a VE file scope.

## Required vite.config.ts pattern
\`\`\`ts
import path from 'path';

const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  resolve: {
    alias: {
      '@hydrotik/design-system': path.resolve(workspaceRoot, 'packages/hy-design-system/src'),
      '@hydrotik/tokens': path.resolve(workspaceRoot, 'packages/hy-tokens/src'),
      '@hydrotik/theme-provider': path.resolve(workspaceRoot, 'packages/hy-theme-provider/src'),
    },
  },
  server: {
    fs: { allow: [workspaceRoot] },   // allow serving files from monorepo root
  },
  optimizeDeps: {
    exclude: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope', '@vanilla-extract/recipes'],
  },
});
\`\`\`

This pattern is used in both \`apps/hy-storybook\` and \`apps/hy-component-preview\`.
`,
      ['vite', 'alias', 'vanilla-extract', 'source', 'resolve', 'config', 'convention'],
      'static',
    ),
  );

  // ── 19. Component Preview App Architecture ─────────────────────────────
  upsert(
    makeChunk(
      'architecture',
      'Component Preview App',
      `# Component Preview App

Location: \`apps/hy-component-preview/\`
Port: 3100 (via \`@hydrotik/config\`)
Start: \`pnpm turbo run dev --filter=@hydrotik/component-preview\`

## Layout
Modeled after the [shadcn/ui homepage](https://ui.shadcn.com) — a **bento grid** layout:
1. **Hero section** — title, subtitle, Get Started + View Components CTAs
2. **12-column responsive CSS Grid** — 17 self-contained interactive demo cards
3. No sidebar, no scroll-spy — single scrollable page

## Responsive breakpoints
- Desktop: 12 columns
- Tablet (≤1024px): 6 columns
- Mobile (≤640px): 1 column

## File structure
\`\`\`
apps/hy-component-preview/
├── src/
│   ├── App.tsx              # Main layout: navbar + hero + bento grid
│   ├── App.css.ts           # vanilla-extract styles (grid, hero, responsive)
│   ├── main.tsx             # Entry point (ThemeProvider wrapper)
│   └── cards/               # 17 bento card components
│       ├── PaymentCard.tsx   # Card + Input + Select + Checkbox + Textarea + Button
│       ├── TeamCard.tsx      # Avatar stack + empty state
│       ├── LoadingCard.tsx   # Badge + Spinner loading states
│       ├── PriceRangeCard.tsx # Interactive Slider + Badge
│       ├── UrlInputCard.tsx  # Input with prefix label
│       ├── ProgressCard.tsx  # Badge + Progress + Button
│       ├── InputStatesCard.tsx # Input variants (text, password, prefix)
│       ├── TwoFactorCard.tsx # Switch + Label
│       ├── AlertCard.tsx     # Alert with lucide icon
│       ├── SettingsCard.tsx  # Card-style RadioGroup + Input + Switch
│       ├── PromptCard.tsx    # Input + ghost icon buttons
│       ├── SourceCard.tsx    # ToggleGroup
│       ├── ActionButtonsCard.tsx # Outline buttons with icons
│       ├── TermsCard.tsx     # Checkbox + Pagination
│       ├── CopilotCard.tsx   # Standalone Badge
│       ├── SurveyCard.tsx    # RadioGroup survey
│       ├── ProcessingCard.tsx # Spinner + cancel button
│       └── index.ts          # Barrel exports
├── vite.config.ts            # Source aliases + VE plugin + port config
└── index.html
\`\`\`

## Grid span pattern
Cards use span classes from \`App.css.ts\`: \`span4\` (1/3), \`span6\` (1/2), \`span8\` (2/3), \`span12\` (full).
Wide cards (Payment, Settings) span 8 cols; narrow cards span 4 cols.

## Key conventions
- Each card is a self-contained interactive demo (not a labeled showcase)
- Cards use \`Card\` component for bordered containers
- All imports from \`@hydrotik/design-system\` — no custom component code
- Dark theme is the default; Sun/Moon toggle in navbar
- Styles use design tokens via \`vars.*\` (no hardcoded values in App.css.ts)
`,
      ['component-preview', 'bento', 'grid', 'kitchen-sink', 'app', 'shadcn', 'layout', 'cards'],
      'static',
    ),
  );

  // ── 20. Shared CSS Utilities ──────────────────────────────────────────
  upsert(
    makeChunk(
      'architecture',
      'Shared CSS Utilities',
      `# Shared CSS Utilities

Location: \`packages/hy-design-system/src/styles/\`

Reusable vanilla-extract style fragments extracted to reduce duplication across components.

## Files

### \`overlay.css.ts\`
Shared modal/dialog styles used by Dialog, AlertDialog, Sheet:
- \`baseOverlay\` — fixed fullscreen backdrop with \`rgba(0,0,0,0.5)\`
- \`baseModalContent\` — centered content with background + border + shadow
- \`baseModalHeader\`, \`baseModalFooter\` — header/footer layout
- \`baseModalTitle\`, \`baseModalDescription\` — typography
- Keyframe animations: \`overlayShow\`, \`contentShow\` (not exported — internal only)

### \`menu-item.css.ts\`
Shared menu item styles used by ContextMenu, DropdownMenu, Menubar:
- \`baseMenuItem\` — standard menu item with hover/focus/disabled states
- \`menuSeparator\` — horizontal divider
- \`menuLabel\` — group label (no uppercase per shadcn v4)
- \`menuShortcut\` — right-aligned keyboard shortcut text
- \`menuIndicator\` — check/radio indicator spacing

### \`focus-ring.css.ts\`
Shared focus ring pattern:
- \`focusRingStyle\` — \`borderColor: focusRing\` + 3px \`boxShadow\` color-mix ring

### Barrel: \`styles/index.ts\`
Re-exports all shared styles for internal use within the design system package.
`,
      ['shared', 'css', 'overlay', 'menu-item', 'focus-ring', 'styles', 'utility', 'duplication'],
      'static',
    ),
  );

  // Finalize
  store.chunks = newChunks;
  store.syncedAt = new Date().toISOString();
  saveRagStore(store);

  return { added, updated, total: newChunks.length };
}

// ═══════════════════════════════════════════════════════════════════════════
// MCP SERVER
// ═══════════════════════════════════════════════════════════════════════════

const server = new McpServer({
  name: 'hydrotik-design',
  version: '0.2.0',
});

// ======================== RESOURCES ========================

server.resource('rag-store', 'hydrotik://rag-store', async (uri) => {
  const store = loadRagStore();
  return {
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(
          {
            syncedAt: store.syncedAt,
            totalChunks: store.chunks.length,
            categories: [...new Set(store.chunks.map((c) => c.category))],
            chunks: store.chunks.map((c) => ({
              id: c.id,
              category: c.category,
              title: c.title,
              tags: c.tags,
              source: c.source,
            })),
          },
          null,
          2,
        ),
      },
    ],
  };
});

// ======================== TOOLS ========================

// ── RAG: Sync ────────────────────────────────────────────────────────────
server.tool(
  'rag_sync',
  'Sync the RAG knowledge base from live repo state. Reads tokens, components, docs, and conventions into searchable chunks. Run this after making changes to tokens, components, or docs.',
  {},
  async () => {
    const result = syncRagStore();
    return {
      content: [
        {
          type: 'text',
          text: `✅ RAG store synced.\n\n- Added: ${result.added}\n- Updated: ${result.updated}\n- Total chunks: ${result.total}\n- Store: ${RAG_STORE_PATH}`,
        },
      ],
    };
  },
);

// ── RAG: Search ──────────────────────────────────────────────────────────
server.tool(
  'rag_search',
  'Search the Hydrotik design knowledge base. Uses TF-IDF to find the most relevant chunks about tokens, styling conventions, components, architecture, or docs.',
  {
    query: z.string().describe('Natural language search query (e.g. "how to add a new token", "button variants", "focus ring convention")'),
    category: z
      .enum(['tokens', 'conventions', 'components', 'architecture', 'docs', 'all'])
      .optional()
      .default('all')
      .describe('Filter by category. Default: all'),
    topK: z.number().optional().default(5).describe('Number of results to return. Default: 5'),
  },
  async ({ query, category, topK }) => {
    let store = loadRagStore();
    if (store.chunks.length === 0) {
      // Auto-sync on first use
      syncRagStore();
      store = loadRagStore();
    }

    let chunks = store.chunks;
    if (category && category !== 'all') {
      chunks = chunks.filter((c) => c.category === category);
    }

    const results = tfidfSearch(query, chunks, topK);

    if (results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `No results found for "${query}". Try a broader query or run \`rag_sync\` to refresh the knowledge base.`,
          },
        ],
      };
    }

    let text = `# Search results for "${query}"\n\n`;
    for (let i = 0; i < results.length; i++) {
      const r = results[i]!;
      text += `---\n## ${i + 1}. ${r.title}\n`;
      text += `*Category: ${r.category} | Source: ${r.source} | Tags: ${r.tags.join(', ')}*\n\n`;
      text += r.content + '\n\n';
    }

    return { content: [{ type: 'text', text }] };
  },
);

// ── RAG: Get chunk by ID ─────────────────────────────────────────────────
server.tool(
  'rag_get',
  'Retrieve a specific chunk from the RAG store by its ID.',
  {
    id: z.string().describe('Chunk ID (e.g. "conventions::component-file-structure", "components::component:-button")'),
  },
  async ({ id }) => {
    const store = loadRagStore();
    const chunk = store.chunks.find((c) => c.id === id);
    if (!chunk) {
      const ids = store.chunks.map((c) => c.id).join('\n  ');
      return { content: [{ type: 'text', text: `Chunk "${id}" not found.\n\nAvailable IDs:\n  ${ids}` }] };
    }
    return {
      content: [
        {
          type: 'text',
          text: `# ${chunk.title}\n\n*Category: ${chunk.category} | Source: ${chunk.source}*\n*Tags: ${chunk.tags.join(', ')}*\n*Updated: ${chunk.updatedAt}*\n\n${chunk.content}`,
        },
      ],
    };
  },
);

// ── RAG: List all chunks ─────────────────────────────────────────────────
server.tool(
  'rag_list',
  'List all chunks in the RAG store, grouped by category.',
  {
    category: z
      .enum(['tokens', 'conventions', 'components', 'architecture', 'docs', 'all'])
      .optional()
      .default('all')
      .describe('Filter by category'),
  },
  async ({ category }) => {
    const store = loadRagStore();
    let chunks = store.chunks;
    if (category && category !== 'all') {
      chunks = chunks.filter((c) => c.category === category);
    }

    if (chunks.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'RAG store is empty. Run `rag_sync` to populate it from the repo.',
          },
        ],
      };
    }

    // Group by category
    const grouped: Record<string, RagChunk[]> = {};
    for (const c of chunks) {
      (grouped[c.category] ??= []).push(c);
    }

    let text = `# RAG Store — ${chunks.length} chunks\n*Last synced: ${store.syncedAt}*\n\n`;
    for (const [cat, items] of Object.entries(grouped)) {
      text += `## ${cat} (${items.length})\n`;
      for (const item of items) {
        text += `- \`${item.id}\` — ${item.title}\n`;
      }
      text += '\n';
    }

    return { content: [{ type: 'text', text }] };
  },
);

// ── Quick-access tools (no RAG needed) ───────────────────────────────────

server.tool(
  'get_tokens',
  'Look up Hydrotik design tokens by reading the live token source files. Returns the contract, dark theme, and/or light theme.',
  {
    file: z
      .enum(['contract', 'dark', 'light', 'all'])
      .describe('Which token file to read'),
  },
  async ({ file }) => {
    const fileMap: Record<string, string> = {
      contract: 'packages/hy-tokens/src/contract.css.ts',
      dark: 'packages/hy-tokens/src/dark.css.ts',
      light: 'packages/hy-tokens/src/light.css.ts',
    };

    if (file === 'all') {
      let text = '';
      for (const [name, path] of Object.entries(fileMap)) {
        const src = safeRead(join(MONO_ROOT, path)) ?? 'File not found';
        text += `## ${name}.css.ts\n\`\`\`ts\n${src}\n\`\`\`\n\n`;
      }
      return { content: [{ type: 'text', text }] };
    }

    const src = safeRead(join(MONO_ROOT, fileMap[file]!)) ?? 'File not found';
    return { content: [{ type: 'text', text: `\`\`\`ts\n${src}\n\`\`\`` }] };
  },
);

server.tool(
  'get_component',
  'Get the live source code for a specific design system component.',
  {
    name: z.string().describe('PascalCase component name (e.g. "Button", "Dialog")'),
  },
  async ({ name }) => {
    const dir = join(MONO_ROOT, 'packages/hy-design-system/src/components', name);
    try {
      const files = readdirSync(dir);
      let text = `# ${name}\n\nFiles: ${files.join(', ')}\n\n`;
      for (const file of files) {
        const src = safeRead(join(dir, file));
        if (src) {
          const lang = file.endsWith('.ts') || file.endsWith('.tsx') ? 'tsx' : 'ts';
          text += `## ${file}\n\`\`\`${lang}\n${src}\n\`\`\`\n\n`;
        }
      }
      return { content: [{ type: 'text', text }] };
    } catch {
      // List available
      const componentsDir = join(MONO_ROOT, 'packages/hy-design-system/src/components');
      try {
        const available = readdirSync(componentsDir)
          .filter((n) => statSync(join(componentsDir, n)).isDirectory())
          .join(', ');
        return {
          content: [{ type: 'text', text: `Component "${name}" not found. Available: ${available}` }],
        };
      } catch {
        return { content: [{ type: 'text', text: `Component "${name}" not found.` }] };
      }
    }
  },
);

server.tool(
  'check_token_usage',
  'Validate a CSS value against Hydrotik token conventions. Flags raw hex/px values and suggests the correct vars.* replacement.',
  {
    value: z.string().describe('CSS value to check (e.g. "#3b82f6", "1rem", "6px")'),
    property: z.string().optional().describe('CSS property for context (e.g. "backgroundColor")'),
  },
  async ({ value, property }) => {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Hex colors
    if (/^#[0-9a-fA-F]{3,8}$/.test(value)) {
      issues.push(`Raw hex color "${value}". Use \`vars.color.*\` instead.`);
      // Try to match from live dark/light files
      const darkSrc = safeRead(join(MONO_ROOT, 'packages/hy-tokens/src/dark.css.ts')) ?? '';
      const lightSrc = safeRead(join(MONO_ROOT, 'packages/hy-tokens/src/light.css.ts')) ?? '';
      const regex = new RegExp(`(\\w+):\\s*'${value.replace('#', '\\#')}'`, 'gi');
      for (const match of [...darkSrc.matchAll(regex), ...lightSrc.matchAll(regex)]) {
        suggestions.push(`vars.color.${match[1]}`);
      }
    }

    // Raw spacing
    if (
      property &&
      /^(padding|margin|gap|paddingLeft|paddingRight|paddingTop|paddingBottom|marginLeft|marginRight|marginTop|marginBottom)$/i.test(property)
    ) {
      if (/^\d+(\.\d+)?(rem|px|em)$/.test(value)) {
        issues.push(`Raw spacing "${value}" in ${property}. Use \`vars.space.*\`.`);
      }
    }

    // Raw radii
    if (property === 'borderRadius' && /^\d+(\.\d+)?(rem|px)$/.test(value)) {
      issues.push(`Raw radius "${value}". Use \`vars.radii.*\`.`);
    }

    if (issues.length === 0) {
      return { content: [{ type: 'text', text: `✅ "${value}" looks OK.` }] };
    }

    let text = `⚠️ Token issues:\n${issues.map((i) => `- ${i}`).join('\n')}`;
    if (suggestions.length > 0) {
      text += `\n\n💡 Suggestions:\n${[...new Set(suggestions)].map((s) => `- ${s}`).join('\n')}`;
    }
    return { content: [{ type: 'text', text }] };
  },
);

// ======================== PROMPTS ========================

server.prompt(
  'new_component',
  'Scaffold a new Hydrotik design system component following all conventions',
  { name: z.string().describe('PascalCase component name') },
  ({ name }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Create a new Hydrotik design system component called "${name}".

## File structure (REQUIRED):
\`\`\`
${name}/
├── ${name}.tsx            # React component
├── ${name}.styles.ts      # vanilla-extract styles
├── ${name}.jest.tsx        # Tests
├── ${name}.stories.tsx     # Storybook stories
└── index.ts                # Barrel re-exports
\`\`\`

## Rules:
- Use \`React.forwardRef\`, accept \`className\`, set \`displayName\`
- Style file is \`.styles.ts\` — use \`recipe()\` from @vanilla-extract/recipes
- Test file is \`.jest.tsx\` — use Jest + Testing Library + jest-axe
- Import tokens: \`import { vars } from '@hydrotik/tokens'\`
- Only use \`vars.*\` tokens — no hardcoded colors/sizes/spacing
- Include \`:focus-visible\` styles with \`vars.color.focusRing\`
- Export component + props interface from \`index.ts\``,
        },
      },
    ],
  }),
);

server.prompt(
  'review_styles',
  'Review a style file for Hydrotik convention compliance',
  { code: z.string().describe('The .styles.ts file content to review') },
  ({ code }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Review this style file for Hydrotik compliance:

\`\`\`ts
${code}
\`\`\`

Check:
1. Colors → \`vars.color.*\` (no hex)
2. Spacing → \`vars.space.*\` (no raw rem/px)
3. Radii → \`vars.radii.*\`
4. Fonts → \`vars.font.*\`
5. Motion → \`vars.motion.*\`
6. \`style()\` selectors only target \`&\` — children via \`globalStyle()\`
7. Focus ring → \`vars.color.focusRing\`
8. Disabled → opacity 0.45, cursor not-allowed, pointerEvents none
9. File should be named \`.styles.ts\` (not \`.css.ts\`)`,
        },
      },
    ],
  }),
);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
async function main() {
  // Auto-sync on first boot if store doesn't exist
  if (!existsSync(RAG_STORE_PATH)) {
    syncRagStore();
  }
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Hydrotik Design MCP v0.2.0 running (RAG-enabled)');
}

main().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
