import { test, expect } from '@playwright/test';

test.describe('Authentication – Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure we start from the login page.
    await page.goto('/login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Fill in the login form.
    await page.fill('input[name="username"]', 'validUser');
    await page.fill('input[name="password"]', 'ValidPass123');

    // Submit the form.
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    // Verify that we are redirected to the dashboard.
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Verify a user‑specific element is visible.
    const userMenu = page.locator('#user-menu');
    await expect(userMenu).toBeVisible();
    await expect(userMenu).toContainText('validUser');
  });

  test('should display an error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'invalidUser');
    await page.fill('input[name="password"]', 'WrongPass');

    await page.click('button[type="submit"]');

    const errorAlert = page.locator('.alert-error');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText(/invalid username or password/i);
  });

  test('should retain the "Remember me" state when checked', async ({ page }) => {
    await page.fill('input[name="username"]', 'validUser');
    await page.fill('input[name="password"]', 'ValidPass123');
    await page.check('input[name="remember"]');

    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    // Log out to verify persistence.
    await page.click('#logout');

    // Return to login page – the username field should be pre‑filled.
    await page.goto('/login');
    const usernameField = page.locator('input[name="username"]');
    await expect(usernameField).toHaveValue('validUser');
  });
});