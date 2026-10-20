/** @type {import('jest').Config} */
const config = {
  displayName: 'air',
  testEnvironment: 'node',
  rootDir: '.',
  transform: {
    // .js too: `cookie` 2 (through fastify's inject) ships ESM only, which Node 22's require
    // cannot load in Jest, so it is compiled like our sources; other node_modules are not.
    '^.+\\.[jt]sx?$': [
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
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: ['/node_modules/(?!(\\.pnpm/)?cookie[@/])'],
  // Coverage floor, checked by `test:coverage`: today's numbers rounded down.
  // Raise it when coverage goes up; never lower it.
  coverageThreshold: {
    global: { statements: 96, branches: 89, functions: 99, lines: 97 },
  },
};

export default config;
