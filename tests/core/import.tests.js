/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for all `import` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */
const { page } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit } = require('../../test-helpers');

describe('Import Module', () => {

  // View Routes
  test('it can view import page', async () => {
    await assertPageLoads(page, '/import');
  });

  // Form Routes
  test('it can view the import form', async () => {
    await assertFormSubmit(page, '/import/form', 'core');
  });
});
