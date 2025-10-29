/**
 * @fileoverview Test suite for the Projects module.
 * This file contains tests for all `projects` routes, including views, forms, and deletions.
 *
 * Covered routes:
 *   - /projects/index
 *   - /projects/form
 *   - /projects/form/{id}
 *
 * Pending (incomplete) tests for:
 *   - /projects/view/{id}
 *   - /projects/delete/{id}
 */
const {assertPageLoads, submitFormWithPayload, assertDestroy} = require('../../test-helpers');

describe('Projects Module', () => {
    // Routes: /projects/index
    test('it can view the projects index', async () => {
        await assertPageLoads(page, '/projects/index');
        await expect(page.locator('.content-title')).toContainText('Projects');
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
            "project_status": "in_progress",
            "project_due_date": "2025-10-16"
        };
        await submitFormWithPayload(page, '/projects/form/56', 'projects', editProjectPayload);
    });

    // Route: /projects/view/{id}
    test.skip('it can view a project by id', async () => {
        // TODO: Implement test for /projects/view/{id}
    });

    // Route: /projects/delete/{id}
    test.skip('it can delete a project', async () => {
        // TODO: Implement test for /projects/delete/{id}
    });
});
