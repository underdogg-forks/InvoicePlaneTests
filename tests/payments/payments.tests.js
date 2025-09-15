const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy, assertAjax } = require('../test-helpers');

describe('Payments Module', () => {

  // Index Routes
  test('it can view payments index', async () => {
    await assertPageLoads(page, '/payments/index');
    await expect(page.locator('.content-title')).toContainText('Payments');
  });

  test('it can view payment methods index', async () => {
    await assertPageLoads(page, '/payment_methods/index');
  });

  // Form Routes
  test('it can create a new payment', async () => {
    await assertFormSubmit(page, '/payments/form', 'payments');
  });

  test('it can edit an existing payment', async () => {
    await assertFormSubmit(page, '/payments/form/1', 'payments');
  });

  test('it can create a new payment method', async () => {
    await assertFormSubmit(page, '/payment_methods/form', 'payments');
  });

  test('it can edit an existing payment method', async () => {
    await assertFormSubmit(page, '/payment_methods/form/1', 'payments');
  });

  // Destroy Routes
  test('it can delete a payment', async () => {
    await assertDestroy(page, '/payments/delete/1');
  });

  test('it can delete a payment method', async () => {
    await assertDestroy(page, '/payment_methods/delete/1');
  });

  // AJAX Routes
  test('it can view online logs', async () => {
    await assertAjax(page, '/payments/online_logs');
  });

});
