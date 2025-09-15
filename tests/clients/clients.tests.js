const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../test-helpers');

describe('Clients Module', () => {

  // Index Routes
  test('it can view clients index page', async () => {
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

  test('it can view user clients index', async () => {
    await assertPageLoads(page, '/user_clients/index');
  });

  // View Routes
  test('it can view a client profile', async () => {
    await assertPageLoads(page, '/clients/view/1');
    await expect(page.locator('.content-title')).toContainText('Client Profile');
  });

  test('it can view client invoices', async () => {
    await assertPageLoads(page, '/clients/view/1/invoices');
  });

  test('it can view guest client profile', async () => {
    await assertPageLoads(page, '/guest/view/1');
  });

  test('it can view guest invoice', async () => {
    await assertPageLoads(page, '/guest/invoice/1');
  });

  test('it can view guest quote', async () => {
    await assertPageLoads(page, '/guest/quote/1');
  });

  // Form Routes
  test('it can create a new client', async () => {
    await assertFormSubmit(page, '/clients/form', 'client');
  });

  test('it can edit an existing client', async () => {
    await assertFormSubmit(page, '/clients/form/1', 'client');
  });

  test('it can create a new user client', async () => {
    await assertFormSubmit(page, '/user_clients/form', 'user_clients');
  });

  test('it can edit a user client', async () => {
    await assertFormSubmit(page, '/user_clients/form/1', 'user_clients');
  });

  // Destroy Routes
  test('it can delete a client', async () => {
    await assertDestroy(page, '/clients/delete/1');
  });

  test('it can remove a client', async () => {
    await assertDestroy(page, '/clients/remove/1');
  });

  test('it can delete a user client', async () => {
    await assertDestroy(page, '/user_clients/delete/1');
  });

});
