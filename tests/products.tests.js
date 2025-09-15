const TestRunner = require('../testrunner');

const tests = {
  async it_can_view_families_index(page, runner) {
    const route = runner.getRoute('products', '/families/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_units_index(page, runner) {
    const route = runner.getRoute('products', '/units/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_products_index(page, runner) {
    const route = runner.getRoute('products', '/products/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_create_a_family(page, runner) {
    const route = runner.getRoute('products', '/families/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_family(page, runner) {
    const route = runner.getRoute('products', '/families/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_create_a_unit(page, runner) {
    const route = runner.getRoute('products', '/units/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_unit(page, runner) {
    const route = runner.getRoute('products', '/units/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_create_a_product(page, runner) {
    const route = runner.getRoute('products', '/products/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_product(page, runner) {
    const route = runner.getRoute('products', '/products/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_delete_a_family(page, runner) {
    const route = runner.getRoute('products', '/families/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_delete_a_unit(page, runner) {
    const route = runner.getRoute('products', '/units/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_delete_a_product(page, runner) {
    const route = runner.getRoute('products', '/products/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  }
};

module.exports = { tests };
