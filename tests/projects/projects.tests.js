const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Projects Module', () => {

  // View Routes
  test('it can view projects index', async () => {
    await assertPageLoads(page, '/projects/index');
  });

  test('it can view a project profile by id', async () => {
    await assertPageLoads(page, '/projects/view/56');
  });

  // Form Routes
  test('it can create a new project', async () => {
    await assertFormSubmit(page, '/projects/form', 'projects');
  });

  test('it can edit an existing project by id', async () => {
    await assertFormSubmit(page, '/projects/form/56', 'projects');
  });

  // Destroy Routes
  test('it can delete a project', async () => {
    await assertDestroy(page, '/projects/delete/1');
  });
});
