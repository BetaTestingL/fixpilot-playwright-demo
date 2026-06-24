import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('form#loginForm')).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('should reject invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'invalid_user');
    await page.fill('input[name="password"]', 'wrong_password');
    await page.click('button:has-text("Sign In")');

    const errorMsg = page.locator('.notification-error');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(/invalid credentials/i);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should allow a user to log in with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'test_user');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button:has-text("Sign In")');

    // After successful login, the user is redirected to the dashboard.
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('h1')).toHaveText(/dashboard/i);
    await expect(page.locator('text=Welcome, test_user')).toBeVisible();
  });
});