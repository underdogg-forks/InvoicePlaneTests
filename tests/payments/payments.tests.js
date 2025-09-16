/**
 * @fileoverview Test suite for the Payments module.
 * This file contains tests for all `payments` routes, including views, forms, deletions, and AJAX actions.
 *
 * Covered routes:
 *   - /payments/index
 *   - /payments/form
 *   - /payments/form/{id}
 *   - /payments/delete/{id}
 *
 * Pending (incomplete) tests for:
 *   - /payments/online_logs (AJAX)
 */
const { submitFormWithPayload, assertPageLoads, assertDestroy } = require('../test-helpers');

describe('Payments Module', () => {
    describe('Create Tests', () => {
        test('it can create a new payment with valid data', async () => {
            const createPaymentPayload = {
                "invoice_id": "$invoice_id",           // Will become "6617"
                "payment_date": "2024-09-15",
                "payment_amount": "50.00",
                "payment_method_id": "$payment_method_id", // Will become "108"
                "payment_note": "Test payment note."
            };
            
            const newId = await submitFormWithPayload(page, '/payments/form', 'payments', createPaymentPayload);
            expect(newId).toBeTruthy();
        });

        test('it can create a payment with minimum required fields', async () => {
            const minimalPaymentPayload = {
                "invoice_id": "$invoice_id",
                "payment_amount": "25.50",
                "payment_method_id": "$payment_method_id"
            };
            
            await submitFormWithPayload(page, '/payments/form', 'payments', minimalPaymentPayload);
        });

        test('it can create a payment with random note', async () => {
            const randomPaymentPayload = {
                "invoice_id": "$invoice_id",
                "payment_date": "2024-09-15", 
                "payment_amount": "100.00",
                "payment_method_id": "$payment_method_id",
                "payment_note": "$payment_note" // Will generate random text
            };
            
            await submitFormWithPayload(page, '/payments/form', 'payments', randomPaymentPayload);
        });
    });

    describe('Read Tests', () => {
        test('it can load the payments index page', async () => {
            await assertPageLoads(page, '/payments');
        });

        test('it can load the payment form page', async () => {
            await assertPageLoads(page, '/payments/form');
        });

        test('it can view payment details', async () => {
            await assertPageLoads(page, '/payments/view/966');
        });
    });

    describe('Update Tests', () => {
        test('it can update an existing payment', async () => {
            const updatePaymentPayload = {
                "payment_amount": "75.00",
                "payment_note": "Updated payment note"
            };
            
            await submitFormWithPayload(page, '/payments/form/966', 'payments', updatePaymentPayload);
        });
    });

    describe('Delete Tests', () => {
        test('it can delete a payment', async () => {
            // Note: This would delete payment ID 966, adjust ID as needed
            await assertDestroy(page, '/payments/delete/966');
        });
    });
});
