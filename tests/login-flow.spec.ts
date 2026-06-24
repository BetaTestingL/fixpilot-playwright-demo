import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  const baseUrl = process.env.PW_BASE_URL ?? 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
  });

  test('should display login form with required fields', async ({ page }) => {
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#login-button');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    await expect(usernameInput).toHaveAttribute('type', 'text');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should allow a user to login with valid credentials', async ({ page }) => {
    // Fill in credentials (use placeholder values that are assumed to be valid in the demo app)
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');

    // Submit the form
    await page.click('#login-button');

    // After successful login, assume the app redirects to a dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    const welcomeBanner = page.locator('h1', { hasText: /welcome/i });
    await expect(welcomeBanner).toBeVisible();
  });

  test('should show an error message for invalid credentials', async ({ page }) => {
    await page.fill('#username', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    const errorAlert = page.locator('.error-message');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText(/invalid credentials|login failed/i);
  });
});