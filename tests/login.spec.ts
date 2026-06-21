import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('[data-test-id="login-form"]')).toBeVisible();
    await expect(page.locator('[data-test-id="login-email"]')).toBeVisible();
    await expect(page.locator('[data-test-id="login-password"]')).toBeVisible();
  });

  test('should reject invalid credentials', async ({ page }) => {
    await page.fill('[data-test-id="login-email"]', 'invalid@example.com');
    await page.fill('[data-test-id="login-password"]', 'wrongpassword');
    await page.click('[data-test-id="login-submit"]');

    const error = page.locator('[data-test-id="login-error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/invalid credentials/i);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('[data-test-id="login-email"]', 'user@example.com');
    await page.fill('[data-test-id="login-password"]', 'Password123!');
    await page.click('[data-test-id="login-submit"]');

    // After successful login we expect to be redirected to the dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('[data-test-id="dashboard-welcome"]')).toContainText('Welcome, User');
  });
});