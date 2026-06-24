import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  const loginUrl = 'https://demo.fixpilot.com/login';

  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
  });

  test('should display login form with required fields', async ({ page }) => {
    const emailInput = page.locator('input[data-test="login-email"]');
    const passwordInput = page.locator('input[data-test="login-password"]');
    const submitBtn = page.locator('button[data-test="login-submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeDisabled(); // button disabled until fields are filled
  });

  test('should show validation errors for empty submission', async ({ page }) => {
    await page.locator('button[data-test="login-submit"]').click();

    const emailError = page.locator('span[data-test="error-email"]');
    const passwordError = page.locator('span[data-test="error-password"]');

    await expect(emailError).toHaveText(/required/i);
    await expect(passwordError).toHaveText(/required/i);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Replace these credentials with valid test accounts in CI environment
    const validEmail = process.env.FIXPILOT_TEST_USER ?? 'test.user@example.com';
    const validPassword = process.env.FIXPILOT_TEST_PASS ?? 'Password123!';

    await page.fill('input[data-test="login-email"]', validEmail);
    await page.fill('input[data-test="login-password"]', validPassword);
    await page.locator('button[data-test="login-submit"]').click();

    // Expect navigation to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('h1[data-test="dashboard-welcome"]')).toContainText(validEmail);
  });
});