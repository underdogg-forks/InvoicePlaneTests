const TestRunner = require('../testrunner');

module.exports = {
    async it_can_view_the_invoices_index(page, runner) {
        const route = runner.getRoute('invoices', '/invoices/index');
        if (!route) throw new Error('Route not found.');
        
        await runner.handleView(page, route.url, route.module);
        
        // Example of a specific assertion for an index test
        const table = await page.locator('table#invoice-table').count();
        expect(table).toBe(1);
    }
};
