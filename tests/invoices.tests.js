const TestRunner = require('../testrunner');

const tests = {
  async it_can_view_the_invoices_index(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/index');
    await runner.handleViewOrIndex(page, route);
    expect(await page.locator('h1.content-title').textContent()).toBe('Invoices');
  },
  async it_can_view_the_invoices_archive(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/archive');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_all_invoices(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/status/all');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_draft_invoices(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/status/draft');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_overdue_invoices(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/status/overdue');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_paid_invoices(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/status/paid');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_sent_invoices(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/status/sent');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_viewed_invoices(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/status/viewed');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_recurring_invoices(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/recurring');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_recurring_invoices_index(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/recurring/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_invoice_groups_index(page, runner) {
    const route = runner.getRoute('invoices', '/invoice_groups/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_an_invoice(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/view/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleViewOrIndex(page, { ...route, url });
  },
  async it_can_create_an_invoice_group(page, runner) {
    const route = runner.getRoute('invoices', '/invoice_groups/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_an_invoice_group(page, runner) {
    const route = runner.getRoute('invoices', '/invoice_groups/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_delete_an_invoice(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_stop_a_recurring_invoice(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/recurring/stop/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_delete_an_invoice_group(page, runner) {
    const route = runner.getRoute('invoices', '/invoice_groups/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_generate_an_invoice_pdf(page, runner) {
    const route = runner.getRoute('invoices', '/invoices/generate_pdf/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleAjax(page, { ...route, url });
  }
};

module.exports = { tests };
