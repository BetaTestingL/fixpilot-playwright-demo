import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Log in via UI (could be replaced with API auth for speed)
    await page.goto('/login');
    await page.getByLabel('Email').fill('testuser@example.com');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should display key widgets', async ({ page }) => {
    const widgets = page.locator('.widget');
    const widgetCount = await widgets.count();
    expect(widgetCount).toBeGreaterThan(0);
    await expect(widgets.first()).toBeVisible();
  });

  test('should filter the report by a date range', async ({ page }) => {
    await page.getByLabel('Start date').fill('2023-01-01');
    await page.getByLabel('End date').fill('2023-01-31');
    await page.getByRole('button', { name: /apply filter/i }).click();

    const rows = page.locator('table#report tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    // Simple verification that the first row’s date falls within the selected range
    const firstDate = await rows.first().locator('td.date').innerText();
    await expect(firstDate).toMatch(/^2023-01-/);
  });
});