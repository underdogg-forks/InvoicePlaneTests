const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Clients Module', () => {

  // View Routes
  test('it can view clients index', async () => {
    await assertPageLoads(page, '/clients/index');
    await expect(page.locator('.content-title')).toContainText('Clients');
  });

  test('it can view all clients', async () => {
    await assertPageLoads(page, '/clients/status/all');
  });

  test('it can view active clients', async () => {
    await assertPageLoads(page, '/clients/status/active');
  });

  test('it can view inactive clients', async () => {
    await assertPageLoads(page, '/clients/status/inactive');
  });

  test('it can view client profile by id', async () => {
    await assertPageLoads(page, '/clients/view/837');
    await expect(page.locator('.content-title')).toContainText('Client Profile');
  });

  test('it can view client invoices by id', async () => {
    await assertPageLoads(page, '/clients/view/837/invoices');
  });

  // Form Routes
  test('it can create a new client', async () => {
    await assertFormSubmit(page, '/clients/form', 'client');
  });

  test('it can edit an existing client by id', async () => {
    await assertFormSubmit(page, '/clients/form/956', 'client');
  });

  // Destroy Routes
  test('it can delete a client', async () => {
    await assertDestroy(page, '/clients/delete/1');
  });

  test('it can remove a client', async () => {
    await assertDestroy(page, '/clients/remove/1');
  });
});
