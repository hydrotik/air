/**
 * Loads src/server/index.ts for Jest.
 *
 * The module computes its directory from `import.meta.url`, which the package's
 * CommonJS Jest transform cannot compile. This helper transpiles the file with
 * the TypeScript compiler, swapping `import.meta.url` for the file's own URL
 * (and renaming its local `__dirname`, which CommonJS already defines)
 * and turning its relative imports into absolute paths, then requires the
 * result (kept under node_modules/.cache) through Jest's module registry, so `jest.mock` of its dependencies
 * (db, shared/config, ...) still applies. The source file is not modified.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const SERVER_SOURCE = path.resolve(__dirname, '..', 'index.ts');

let compiledPath: string | null = null;

function compile(): string {
  if (compiledPath) return compiledPath;
  const dir = path.dirname(SERVER_SOURCE);
  const source = fs
    .readFileSync(SERVER_SOURCE, 'utf8')
    .replace(/import\.meta\.url/g, JSON.stringify(pathToFileURL(SERVER_SOURCE).href))
    // The module declares its own `__dirname`, which clashes with CommonJS's
    .replace(/\b__dirname\b/g, '__serverDirname')
    .replace(
      /from '(\.{1,2}\/[^']+)'/g,
      (_m, rel: string) => `from ${JSON.stringify(path.resolve(dir, rel))}`
    );

  const { outputText } = ts.transpileModule(source, {
    fileName: SERVER_SOURCE,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });

  // Written under the package's node_modules so bare imports (fastify, ...)
  // resolve exactly as they do for the real file.
  const outDir = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'node_modules',
    '.cache',
    'air-server-test'
  );
  fs.mkdirSync(outDir, { recursive: true });
  compiledPath = path.join(outDir, `server-index-${process.pid}.js`);
  fs.writeFileSync(compiledPath, outputText);
  return compiledPath;
}

export type ServerModule = typeof import('../index');

export function loadServerModule(): ServerModule {
  const file = compile();
  try {
    return require(file) as ServerModule;
  } finally {
    // Once evaluated the module lives in Jest's registry; the file is no longer needed
    fs.rmSync(file, { force: true });
    compiledPath = null;
  }
}
