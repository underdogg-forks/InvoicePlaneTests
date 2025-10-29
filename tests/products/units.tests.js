/**
 * @fileoverview Test suite for the Units component of the Products module.
 * This file contains tests for all `units` routes.
 *
 * Covered routes:
 *   - /units/index
 *   - /units/form
 *   - /units/form/{id}
 *
 * Pending (incomplete) tests for:
 *   - /units/delete/{id}
 */
const {assertPageLoads, submitFormWithPayload} = require('../../test-helpers');

describe('Units Component', () => {
    // Routes: /units/index
    test('it can view the units index', async () => {
        await assertPageLoads(page, '/units/index');
        await expect(page.locator('.content-title')).toContainText('Units');
    });

    /**
     * @description Test creating a new unit.
     * @payload
     * {
     * "unit_name": "$unit_name"
     * }
     */
    // Route: /units/form
    test('it can create a new unit', async () => {
        const createUnitPayload = {
            "unit_name": "Test Unit"
        };
        await submitFormWithPayload(page, '/units/form', 'units', createUnitPayload);
    });

    /**
     * @description Test editing an existing unit.
     * @payload
     * {
     * "unit_name": "$unit_name"
     * }
     */
    // Route: /units/form/{id}
    test('it can edit an existing unit', async () => {
        const editUnitPayload = {
            "unit_name": "Edited Unit"
        };
        await submitFormWithPayload(page, '/units/form/59', 'units', editUnitPayload);
    });

    // Route: /units/delete/{id}
    test.skip('it can delete a unit', async () => {
        // TODO: Implement test for /units/delete/{id}
    });
});
