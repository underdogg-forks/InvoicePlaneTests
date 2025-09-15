const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../test-helpers');

describe('Projects Module', () => {

  // Index Routes
  test('it can view tasks index', async () => {
    await assertPageLoads(page, '/tasks/index');
  });

  test('it can view projects index', async () => {
    await assertPageLoads(page, '/projects/index');
  });

  // View Routes
  test('it can view a project profile', async () => {
    await assertPageLoads(page, '/projects/view/1');
  });
  
  // Form Routes
  test('it can create a new task', async () => {
    await assertFormSubmit(page, '/tasks/form', 'projects');
  });

  test('it can edit an existing task', async () => {
    await assertFormSubmit(page, '/tasks/form/1', 'projects');
  });
  
  test('it can create a new project', async () => {
    await assertFormSubmit(page, '/projects/form', 'projects');
  });

  test('it can edit an existing project', async () => {
    await assertFormSubmit(page, '/projects/form/1', 'projects');
  });
  
  // Destroy Routes
  test('it can delete a task', async () => {
    await assertDestroy(page, '/tasks/delete/1');
  });

  test('it can delete a project', async () => {
    await assertDestroy(page, '/projects/delete/1');
  });
});
