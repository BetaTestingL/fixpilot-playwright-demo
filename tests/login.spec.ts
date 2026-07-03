import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  const validUser = {
    email: 'test.user@example.com',
    password: 'Password123!',
  };

  test('allows a user to log in with valid credentials', async ({ page }) => {
    await page.goto('/login');

    // Fill in the login form
    await page.getByLabel(/email/i).fill(validUser.email);
    await page.getByLabel(/password/i).fill(validUser.password);

    // Submit the form
    await Promise.all([
      page.waitForNavigation(),
      page.getByRole('button', { name: /sign in/i }).click(),
    ]);

    // Verify successful login by checking for a user‑specific element
    const userMenu = page.getByRole('button', { name: /account/i });
    await expect(userMenu).toBeVisible();

    // Optionally, confirm the URL points to the dashboard/home after login
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('shows an error message with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel(/email/i).fill('invalid@example.com');
    await page.getByLabel(/password/i).fill('wrongPassword');

    await page.getByRole('button', { name: /sign in/i }).click();

    const errorAlert = page.locator('[role="alert"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText(/invalid credentials/i);
  });
});