/**
 * @fileoverview Test suite for the Dashboard route of the Core module.
 *
 * Covered routes:
 *   - /dashboard
 *
 * All other exotic routes are covered in their respective test files.
 */
const config = require('../../config');

describe('Dashboard Module', () => {
    test('it can view the dashboard', async () => {
        // Assert we are on the dashboard
        expect(page.url()).toContain('/dashboard');
    });
});
