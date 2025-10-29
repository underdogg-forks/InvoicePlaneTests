const {chromium} = require('playwright');
const fs = require('fs');
const path = require('path');

function randomText(length = 12) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
    let text = "";
    for (let i = 0; i < length; i++) text += chars[Math.floor(Math.random() * chars.length)];
    return text;
}

function randomEmail() {
    return `${randomText(8).replace(/\s/g, '').toLowerCase()}@example.com`;
}

function randomPhone() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

class EnhancedCrawler {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl.replace(/\/$/, "");
        this.domain = new URL(baseUrl).hostname;
        this.maxPages = options.maxPages || 100;

        // Reduced timeouts to speed up crawling
        this.pageTimeout = options.pageTimeout || 10000; // 10s instead of 30s
        this.formTimeout = options.formTimeout || 3000;  // 3s for form operations
        this.navigationTimeout = options.navigationTimeout || 15000; // 15s for navigation

        this.pageCount = 0;
        this.visitedUrls = new Set();
        this.submittedForms = new Set();
        this.networkRequests = [];
        this.ajaxRequests = [];
        this.formSubmissions = [];
        this.context = null;
        this.isLoggedIn = true;

        // Predefined canonical routes to avoid unnecessary route discovery
        this.canonicalRoutes = new Set([
            `${this.baseUrl}`,
            `${this.baseUrl}/clients/form`,
            `${this.baseUrl}/clients/form/956`,
            `${this.baseUrl}/clients/index`,
            `${this.baseUrl}/clients/status/active`,
            `${this.baseUrl}/clients/status/all`,
            `${this.baseUrl}/clients/status/inactive`,
            `${this.baseUrl}/clients/view/837`,
            `${this.baseUrl}/clients/view/837/invoices`,
            `${this.baseUrl}/custom_fields`,
            `${this.baseUrl}/custom_fields/form`,
            `${this.baseUrl}/custom_fields/form/171`,
            `${this.baseUrl}/custom_fields/index`,
            `${this.baseUrl}/custom_fields/table/all`,
            `${this.baseUrl}/custom_fields/table/client`,
            `${this.baseUrl}/custom_fields/table/invoice`,
            `${this.baseUrl}/custom_fields/table/payment`,
            `${this.baseUrl}/custom_fields/table/quote`,
            `${this.baseUrl}/custom_fields/table/user`,
            `${this.baseUrl}/custom_values`,
            `${this.baseUrl}/custom_values/create/`,
            `${this.baseUrl}/custom_values/create/171`,
            `${this.baseUrl}/custom_values/field/`,
            `${this.baseUrl}/custom_values/field/171`,
            `${this.baseUrl}/dashboard`,
            `${this.baseUrl}/email_templates/form`,
            `${this.baseUrl}/email_templates/form/6`,
            `${this.baseUrl}/email_templates/index`,
            `${this.baseUrl}/families/form`,
            `${this.baseUrl}/families/form/55`,
            `${this.baseUrl}/families/index`,
            `${this.baseUrl}/import`,
            `${this.baseUrl}/import/form`,
            `${this.baseUrl}/invoice_groups/form`,
            `${this.baseUrl}/invoice_groups/form/40`,
            `${this.baseUrl}/invoice_groups/index`,
            `${this.baseUrl}/invoices/archive`,
            `${this.baseUrl}/invoices/generate_pdf/6290`,
            `${this.baseUrl}/invoices/index`,
            `${this.baseUrl}/invoices/recurring/`,
            `${this.baseUrl}/invoices/recurring/index`,
            `${this.baseUrl}/invoices/recurring/stop/133`,
            `${this.baseUrl}/invoices/status/all`,
            `${this.baseUrl}/invoices/status/draft`,
            `${this.baseUrl}/invoices/status/overdue`,
            `${this.baseUrl}/invoices/status/paid`,
            `${this.baseUrl}/invoices/status/sent`,
            `${this.baseUrl}/invoices/status/viewed`,
            `${this.baseUrl}/invoices/view/6617`,
            `${this.baseUrl}/mailer/invoice/6617`,
            `${this.baseUrl}/mailer/quote/2172`,
            `${this.baseUrl}/payment_methods/form`,
            `${this.baseUrl}/payment_methods/form/108`,
            `${this.baseUrl}/payment_methods/index`,
            `${this.baseUrl}/payments/form`,
            `${this.baseUrl}/payments/form/966`,
            `${this.baseUrl}/payments/index`,
            `${this.baseUrl}/payments/online_logs`,
            `${this.baseUrl}/products/form`,
            `${this.baseUrl}/products/form/324`,
            `${this.baseUrl}/products/index`,
            `${this.baseUrl}/projects/form`,
            `${this.baseUrl}/projects/form/56`,
            `${this.baseUrl}/projects/index`,
            `${this.baseUrl}/projects/view/56`,
            `${this.baseUrl}/quotes/generate_pdf/2172`,
            `${this.baseUrl}/quotes/index`,
            `${this.baseUrl}/quotes/status/all`,
            `${this.baseUrl}/quotes/status/approved`,
            `${this.baseUrl}/quotes/status/canceled`,
            `${this.baseUrl}/quotes/status/draft`,
            `${this.baseUrl}/quotes/status/rejected`,
            `${this.baseUrl}/quotes/status/sent`,
            `${this.baseUrl}/quotes/status/viewed`,
            `${this.baseUrl}/quotes/view/2172`,
            `${this.baseUrl}/reports/invoice_aging`,
            `${this.baseUrl}/reports/invoices_per_client`,
            `${this.baseUrl}/reports/payment_history`,
            `${this.baseUrl}/reports/sales_by_client`,
            `${this.baseUrl}/reports/sales_by_year`,
            `${this.baseUrl}/settings`,
            `${this.baseUrl}/tasks/form`,
            `${this.baseUrl}/tasks/form/63`,
            `${this.baseUrl}/tasks/index`,
            `${this.baseUrl}/tax_rates/form`,
            `${this.baseUrl}/tax_rates/form/131`,
            `${this.baseUrl}/tax_rates/index`,
            `${this.baseUrl}/units/form`,
            `${this.baseUrl}/units/form/59`,
            `${this.baseUrl}/units/index`,
            `${this.baseUrl}/users/change_password/1`,
            `${this.baseUrl}/users/form`,
            `${this.baseUrl}/users/form/1`,
            `${this.baseUrl}/users/index`
        ]);

