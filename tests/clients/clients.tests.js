/**
 * @fileoverview Test suite for the Clients module.
 * This file contains tests for all `clients` routes, including views, forms, and deletions.
 *
 * Covered routes:
 *   - /clients, /clients/index, /clients/status/active, /clients/status/all, /clients/status/inactive
 *   - /user_clients/index
 *   - /clients/view/{id}, /clients/view/{id}/invoices
 *   - /guest/view/{id}, /guest/invoice/{id}, /guest/quote/{id}
 *
 * Pending (incomplete) tests for:
 *   - /clients/form, /clients/form/{id}
 *   - /clients/delete/{id}, /clients/remove/{id}
 *   - /user_clients/form, /user_clients/form/{id}
 *   - /user_clients/delete/{id}
 */

const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy } = require('../../test-helpers');

describe('Clients Module', () => {

  // Routes: /clients, /clients/index
  test('it can view the clients index page', async () => {
    // Arrange: Define the URL
    const url = '/clients/index';
    // Act & Assert: Navigate to the page and check for expected text
    await assertPageLoads(page, url);
    await expect(page.locator('.content-title')).toContainText('Clients');
  });

  // Route: /clients/status/active
  test('it can view the active clients page', async () => {
    await assertPageLoads(page, '/clients/status/active');
    await expect(page.locator('.content-title')).toContainText('Clients');
  });

  // Route: /clients/status/all
  test('it can view the clients archive page', async () => {
    await assertPageLoads(page, '/clients/status/all');
    await expect(page.locator('.content-title')).toContainText('Clients');
  });

  // Route: /clients/status/inactive
  test('it can view the inactive clients page', async () => {
    await assertPageLoads(page, '/clients/status/inactive');
    await expect(page.locator('.content-title')).toContainText('Clients');
  });

  // Route: /user_clients/index
  test('it can view the user clients index', async () => {
    await assertPageLoads(page, '/user_clients/index');
    await expect(page.locator('.content-title')).toContainText('Clients');
  });

  // Route: /clients/view/{id}
  test('it can view a specific client profile', async () => {
    // Arrange: Define the URL with a hardcoded ID
    const url = '/clients/view/956';
    // Act & Assert: Navigate and check for expected text on the profile page
    await assertPageLoads(page, url);
    await expect(page.locator('.content-title')).toContainText('Client Profile');
  });

  // Route: /clients/view/{id}/invoices
  test('it can view a specific client\'s invoices', async () => {
    // Arrange: Define the URL with a hardcoded ID
    const url = '/clients/view/956/invoices';
    // Act & Assert: Navigate and check the page content
    await assertPageLoads(page, url);
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  // Route: /guest/view/{id}
  test('it can view a guest client profile', async () => {
    const url = '/guest/view/956';
    await assertPageLoads(page, url);
    await expect(page.locator('h1')).toContainText('InvoicePlane');
  });

  // Route: /guest/invoice/{id}
  test('it can view a guest invoice', async () => {
    const url = '/guest/invoice/6617';
    await assertPageLoads(page, url);
    await expect(page.locator('h1')).toContainText('Invoice');
  });

  // Route: /guest/quote/{id}
  test('it can view a guest quote', async () => {
    const url = '/guest/quote/2172';
    await assertPageLoads(page, url);
    await expect(page.locator('h1')).toContainText('Quote');
  });

  /**
   * @description Test creating a new client by filling the form with a payload.
   * @payload
   * {
   * "client_name": "$client_name",
   * "client_address_1": "$client_address_1",
   * "client_address_2": "$client_address_2",
   * "client_city": "$client_city",
   * "client_state": "$client_state",
   * "client_zip": "$client_zip",
   * "client_country": "$client_country",
   * "client_phone": "$client_phone",
   * "client_fax": "$client_fax",
   * "client_mobile": "$client_mobile",
   * "client_email": "$client_email",
   * "client_web": "$client_web",
   * "client_tax_id": "$client_tax_id",
   * "client_active": "$client_active"
   * }
   */
  // Route: /clients/form
  test('it can create a new client with payload', async () => {
    const createClientPayload = {
      "client_name": "$client_name",
      "client_address_1": "$client_address_1",
      "client_address_2": "$client_address_2",
      "client_city": "$client_city",
      "client_state": "$client_state",
      "client_zip": "$client_zip",
      "client_country": "$client_country",
      "client_phone": "$client_phone",
      "client_fax": "$client_fax",
      "client_mobile": "$client_mobile",
      "client_email": "$client_email",
      "client_web": "$client_web",
      "client_tax_id": "$client_tax_id",
      "client_active": "$client_active"
    };
    await submitFormWithPayload(page, '/clients/form', 'client', createClientPayload);
  });

  /**
   * @description Test editing an existing client using a specific payload.
   * @payload
   * {
   * "client_name": "$client_name",
   * "client_address_1": "$client_address_1",
   * "client_address_2": "$client_address_2",
   * "client_city": "$client_city",
   * "client_state": "$client_state",
   * "client_zip": "$client_zip",
   * "client_country": "$client_country",
   * "client_phone": "$client_phone",
   * "client_fax": "$client_fax",
   * "client_mobile": "$client_mobile",
   * "client_email": "$client_email",
   * "client_web": "$client_web",
   * "client_tax_id": "$client_tax_id",
   * "client_active": "$client_active"
   * }
   */
  // Route: /clients/form/{id}
  test('it can edit an existing client with payload', async () => {
    const editClientPayload = {
      "client_name": "$client_name",
      "client_address_1": "$client_address_1",
      "client_address_2": "$client_address_2",
      "client_city": "$client_city",
      "client_state": "$client_state",
      "client_zip": "$client_zip",
      "client_country": "$client_country",
      "client_phone": "$client_phone",
      "client_fax": "$client_fax",
      "client_mobile": "$client_mobile",
      "client_email": "$client_email",
      "client_web": "$client_web",
      "client_tax_id": "$client_tax_id",
      "client_active": "$client_active"
    };
    await submitFormWithPayload(page, '/clients/form/956', 'client', editClientPayload);
  });
});
