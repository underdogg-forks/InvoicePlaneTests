const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Products Module', () => {

  // View Routes
  test('it can view products index', async () => {
    await assertPageLoads(page, '/products/index');
  });

  // Form Routes
  test('it can create a new product', async () => {
    await assertFormSubmit(page, '/products/form', 'products');
  });

  test('it can edit an existing product by id', async () => {
    await assertFormSubmit(page, '/products/form/324', 'products');
  });

  // Destroy Routes
  test('it can delete a product', async () => {
    await assertDestroy(page, '/products/delete/1');
  });
});
