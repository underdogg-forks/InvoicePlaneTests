/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for routes related to custom fields
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy, assertAjax } = require('../../test-helpers');

describe('Custom Fields Module', () => {
  // Routes: /custom_fields, /custom_fields/index
  test('it can view the custom fields index page', async () => {
    await assertPageLoads(page, '/custom_fields/index');
    await expect(page.locator('.content-title')).toContainText('Custom Fields');
  });

  test('it can view custom fields canonical route', async () => {
    await assertPageLoads(page, '/custom_fields');
    await expect(page.locator('.content-title')).toContainText('Custom Fields');
  });

  // Form Routes
  test('it can create a new custom field', async () => {
    await assertFormSubmit(page, '/custom_fields/form', 'core');
  });

  test('it can edit an existing custom field by id', async () => {
    await assertFormSubmit(page, '/custom_fields/form/171', 'core');
  });

  // Destroy Routes
  test('it can delete a custom field', async () => {
    await assertDestroy(page, '/custom_fields/delete/1');
  });

  // AJAX Routes
  test('it can get custom fields table for all', async () => {
    await assertAjax(page, '/custom_fields/table/all');
  });

  test('it can get custom fields table for client', async () => {
    await assertAjax(page, '/custom_fields/table/client');
  });

  test('it can get custom fields table for invoice', async () => {
    await assertAjax(page, '/custom_fields/table/invoice');
  });

  test('it can get custom fields table for payment', async () => {
    await assertAjax(page, '/custom_fields/table/payment');
  });

  test('it can get custom fields table for quote', async () => {
    await assertAjax(page, '/custom_fields/table/quote');
  });

  test('it can get custom fields table for user', async () => {
    await assertAjax(page, '/custom_fields/table/user');
  });
});
