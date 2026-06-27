import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should log in with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    // Successful login redirects to the dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('h1')).toHaveText(/dashboard/i);
  });

  test('should show an error message with invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    const errorMessage = page.locator('[role="alert"], .error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/invalid credentials/i);
  });
});