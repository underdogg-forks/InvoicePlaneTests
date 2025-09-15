const TestRunner = require('../testrunner');

const tests = {
  async it_can_view_custom_fields(page, runner) {
    const route = runner.getRoute('core', '/custom_fields');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_custom_fields_index(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_custom_values(page, runner) {
    const route = runner.getRoute('core', '/custom_values');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_email_templates(page, runner) {
    const route = runner.getRoute('core', '/email_templates/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_import_page(page, runner) {
    const route = runner.getRoute('core', '/import');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_users_index(page, runner) {
    const route = runner.getRoute('core', '/users');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_users_index_explicit(page, runner) {
    const route = runner.getRoute('core', '/users/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_view_sessions_index(page, runner) {
    const route = runner.getRoute('core', '/sessions/index');
    await runner.handleViewOrIndex(page, route);
  },
  async it_can_create_a_custom_field(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_custom_field(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_create_custom_values(page, runner) {
    const route = runner.getRoute('core', '/custom_values/create');
    await runner.handleForm(page, route);
  },
  async it_can_create_custom_values_with_id(page, runner) {
    const route = runner.getRoute('core', '/custom_values/create/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_create_an_email_template(page, runner) {
    const route = runner.getRoute('core', '/email_templates/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_an_email_template(page, runner) {
    const route = runner.getRoute('core', '/email_templates/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_view_the_import_form(page, runner) {
    const route = runner.getRoute('core', '/import/form');
    await runner.handleForm(page, route);
  },
  async it_can_create_a_user(page, runner) {
    const route = runner.getRoute('core', '/users/form');
    await runner.handleForm(page, route);
  },
  async it_can_edit_a_user(page, runner) {
    const route = runner.getRoute('core', '/users/form/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_change_a_user_password(page, runner) {
    const route = runner.getRoute('core', '/users/change_password/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleForm(page, { ...route, url });
  },
  async it_can_delete_a_custom_field(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_delete_a_custom_value(page, runner) {
    const route = runner.getRoute('core', '/custom_values/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_delete_an_email_template(page, runner) {
    const route = runner.getRoute('core', '/email_templates/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_delete_a_user(page, runner) {
    const route = runner.getRoute('core', '/users/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleDestroy(page, { ...route, url });
  },
  async it_can_view_the_dashboard(page, runner) {
    const route = runner.getRoute('core', '/dashboard');
    await runner.handleExotic(page, route);
  },
  async it_can_view_settings(page, runner) {
    const route = runner.getRoute('core', '/settings');
    await runner.handleExotic(page, route);
  },
  async it_can_login(page, runner) {
    const route = runner.getRoute('core', '/sessions/login');
    await runner.handleExotic(page, route);
  },
  async it_can_logout(page, runner) {
    const route = runner.getRoute('core', '/sessions/logout');
    await runner.handleExotic(page, route);
  },
  async it_can_view_upload_form(page, runner) {
    const route = runner.getRoute('core', '/upload/form');
    await runner.handleExotic(page, route);
  },
  async it_can_delete_an_upload(page, runner) {
    const route = runner.getRoute('core', '/upload/delete/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleExotic(page, { ...route, url });
  },
  async it_can_get_all_custom_fields_ajax(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/table/all');
    await runner.handleAjax(page, route);
  },
  async it_can_get_client_custom_fields_ajax(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/table/client');
    await runner.handleAjax(page, route);
  },
  async it_can_get_invoice_custom_fields_ajax(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/table/invoice');
    await runner.handleAjax(page, route);
  },
  async it_can_get_payment_custom_fields_ajax(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/table/payment');
    await runner.handleAjax(page, route);
  },
  async it_can_get_quote_custom_fields_ajax(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/table/quote');
    await runner.handleAjax(page, route);
  },
  async it_can_get_user_custom_fields_ajax(page, runner) {
    const route = runner.getRoute('core', '/custom_fields/table/user');
    await runner.handleAjax(page, route);
  },
  async it_can_get_custom_values_field_ajax(page, runner) {
    const route = runner.getRoute('core', '/custom_values/field');
    await runner.handleAjax(page, route);
  },
  async it_can_get_custom_values_field_with_id_ajax(page, runner) {
    const route = runner.getRoute('core', '/custom_values/field/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleAjax(page, { ...route, url });
  },
  async it_can_mailer_invoice_ajax(page, runner) {
    const route = runner.getRoute('core', '/mailer/invoice/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleAjax(page, { ...route, url });
  },
  async it_can_mailer_quote_ajax(page, runner) {
    const route = runner.getRoute('core', '/mailer/quote/{id}');
    const url = route.url.replace('{id}', '1');
    await runner.handleAjax(page, { ...route, url });
  },
  async it_can_get_layout_header_ajax(page, runner) {
    const route = runner.getRoute('core', '/layout/header');
    await runner.handleAjax(page, route);
  },
  async it_can_get_layout_footer_ajax(page, runner) {
    const route = runner.getRoute('core', '/layout/footer');
    await runner.handleAjax(page, route);
  },
  async it_can_get_layout_sidebar_ajax(page, runner) {
    const route = runner.getRoute('core', '/layout/sidebar');
    await runner.handleAjax(page, route);
  },
  async it_can_save_upload_ajax(page, runner) {
    const route = runner.getRoute('core', '/upload/save');
    await runner.handleAjax(page, route);
  }
};

module.exports = { tests };
