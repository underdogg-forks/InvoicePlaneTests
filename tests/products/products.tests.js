const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../test-helpers');

describe('Products Module', () => {

  // Index Routes
  test('it can view families index', async () => {
    await assertPageLoads(page, '/families/index');
  });
  
  test('it can view units index', async () => {
    await assertPageLoads(page, '/units/index');
  });

  test('it can view products index', async () => {
    await assertPageLoads(page, '/products/index');
  });

  // Form Routes
  test('it can create a new family', async () => {
    await assertFormSubmit(page, '/families/form', 'products');
  });

  test('it can edit an existing family', async () => {
    await assertFormSubmit(page, '/families/form/1', 'products');
  });

  test('it can create a new unit', async () => {
    await assertFormSubmit(page, '/units/form', 'products');
  });

  test('it can edit an existing unit', async () => {
    await assertFormSubmit(page, '/units/form/1', 'products');
  });
  
  test('it can create a new product', async () => {
    await assertFormSubmit(page, '/products/form', 'products');
  });

  test('it can edit an existing product', async () => {
    await assertFormSubmit(page, '/products/form/1', 'products');
  });
  
  // Destroy Routes
  test('it can delete a family', async () => {
    await assertDestroy(page, '/families/delete/1');
  });

  test('it can delete a unit', async () => {
    await assertDestroy(page, '/units/delete/1');
  });

  test('it can delete a product', async () => {
    await assertDestroy(page, '/products/delete/1');
  });
});
