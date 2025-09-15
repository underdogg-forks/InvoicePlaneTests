const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Families Module', () => {

  // View Routes
  test('it can view families index', async () => {
    await assertPageLoads(page, '/families/index');
  });

  // Form Routes
  test('it can create a new family', async () => {
    await assertFormSubmit(page, '/families/form', 'products');
  });

  test('it can edit an existing family by id', async () => {
    await assertFormSubmit(page, '/families/form/55', 'products');
  });

  // Destroy Routes
  test('it can delete a family', async () => {
    await assertDestroy(page, '/families/delete/1');
  });
});
