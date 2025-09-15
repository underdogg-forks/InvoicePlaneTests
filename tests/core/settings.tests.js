const TestRunner = require('../testrunner');

const tests = {
  async it_can_view_the_settings_page(page, runner) {
    const route = runner.getRoute('core', '/settings');
    await runner.handleExotic(page, route);
    expect(await page.locator('h1.content-title').textContent()).toBe('System Settings');
  }
};

module.exports = { tests };
