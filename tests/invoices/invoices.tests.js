const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy, assertAjax } = require('../test-helpers');

describe('Invoices Module', () => {
  // Index Routes
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

  test('it can view invoice groups index', async () => {
    await assertPageLoads(page, '/invoice_groups/index');
  });

  // View Routes
  test('it can view an invoice', async () => {
    await assertPageLoads(page, '/invoices/view/1');
    await expect(page.locator('.content-title')).toContainText('Invoice');
  });

  // Form Routes
  test('it can create an invoice group', async () => {
    await assertFormSubmit(page, '/invoice_groups/form', 'invoices');
  });

  test('it can edit an invoice group', async () => {
    await assertFormSubmit(page, '/invoice_groups/form/1', 'invoices');
  });

  // Destroy Routes
  test('it can delete an invoice', async () => {
    await assertDestroy(page, '/invoices/delete/1');
  });

  test('it can stop a recurring invoice', async () => {
    await assertDestroy(page, '/invoices/recurring/stop/1');
  });

  test('it can delete an invoice group', async () => {
    await assertDestroy(page, '/invoice_groups/delete/1');
  });

  // AJAX Routes
  test('it can generate an invoice PDF', async () => {
    await assertAjax(page, '/invoices/generate_pdf/1');
  });
});
