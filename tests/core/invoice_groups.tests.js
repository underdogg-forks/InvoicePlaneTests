/**
 * @fileoverview Test suite for the Core module (moved from invoices).
 * This file contains tests for all `invoice_groups` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */

const {assertPageLoads, assertFormSubmit, assertDestroy} = require('../../test-helpers');

describe('Invoice Groups Module', () => {

    // View Routes
    test('it can view invoice groups index', async () => {
        await assertPageLoads(page, '/invoice_groups/index');
    });

    // Form Routes
    test('it can create a new invoice group', async () => {
        const payload = {
            invoice_group_name: 'Test Group ' + Date.now(),
            invoice_group_prefix: 'TG' + Math.floor(Math.random() * 1000)
        };
        await assertFormSubmit(page, '/invoice_groups/form', 'invoices', payload);
    });

    test('it can edit an existing invoice group by id', async () => {
        const payload = {
            invoice_group_name: 'Edited Group ' + Date.now(),
            invoice_group_prefix: 'EG' + Math.floor(Math.random() * 1000)
        };
        await assertFormSubmit(page, '/invoice_groups/form/40', 'invoices', payload);
    });

    // Destroy Routes
    test('it can delete an invoice group', async () => {
        await assertDestroy(page, '/invoice_groups/delete/1');
    });
});
