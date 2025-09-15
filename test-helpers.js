const { expect } = require('@playwright/test');
const config = require('./config');

const base = config.baseUrl;

function generateRandomString(length = 10) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function assertPageLoads(page, url) {
  await page.goto(base + url, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).not.toContainText('Unauthorized');
  await expect(page.locator('body')).not.toContainText('Page not found');
}

async function assertFormSubmit(page, url, module) {
  // Navigate to the form
  await page.goto(base + url, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('form')).toBeVisible();

  // Fill out the form fields with random data
  const inputs = await page.locator('input, textarea, select');
  for (const input of await inputs.all()) {
    const name = await input.getAttribute('name');
    if (!name) continue;

    const type = await input.getAttribute('type') || await input.evaluate(el => el.tagName.toLowerCase());
    if (await input.isDisabled() || await input.isReadonly()) continue;

    switch (type) {
      case 'text':
      case 'textarea':
        await input.fill(`Test ${generateRandomString()}`);
        break;
      case 'email':
        await input.fill(`test_${generateRandomString(5)}@example.com`);
        break;
      case 'number':
        await input.fill(`${Math.floor(Math.random() * 1000)}`);
        break;
      case 'select':
        await input.selectOption({ index: 1 }).catch(() => {});
        break;
      case 'date':
        await input.fill('2025-09-15');
        break;
      case 'password':
        await input.fill('demopassword');
        break;
      default:
        // Do nothing for other input types
        break;
    }
  }

  // Submit the form
  const strategies = config.formSaveStrategies[module] || config.formSaveStrategies.default;
  let formSubmitted = false;
  for (const sel of strategies) {
    const button = page.locator(sel).first();
    if (await button.count() > 0) {
      await button.click();
      formSubmitted = true;
      break;
    }
  }

  if (!formSubmitted) {
    throw new Error(`No save button found for module: ${module}`);
  }

  // Assert redirection and success message
  await page.waitForNavigation();
  await expect(page.locator('.alert-success')).toContainText('Record saved', { timeout: 10000 });
}

async function assertDestroy(page, url) {
  const response = await page.goto(base + url);
  expect(response.status()).toBe(200);
}

async function assertAjax(page, url) {
  const response = await page.request.get(base + url);
  expect(response.status()).toBe(200);
}

module.exports = {
  assertPageLoads,
  assertFormSubmit,
  assertDestroy,
  assertAjax
};
