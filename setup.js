/**
 * @fileoverview Setup file for Jest tests using Playwright.
 * This file handles logging in before all tests and logging out after all tests.
 * Configuration such as baseUrl, login credentials, and logout method are read from config.js.
 */
const { page } = require('jest-playwright-preset');
const config = require('./config');

jest.setTimeout((config.testTimeout || 30) * 1000);

beforeAll(async () => {
    try {
        await page.goto(`${config.baseUrl}/sessions/login`, { waitUntil: 'networkidle' });

        await page.waitForSelector('input[name="email"]', { timeout: 5000 });
        await page.waitForSelector('input[name="password"]', { timeout: 5000 });

        await page.fill('input[name="email"]', config.login.email);
        await page.fill('input[name="password"]', config.login.password);

        await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
        await page.click('button[type="submit"]');

        // Wait for dashboard or fail if login message appears
        await Promise.race([
            page.waitForURL('**/dashboard', { timeout: 15000 }),
            page.waitForSelector('text=Invalid', { timeout: 15000 }).then(() => { throw new Error('Login failed: invalid credentials or error message shown'); })
        ]);
    } catch (err) {
        console.error('Setup login failed:', err);
        throw err;
    }
});

afterAll(async () => {
    try {
        if (config.logoutPath) {
            await page.goto(`${config.baseUrl}${config.logoutPath}`, { waitUntil: 'networkidle' });
        } else if (config.logoutSelector) {
            await page.waitForSelector(config.logoutSelector, { timeout: 5000 });
            await page.click(config.logoutSelector);
        }
        // optional short wait to ensure logout completes
        await page.waitForTimeout(500);
    } catch (err) {
        // non-fatal: cleanup failed
        console.warn('Cleanup during afterAll failed:', err.message || err);
    }
});
