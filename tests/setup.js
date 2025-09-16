/**
 * @fileoverview Setup file for Jest tests using Playwright.
 * This file handles logging in before all tests and logging out after all tests.
 * Also handles beforeEach and afterEach for individual tests.
 * Configuration such as baseUrl, login credentials, and logout method are read from config.js.
 */
const config = require('../config');

// Set timeout from config (default 10 seconds)
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
            waitUntil: 'domcontentloaded',
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

// Global beforeEach for all tests
beforeEach(async () => {
    try {
        // Navigate back to dashboard before each test for clean state
        if (!page.url().includes('/dashboard')) {
            console.log('Navigating to dashboard before test...');
            await page.goto(`${config.baseUrl}/dashboard`, {
                waitUntil: 'domcontentloaded',
                timeout: config.timeouts.navigation
            });
        }
        
        // Clear any existing alerts or notifications
        const alerts = await page.$$('.alert, .notification, .toast');
        for (const alert of alerts) {
            const closeBtn = await alert.$('.close, .btn-close, [data-dismiss]');
            if (closeBtn) {
                await closeBtn.click().catch(() => {}); // Ignore if fails
            }
        }
        
        // Log test start
        const testName = expect.getState().currentTestName || 'Unknown Test';
        console.log(`\n=== Starting Test: ${testName} ===`);
        
    } catch (err) {
        console.warn('beforeEach setup warning:', err.message);
        // Don't throw - let test continue
    }
});

// Global afterEach for all tests  
afterEach(async () => {
    try {
        const testName = expect.getState().currentTestName || 'Unknown Test';
        const currentUrl = page.url();
        
        console.log(`=== Test Complete: ${testName} ===`);
        console.log(`Final URL: ${currentUrl}`);
        
        // Take screenshot on test failure (if implemented)
        const testResult = expect.getState();
        if (testResult.assertionCalls > 0) {
            // Test had assertions - check if we should take screenshot
            // This is a placeholder for screenshot logic
        }
        
        // Clean up any open modals or dialogs
        const modals = await page.$$('.modal, .dialog, [role="dialog"]');
        for (const modal of modals) {
            const closeBtn = await modal.$('.close, .btn-close, [data-dismiss="modal"]');
            if (closeBtn) {
                await closeBtn.click().catch(() => {});
            } else {
                // Try pressing ESC to close modal
                await page.keyboard.press('Escape').catch(() => {});
            }
        }
        
        // Log any console errors that occurred during test
        // (These are captured by the listeners set up in beforeAll)
        
    } catch (err) {
        console.warn('afterEach cleanup warning:', err.message);
        // Don't throw - test is done anyway
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
