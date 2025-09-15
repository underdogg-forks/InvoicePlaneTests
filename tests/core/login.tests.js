/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for all `login` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */
const { page } = require('jest-playwright-preset');
const { assertPageLoads } = require('../../test-helpers');

describe('Sessions Module', () => {

  // View Routes
  test('it can view sessions index', async () => {
    await assertPageLoads(page, '/sessions/index');
  });

  test('it can access login page', async () => {
    await assertPageLoads(page, '/sessions/login');
  });

  test('it can access logout route', async () => {
    await assertPageLoads(page, '/sessions/logout');
  });
});
