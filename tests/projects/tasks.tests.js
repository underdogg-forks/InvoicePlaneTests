const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Tasks Module', () => {

  // View Routes
  test('it can view tasks index', async () => {
    await assertPageLoads(page, '/tasks/index');
  });

  // Form Routes
  test('it can create a new task', async () => {
    await assertFormSubmit(page, '/tasks/form', 'projects');
  });

  test('it can edit an existing task by id', async () => {
    await assertFormSubmit(page, '/tasks/form/63', 'projects');
  });

  // Destroy Routes
  test('it can delete a task', async () => {
    await assertDestroy(page, '/tasks/delete/1');
  });
});
