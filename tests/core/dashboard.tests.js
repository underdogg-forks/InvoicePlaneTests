/**
 * @fileoverview Test suite for the Dashboard route of the Core module.
 *
 * Covered routes:
 *   - /dashboard
 *
 * All other exotic routes are covered in their respective test files.
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
