const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy, assertAjax } = require('../../test-helpers');

describe('Payments Module', () => {

  // View Routes
  test('it can view payments index', async () => {
    await assertPageLoads(page, '/payments/index');
    await expect(page.locator('.content-title')).toContainText('Payments');
  });

  // Form Routes
  test('it can create a new payment', async () => {
    await assertFormSubmit(page, '/payments/form', 'payments');
  });

  test('it can edit an existing payment by id', async () => {
    await assertFormSubmit(page, '/payments/form/966', 'payments');
  });

  // Destroy Routes
  test('it can delete a payment', async () => {
    await assertDestroy(page, '/payments/delete/1');
  });

  // AJAX Routes
  test('it can view online logs', async () => {
    await assertAjax(page, '/payments/online_logs');
  });
});
