module.exports = {
  testEnvironment: 'jest-playwright-preset',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/setup.js'],
  verbose: true,
  bail: false,
  transform: {},
  globals: {
    baseUrl: 'http://localhost.test',
  },
  testTimeout: 60000,
  preset: 'jest-playwright-preset',
  testRunner: 'jest-circus/runner',
  reporters: ['default'],
  moduleFileExtensions: ['js'],
};
