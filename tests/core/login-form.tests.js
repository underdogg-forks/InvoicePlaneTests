const {submitFormWithPayload} = require('../../test-helpers');

describe('Login Form', () => {
    test('should log in with valid credentials', async () => {
        await page.goto('http://ivplv1.test/sessions/login');
        await page.waitForSelector('input[name="email"], input[type="email"]');
        await page.fill('input[name="email"], input[type="email"]', require('../../config').login.email);
        await page.fill('input[name="password"], input[type="password"]', require('../../config').login.password);
        await page.click('button[type="submit"], input[type="submit"]');
        // Wait for either navigation away from login or an error message
        try {
            await Promise.race([
                page.waitForNavigation({waitUntil: 'networkidle', timeout: 10000}),
                page.waitForSelector('text=Invalid', {timeout: 10000})
            ]);
        } catch (e) {
            // Only try to get page content if the page is not closed
            if (!page.isClosed()) {
                const content = await page.content();
                console.error('Login failed or timed out. Page content:', content);
            } else {
                console.error('Login failed or timed out. Page was already closed.');
            }
            throw e;
        }
        expect(page.url()).not.toContain('/sessions/login');
        expect(page.url()).toContain('/dashboard');
        // Assert dashboard content (optional, for extra robustness)
        const dashboardText = await page.textContent('body');
        expect(dashboardText.toLowerCase()).toContain('dashboard');
    });
});
