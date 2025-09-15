module.exports = {
    testEnvironment: 'jest-playwright-preset',
    testMatch: ['**/tests/**/*.tests.js'],
    setupFilesAfterEnv: ['<rootDir>/setup.js'],
    verbose: true,
    bail: false,
    transform: {},
    globals: {
        baseUrl: 'http://ivplv1.test',
    },
    testTimeout: 1000,
    preset: 'jest-playwright-preset',
    testRunner: 'jest-circus/runner',
    reporters: ['default'],
    moduleFileExtensions: ['js'],
};
