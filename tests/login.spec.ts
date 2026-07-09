import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  const baseUrl = 'https://demo.fixpilot.com';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
  });

  test('should allow a user to log in with valid credentials', async ({ page }) => {
    // Fill in login form
    await page.fill('#email', 'test.user@example.com');
    await page.fill('#password', 'Password123!');

    // Submit the form
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    // Verify successful login
    await expect(page).toHaveURL(`${baseUrl}/dashboard`);
    const userAvatar = page.locator('.user-avatar');
    await expect(userAvatar).toBeVisible();
    await expect(page.getByRole('heading', { name: /welcome/i })).toContainText('Welcome');
  });

  test('should display an error for invalid credentials', async ({ page }) => {
    await page.fill('#email', 'invalid@example.com');
    await page.fill('#password', 'wrongPassword');

    await page.click('button[type="submit"]');

    const errorToast = page.locator('.toast-error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(/invalid email or password/i);
  });

  test('should retain the "Remember me" state across sessions', async ({ page, context }) => {
    // Check the Remember me checkbox
    await page.check('#rememberMe');

    // Perform login
    await page.fill('#email', 'test.user@example.com');
    await page.fill('#password', 'Password123!');
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    // Close the page and open a new one using the same context (preserves storage)
    await page.close();
    const newPage = await context.newPage();
    await newPage.goto(`${baseUrl}/dashboard`);

    // User should still be logged in
    await expect(newPage.locator('.user-avatar')).toBeVisible();
  });
});