const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Users Module', () => {

  // View Routes
  test('it can view users index', async () => {
    await assertPageLoads(page, '/users/index');
  });

  test('it can view users canonical route', async () => {
    await assertPageLoads(page, '/users');
  });

  // Form Routes
  test('it can create a new user', async () => {
    await assertFormSubmit(page, '/users/form', 'core');
  });

  test('it can edit an existing user by id', async () => {
    await assertFormSubmit(page, '/users/form/1', 'core');
  });

  test('it can change a user password by id', async () => {
    await assertFormSubmit(page, '/users/change_password/1', 'core');
  });

  // Destroy Routes
  test('it can delete a user', async () => {
    await assertDestroy(page, '/users/delete/1');
  });
});
