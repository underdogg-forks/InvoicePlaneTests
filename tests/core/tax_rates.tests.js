/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for all `tax_rates` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */
const {assertPageLoads, assertFormSubmit, assertDestroy} = require('../../test-helpers');

describe('Tax Rates Module', () => {

    // View Routes
    test('it can view tax rates index', async () => {
        await assertPageLoads(page, '/tax_rates/index');
    });

    // Form Routes
    test('it can create a new tax rate', async () => {
        const payload = {
            tax_rate_name: 'Test Rate ' + Date.now(),
            tax_rate_percent: '15'
        };
        await assertFormSubmit(page, '/tax_rates/form', 'tax_rates', payload);
    });

    test('it can edit an existing tax rate by id', async () => {
        const payload = {
            tax_rate_name: 'Edited Rate ' + Date.now(),
            tax_rate_percent: '20'
        };
        await assertFormSubmit(page, '/tax_rates/form/131', 'tax_rates', payload);
    });

    // Destroy Routes
    test('it can delete a tax rate', async () => {
        const payload = {
            tax_rate_name: 'Delete Rate ' + Date.now(),
            tax_rate_percent: '25'
        };
        const newId = await assertFormSubmit(page, '/tax_rates/form', 'tax_rates', payload);
        expect(newId).toBeTruthy();
        await assertDestroy(page, `/tax_rates/delete/${newId}`);
    });
});
