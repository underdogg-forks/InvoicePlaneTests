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

    async runAll() {
        for (const route of routes) {
            try {
                await this.runTest(route);
            } catch (err) {
                console.error(`❌ Test failed for ${route.url}:`, err);
            }
        }
    }

    async runTest(route) {
        const browser = await chromium.launch(this.browserOptions);
        const context = await browser.newContext();
        const page = await context.newPage();

        page.setDefaultTimeout(this.browserOptions.timeout);

        console.log(`\nTesting ${route.url} [${route.type}]`);

        try {
            await this.login(page);

            switch (route.type) {
                case 'view':
                case 'index':
                    await this.handleViewOrIndex(page, route);
                    break;
                case 'create/edit':
                    await this.handleForm(page, route);
                    break;
                case 'destroy':
                    await this.handleDestroy(page, route);
                    break;
                case 'ajax':
                    await this.handleAjax(page, route);
                    break;
                case 'exotic':
                    await this.handleExotic(page, route);
                    break;
                default:
                    console.warn('Unknown route type', route.type);
            }

        } catch (err) {
            console.error(`❌ Error on ${route.url}: ${err.message}`);
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

    async handleViewOrIndex(page, route) {
        await page.goto(route.url, {waitUntil: 'domcontentloaded'});
        console.log(`${route.type} loaded: ${route.url}`);
    }

    async handleForm(page, route) {
        await page.goto(route.url, {waitUntil: 'domcontentloaded'});
        const form = await page.$('form');
        if (!form) throw new Error('No form found');

        await this.fillForm(form);

        await this.submitForm(page, route.module);

        const alert = await page.locator('.alert-success').first();
        if (await alert.count() > 0) {
            console.log('Form saved successfully');
        } else {
            console.warn('No success alert detected');
        }
    }

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

    async handleDestroy(page, route) {
        await page.goto(route.url, {waitUntil: 'domcontentloaded'});
        console.log(`Destroy executed for ${route.url}`);
    }

    async handleAjax(page, route) {
        await page.goto(route.url, {waitUntil: 'domcontentloaded'});
        console.log(`AJAX route accessed: ${route.url}`);
    }

    async handleExotic(page, route) {
        await page.goto(route.url, {waitUntil: 'domcontentloaded'});
        console.log(`Exotic route accessed: ${route.url}`);
    }
}

if (require.main === module) {
    (async () => {
        const runner = new TestRunner();
        await runner.runAll();
    })();
}

module.exports = TestRunner;
