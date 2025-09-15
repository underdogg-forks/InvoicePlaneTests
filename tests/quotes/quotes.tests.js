const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertDestroy, assertAjax } = require('../test-helpers');

describe('Quotes Module', () => {

  // Index Routes
  test('it can view quotes index', async () => {
    await assertPageLoads(page, '/quotes/index');
    await expect(page.locator('.content-title')).toContainText('Quotes');
  });

  test('it can view all quotes', async () => {
    await assertPageLoads(page, '/quotes/status/all');
  });
  
  test('it can view approved quotes', async () => {
    await assertPageLoads(page, '/quotes/status/approved');
  });
  
  test('it can view canceled quotes', async () => {
    await assertPageLoads(page, '/quotes/status/canceled');
  });
  
  test('it can view draft quotes', async () => {
    await assertPageLoads(page, '/quotes/status/draft');
  });
  
  test('it can view rejected quotes', async () => {
    await assertPageLoads(page, '/quotes/status/rejected');
  });
  
  test('it can view sent quotes', async () => {
    await assertPageLoads(page, '/quotes/status/sent');
  });
  
  test('it can view viewed quotes', async () => {
    await assertPageLoads(page, '/quotes/status/viewed');
  });

  // View Routes
  test('it can view a quote', async () => {
    await assertPageLoads(page, '/quotes/view/1');
  });
  
  // Destroy Routes
  test('it can delete a quote', async () => {
    await assertDestroy(page, '/quotes/delete/1');
  });

  test('it can cancel a quote', async () => {
    await assertDestroy(page, '/quotes/cancel/1');
  });
  
  // AJAX Routes
  test('it can generate a quote PDF', async () => {
    await assertAjax(page, '/quotes/generate_pdf/1');
  });
});
