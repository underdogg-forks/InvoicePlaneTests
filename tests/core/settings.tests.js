/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for all `settings` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */
const { page } = require('jest-playwright-preset');
const { assertPageLoads } = require('../../test-helpers');

describe('Settings Module', () => {

  // View Routes
  test('it can view system settings', async () => {
    await assertPageLoads(page, '/settings');
  });
});
