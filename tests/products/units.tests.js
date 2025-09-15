const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Units Module', () => {

  // View Routes
  test('it can view units index', async () => {
    await assertPageLoads(page, '/units/index');
  });

  // Form Routes
  test('it can create a new unit', async () => {
    await assertFormSubmit(page, '/units/form', 'products');
  });

  test('it can edit an existing unit by id', async () => {
    await assertFormSubmit(page, '/units/form/59', 'products');
  });

  // Destroy Routes
  test('it can delete a unit', async () => {
    await assertDestroy(page, '/units/delete/1');
  });
});
