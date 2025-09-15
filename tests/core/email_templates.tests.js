const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Email Templates Module', () => {

  // View Routes
  test('it can view email templates index', async () => {
    await assertPageLoads(page, '/email_templates/index');
  });

  // Form Routes
  test('it can create a new email template', async () => {
    await assertFormSubmit(page, '/email_templates/form', 'core');
  });

  test('it can edit an existing email template by id', async () => {
    await assertFormSubmit(page, '/email_templates/form/6', 'core');
  });

  // Destroy Routes
  test('it can delete an email template', async () => {
    await assertDestroy(page, '/email_templates/delete/1');
  });
});
