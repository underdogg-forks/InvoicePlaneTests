const TestRunner = require('../testrunner');

const tests = {
  async it_can_view_quotes_index(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_all_quotes(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/status/all');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_approved_quotes(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/status/approved');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_canceled_quotes(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/status/canceled');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_draft_quotes(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/status/draft');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_rejected_quotes(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/status/rejected');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_sent_quotes(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/status/sent');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_viewed_quotes(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/status/viewed');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_a_quote(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/view/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleViewOrIndex(page, { ...route, url });
  },
  async it_can_delete_a_quote(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_cancel_a_quote(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/cancel/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_generate_a_quote_pdf(page, runner) {
    const route = runner.getRoute('quotes', '/quotes/generate_pdf/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleAjax(page, { ...route, url });
  }
};

module.exports = { tests };