        this.logPath = path.join(__dirname, "storage", "logs");
        if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath, {recursive: true});

        this.timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        this.initializeLogs();
    }

    initializeLogs() {
        this.requestsFile = path.join(this.logPath, `requests-${this.timestamp}.json`);
        this.ajaxFile = path.join(this.logPath, `ajax-requests-${this.timestamp}.json`);
        this.routesFile = path.join(this.logPath, `discovered_routes-${this.timestamp}.txt`);
        this.formsFile = path.join(this.logPath, `form-submissions-${this.timestamp}.json`);
        this.logFile = path.join(this.logPath, `crawl-log-${this.timestamp}.txt`);

        fs.writeFileSync(this.requestsFile, '[]');
        fs.writeFileSync(this.ajaxFile, '[]');
        fs.writeFileSync(this.routesFile, '');
        fs.writeFileSync(this.formsFile, '[]');
        fs.writeFileSync(this.logFile, `Crawl started: ${new Date().toISOString()}\nBase URL: ${this.baseUrl}\n\n`);

        console.log(`Log files initialized in: ${this.logPath}`);
    }

    log(message) {
        const logEntry = `[${new Date().toISOString()}] ${message}\n`;
        console.log(message);
        fs.appendFileSync(this.logFile, logEntry);
    }

    async start() {
        const browser = await chromium.launch({headless: false, slowMo: 50});
        this.context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        });

        // Enhanced request/response intercepting with payload capture
        this.context.on('request', (req) => this.recordRequest(req));
        this.context.on('response', (res) => this.recordResponse(res));

        const page = await this.context.newPage();

        try {
            await this.login(page);
            if (this.isLoggedIn) {
                this.log(`Starting crawl of ${this.canonicalRoutes.size} predefined routes.`);
                this.saveCurrentState();

                for (const route of this.canonicalRoutes) {
                    if (!this.isLoggedIn || this.pageCount >= this.maxPages) break;
                    await this.crawlRoute(route);
                    this.saveCurrentState();
                }
            }
        } catch (error) {
            this.log(`Critical error: ${error.message}`);
        } finally {
            await browser.close();
            this.saveResults();
        }
    }

    async login(page) {
        this.log("Starting login process...");
        try {
            await page.goto(`${this.baseUrl}/sessions/login`, {waitUntil: "domcontentloaded", timeout: this.pageTimeout});
            await page.waitForSelector('input[name="email"]', {timeout: 10000});
            await page.fill('input[name="email"]', "a@a.com");
            await page.fill('input[name="password"]', "demopassword");

            await Promise.all([
                page.click('button[type="submit"], input[type="submit"]'),
                page.waitForNavigation({waitUntil: "domcontentloaded", timeout: this.navigationTimeout}),
            ]);

            // Log the current URL after login attempt
            const currentUrl = page.url();
            this.log(`After login submit, current URL: ${currentUrl}`);

            // Check for error messages on the page
            const errorMessage = await page.evaluate(() => {
                const err = document.querySelector('.alert-danger, .alert-error, .login-error, .error, .alert');
                return err ? err.textContent.trim() : null;
            });
            if (errorMessage) {
                this.log(`Login error message found: ${errorMessage}`);
            }

            this.isLoggedIn = !currentUrl.includes('/sessions/login');
            this.log(this.isLoggedIn ? "Login successful" : "Login failed");

            // If login failed, save the page HTML for debugging
            if (!this.isLoggedIn) {
                const html = await page.content();
                const debugPath = path.join(this.logPath, `login-failure-${this.timestamp}.html`);
                fs.writeFileSync(debugPath, html);
                this.log(`Saved failed login HTML to: ${debugPath}`);
            }
        } catch (error) {
            this.log(`Login error: ${error.message}`);
            this.isLoggedIn = false;
        }
    }

    shouldCrawlUrl(testUrl) {
        try {
            const parsedUrl = new URL(testUrl);
            if (parsedUrl.hostname !== this.domain) return false;
            if (/\.(pdf|jpg|png|gif|css|js|ico|zip|doc|docx|xls|xlsx|woff|woff2|ttf|eot|svg)$/i.test(parsedUrl.pathname)) return false;
            if (parsedUrl.hash && parsedUrl.hash !== "#") return false;
            if (parsedUrl.pathname.includes('/logout') ||
                parsedUrl.pathname.includes('/sessions/destroy') ||
                parsedUrl.pathname.includes('/delete/')) return false;
            return true;
        } catch (error) {
            return false;
        }
    }

    isDestructiveForm(formAction, formId, formClass) {
        const destructivePatterns = [
            /delete/i,
            /destroy/i,
            /remove/i,
            /logout/i,
            /signout/i,
            /sessions\/destroy/i
        ];

        const identifiers = [formAction, formId, formClass].filter(id => id);
        return identifiers.some(identifier =>
            destructivePatterns.some(pattern => pattern.test(identifier))
        );
    }

    async dismissOverlays(page) {
        try {
            await page.evaluate(() => {
                // More aggressive overlay removal
                const overlaySelectors = [
                    '.dropdown-menu.show',
                    '.dropdown-backdrop',
                    '.modal-backdrop',
                    '.overlay',
                    '.popup',
                    '[style*="z-index"]'
                ];

                overlaySelectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => {
                        if (selector === '[style*="z-index"]') {
                            const zIndex = parseInt(getComputedStyle(el).zIndex);
                            if (zIndex > 1000) {
                                el.style.display = 'none';
                                el.remove();
                            }
                        } else {
                            el.style.display = 'none';
                            el.remove();
                        }
                    });
                });

                // Remove any elements that might be blocking form submission
                document.querySelectorAll('[data-toggle="dropdown"]').forEach(el => {
                    el.classList.remove('show');
                });

                // Force close any open Bootstrap dropdowns
                if (window.bootstrap && window.bootstrap.Dropdown) {
                    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                        const dropdown = window.bootstrap.Dropdown.getInstance(toggle);
                        if (dropdown) dropdown.hide();
                    });
                }
            });

            // Multiple escape presses to ensure modals are closed
            await page.keyboard.press('Escape');
            await page.waitForTimeout(200);
            await page.keyboard.press('Escape');
            await page.waitForTimeout(300);

        } catch (error) {
            // Ignore overlay dismissal errors
        }
    }

    async crawlRoute(url) {
        if (!this.isLoggedIn || this.visitedUrls.has(url)) return;

        this.visitedUrls.add(url);
        this.pageCount++;
        this.log(`Crawling route (${this.pageCount}/${this.maxPages}): ${url}`);

        const page = await this.context.newPage();

        // Block static assets to improve performance
        await page.route("**/*", r => {
            const resourceType = r.request().resourceType();
            if (["image", "font", "media", "stylesheet"].includes(resourceType)) {
                return r.abort();
            }
            r.continue();
        });

        try {
            await page.goto(url, {waitUntil: "domcontentloaded", timeout: this.pageTimeout}); // Faster load
            await page.waitForTimeout(500); // Reduced wait time

            if (page.url().includes('/sessions/login')) {
                this.log("Session expired - got redirected to login");
                this.isLoggedIn = false;
                await page.close();
                return;
            }

            // Dismiss any overlays before processing
            await this.dismissOverlays(page);

            // Expand dropdowns to discover hidden forms/links
            try {
                await page.$$eval(".dropdown-toggle, .dropdown-button, [data-toggle='dropdown']", toggles => {
                    toggles.forEach(toggle => {
                        try {
                            toggle.click();
                        } catch (e) {
                            // Ignore click errors
                        }
                    });
                });
                await page.waitForTimeout(300);
            } catch (error) {
                // Ignore dropdown expansion errors
            }

            // Handle regular forms
            const forms = await page.$$("form");
            for (const form of forms) {
                try {
                    const formAction = await form.evaluate(f => f.getAttribute('action') || '');
                    const formId = await form.evaluate(f => f.getAttribute('id') || '');
                    const formClass = await form.evaluate(f => f.className || '');

                    if (this.isDestructiveForm(formAction, formId, formClass)) {
                        this.log(`Skipping destructive form: ${formAction || formId || formClass}`);
                        continue;
                    }

                    await this.fillAndSubmitForm(form, page, 'regular-form');
                } catch (error) {
                    this.log(`Error processing form: ${error.message}`);
                }
            }

            // Handle AJAX links
            await this.handleAjaxLinks(page);

            // Handle modal forms
            await this.handleModalForms(page);

            await page.close();
        } catch (error) {
            this.log(`Error crawling route ${url}: ${error.message}`);
            await page.close();
        }
    }

    async handleAjaxLinks(page) {
        try {
            this.log("Processing AJAX links...");
            const ajaxLinks = await page.$$eval(
                "a.ajax, a[data-remote], a[data-ajax], [data-method]",
                anchors => anchors.map(a => ({
                    href: a.href,
                    method: a.getAttribute('data-method') || 'GET',
                    remote: a.hasAttribute('data-remote') || a.classList.contains('ajax')
                }))
            );

            for (const linkInfo of ajaxLinks) {
                if (!this.shouldCrawlUrl(linkInfo.href)) continue;

                try {
                    this.log(`Processing AJAX link: ${linkInfo.href} (${linkInfo.method})`);

                    if (linkInfo.method.toUpperCase() === 'GET') {
                        await page.goto(linkInfo.href, {waitUntil: "domcontentloaded", timeout: this.pageTimeout});
                        this.ajaxRequests.push({
                            url: linkInfo.href,
                            method: linkInfo.method,
                            type: 'ajax-link',
                            timestamp: new Date().toISOString()
                        });

                        await page.goBack({waitUntil: "domcontentloaded", timeout: this.pageTimeout});
                    }
                } catch (error) {
                    this.log(`Failed to process AJAX link ${linkInfo.href}: ${error.message}`);
                }
            }
        } catch (error) {
            this.log(`Error in handleAjaxLinks: ${error.message}`);
        }
    }

    async handleModalForms(page) {
        try {
            this.log("Processing modal forms...");

            const modalTriggers = await page.$$("[data-toggle='modal'], [data-bs-toggle='modal'], .modal-trigger");

            for (const trigger of modalTriggers) {
                try {
                    await this.dismissOverlays(page);
                    await trigger.click();
                    await page.waitForTimeout(500);

                    const modalForms = await page.$$(".modal form, [role='dialog'] form");
                    for (const form of modalForms) {
                        const formAction = await form.evaluate(f => f.getAttribute('action') || '');
                        const formId = await form.evaluate(f => f.getAttribute('id') || '');
                        const formClass = await form.evaluate(f => f.className || '');

                        if (this.isDestructiveForm(formAction, formId, formClass)) {
                            this.log(`Skipping destructive modal form: ${formAction || formId || formClass}`);
                            continue;
                        }

                        await this.fillAndSubmitForm(form, page, 'modal-form');
                    }

                    // Close modal
                    try {
                        await page.click(".modal .close, .modal [data-dismiss='modal'], .modal [data-bs-dismiss='modal']", {timeout: 2000});
                        await page.waitForTimeout(300);
                    } catch (closeError) {
                        await page.keyboard.press('Escape');
                        await page.waitForTimeout(300);
                    }
                } catch (error) {
                    this.log(`Error processing modal trigger: ${error.message}`);
                }
            }
        } catch (error) {
            this.log(`Error in handleModalForms: ${error.message}`);
        }
    }

    async fillAndSubmitForm(form, page, formType = 'regular-form') {
        try {
            const formAction = await form.evaluate(f => f.getAttribute('action') || '');
            const formId = await form.evaluate(f => f.getAttribute('id') || '');
            const formClass = await form.evaluate(f => f.className || '');

            const formIdentifier = formAction || formId || formClass || 'unnamed-form';
            const formKey = `${page.url()}-${formIdentifier}-${formType}`;

            if (this.submittedForms.has(formKey)) {
                this.log(`Form already submitted: ${formKey}`);
                return;
            }

            if (this.isDestructiveForm(formAction, formId, formClass)) {
                this.log(`Refusing to submit destructive form: ${formIdentifier}`);
                return;
            }

            this.submittedForms.add(formKey);
            this.log(`Filling form: ${formIdentifier}`);

            // Dismiss overlays before filling
            await this.dismissOverlays(page);

            const inputs = await form.$$('input, textarea, select');
            const formData = {};

            for (const input of inputs) {
                try {
                    const type = await input.evaluate(i => (i.type || i.tagName.toLowerCase()).toLowerCase());
                    const name = await input.evaluate(i => i.name || '');
                    const isDisabled = await input.evaluate(i => i.disabled);
                    const isReadonly = await input.evaluate(i => i.readOnly);

                    if (!name || isDisabled || isReadonly) continue;

                    let value = '';
                    switch (type) {
                        case 'text':
                        case 'textarea':
                            value = randomText();
                            await input.fill(value);
                            break;
                        case 'email':
                            value = randomEmail();
                            await input.fill(value);
                            break;
                        case 'tel':
                        case 'phone':
                            value = randomPhone();
                            await input.fill(value);
                            break;
                        case 'number':
                            value = Math.floor(Math.random() * 1000).toString();
                            await input.fill(value);
                            break;
                        case 'url':
                            value = 'https://example.com';
                            await input.fill(value);
                            break;
                        case 'date':
                            value = '2023-12-25';
                            await input.fill(value);
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (Math.random() > 0.5) {
                                await input.check();
                                value = 'checked';
                            }
                            break;
                        case 'select':
                        case 'select-one':
                            const options = await input.$$('option');
                            if (options.length > 1) {
                                const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
                                await input.selectOption({index: randomIndex});
                                value = await input.evaluate(s => s.value);
                            }
                            break;
                        case 'hidden':
                            value = await input.evaluate(i => i.value);
                            break;
                        case 'file':
                            // Skip file inputs
                            continue;
                        default:
                            if (type !== 'password' && type !== 'submit' && type !== 'button') {
                                value = randomText();
                                try {
                                    await input.fill(value);
                                } catch (fillError) {
                                    // Skip if can't fill
                                    continue;
                                }
                            }
                            break;
                    }

                    if (value) {
                        formData[name] = value;
                    }
                } catch (inputError) {
                    this.log(`Error filling input: ${inputError.message}`);
                }
            }

            // Final overlay dismissal before submission
            await this.dismissOverlays(page);

            // Enhanced submit button handling with multiple strategies
            await this.attemptFormSubmission(form, page, formData, formKey, formType, formAction, formIdentifier);

        } catch (error) {
            this.log(`Error in fillAndSubmitForm: ${error.message}`);
        }
    }

    async attemptFormSubmission(form, page, formData, formKey, formType, formAction, formIdentifier) {
        const submissionRecord = {
            url: page.url(),
            formAction: formAction || page.url(),
            formId: formIdentifier,
            type: formType,
            method: 'POST',
            formData: formData,
            timestamp: new Date().toISOString()
        };

        // Strategy 1: Try to find and click visible submit button with short timeout
        try {
            const submitButton = await form.$('input[type="submit"], button[type="submit"], button:not([type])');
            if (submitButton) {
                const submitText = await submitButton.evaluate(btn => btn.textContent || btn.value || '');

                if (/delete|destroy|remove/i.test(submitText)) {
                    this.log(`Refusing to click destructive submit button: ${submitText}`);
                    return;
                }

                // Check if button is visible with short timeout
                const isVisible = await submitButton.isVisible().catch(() => false);
                if (isVisible) {
                    await Promise.race([
                        submitButton.click(),
                        page.waitForTimeout(this.formTimeout) // Much shorter timeout
                    ]);

                    this.formSubmissions.push(submissionRecord);
                    this.log(`Successfully submitted form via button click: ${formKey}`);
                    return;
                } else {
                    this.log(`Submit button not visible for form: ${formKey}, trying alternative methods`);
                }
            }
        } catch (error) {
            this.log(`Button click failed for form ${formKey}: ${error.message}`);
        }

        // Strategy 2: Try to make button visible through JavaScript
        try {
            const made_visible = await form.evaluate((formEl) => {
                const buttons = formEl.querySelectorAll('input[type="submit"], button[type="submit"], button:not([type])');
                for (const btn of buttons) {
                    // Try to make button visible
                    btn.style.display = 'block';
                    btn.style.visibility = 'visible';
                    btn.style.opacity = '1';
                    btn.style.position = 'static';

                    // Remove any disabled state
                    btn.disabled = false;
                    btn.removeAttribute('disabled');

                    if (btn.offsetParent !== null) { // Check if truly visible
                        btn.click();
                        return true;
                    }
                }
                return false;
            });

            if (made_visible) {
                await page.waitForTimeout(1000); // Brief wait for submission
                this.formSubmissions.push(submissionRecord);
                this.log(`Successfully submitted form via JS visibility fix: ${formKey}`);
                return;
            }
        } catch (error) {
            this.log(`JS visibility fix failed for form ${formKey}: ${error.message}`);
        }

        // Strategy 3: Direct form submission via JavaScript
        try {
            await form.evaluate((formEl) => {
                // Try form.submit() method
                if (formEl.submit && typeof formEl.submit === 'function') {
                    formEl.submit();
                } else {
                    // Create and dispatch submit event
                    const submitEvent = new Event('submit', {
                        bubbles: true,
                        cancelable: true
                    });
                    formEl.dispatchEvent(submitEvent);
                }
            });

            await page.waitForTimeout(1000);
            this.formSubmissions.push(submissionRecord);
            this.log(`Successfully submitted form via JS submit: ${formKey}`);
            return;

        } catch (error) {
            this.log(`JS form submission failed for form ${formKey}: ${error.message}`);
        }

        // Strategy 4: Programmatic POST request simulation
        try {
            const formActionUrl = await form.evaluate(f => f.getAttribute('action')) || page.url();
            const formMethod = await form.evaluate(f => f.getAttribute('method')) || 'POST';

            await page.evaluate(async (action, method, data) => {
                const formData = new FormData();
                for (const [key, value] of Object.entries(data)) {
                    formData.append(key, value);
                }

                await fetch(action, {
                    method: method.toUpperCase(),
                    body: formData,
                    credentials: 'same-origin'
                });
            }, formActionUrl, formMethod, formData);

            this.formSubmissions.push(submissionRecord);
            this.log(`Successfully submitted form via fetch API: ${formKey}`);

        } catch (error) {
            this.log(`Fetch API submission failed for form ${formKey}: ${error.message}`);
        }

        // If all strategies fail, log it but don't block the crawl
        this.log(`All submission strategies failed for form: ${formKey} - continuing crawl`);
    }

    async quickFill(input, value) {
        try {
            // Try with short timeout first
            await input.fill(value, {timeout: 2000});
        } catch (error) {
            try {
                // Fallback: use JavaScript to set value directly
                await input.evaluate((el, val) => {
                    el.value = val;
                    el.dispatchEvent(new Event('input', {bubbles: true}));
                    el.dispatchEvent(new Event('change', {bubbles: true}));
                }, value);
            } catch (jsError) {
                // If both fail, just skip this input
                this.log(`Failed to fill input with value: ${value}`);
            }
        }
    }

    recordRequest(req) {
        try {
            // Skip static assets
            const resourceType = req.resourceType();
            if (["image", "font", "media", "stylesheet"].includes(resourceType)) {
                return;
            }

            const requestRecord = {
                url: req.url(),
                method: req.method(),
                resourceType: resourceType,
                headers: req.headers(),
                timestamp: new Date().toISOString()
            };

            // Capture POST data for form submissions and AJAX
            if (req.method() === 'POST' && req.postData()) {
                requestRecord.postData = req.postData();
            }

            this.networkRequests.push(requestRecord);

            // Save requests periodically
            if (this.networkRequests.length % 25 === 0) {
                fs.writeFileSync(this.requestsFile, JSON.stringify(this.networkRequests, null, 2));
            }
        } catch (error) {
            this.log(`Error recording request: ${error.message}`);
        }
    }

    recordResponse(res) {
        try {
            const resourceType = res.request().resourceType();
            if (["image", "font", "media", "stylesheet"].includes(resourceType)) {
                return;
            }

            if (resourceType === 'xhr' || resourceType === 'fetch') {
                const ajaxRecord = {
                    url: res.url(),
                    status: res.status(),
                    method: res.request().method(),
                    headers: res.headers(),
                    timestamp: new Date().toISOString()
                };

                // Include request payload for AJAX calls
                if (res.request().postData()) {
                    ajaxRecord.requestPayload = res.request().postData();
                }

                this.ajaxRequests.push(ajaxRecord);
                fs.writeFileSync(this.ajaxFile, JSON.stringify(this.ajaxRequests, null, 2));
            }
        } catch (error) {
            this.log(`Error recording response: ${error.message}`);
        }
    }

    saveCurrentState() {
        try {
            const routesList = Array.from(this.visitedUrls).join("\n");
            fs.writeFileSync(this.routesFile, routesList);
            this.log(`Saved current state: ${this.visitedUrls.size} routes visited`);
        } catch (error) {
            this.log(`Error saving current state: ${error.message}`);
        }
    }

    saveResults() {
        try {
            this.saveCurrentState();
            fs.writeFileSync(this.formsFile, JSON.stringify(this.formSubmissions, null, 2));
            fs.writeFileSync(this.requestsFile, JSON.stringify(this.networkRequests, null, 2));
            fs.writeFileSync(this.ajaxFile, JSON.stringify(this.ajaxRequests, null, 2));

            const summaryFile = path.join(this.logPath, `summary-${this.timestamp}.json`);
            const summary = {
                crawlStarted: this.timestamp,
                crawlFinished: new Date().toISOString(),
                baseUrl: this.baseUrl,
                totalPagesVisited: this.pageCount,
                totalRoutesVisited: this.visitedUrls.size,
                totalCanonicalRoutes: this.canonicalRoutes.size,
                totalFormsSubmitted: this.formSubmissions.length,
                totalNetworkRequests: this.networkRequests.length,
                totalAjaxRequests: this.ajaxRequests.length,
                loginSuccessful: this.isLoggedIn
            };

            fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
            this.log(`Crawl finished. Summary saved to: ${summaryFile}`);
        } catch (error) {
            this.log(`Error saving results: ${error.message}`);
        }
    }
}

// Main execution
(async () => {
    try {
        const crawler = new EnhancedCrawler('http://ivplv1.test', {maxPages: 115});
        await crawler.start();
    } catch (error) {
        console.error(`Failed to start crawler: ${error.message}`);
        process.exit(1);
    }
})();
