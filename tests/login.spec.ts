import { test, expect } from '@playwright/test';

test.describe('User authentication', () => {
  const validUser = {
    email: 'testuser@example.com',
    password: 'Password123!',
  };

  test('login with valid credentials succeeds', async ({ page }) => {
    await page.goto('/login');

    // Fill email and password fields
    await page.getByLabel('Email').fill(validUser.email);
    await page.getByLabel('Password').fill(validUser.password);

    // Submit the login form
    await page.getByRole('button', { name: /log in/i }).click();

    // Expect navigation to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    // Verify a user‑specific element appears
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
  });

  test('login fails with invalid password', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill(validUser.email);
    await page.getByLabel('Password').fill('WrongPassword!');

    await page.getByRole('button', { name: /log in/i }).click();

    // Expect an error toast/message
    const errorMsg = page.locator('[data-test-id="login-error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(/invalid credentials/i);
  });
});