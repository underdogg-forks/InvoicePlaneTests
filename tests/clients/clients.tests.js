/**
 * @fileoverview Test suite for the Clients module.
 * This file contains tests for all `clients` and related guest routes, including views, forms, and deletions.
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
const { submitFormWithPayload, assertPageLoads, assertDestroy } = require('../../test-helpers');

describe('Clients Module', () => {
    describe('Create Tests', () => {
        test('it can create a new client with full details', async () => {
            const createClientPayload = {
                "client_name": "$client_name",                    // Will generate random
                "client_surname": "$client_surname",              // Will generate random  
                "client_email": "test@example.com",
                "client_phone": "555-0123",
                "client_address_1": "123 Test Street",
                "client_city": "Test City",
                "client_state": "Test State",
                "client_zip": "12345",
                "client_country": "US"
            };
            
            const newId = await submitFormWithPayload(page, '/clients/form', 'clients', createClientPayload);
            expect(newId).toBeTruthy();
        });

        test('it can create a client with minimal information', async () => {
            const minimalClientPayload = {
                "client_name": "$client_name",
                "client_email": "minimal@example.com"
            };
            
            await submitFormWithPayload(page, '/clients/form', 'clients', minimalClientPayload);
        });

        test('it can create a business client', async () => {
            const businessClientPayload = {
                "client_name": "Test Business Corp",
                "client_email": "business@example.com",
                "client_phone": "555-0199",
                "client_address_1": "456 Business Blvd",
                "client_city": "Business City",
                "client_country": "US",
                "client_tax_code": "TAX123456"
            };
            
            await submitFormWithPayload(page, '/clients/form', 'clients', businessClientPayload);
        });
    });

    describe('Read Tests', () => {
        test('it can load the clients index page', async () => {
            await assertPageLoads(page, '/clients');
        });

        test('it can load the client form page', async () => {
            await assertPageLoads(page, '/clients/form');
        });

        test('it can view client details', async () => {
            // Using the hardcoded client ID from your test helpers
            await assertPageLoads(page, '/clients/view/956');
        });

        test('it can load client edit form', async () => {
            await assertPageLoads(page, '/clients/form/956');
        });
    });

    describe('Update Tests', () => {
        test('it can update client contact information', async () => {
            const updateClientPayload = {
                "client_phone": "555-9999",
                "client_email": "updated@example.com",
                "client_address_1": "Updated Address 789"
            };
            
            await submitFormWithPayload(page, '/clients/form/956', 'clients', updateClientPayload);
        });

        test('it can update client business details', async () => {
            const updateBusinessPayload = {
                "client_name": "Updated Business Name",
                "client_tax_code": "NEWTAX789"
            };
            
            await submitFormWithPayload(page, '/clients/form/956', 'clients', updateBusinessPayload);
        });
    });

    describe('Delete Tests', () => {
        test('it can delete a client', async () => {
            // Note: Adjust client ID as needed for your test data
            await assertDestroy(page, '/clients/delete/956');
        });
    });
});
