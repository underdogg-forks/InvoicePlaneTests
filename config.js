// Test/app configuration for InvoicePlane Jest/Playwright tests
module.exports = {
    baseUrl: 'http://ivplv1.test',
    browserOptions: {
        headless: true,
        slowMo: 0,
        viewport: {width: 1280, height: 800}
        // timeout removed for reliability
    },
    login: {
        email: 'a@a.com', // <-- set to your test admin email
        password: 'demopassword'     // <-- set to your test admin password
    },
    logoutPath: '/sessions/logout',
    // Add any other config values your tests need
    testTimeout: 30, // seconds
    timeouts: {
        navigation: 2000, // ms, for page.goto/waitForNavigation
        selector: 2000,   // ms, for waitForSelector
        login: 2000,     // ms, for login-specific waits
    },
    formSaveStrategies: {
        default: ['button[type="submit"]', 'button.save', 'input[type="submit"]'],
        tax_rates: [
            '#btn-submit',
            '[name="btn_submit"]',
            '.btn-success.ajax-loader',
            'button[type="submit"].dropdown-button',
            'button[type="submit"]',
            'button.save',
            'input[type="submit"]'
        ],
    }
};
