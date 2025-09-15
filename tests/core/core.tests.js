/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for routes related to custom fields, users, reports, and more.
 */

const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy } = require('../test-helpers');

describe('Core Module', () => {
  // Routes: /custom_fields, /custom_fields/index
  test('it can view the custom fields index page', async () => {
    await assertPageLoads(page, '/custom_fields/index');
    await expect(page.locator('.content-title')).toContainText('Custom Fields');
  });

  // Route: /custom_values
  test('it can view the custom values page', async () => {
    await assertPageLoads(page, '/custom_values');
    await expect(page.locator('.content-title')).toContainText('Custom Values');
  });

  // Route: /email_templates/index
  test('it can view the email templates index', async () => {
    await assertPageLoads(page, '/email_templates/index');
    await expect(page.locator('.content-title')).toContainText('Email Templates');
  });

  // Route: /import
  test('it can view the import page', async () => {
    await assertPageLoads(page, '/import');
    await expect(page.locator('.content-title')).toContainText('Import');
  });

  // Route: /reports/invoice_aging
  test('it can view the invoice aging report', async () => {
    await assertPageLoads(page, '/reports/invoice_aging');
    await expect(page.locator('.content-title')).toContainText('Invoice Aging');
  });

  // Route: /reports/invoices_per_client
  test('it can view the invoices per client report', async () => {
    await assertPageLoads(page, '/reports/invoices_per_client');
    await expect(page.locator('.content-title')).toContainText('Invoices per Client');
  });

  // Route: /reports/payment_history
  test('it can view the payment history report', async () => {
    await assertPageLoads(page, '/reports/payment_history');
    await expect(page.locator('.content-title')).toContainText('Payment History');
  });

  // Route: /reports/sales_by_client
  test('it can view the sales by client report', async () => {
    await assertPageLoads(page, '/reports/sales_by_client');
    await expect(page.locator('.content-title')).toContainText('Sales by Client');
  });

  // Route: /reports/sales_by_year
  test('it can view the sales by year report', async () => {
    await assertPageLoads(page, '/reports/sales_by_year');
    await expect(page.locator('.content-title')).toContainText('Sales by Year');
  });

  // Routes: /users, /users/index
  test('it can view the users index', async () => {
    await assertPageLoads(page, '/users/index');
    await expect(page.locator('.content-title')).toContainText('Users');
  });

  // Route: /sessions/index
  test('it can view the sessions index', async () => {
    await assertPageLoads(page, '/sessions/index');
    await expect(page.locator('.content-title')).toContainText('Session Log');
  });

  // Route: /tax_rates/index
  test('it can view the tax rates index', async () => {
    await assertPageLoads(page, '/tax_rates/index');
    await expect(page.locator('.content-title')).toContainText('Tax Rates');
  });

  // Route: /dashboard
  test('it can view the dashboard', async () => {
    await assertPageLoads(page, '/dashboard');
    await expect(page.locator('.content-title')).toContainText('Dashboard');
  });

  // Route: /settings/index
  test('it can view the settings page', async () => {
    await assertPageLoads(page, '/settings/index');
    await expect(page.locator('.content-title')).toContainText('Settings');
  });

  // Route: /mailer/index
  test('it can view the mailer settings page', async () => {
    await assertPageLoads(page, '/mailer/index');
    await expect(page.locator('.content-title')).toContainText('Mailer');
  });

  // Route: /upload
  test('it can view the upload settings page', async () => {
    await assertPageLoads(page, '/upload');
    await expect(page.locator('.content-title')).toContainText('Upload');
  });

  // Route: /layout
  test('it can view the layout settings page', async () => {
    await assertPageLoads(page, '/layout');
    await expect(page.locator('.content-title')).toContainText('Layout');
  });
  
  /**
   * @description Test creating a new custom field.
   * @payload
   * {
   * "custom_field_table": "$custom_field_table",
   * "custom_field_label": "$custom_field_label",
   * "custom_field_type": "$custom_field_type",
   * "custom_field_column": "$custom_field_column",
   * "custom_field_list_order": "$custom_field_list_order",
   * "custom_field_validation": "$custom_field_validation"
   * }
   */
  // Route: /custom_fields/form
  test('it can create a new custom field with payload', async () => {
    const createCustomFieldPayload = {
      "custom_field_table": "ip_clients",
      "custom_field_label": "Test Field",
      "custom_field_type": "TEXT",
      "custom_field_column": "text",
      "custom_field_list_order": "1",
      "custom_field_validation": ""
    };
    await submitFormWithPayload(page, '/custom_fields/form', 'custom_field', createCustomFieldPayload);
  });

  /**
   * @description Test editing an existing custom field.
   * @payload
   * {
   * "custom_field_table": "$custom_field_table",
   * "custom_field_label": "$custom_field_label",
   * "custom_field_type": "$custom_field_type",
   * "custom_field_column": "$custom_field_column",
   * "custom_field_list_order": "$custom_field_list_order",
   * "custom_field_validation": "$custom_field_validation"
   * }
   */
  // Route: /custom_fields/form/{id}
  test('it can edit an existing custom field with payload', async () => {
    const editCustomFieldPayload = {
      "custom_field_table": "ip_clients",
      "custom_field_label": "Edited Field",
      "custom_field_type": "TEXT",
      "custom_field_column": "text",
      "custom_field_list_order": "1",
      "custom_field_validation": ""
    };
    await submitFormWithPayload(page, '/custom_fields/form/171', 'custom_field', editCustomFieldPayload);
  });

  // Route: /custom_fields/delete/{id}
  test('it can delete a custom field', async () => {
    await assertDestroy(page, '/custom_fields/delete/171');
  });

  /**
   * @description Test creating a new user.
   * @payload
   * {
   * "user_type_id": "1",
   * "user_email": "testuser@example.com",
   * "user_password": "demopassword",
   * "user_password_verify": "demopassword",
   * "user_name": "Test User",
   * "user_company": "Test Co.",
   * "user_address_1": "123 Test St",
   * "user_address_2": "",
   * "user_city": "Test City",
   * "user_state": "Test State",
   * "user_zip": "12345",
   * "user_country": "USA",
   * "user_phone": "123-456-7890",
   * "user_fax": "",
   * "user_mobile": "123-456-7890",
   * "user_web": "http://test.com"
   * }
   */
  // Route: /users/form
  test('it can create a new user with payload', async () => {
    const createUserPayload = {
      "user_type_id": "1",
      "user_email": "testuser@example.com",
      "user_password": "demopassword",
      "user_password_verify": "demopassword",
      "user_name": "Test User",
      "user_company": "Test Co.",
      "user_address_1": "123 Test St",
      "user_address_2": "",
      "user_city": "Test City",
      "user_state": "Test State",
      "user_zip": "12345",
      "user_country": "USA",
      "user_phone": "123-456-7890",
      "user_fax": "",
      "user_mobile": "123-456-7890",
      "user_web": "http://test.com"
    };
    await submitFormWithPayload(page, '/users/form', 'users', createUserPayload);
  });

  /**
   * @description Test editing an existing user.
   * @payload
   * {
   * "user_email": "edited@example.com",
   * "user_name": "Edited User"
   * }
   */
  // Route: /users/form/{id}
  test('it can edit an existing user with payload', async () => {
    const editUserPayload = {
      "user_email": "edited@example.com",
      "user_name": "Edited User"
    };
    await submitFormWithPayload(page, '/users/form/1', 'users', editUserPayload);
  });

  /**
   * @description Test changing a user's password.
   * @payload
   * {
   * "user_password": "newpassword",
   * "user_password_verify": "newpassword"
   * }
   */
  // Route: /users/change_password/{id}
  test('it can change a user\'s password with payload', async () => {
    const changePasswordPayload = {
      "user_password": "newpassword",
      "user_password_verify": "newpassword"
    };
    await submitFormWithPayload(page, '/users/change_password/1', 'users', changePasswordPayload);
  });

  // Route: /users/delete/{id}
  test('it can delete a user', async () => {
    await assertDestroy(page, '/users/delete/2');
  });

  /**
   * @description Test creating a new tax rate.
   * @payload
   * {
   * "tax_rate_name": "$tax_rate_name",
   * "tax_rate_percent": "$tax_rate_percent"
   * }
   */
  // Route: /tax_rates/form
  test('it can create a new tax rate', async () => {
    const createTaxRatePayload = {
      "tax_rate_name": "New Test Tax Rate",
      "tax_rate_percent": "15"
    };
    await submitFormWithPayload(page, '/tax_rates/form', 'tax_rates', createTaxRatePayload);
  });

  /**
   * @description Test editing an existing tax rate.
   * @payload
   * {
   * "tax_rate_name": "$tax_rate_name",
   * "tax_rate_percent": "$tax_rate_percent"
   * }
   */
  // Route: /tax_rates/form/{id}
  test('it can edit an existing tax rate', async () => {
    const editTaxRatePayload = {
      "tax_rate_name": "Edited Test Tax Rate",
      "tax_rate_percent": "12"
    };
    await submitFormWithPayload(page, '/tax_rates/form/131', 'tax_rates', editTaxRatePayload);
  });

  // Route: /tax_rates/delete/{id}
  test('it can delete a tax rate', async () => {
    await assertDestroy(page, '/tax_rates/delete/131');
  });

  /**
   * @description Test creating a new email template.
   * @payload
   * {
   * "email_template_title": "$email_template_title",
   * "email_template_body": "$email_template_body",
   * "email_template_type": "$email_template_type",
   * "email_template_subject": "$email_template_subject",
   * "email_template_from_name": "$email_template_from_name",
   * "email_template_from_email": "$email_template_from_email"
   * }
   */
  // Route: /email_templates/form
  test('it can create a new email template', async () => {
    const createEmailTemplatePayload = {
      "email_template_title": "New Test Template",
      "email_template_body": "Hello World",
      "email_template_type": "invoice",
      "email_template_subject": "Test Subject",
      "email_template_from_name": "Test User",
      "email_template_from_email": "test@example.com"
    };
    await submitFormWithPayload(page, '/email_templates/form', 'email_templates', createEmailTemplatePayload);
  });

  /**
   * @description Test editing an existing email template.
   * @payload
   * {
   * "email_template_title": "$email_template_title",
   * "email_template_body": "$email_template_body",
   * "email_template_type": "$email_template_type",
   * "email_template_subject": "$email_template_subject",
   * "email_template_from_name": "$email_template_from_name",
   * "email_template_from_email": "$email_template_from_email"
   * }
   */
  // Route: /email_templates/form/{id}
  test('it can edit an existing email template', async () => {
    const editEmailTemplatePayload = {
      "email_template_title": "Edited Test Template",
      "email_template_body": "Hello Edited World",
      "email_template_type": "invoice",
      "email_template_subject": "Edited Subject",
      "email_template_from_name": "Edited User",
      "email_template_from_email": "edited@example.com"
    };
    await submitFormWithPayload(page, '/email_templates/form/6', 'email_templates', editEmailTemplatePayload);
  });

  // Route: /email_templates/delete/{id}
  test('it can delete an email template', async () => {
    await assertDestroy(page, '/email_templates/delete/6');
  });

  // Route: /mailer/test_mail
  test('it can send a test mail', async () => {
    await assertDestroy(page, '/mailer/test_mail');
  });
});
