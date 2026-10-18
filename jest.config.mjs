/**
 * Two projects:
 *  - `node`: server, sdk, db, collector, shared — unchanged from the original single config.
 *  - `dashboard`: the React dashboard under src/dashboard, run in jsdom.
 *
 * The dashboard imports workspace-only packages (design system, tokens, theme provider)
 * and vanilla-extract `.css.ts` modules. This package is published standalone, so those are
 * mapped to small local stand-ins under src/dashboard/__testing__/ instead of being resolved.
 */

/** @type {import('jest').Config} */
const nodeProject = {
  displayName: 'node',
  testEnvironment: 'node',
  rootDir: '.',
  transform: {
    '^.+\\.tsx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/src/**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/dashboard/'],
};

/** @type {import('jest').Config} */
const dashboardProject = {
  displayName: 'dashboard',
  testEnvironment: 'jsdom',
  rootDir: '.',
  transform: {
    '^.+\\.tsx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['<rootDir>/src/dashboard/**/*.test.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/src/dashboard/__testing__/setup.ts'],
  moduleNameMapper: {
    '^@hydrotik/design-system$': '<rootDir>/src/dashboard/__testing__/design-system.tsx',
    '^@hydrotik/tokens$': '<rootDir>/src/dashboard/__testing__/tokens.ts',
    '^@hydrotik/theme-provider$': '<rootDir>/src/dashboard/__testing__/theme-provider.tsx',
    // vanilla-extract modules are imported as `../dashboard.css` (resolving to .css.ts)
    '\\.css$': '<rootDir>/src/dashboard/__testing__/style.ts',
    // d3 v7 ships ESM only; its UMD bundle avoids transforming node_modules
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.js',
  },
};

/** @type {import('jest').Config} */
const config = {
  projects: [nodeProject, dashboardProject],
  // Coverage floor, checked by `test:coverage`: today's numbers rounded down.
  // Raise it when coverage goes up; never lower it.
  coverageThreshold: {
    global: { statements: 95, branches: 85, functions: 96, lines: 96 },
  },
};

export default config;
