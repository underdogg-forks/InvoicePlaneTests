// New testrunner.js
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const config = require('./config');

const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json')));

class TestRunner {
    constructor() {
        this.baseUrl = config.baseUrl.replace(/\/$/, '');
        this.browserOptions = config.browserOptions;
        this.loginConfig = config.login;
        this.formSaveStrategies = config.formSaveStrategies;
    }

    async run(testName) {
        const browser = await chromium.launch(this.browserOptions);
        const context = await browser.newContext();
        const page = await context.newPage();

        page.setDefaultTimeout(this.browserOptions.timeout);

        console.log(`\nStarting test: ${testName}`);

        try {
            await this.login(page);

            const testModule = require(path.join(__dirname, 'tests', `${testName}.js`));
            if (testModule && typeof testModule[testName] === 'function') {
                await testModule[testName](page, this);
            } else {
                throw new Error(`Test function "${testName}" not found.`);
            }
            
            console.log(`✅ Test passed: ${testName}`);
        } catch (err) {
            console.error(`❌ Test failed: ${testName}`, err);
        } finally {
            await browser.close();
        }
    }

    async login(page) {
        await page.goto(`${this.baseUrl}/sessions/login`);
        await page.fill('input[name="email"]', this.loginConfig.email);
        await page.fill('input[name="password"]', this.loginConfig.password);
        await page.click('button[type="submit"]');
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});
        console.log('Logged in');
    }

    // Handlers for different test types
    async handleView(page, url, module) {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        // Add assertions here, e.g., for status code and content
        // This is a placeholder for your specific assertions
        if (page.url() !== url) {
            throw new Error(`URL mismatch. Expected: ${url}, Actual: ${page.url()}`);
        }
    }

    async handleForm(page, url, module) {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const form = await page.$('form');
        if (!form) throw new Error('No form found');

        await this.fillForm(form);
        await this.submitForm(page, module);

        const alert = await page.locator('.alert-success').first();
        if (await alert.count() > 0) {
            console.log('Form saved successfully');
        } else {
            console.warn('No success alert detected');
        }
    }
    
    // ... (other handlers like handleDestroy, handleAjax, handleExotic)
    
    async fillForm(form) {
        const inputs = await form.$$('input, textarea, select');
        for (const input of inputs) {
            const name = await input.evaluate(el => el.name);
            if (!name) continue;

            const type = await input.evaluate(el => el.type?.toLowerCase() || el.tagName.toLowerCase());
            if (await input.evaluate(el => el.disabled || el.readOnly)) continue;

            switch (type) {
                case 'text':
                case 'textarea':
                    await input.fill(`Test ${name} ${Date.now()}`);
                    break;
                case 'email':
                    await input.fill(`test${Date.now()}@example.com`);
                    break;
                case 'number':
                    await input.fill(`${Math.floor(Math.random() * 1000)}`);
                    break;
                case 'select':
                    await input.selectOption({index: 1}).catch(() => {});
                    break;
            }
        }
    }

    async submitForm(page, module) {
        const strategies = this.formSaveStrategies[module] || this.formSaveStrategies.default;
        for (const sel of strategies) {
            const button = page.locator(sel).first();
            if (await button.count() > 0) {
                console.log(`Submitting form using: ${sel}`);
                await button.click();
                await page.waitForLoadState('domcontentloaded');
                return;
            }
        }
        throw new Error('No save button found for module: ' + module);
    }

    // Helper to find a route by its module and path
    getRoute(module, url) {
        const moduleRoutes = routes.find(r => r.module === module);
        if (moduleRoutes) {
            for (const type in moduleRoutes.routes) {
                if (moduleRoutes.routes[type].includes(url)) {
                    return { url, type, module };
                }
            }
        }
        return null;
    }
}

if (require.main === module) {
    (async () => {
        const testRunner = new TestRunner();
        const args = process.argv.slice(2);
        const filterArg = args.find(arg => arg.startsWith('--filter='));
        if (filterArg) {
            const testName = filterArg.split('=')[1];
            await testRunner.run(testName);
        } else {
            // Logic to find and run all tests if no filter is provided
            console.warn('No filter provided. Running all tests is not implemented in this version.');
        }
    })();
}

module.exports = TestRunner;

