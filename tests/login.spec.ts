import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  test('should allow a user to log in with valid credentials', async ({ page }) => {
    // Open the login page
    await page.goto('/login');

    // Fill in credentials
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', 'Password123!');

    // Submit the login form
    await page.click('button:has-text("Login")');

    // Verify successful navigation to the dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('h2')).toHaveText('Dashboard');

    // Verify that a logout option is now visible
    await expect(page.locator('text=Logout')).toBeVisible();
  });

  test('should display an error message for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    // Enter invalid credentials
    await page.fill('#email', 'invalid@example.com');
    await page.fill('#password', 'wrongpassword');

    // Attempt to log in
    await page.click('button:has-text("Login")');

    // Verify that an error notification appears
    const errorNotification = page.locator('.notification-error');
    await expect(errorNotification).toBeVisible();
    await expect(errorNotification).toHaveText(/invalid credentials/i);
  });
});