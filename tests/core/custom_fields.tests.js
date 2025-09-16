/**
 * @fileoverview Test suite for the Custom Fields component of the Core module.
 * This file contains tests for all `custom_fields` and `custom_values` routes.
 *
 * Covered routes:
 *   - /custom_fields, /custom_fields/index
 *   - /custom_values
 *
 * Pending (incomplete) tests for:
 *   - /custom_fields/form, /custom_fields/form/{id}
 *   - /custom_fields/delete/{id}
 *   - /custom_fields/table/all, /custom_fields/table/client, /custom_fields/table/invoice, /custom_fields/table/payment, /custom_fields/table/quote, /custom_fields/table/user
 */
const {assertPageLoads} = require('../../test-helpers');

describe('Custom Fields Component', () => {
    // Routes: /custom_fields, /custom_fields/index
    test('it can view the custom fields index page', async () => {
        await assertPageLoads(page, '/custom_fields/index');
        await expect(page.locator('.content-title')).toContainText('Custom Fields');
    });

    // Route: /custom_values
    test('it can view the custom values page', async () => {
        await assertPageLoads(page, '/custom_values');
        await expect(page.locator('.content-title')).toContainText('Custom Values');
    });

    // --- Incomplete tests for missing routes ---
    test.skip('it can create a new custom field (form)', async () => {
        // TODO: Implement test for /custom_fields/form
    });
    test.skip('it can edit a custom field by id (form)', async () => {
        // TODO: Implement test for /custom_fields/form/{id}
    });
    test.skip('it can delete a custom field', async () => {
        // TODO: Implement test for /custom_fields/delete/{id}
    });
    test.skip('it can get all custom fields (AJAX)', async () => {
        // TODO: Implement test for /custom_fields/table/all
    });
    test.skip('it can get client custom fields (AJAX)', async () => {
        // TODO: Implement test for /custom_fields/table/client
    });
    test.skip('it can get invoice custom fields (AJAX)', async () => {
        // TODO: Implement test for /custom_fields/table/invoice
    });
    test.skip('it can get payment custom fields (AJAX)', async () => {
        // TODO: Implement test for /custom_fields/table/payment
    });
    test.skip('it can get quote custom fields (AJAX)', async () => {
        // TODO: Implement test for /custom_fields/table/quote
    });
    test.skip('it can get user custom fields (AJAX)', async () => {
        // TODO: Implement test for /custom_fields/table/user
    });
});
