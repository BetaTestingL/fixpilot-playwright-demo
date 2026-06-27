import { test, expect } from '@playwright/test';

test.describe('Dashboard functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Perform UI login to reach the dashboard
    await page.goto('/login');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should display a user greeting', async ({ page }) => {
    const greeting = page.locator('text=Welcome,');
    await expect(greeting).toBeVisible();
  });

  test('should list at least one entry in the activity table', async ({ page }) => {
    const firstRow = page.locator('table#activity tbody tr').first();
    await expect(firstRow).toBeVisible();
  });

  test('should log out successfully', async ({ page }) => {
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});