/**
 * @fileoverview Test suite for the Products module.
 * This file contains tests for all `products` routes, including views, forms, and deletions.
 */

const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy } = require('../test-helpers');

describe('Products Module', () => {
  // Routes: /products/index
  test('it can view the products index', async () => {
    await assertPageLoads(page, '/products/index');
    await expect(page.locator('.content-title')).toContainText('Products');
  });

  // Routes: /families/index
  test('it can view the product families index', async () => {
    await assertPageLoads(page, '/families/index');
    await expect(page.locator('.content-title')).toContainText('Families');
  });

  // Routes: /units/index
  test('it can view the units index', async () => {
    await assertPageLoads(page, '/units/index');
    await expect(page.locator('.content-title')).toContainText('Units');
  });

  /**
   * @description Test creating a new product.
   * @payload
   * {
   * "product_sku": "$product_sku",
   * "product_name": "$product_name",
   * "product_description": "$product_description",
   * "product_price": "$product_price",
   * "tax_rate_id": "$tax_rate_id",
   * "family_id": "$family_id",
   * "unit_id": "$unit_id"
   * }
   */
  // Route: /products/form
  test('it can create a new product', async () => {
    const createProductPayload = {
      "product_sku": "TSK-001",
      "product_name": "Test Product",
      "product_description": "A brand new test product.",
      "product_price": "123.45",
      "tax_rate_id": "131",
      "family_id": "55",
      "unit_id": "59"
    };
    await submitFormWithPayload(page, '/products/form', 'products', createProductPayload);
  });

  /**
   * @description Test editing an existing product.
   * @payload
   * {
   * "product_sku": "$product_sku",
   * "product_name": "$product_name",
   * "product_description": "$product_description",
   * "product_price": "$product_price",
   * "tax_rate_id": "$tax_rate_id",
   * "family_id": "$family_id",
   * "unit_id": "$unit_id"
   * }
   */
  // Route: /products/form/{id}
  test('it can edit an existing product', async () => {
    const editProductPayload = {
      "product_sku": "EDITED-SKU",
      "product_name": "Edited Product",
      "product_description": "An edited test product.",
      "product_price": "200.00",
      "tax_rate_id": "131",
      "family_id": "55",
      "unit_id": "59"
    };
    await submitFormWithPayload(page, '/products/form/324', 'products', editProductPayload);
  });

  /**
   * @description Test creating a new product family.
   * @payload
   * {
   * "family_name": "$family_name"
   * }
   */
  // Route: /families/form
  test('it can create a new product family', async () => {
    const createFamilyPayload = {
      "family_name": "Test Family"
    };
    await submitFormWithPayload(page, '/families/form', 'families', createFamilyPayload);
  });

  /**
   * @description Test editing an existing product family.
   * @payload
   * {
   * "family_name": "$family_name"
   * }
   */
  // Route: /families/form/{id}
  test('it can edit an existing product family', async () => {
    const editFamilyPayload = {
      "family_name": "Edited Family"
    };
    await submitFormWithPayload(page, '/families/form/55', 'families', editFamilyPayload);
  });

  /**
   * @description Test creating a new unit.
   * @payload
   * {
   * "unit_name": "$unit_name"
   * }
   */
  // Route: /units/form
  test('it can create a new unit', async () => {
    const createUnitPayload = {
      "unit_name": "Test Unit"
    };
    await submitFormWithPayload(page, '/units/form', 'units', createUnitPayload);
  });

  /**
   * @description Test editing an existing unit.
   * @payload
   * {
   * "unit_name": "$unit_name"
   * }
   */
  // Route: /units/form/{id}
  test('it can edit an existing unit', async () => {
    const editUnitPayload = {
      "unit_name": "Edited Unit"
    };
    await submitFormWithPayload(page, '/units/form/59', 'units', editUnitPayload);
  });

  // Route: /products/delete/{id}
  test('it can delete a product', async () => {
    await assertDestroy(page, '/products/delete/324');
  });

  // Route: /families/delete/{id}
  test('it can delete a product family', async () => {
    await assertDestroy(page, '/families/delete/55');
  });

  // Route: /units/delete/{id}
  test('it can delete a unit', async () => {
    await assertDestroy(page, '/units/delete/59');
  });
});
