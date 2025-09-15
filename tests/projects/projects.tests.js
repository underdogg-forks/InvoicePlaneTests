/**
 * @fileoverview Test suite for the Projects module.
 * This file contains tests for all `projects` routes, including views, forms, and deletions.
 */

const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy } = require('../test-helpers');

describe('Projects Module', () => {
  // Routes: /projects/index
  test('it can view the projects index', async () => {
    await assertPageLoads(page, '/projects/index');
    await expect(page.locator('.content-title')).toContainText('Projects');
  });

  // Routes: /tasks/index
  test('it can view the tasks index', async () => {
    await assertPageLoads(page, '/tasks/index');
    await expect(page.locator('.content-title')).toContainText('Tasks');
  });

  /**
   * @description Test creating a new project.
   * @payload
   * {
   * "client_id": "$client_id",
   * "project_name": "$project_name",
   * "project_status": "$project_status",
   * "project_due_date": "$project_due_date"
   * }
   */
  // Route: /projects/form
  test('it can create a new project', async () => {
    const createProjectPayload = {
      "client_id": "956",
      "project_name": "Test Project",
      "project_status": "draft",
      "project_due_date": "2025-10-15"
    };
    await submitFormWithPayload(page, '/projects/form', 'projects', createProjectPayload);
  });

  /**
   * @description Test editing an existing project.
   * @payload
   * {
   * "client_id": "$client_id",
   * "project_name": "$project_name",
   * "project_status": "$project_status",
   * "project_due_date": "$project_due_date"
   * }
   */
  // Route: /projects/form/{id}
  test('it can edit an existing project', async () => {
    const editProjectPayload = {
      "client_id": "956",
      "project_name": "Edited Project",
      "project_status": "complete",
      "project_due_date": "2025-11-15"
    };
    await submitFormWithPayload(page, '/projects/form/56', 'projects', editProjectPayload);
  });

  /**
   * @description Test creating a new task.
   * @payload
   * {
   * "project_id": "$project_id",
   * "task_name": "$task_name",
   * "task_description": "$task_description",
   * "task_price": "$task_price",
   * "tax_rate_id": "$tax_rate_id",
   * "task_finish_date": "$task_finish_date",
   * "task_status": "$task_status"
   * }
   */
  // Route: /tasks/form
  test('it can create a new task', async () => {
    const createTaskPayload = {
      "project_id": "56",
      "task_name": "Test Task",
      "task_description": "A test task.",
      "task_price": "50.00",
      "tax_rate_id": "131",
      "task_finish_date": "2025-10-20",
      "task_status": "in_progress"
    };
    await submitFormWithPayload(page, '/tasks/form', 'projects', createTaskPayload);
  });

  /**
   * @description Test editing an existing task.
   * @payload
   * {
   * "project_id": "$project_id",
   * "task_name": "$task_name",
   * "task_description": "$task_description",
   * "task_price": "$task_price",
   * "tax_rate_id": "$tax_rate_id",
   * "task_finish_date": "$task_finish_date",
   * "task_status": "$task_status"
   * }
   */
  // Route: /tasks/form/{id}
  test('it can edit an existing task', async () => {
    const editTaskPayload = {
      "project_id": "56",
      "task_name": "Edited Task",
      "task_description": "An edited test task.",
      "task_price": "75.00",
      "tax_rate_id": "131",
      "task_finish_date": "2025-10-25",
      "task_status": "complete"
    };
    await submitFormWithPayload(page, '/tasks/form/63', 'projects', editTaskPayload);
  });

  // Route: /projects/delete/{id}
  test('it can delete a project', async () => {
    await assertDestroy(page, '/projects/delete/56');
  });

  // Route: /tasks/delete/{id}
  test('it can delete a task', async () => {
    await assertDestroy(page, '/tasks/delete/63');
  });
});
