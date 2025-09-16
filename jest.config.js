module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: [
    '<rootDir>/tests/**/*.test.js'
  ],
  collectCoverageFrom: [
    'tests/**/*.js',
    '!tests/setup.js',
    '!tests/config.js',
    '!tests/helpers/**',
    '!tests/fixtures/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  verbose: true,
  // No testTimeout here since you handle it in setup.js
  globalSetup: './tests/jest.global-setup.js',
  globalTeardown: './tests/jest.global-teardown.js'
};
