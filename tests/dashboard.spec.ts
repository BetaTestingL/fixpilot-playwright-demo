import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.use({ storageState: 'storageState.json' }); // Reuse logged‑in state

  test.beforeEach(async ({ page }) => {
    // Ensure we start from the dashboard page
    await page.goto('/dashboard');
  });

  test('should display key widgets', async ({ page }) => {
    const widgets = [
      { selector: '#widget-recent-activities', name: 'Recent Activities' },
      { selector: '#widget-performance', name: 'Performance Overview' },
      { selector: '#widget-notifications', name: 'Notifications' },
    ];

    for (const widget of widgets) {
      const el = page.locator(widget.selector);
      await expect(el).toBeVisible();
      await expect(el.locator('h2')).toContainText(widget.name);
    }
  });

  test('should navigate to project details from the project list', async ({ page }) => {
    const projectRow = page.locator('table#projects tbody tr').first();
    await expect(projectRow).toBeVisible();

    const projectName = await projectRow.locator('td.project-name').innerText();
    await projectRow.locator('a.view-details').click();

    await expect(page).toHaveURL(/\/projects\/\d+/);
    await expect(page.locator('h1')).toContainText(projectName);
  });

  test('should filter activity feed by type', async ({ page }) => {
    const filterDropdown = page.locator('select#activityFilter');
    await filterDropdown.selectOption('error');

    const activityItems = page.locator('.activity-item');
    await expect(activityItems).toHaveCountGreaterThan(0);

    // Verify each displayed activity matches the selected filter
    const count = await activityItems.count();
    for (let i = 0; i < count; ++i) {
      const type = await activityItems.nth(i).getAttribute('data-type');
      await expect(type).toBe('error');
    }
  });
});