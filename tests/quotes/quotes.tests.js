/**
 * @fileoverview Test suite for the Quotes module.
 * This file contains tests for all `quotes` routes, including views, forms, deletions, and AJAX actions.
 *
 * Covered routes:
 *   - /quotes/index
 *   - /quotes/view/{id}
 *   - /quotes/form, /quotes/form/{id}
 *   - /quotes/delete/{id}, /quotes/cancel/{id}
 *   - /quotes/generate_pdf/{id} (AJAX)
 *
 * Pending (incomplete) tests for:
 *   - /quotes/status/all, /quotes/status/approved, /quotes/status/canceled, /quotes/status/draft, /quotes/status/rejected, /quotes/status/sent, /quotes/status/viewed
 */
const { submitFormWithPayload, assertPageLoads, assertDestroy, assertAjax } = require('../test-helpers');

describe('Quotes Module', () => {
    describe('Create Tests', () => {
        test('it can create a new quote', async () => {
            const createQuotePayload = {
                "client_id": "$client_id",                    // Will become "956"
                "quote_date_created": "2024-09-15",
                "quote_date_expires": "2024-10-15",
                "quote_status_id": "1",                       // Draft status
                "quote_group_id": "$invoice_group_id",        // Will become "40"
                "items[0][item_name]": "Quoted Service",
                "items[0][item_description]": "Service description for quote",
                "items[0][item_quantity]": "1",
                "items[0][item_price]": "250.00"
            };
            
            const newId = await submitFormWithPayload(page, '/quotes/form', 'quotes', createQuotePayload);
            expect(newId).toBeTruthy();
        });

        test('it can create a quote with multiple items', async () => {
            const multiItemQuotePayload = {
                "client_id": "$client_id",
                "quote_date_created": "2024-09-15",
                "quote_date_expires": "2024-10-30",
                "items[0][item_name]": "Consultation",
                "items[0][item_quantity]": "2",
                "items[0][item_price]": "150.00",
                "items[1][item_name]": "Implementation",
                "items[1][item_quantity]": "1",
                "items[1][item_price]": "500.00",
                "items[2][item_name]": "Training",
                "items[2][item_quantity]": "3",
                "items[2][item_price]": "100.00"
            };
            
            await submitFormWithPayload(page, '/quotes/form', 'quotes', multiItemQuotePayload);
        });

        test('it can create a quote with tax rates', async () => {
            const taxQuotePayload = {
                "client_id": "$client_id",
                "quote_date_created": "2024-09-15",
                "quote_date_expires": "2024-10-15",
                "items[0][item_name]": "Taxable Service",
                "items[0][item_quantity]": "1",
                "items[0][item_price]": "200.00",
                "items[0][item_tax_rate_id]": "$tax_rate_id"   // Will become "131"
            };
            
            await submitFormWithPayload(page, '/quotes/form', 'quotes', taxQuotePayload);
        });
    });

    describe('Read Tests', () => {
        test('it can load the quotes index page', async () => {
            await assertPageLoads(page, '/quotes');
        });

        test('it can load the quote form page', async () => {
            await assertPageLoads(page, '/quotes/form');
        });

        test('it can view quote details', async () => {
            // Using the hardcoded quote ID from test helpers
            await assertPageLoads(page, '/quotes/view/2172');
        });

        test('it can generate quote PDF', async () => {
            await assertAjax(page, '/quotes/generate_pdf/2172');
        });

        test('it can load quote edit form', async () => {
            await assertPageLoads(page, '/quotes/form/2172');
        });
    });

    describe('Update Tests', () => {
        test('it can update quote details', async () => {
            const updateQuotePayload = {
                "quote_date_expires": "2024-12-15",
                "quote_status_id": "2",                       // Sent status
                "quote_notes": "Updated quote with extended expiry"
            };
            
            await submitFormWithPayload(page, '/quotes/form/2172', 'quotes', updateQuotePayload);
        });

        test('it can update quote items and pricing', async () => {
            const updateItemsPayload = {
                "items[0][item_name]": "Updated Service Name",
                "items[0][item_description]": "Updated service description",
                "items[0][item_quantity]": "2",
                "items[0][item_price]": "300.00"
            };
            
            await submitFormWithPayload(page, '/quotes/form/2172', 'quotes', updateItemsPayload);
        });
    });

    describe('Status Tests', () => {
        test('it can mark quote as sent', async () => {
            const sentStatusPayload = {
                "quote_status_id": "2"                        // Sent status
            };
            
            await submitFormWithPayload(page, '/quotes/form/2172', 'quotes', sentStatusPayload);
        });

        test('it can mark quote as approved', async () => {
            const approvedStatusPayload = {
                "quote_status_id": "3"                        // Approved status
            };
            
            await submitFormWithPayload(page, '/quotes/form/2172', 'quotes', approvedStatusPayload);
        });

        test('it can mark quote as rejected', async () => {
            const rejectedStatusPayload = {
                "quote_status_id": "4"                        // Rejected status
            };
            
            await submitFormWithPayload(page, '/quotes/form/2172', 'quotes', rejectedStatusPayload);
        });
    });

    describe('Conversion Tests', () => {
        test('it can convert quote to invoice', async () => {
            // This would typically be a special endpoint or form
            const convertPayload = {
                "quote_id": "$quote_id",                      // Will become "2172"
                "invoice_date_created": "2024-09-16",
                "invoice_date_due": "2024-10-16"
            };
            
            await submitFormWithPayload(page, '/quotes/convert_to_invoice/2172', 'invoices', convertPayload);
        });
    });

    describe('Copy Tests', () => {
        test('it can copy an existing quote', async () => {
            const copyQuotePayload = {
                "client_id": "$client_id",
                "quote_date_created": "2024-09-16",
                "quote_date_expires": "2024-11-16"
            };
            
            await submitFormWithPayload(page, '/quotes/copy/2172', 'quotes', copyQuotePayload);
        });
    });

    describe('Delete Tests', () => {
        test('it can delete a quote', async () => {
            // Note: Adjust quote ID as needed for your test data
            await assertDestroy(page, '/quotes/delete/2172');
        });
    });
});
