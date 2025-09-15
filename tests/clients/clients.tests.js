const TestRunner = require('../testrunner');

const tests = {
  async it_can_view_the_clients_index(page, runner) {
    const route = runner.getRoute('clients', '/clients');
    await runner.handleViewOrIndex(page, route);
    expect(await page.locator('.page-title').textContent()).toBe('Clients');
  },
  async it_can_view_the_clients_index_via_slash(page, runner) {
    const route = runner.getRoute('clients', '/clients/index');
    await runner.handleViewOrIndex(page, route);
    expect(await page.locator('.page-title').textContent()).toBe('Clients');
  },
  async it_can_view_active_clients(page, runner) {
    const route = runner.getRoute('clients', '/clients/status/active');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_all_clients(page, runner) {
    const route = runner.getRoute('clients', '/clients/status/all');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_inactive_clients(page, runner) {
    const route = runner.getRoute('clients', '/clients/status/inactive');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_user_clients(page, runner) {
    const route = runner.getRoute('clients', '/user_clients/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_a_client_by_id(page, runner) {
    const route = runner.getRoute('clients', '/clients/view/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleViewOrIndex(page, { ...route, url });
  },
  async it_can_view_client_invoices_by_id(page, runner) {
    const route = runner.getRoute('clients', '/clients/view/{id}/invoices');
    const url = route.url.replace('{id}', '1');
    await runner.handleViewOrIndex(page, { ...route, url });
  },
  async it_can_view_guest_client_by_id(page, runner) {
    const route = runner.getRoute('clients', '/guest/view/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleViewOrIndex(page, { ...route, url });
  },
  async it_can_view_guest_invoice_by_id(page, runner) {
    const route = runner.getRoute('clients', '/guest/invoice/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleViewOrIndex(page, { ...route, url });
  },
  async it_can_view_guest_quote_by_id(page, runner) {
    const route = runner.getRoute('clients', '/guest/quote/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleViewOrIndex(page, { ...route, url });
  },
  async it_can_create_a_client(page, runner) {
    const route = runner.getRoute('clients', '/clients/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_client(page, runner) {
    const route = runner.getRoute('clients', '/clients/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_create_a_user_client(page, runner) {
    const route = runner.getRoute('clients', '/user_clients/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_user_client(page, runner) {
    const route = runner.getRoute('clients', '/user_clients/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_delete_a_client(page, runner) {
    const route = runner.getRoute('clients', '/clients/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_remove_a_client(page, runner) {
    const route = runner.getRoute('clients', '/clients/remove/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_delete_a_user_client(page, runner) {
    const route = runner.getRoute('clients', '/user_clients/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  }
};

module.exports = { tests };
