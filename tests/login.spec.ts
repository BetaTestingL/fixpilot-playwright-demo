import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  const validUser = {
    email: 'test.user@example.com',
    password: 'Password123!',
  };

  test('should allow a user to log in with valid credentials', async ({ page }) => {
    await page.goto('/login');

    // Fill in login form.
    await page.getByLabel(/email/i).fill(validUser.email);
    await page.getByLabel(/password/i).fill(validUser.password);
    await page.getByRole('button', { name: /sign in/i }).click();

    // Expect to be redirected to the dashboard.
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.getByRole('heading', { level: 1, name: /dashboard/i })).toBeVisible();

    // Verify user avatar appears indicating a successful login.
    await expect(page.getByAltText(/user avatar/i)).toBeVisible();
  });

  test('should display an error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel(/email/i).fill('invalid@example.com');
    await page.getByLabel(/password/i).fill('wrongPassword');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Expect an error toast/message.
    const errorMessage = page.getByRole('alert').filter({ hasText: /invalid credentials/i });
    await expect(errorMessage).toBeVisible();
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should log out successfully', async ({ page }) => {
    // Assume the user is already authenticated via storageState.
    await page.goto('/dashboard');

    // Open user menu and click logout.
    await page.getByRole('button', { name: /user menu/i }).click();
    await page.getByRole('menuitem', { name: /log out/i }).click();

    // Verify redirection to the login page.
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });
});