/**
 * @fileoverview Test suite for the Custom Values component of the Core module.
 *
 * Covered routes:
 *   - /custom_values
 *   - /custom_values/create, /custom_values/create/{id}
 *   - /custom_values/delete/{id}
 *   - /custom_values/field, /custom_values/field/{id}
 *
 * All relevant routes from routes.json are covered by tests in this file.
 */
const {assertPageLoads, assertFormSubmit, assertDestroy, assertAjax} = require('../../test-helpers');

describe('Custom Values Module', () => {

    // View Routes
    test('it can view custom values index', async () => {
        await assertPageLoads(page, '/custom_values');
    });

    // Form Routes
    test('it can create a new custom value', async () => {
        const payload = {
            custom_field_id: '171',
            custom_field_value: 'Test Value ' + Date.now()
        };
        await assertFormSubmit(page, '/custom_values/create/', 'core', payload);
    });

    test('it can create a new custom value for field by id', async () => {
        const payload = {
            custom_field_id: '171',
            custom_field_value: 'Test Value ' + Date.now()
        };
        await assertFormSubmit(page, '/custom_values/create/171', 'core', payload);
    });

    // Destroy Routes
    test('it can delete a custom value', async () => {
        await assertDestroy(page, '/custom_values/delete/1');
    });

    // AJAX Routes
    test('it can get custom values field without id', async () => {
        await assertAjax(page, '/custom_values/field/');
    });

    test('it can get custom values field by id', async () => {
        await assertAjax(page, '/custom_values/field/171');
    });
});
