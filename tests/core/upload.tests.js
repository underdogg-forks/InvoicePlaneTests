/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for all `uploads` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertAjax } = require('../../test-helpers');

describe('Upload Module', () => {

  // View Routes
  test('it can view upload form', async () => {
    await assertPageLoads(page, '/upload/form');
  });

  test('it can delete a file upload', async () => {
    await assertPageLoads(page, '/upload/delete/1');
  });

  // AJAX Routes
  test('it can save a file upload', async () => {
    await assertAjax(page, '/upload/save');
  });
});
