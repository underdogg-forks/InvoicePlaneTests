/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for all `mailer` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */

describe('Mailer Module', () => {

  // AJAX Routes
  test('it can mail an invoice by id', async () => {
    await assertAjax(page, '/mailer/invoice/6617');
  });

  test('it can mail a quote by id', async () => {
    await assertAjax(page, '/mailer/quote/2172');
  });
});
