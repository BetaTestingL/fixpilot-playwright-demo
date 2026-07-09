import { test, expect } from '@playwright/test';

test.describe('Dashboard – Core Features', () => {
  test.beforeEach(async ({ page }) => {
    // Assume the user is already authenticated via storage state.
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should display a list of recent projects', async ({ page }) => {
    const projectList = page.locator('[data-test-id="project-list"] > li');
    await expect(projectList).toHaveCountGreaterThan(0);

    // Verify that each listed project shows a title.
    const firstProjectTitle = projectList.first().locator('[data-test-id="project-title"]');
    await expect(firstProjectTitle).toBeVisible();
  });

  test('should create a new project via the "New Project" button', async ({ page }) => {
    await page.getByRole('button', { name: /new project/i }).click();

    // Fill out the creation modal.
    await page.fill('[data-test-id="project-name"]', 'Playwright Demo Project');
    await page.fill('[data-test-id="project-description"]', 'Automated test project created by Playwright.');
    await page.getByRole('button', { name: /create/i }).click();

    // Verify the new project appears in the list.
    const newProject = page.locator('[data-test-id="project-list"] li', {
      hasText: 'Playwright Demo Project',
    });
    await expect(newProject).toBeVisible();
  });

  test('should filter projects using the search bar', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search projects...');
    await searchInput.fill('Demo');

    // Expect only projects containing "Demo" in the title to be visible.
    const visibleProjects = page.locator('[data-test-id="project-list"] li:visible');
    const count = await visibleProjects.count();
    for (let i = 0; i < count; ++i) {
      const title = await visibleProjects.nth(i).locator('[data-test-id="project-title"]').innerText();
      expect(title.toLowerCase()).toContain('demo');
    }
  });
});