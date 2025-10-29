/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for all `login` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */
const {chromium} = require('playwright');
const {assertPageLoads} = require('../../test-helpers');

let browser;
let page;

beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
});

afterAll(async () => {
    await page.close();
    await browser.close();
});

describe('Sessions Module', () => {
    test('it can view sessions index', async () => {
        await assertPageLoads(page, '/sessions/index');
    });

    test('it can access login page', async () => {
        await assertPageLoads(page, '/sessions/login');
    });

    test('it can access logout route', async () => {
        await assertPageLoads(page, '/sessions/logout');
    });
});
