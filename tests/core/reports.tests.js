const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads } = require('../../test-helpers');

describe('Reports Module', () => {

  // View Routes
  test('it can view reports invoice aging', async () => {
    await assertPageLoads(page, '/reports/invoice_aging');
  });

  test('it can view reports invoices per client', async () => {
    await assertPageLoads(page, '/reports/invoices_per_client');
  });

  test('it can view reports payment history', async () => {
    await assertPageLoads(page, '/reports/payment_history');
  });

  test('it can view reports sales by client', async () => {
    await assertPageLoads(page, '/reports/sales_by_client');
  });

  test('it can view reports sales by year', async () => {
    await assertPageLoads(page, '/reports/sales_by_year');
  });
});
