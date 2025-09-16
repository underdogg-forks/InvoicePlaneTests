/**
 * @fileoverview Test suite for the Guest component of the Clients module.
 * This file contains tests for all guest-related routes.
 *
 * Covered routes:
 *   - /guest/view/{id}
 *   - /guest/invoice/{id}
 *   - /guest/quote/{id}
 *
 * Pending (incomplete) tests for:
 *   - None (all guest routes are covered)
 */

const {assertPageLoads} = require('../../test-helpers');

describe('Guest Module', () => {

    // View Routes
    test('it can view guest client profile by id', async () => {
        await assertPageLoads(page, '/guest/view/837');
    });

    test('it can view guest invoice by id', async () => {
        await assertPageLoads(page, '/guest/invoice/6617');
    });

    test('it can view guest quote by id', async () => {
        await assertPageLoads(page, '/guest/quote/2172');
    });
});
