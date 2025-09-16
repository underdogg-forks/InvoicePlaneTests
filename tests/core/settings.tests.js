/**
 * @fileoverview Test suite for the Settings component of the Core module.
 * This file contains tests for all `settings` routes.
 *
 * Covered routes:
 *   - /settings
 *
 * Pending (incomplete) tests for:
 *   - None (all settings routes are covered)
 */
const {assertPageLoads} = require('../../test-helpers');

describe('Settings Module', () => {

    // View Routes
    test('it can view system settings', async () => {
        await assertPageLoads(page, '/settings');
    });
});
