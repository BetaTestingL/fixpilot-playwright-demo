import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form elements', async ({ page }) => {
    await expect(page.locator('form#loginForm')).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should reject invalid credentials with an error message', async ({
    page,
  }) => {
    await page.fill('#username', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await Promise.all([
      page.waitForResponse((resp) =>
        resp.url().includes('/api/auth/login') && resp.status() === 401,
      ),
      page.click('button[type="submit"]'),
    ]);

    const errorMsg = page.locator('.alert-error');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(/invalid credentials/i);
  });

  test('should log in successfully with valid credentials', async ({
    page,
  }) => {
    await page.fill('#username', 'test_user');
    await page.fill('#password', 'correct_password');

    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    // After successful login, user is redirected to dashboard.
    await expect(page).toHaveURL(/\/dashboard/);
    const welcomeBanner = page.locator('.welcome-banner');
    await expect(welcomeBanner).toBeVisible();
    await expect(welcomeBanner).toContainText('Welcome, test_user');
  });
});