/**
 * The dashboard's tests run in jsdom without the design system: the design system, its tokens and
 * its theme provider are not published, so they map to small local stand-ins under
 * src/__testing__/, as do the vanilla-extract `.css.ts` modules. `@hydrotik/air` resolves to the
 * server package's source, so the tests need no build.
 */

/** @type {import('jest').Config} */
const config = {
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
  testMatch: ['<rootDir>/src/**/*.test.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/src/__testing__/setup.ts'],
  moduleNameMapper: {
    '^@hydrotik/air$': '<rootDir>/../air/src/shared/index.ts',
    '^@hydrotik/design-system$': '<rootDir>/src/__testing__/design-system.tsx',
    '^@hydrotik/tokens$': '<rootDir>/src/__testing__/tokens.ts',
    '^@hydrotik/theme-provider$': '<rootDir>/src/__testing__/theme-provider.tsx',
    // vanilla-extract modules are imported as `../dashboard.css` (resolving to .css.ts)
    '\\.css$': '<rootDir>/src/__testing__/style.ts',
    // d3 v7 ships ESM only; its UMD bundle avoids transforming node_modules
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.js',
  },
  // Coverage floor, checked by `test:coverage`: today's numbers rounded down.
  // Raise it when coverage goes up; never lower it.
  coverageThreshold: {
    global: { statements: 94, branches: 84, functions: 95, lines: 95 },
  },
};

export default config;
