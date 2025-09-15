const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy, assertAjax } = require('../test-helpers');

describe('Core Module', () => {

  // Index Routes
  test('it can view custom fields index', async () => {
    await assertPageLoads(page, '/custom_fields/index');
  });
  
  test('it can view custom values', async () => {
    await assertPageLoads(page, '/custom_values');
  });
  
  test('it can view email templates index', async () => {
    await assertPageLoads(page, '/email_templates/index');
  });
  
  test('it can view import page', async () => {
    await assertPageLoads(page, '/import');
  });

  test('it can view reports invoice aging', async () => {
    await assertPageLoads(page, '/reports/invoice_aging');
  });
  
  test('it can view reports invoices per client', async () => {
    await assertPageLoads(page, '/reports/invoices_per_client');
  });
  
  test('it can view reports payment history', async () => {
    await assertPageLoads(page, '/reports/payment_history');
  });
  
  test('it can view reports sales by client', async () => {
    await assertPageLoads(page, '/reports/sales_by_client');
  });
  
  test('it can view reports sales by year', async () => {
    await assertPageLoads(page, '/reports/sales_by_year');
  });
  
  test('it can view users index', async () => {
    await assertPageLoads(page, '/users/index');
  });
  
  test('it can view sessions index', async () => {
    await assertPageLoads(page, '/sessions/index');
  });

  // Form Routes
  test('it can create a custom field', async () => {
    await assertFormSubmit(page, '/custom_fields/form', 'core');
  });

  test('it can edit a custom field', async () => {
    await assertFormSubmit(page, '/custom_fields/form/1', 'core');
  });
  
  test('it can create a custom value', async () => {
    await assertFormSubmit(page, '/custom_values/create', 'core');
  });

  test('it can create a custom value with id', async () => {
    await assertFormSubmit(page, '/custom_values/create/1', 'core');
  });
  
  test('it can create an email template', async () => {
    await assertFormSubmit(page, '/email_templates/form', 'core');
  });

  test('it can edit an email template', async () => {
    await assertFormSubmit(page, '/email_templates/form/1', 'core');
  });
  
  test('it can view the import form', async () => {
    await assertFormSubmit(page, '/import/form', 'core');
  });
  
  test('it can create a new user', async () => {
    await assertFormSubmit(page, '/users/form', 'core');
  });
  
  test('it can edit an existing user', async () => {
    await assertFormSubmit(page, '/users/form/1', 'core');
  });
  
  test('it can change a user password', async () => {
    await assertFormSubmit(page, '/users/change_password/1', 'core');
  });

  // Destroy Routes
  test('it can delete a custom field', async () => {
    await assertDestroy(page, '/custom_fields/delete/1');
  });
  
  test('it can delete a custom value', async () => {
    await assertDestroy(page, '/custom_values/delete/1');
  });
  
  test('it can delete an email template', async () => {
    await assertDestroy(page, '/email_templates/delete/1');
  });
  
  test('it can delete a user', async () => {
    await assertDestroy(page, '/users/delete/1');
  });

  // Exotic Routes
  test('it can view the dashboard', async () => {
    await assertPageLoads(page, '/dashboard');
    await expect(page.locator('.content-title')).toContainText('Dashboard');
  });
  
  test('it can view system settings', async () => {
    await assertPageLoads(page, '/settings');
  });

  test('it can access login page', async () => {
    await assertPageLoads(page, '/sessions/login');
  });
  
  test('it can access logout route', async () => {
    await assertPageLoads(page, '/sessions/logout');
  });
  
  test('it can view upload form', async () => {
    await assertPageLoads(page, '/upload/form');
  });
  
  test('it can delete a file upload', async () => {
    await assertPageLoads(page, '/upload/delete/1');
  });

  // Ajax Routes
  test('it can get custom fields table all', async () => {
    await assertAjax(page, '/custom_fields/table/all');
  });
  
  test('it can get custom fields for clients', async () => {
    await assertAjax(page, '/custom_fields/table/client');
  });
  
  test('it can get custom fields for invoices', async () => {
    await assertAjax(page, '/custom_fields/table/invoice');
  });
  
  test('it can get custom fields for payments', async () => {
    await assertAjax(page, '/custom_fields/table/payment');
  });
  
  test('it can get custom fields for quotes', async () => {
    await assertAjax(page, '/custom_fields/table/quote');
  });
  
  test('it can get custom fields for users', async () => {
    await assertAjax(page, '/custom_fields/table/user');
  });
  
  test('it can get custom values field', async () => {
    await assertAjax(page, '/custom_values/field');
  });
  
  test('it can get custom values field with id', async () => {
    await assertAjax(page, '/custom_values/field/1');
  });
  
  test('it can mail an invoice', async () => {
    await assertAjax(page, '/mailer/invoice/1');
  });
  
  test('it can mail a quote', async () => {
    await assertAjax(page, '/mailer/quote/1');
  });
  
  test('it can save a file upload', async () => {
    await assertAjax(page, '/upload/save');
  });
});
