/**
 * @fileoverview Test suite for the Quotes module, including modal form and deletion message.
 * @author FREE AI agent in the GitHub Copilot plugin of phpstorm
 */

const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertDestroy, assertModalFormSubmit } = require('../../test-helpers');

describe('Quotes Module', () => {
  // Test quote view pages
  test('it can view the quotes index', async () => {
    // Arrange: Define the URL
    const url = '/quotes/index';
    // Act & Assert: Navigate and check for the main title
    await assertPageLoads(page, url);
    await expect(page.locator('.content-title')).toContainText('Quotes');
  });

  test('it can view a specific quote', async () => {
    // Arrange: Define the URL with a hardcoded ID
    const url = '/quotes/view/2172';
    // Act & Assert: Navigate and check for the main title
    await assertPageLoads(page, url);
    await expect(page.locator('.content-title')).toContainText('Quote');
  });

  // Test quote form pages and modals
  test('it can create a new quote from the modal with payload', async () => {
    // Arrange: Get the specific payload for the modal form
    const createQuotePayload = {
      "client_id": "$copy_invoice_client_id"
    };
    // Act & Assert: Click the "create quote" button to open the modal and submit it with the payload
    await assertModalFormSubmit(page, '/quotes/index', 'quotes', 'a[href="/quotes/form"]', '#modal-create-quote', createQuotePayload);
  });

  // Test delete action
  test('it can delete a quote and see the success message', async () => {
    // Arrange: Define the URL with a hardcoded ID
    const url = '/quotes/delete/1';
    // Act & Assert: Navigate to the delete URL and check for the success message
    await assertDestroy(page, url);
  });
});
