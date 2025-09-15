const TestRunner = require('../testrunner');

const tests = {
  async it_can_view_the_payments_index(page, runner) {
    const route = runner.getRoute('payments', '/payments/index');
    await runner.handleViewOrIndex(page, route);
    expect(await page.locator('h1.content-title').textContent()).toBe('Payments');
  },
  async it_can_view_payment_methods_index(page, runner) {
    const route = runner.getRoute('payments', '/payment_methods/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_create_a_payment(page, runner) {
    const route = runner.getRoute('payments', '/payments/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_payment(page, runner) {
    const route = runner.getRoute('payments', '/payments/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_create_a_payment_method(page, runner) {
    const route = runner.getRoute('payments', '/payment_methods/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_payment_method(page, runner) {
    const route = runner.getRoute('payments', '/payment_methods/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_delete_a_payment(page, runner) {
    const route = runner.getRoute('payments', '/payments/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_delete_a_payment_method(page, runner) {
    const route = runner.getRoute('payments', '/payment_methods/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_view_online_logs_ajax(page, runner) {
    const route = runner.getRoute('payments', '/payments/online_logs');
    await runner.handleAjax(page, route);
  }
};

module.exports = { tests };
