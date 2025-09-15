const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Payment Methods Module', () => {

  // View Routes
  test('it can view payment methods index', async () => {
    await assertPageLoads(page, '/payment_methods/index');
  });

  // Form Routes
  test('it can create a new payment method', async () => {
    await assertFormSubmit(page, '/payment_methods/form', 'payments');
  });

  test('it can edit an existing payment method by id', async () => {
    await assertFormSubmit(page, '/payment_methods/form/108', 'payments');
  });

  // Destroy Routes
  test('it can delete a payment method', async () => {
    await assertDestroy(page, '/payment_methods/delete/1');
  });
});
