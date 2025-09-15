const TestRunner = require('../testrunner');

const tests = {
  async it_can_view_invoice_aging_report(page, runner) {
    const route = runner.getRoute('core', '/reports/invoice_aging');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_invoices_per_client_report(page, runner) {
    const route = runner.getRoute('core', '/reports/invoices_per_client');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_payment_history_report(page, runner) {
    const route = runner.getRoute('core', '/reports/payment_history');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_sales_by_client_report(page, runner) {
    const route = runner.getRoute('core', '/reports/sales_by_client');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_sales_by_year_report(page, runner) {
    const route = runner.getRoute('core', '/reports/sales_by_year');
    await runner.handleViewOrIndex(page, route);
  }
};

module.exports = { tests };
