import { test, expect } from '@playwright/test';

test.describe('Authentication – Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('[data-test-id="username"]', 'testuser');
    await page.fill('[data-test-id="password"]', 'Password123!');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Expect to be redirected to the dashboard.
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.getByRole('heading', { name: /welcome, testuser/i })).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.getByRole('button', { name: /sign in/i }).click();

    const usernameError = page.getByText(/username is required/i);
    const passwordError = page.getByText(/password is required/i);
    await expect(usernameError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('should display an error for invalid credentials', async ({ page }) => {
    await page.fill('[data-test-id="username"]', 'invalidUser');
    await page.fill('[data-test-id="password"]', 'wrongPass');
    await page.getByRole('button', { name: /sign in/i }).click();

    const errorAlert = page.getByRole('alert').filter({ hasText: /invalid credentials/i });
    await expect(errorAlert).toBeVisible();
  });
});