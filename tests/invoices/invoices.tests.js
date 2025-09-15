/**
 * Test suite for the Invoices module, including modal form and AJAX actions.
 */

const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertDestroy, assertAjax, assertModalFormSubmit } = require('../../test-helpers');

describe('Invoices Module', () => {
  // Test invoice view pages
  test('it can view the invoices index', async () => {
    // Arrange: Define the URL
    const url = '/invoices/index';
    // Act & Assert: Navigate and check for the main title
    await assertPageLoads(page, url);
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  test('it can view the invoice archive', async () => {
    // Act & Assert: Navigate and check for the main title
    await assertPageLoads(page, '/invoices/archive');
    await expect(page.locator('.content-title')).toContainText('Invoice Archive');
  });

  test('it can view a specific invoice', async () => {
    // Arrange: Define the URL with a hardcoded ID
    const url = '/invoices/view/6617';
    // Act & Assert: Navigate and check for the main title
    await assertPageLoads(page, url);
    await expect(page.locator('.content-title')).toContainText('Invoice');
  });

  // Test invoice form pages and modals
  test('it can create a new invoice from the modal with payload', async () => {
    // Arrange: Get the specific payload for the modal form
    const createInvoicePayload = {
      "client_id": "$copy_invoice_client_id",
      "invoice_date_created": "2024-09-15",
      "invoice_group_id": "$invoice_group_id",
      "invoice_password": "$invoice_password",
      "invoice_time_created": "$date('H:i:s')",
      "user_id": "$user_id"
    };
    // Act & Assert: Click the "create invoice" button to open the modal and submit it with the payload
    await assertModalFormSubmit(page, '/invoices/index', 'invoices', 'a[href="/invoices/form"]', '#modal-create-invoice', createInvoicePayload);
  });

  // Test AJAX actions
  test('it can generate an invoice PDF', async () => {
    // Arrange: Define the URL for the AJAX call with a hardcoded ID
    const url = '/invoices/generate_pdf/6290';
    // Act & Assert: Make the AJAX call and check the response status
    await assertAjax(page, url);
  });
});
