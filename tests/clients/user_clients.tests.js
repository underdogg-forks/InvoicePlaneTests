/**
 * @fileoverview Test suite for the User Clients component of the Clients module.
 * This file contains tests for all `user_clients` routes, including views, forms, and deletions.
 *
 * Covered routes:
 *   - /user_clients/index
 *   - /user_clients/form
 *   - /user_clients/form/{id}
 *   - /user_clients/delete/{id}
 *
 * Pending (incomplete) tests for:
 *   - None (all user_clients routes are covered)
 */

const {assertPageLoads, assertFormSubmit, assertDestroy} = require('../../test-helpers');

describe('User Clients Module', () => {

    // View Routes
    test('it can view user clients index', async () => {
        await assertPageLoads(page, '/user_clients/index');
    });

    // Form Routes
    test('it can create a new user client', async () => {
        const payload = {
            user_id: '1',
            client_id: '956'
        };
        await assertFormSubmit(page, '/user_clients/form', 'user_clients', payload);
    });

    test('it can edit a user client by id', async () => {
        const payload = {
            user_id: '1',
            client_id: '956'
        };
        await assertFormSubmit(page, '/user_clients/form/1', 'user_clients', payload);
    });

    // Destroy Routes
    test('it can delete a user client', async () => {
        await assertDestroy(page, '/user_clients/delete/1');
    });
});
