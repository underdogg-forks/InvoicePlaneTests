/**
 * @fileoverview Setup file for Jest tests using Playwright.
 * This file handles logging in before all tests and logging out after all tests.
 * Configuration such as baseUrl, login credentials, and logout method are read from config.js.
 */
const config = require('./config');

jest.setTimeout((config.testTimeout || 30) * 1000);

beforeAll(async () => {
    try {
        await page.goto(`${config.baseUrl}/sessions/login`, {waitUntil: 'load', timeout: config.timeouts.navigation});

        await page.waitForSelector('input[name="email"]', {timeout: config.timeouts.selector});
        await page.waitForSelector('input[name="password"]', {timeout: config.timeouts.selector});

        await page.fill('input[name="email"]', config.login.email);
        await page.fill('input[name="password"]', config.login.password);

        await page.waitForSelector('button[type="submit"]', {timeout: config.timeouts.selector});
        await Promise.all([
            page.waitForNavigation({waitUntil: 'load', timeout: config.timeouts.navigation}),
            page.click('button[type="submit"]')
        ]);

        // Debug: print the current URL after login attempt
        const currentUrl = page.url();
        console.log('After login submit, current URL:', currentUrl);

        // Wait for dashboard or fail if login message appears
        await Promise.race([
            page.waitForURL('**/dashboard', {timeout: config.timeouts.login}),
            page.waitForSelector('text=Invalid', {timeout: config.timeouts.login}).then(() => {
                throw new Error('Login failed: invalid credentials or error message shown');
            })
        ]);
    } catch (err) {
        console.error('Setup login failed:', err);
        throw err;
    }
});

afterAll(async () => {
    try {
        if (config.logoutPath) {
            await page.goto(`${config.baseUrl}${config.logoutPath}`, {waitUntil: 'load', timeout: config.timeouts.navigation});
        } else if (config.logoutSelector) {
            await page.waitForSelector(config.logoutSelector, {timeout: config.timeouts.selector});
            await page.click(config.logoutSelector);
        }
        // optional short wait to ensure logout completes
        await page.waitForTimeout(500);
    } catch (err) {
        // non-fatal: cleanup failed
        console.warn('Cleanup during afterAll failed:', err.message || err);
    }
});
