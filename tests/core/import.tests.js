const {assertPageLoads, assertFormSubmit} = require('../../test-helpers');

describe('Import Module', () => {
    test('it can view import index', async () => {
        await assertPageLoads(page, '/import/index');
    });

    test('it can access import form', async () => {
        await assertPageLoads(page, '/import/form');
    });

    // Optionally, add a form submission test if safe
    test('it can submit import form (dummy payload)', async () => {
        const payload = {
            import_file: 'dummy.csv'
        };
        await assertFormSubmit(page, '/import/form', 'core', payload);
    });
});
