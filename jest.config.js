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
    '!tests/jest.global-*.js',
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
  testTimeout: 15000, // 15 seconds max per test
  maxWorkers: 1, // Critical for your auth flow
  // Removed global setup - conflicts with your setup.js
  detectOpenHandles: true, // Helps find hanging promises
  forceExit: true, // Forces exit after tests complete
};
