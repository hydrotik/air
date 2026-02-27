import reactConfig from '@hydrotik/jest-config/react';

/** @type {import('jest').Config} */
const config = {
  ...reactConfig,
  rootDir: '.',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/../../packages/hy-jest-config/__mocks__/styleMock.js',
  },
};

export default config;
