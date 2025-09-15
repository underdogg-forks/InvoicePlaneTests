const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertDestroy, assertAjax } = require('../../test-helpers');

describe('Invoices Module', () => {

  // View Routes
  test('it can view invoices index', async () => {
    await assertPageLoads(page, '/invoices/index');
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  test('it can view invoices archive', async () => {
    await assertPageLoads(page, '/invoices/archive');
  });

  test('it can view all invoices', async () => {
    await assertPageLoads(page, '/invoices/status/all');
  });

  test('it can view draft invoices', async () => {
    await assertPageLoads(page, '/invoices/status/draft');
  });

  test('it can view overdue invoices', async () => {
    await assertPageLoads(page, '/invoices/status/overdue');
  });

  test('it can view paid invoices', async () => {
    await assertPageLoads(page, '/invoices/status/paid');
  });

  test('it can view sent invoices', async () => {
    await assertPageLoads(page, '/invoices/status/sent');
  });

  test('it can view viewed invoices', async () => {
    await assertPageLoads(page, '/invoices/status/viewed');
  });

  test('it can view recurring invoices', async () => {
    await assertPageLoads(page, '/invoices/recurring');
  });

  test('it can view recurring invoices index', async () => {
    await assertPageLoads(page, '/invoices/recurring/index');
  });

  test('it can view an invoice by id', async () => {
    await assertPageLoads(page, '/invoices/view/6617');
    await expect(page.locator('.content-title')).toContainText('Invoice');
  });

  // Destroy Routes
  test('it can delete an invoice', async () => {
    await assertDestroy(page, '/invoices/delete/1');
  });

  test('it can stop a recurring invoice by id', async () => {
    await assertDestroy(page, '/invoices/recurring/stop/133');
  });

  // AJAX Routes
  test('it can generate an invoice PDF by id', async () => {
    await assertAjax(page, '/invoices/generate_pdf/6290');
  });
});
