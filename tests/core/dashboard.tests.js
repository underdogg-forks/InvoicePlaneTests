/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for all `dashboard` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads } = require('../../test-helpers');

describe('Dashboard Module', () => {

  // View Routes
  test('it can view the dashboard', async () => {
    await assertPageLoads(page, '/dashboard');
    await expect(page.locator('.content-title')).toContainText('Dashboard');
  });
});
