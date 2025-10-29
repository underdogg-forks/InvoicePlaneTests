module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'], // Updated path
  testMatch: [
    '<rootDir>/tests/**/*.test.js'
  ],
  collectCoverageFrom: [
    'tests/**/*.js',
    '!tests/setup.js',
    '!tests/config.js',
    '!tests/test-helpers.js',
    '!tests/helpers/**',
    '!tests/fixtures/**',
    '!tests/storage/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  testTimeout: 15000,
  maxWorkers: 1,
  detectOpenHandles: true,
  forceExit: true,
};
