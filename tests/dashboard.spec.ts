import { test, expect } from '@playwright/test';

test.describe('Dashboard functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Perform login once for all dashboard tests
    await page.goto('/login');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should display a list of recent projects', async ({ page }) => {
    const projectList = page.locator('[data-test-id="project-list"] li');
    await expect(projectList).toHaveCountGreaterThan(0);

    // Verify each listed project has a title and status badge
    const firstProject = projectList.first();
    await expect(firstProject.locator('.project-title')).toBeVisible();
    await expect(firstProject.locator('.status-badge')).toBeVisible();
  });

  test('should open a project details modal when a project is clicked', async ({ page }) => {
    const firstProject = page.locator('[data-test-id="project-list"] li').first();
    await firstProject.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Verify modal contains project title and description
    await expect(modal.locator('.modal-title')).toBeVisible();
    await expect(modal.locator('.modal-description')).toBeVisible();

    // Close the modal
    await modal.locator('button:has-text("Close")').click();
    await expect(modal).toBeHidden();
  });
});