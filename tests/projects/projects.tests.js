const TestRunner = require('../testrunner');

const tests = {
  async it_can_view_tasks_index(page, runner) {
    const route = runner.getRoute('projects', '/tasks/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_projects_index(page, runner) {
    const route = runner.getRoute('projects', '/projects/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_a_project(page, runner) {
    const route = runner.getRoute('projects', '/projects/view/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleViewOrIndex(page, { ...route, url });
  },
  async it_can_create_a_task(page, runner) {
    const route = runner.getRoute('projects', '/tasks/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_task(page, runner) {
    const route = runner.getRoute('projects', '/tasks/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_create_a_project(page, runner) {
    const route = runner.getRoute('projects', '/projects/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_project(page, runner) {
    const route = runner.getRoute('projects', '/projects/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_delete_a_task(page, runner) {
    const route = runner.getRoute('projects', '/tasks/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_delete_a_project(page, runner) {
    const route = runner.getRoute('projects', '/projects/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  }
};

module.exports = { tests };
