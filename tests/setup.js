/**
 * @fileoverview Setup file for Jest tests using Playwright.
 * This file handles logging in before all tests and logging out after all tests.
 * Configuration such as baseUrl, login credentials, and logout method are read from config.js.
 */
const config = require('./config');

// Set shorter timeout for debugging (5 seconds instead of 30)
jest.setTimeout((config.testTimeout || 10) * 1000);

beforeAll(async () => {
    try {
        console.log('Starting login process...');
        
        // Add debugging listeners
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log('Browser console error:', msg.text());
            }
        });

        page.on('pageerror', err => {
            console.log('Page JavaScript error:', err.message);
        });

        page.on('requestfailed', request => {
            console.log('Failed request:', request.url(), request.failure()?.errorText);
        });

        console.log(`Navigating to login: ${config.baseUrl}/sessions/login`);
        await page.goto(`${config.baseUrl}/sessions/login`, {
            waitUntil: 'domcontentloaded', // Changed from 'load' to be faster
            timeout: config.timeouts.navigation
        });

        console.log('Waiting for email input...');
        await page.waitForSelector('input[name="email"]', {timeout: config.timeouts.selector});
        
        console.log('Waiting for password input...');
        await page.waitForSelector('input[name="password"]', {timeout: config.timeouts.selector});

        console.log('Filling login credentials...');
        await page.fill('input[name="email"]', config.login.email);
        await page.fill('input[name="password"]', config.login.password);

        console.log('Waiting for submit button...');
        await page.waitForSelector('button[type="submit"]', {timeout: config.timeouts.selector});
        
        console.log('Clicking submit and waiting for navigation...');
        // More reliable login submission
        await Promise.all([
            page.waitForURL('**/dashboard', {timeout: config.timeouts.login}).catch(() => 
                page.waitForURL(url => !url.includes('/sessions/login'), {timeout: config.timeouts.login})
            ),
            page.click('button[type="submit"]')
        ]);

        // Debug: print the current URL after login attempt
        const currentUrl = page.url();
        console.log('After login submit, current URL:', currentUrl);

        // Additional check for successful login
        if (currentUrl.includes('/sessions/login')) {
            // Still on login page, check for error messages
            const errorText = await page.textContent('body');
            if (errorText.includes('Invalid') || errorText.includes('error')) {
                throw new Error('Login failed: still on login page with error message');
            }
        }
        
        console.log('Login successful!');
    } catch (err) {
        console.error('Setup login failed:', err);
        console.log('Current URL:', page.url());
        console.log('Page title:', await page.title().catch(() => 'Unknown'));
        throw err;
    }
});

afterAll(async () => {
    try {
        console.log('Starting logout process...');
        if (config.logoutPath) {
            await page.goto(`${config.baseUrl}${config.logoutPath}`, {
                waitUntil: 'domcontentloaded',
                timeout: config.timeouts.navigation
            });
        } else if (config.logoutSelector) {
            await page.waitForSelector(config.logoutSelector, {timeout: config.timeouts.selector});
            await page.click(config.logoutSelector);
        }
        // optional short wait to ensure logout completes
        await page.waitForTimeout(500);
        console.log('Logout completed');
    } catch (err) {
        // non-fatal: cleanup failed
        console.warn('Cleanup during afterAll failed:', err.message || err);
    }
});
