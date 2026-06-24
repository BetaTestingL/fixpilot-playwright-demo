import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  const validUser = {
    username: 'testuser',
    password: 'Password123!',
  };

  test('should allow a user to log in with valid credentials', async ({ page }) => {
    await page.goto('/login');

    // Fill in login form
    await page.fill('#username', validUser.username);
    await page.fill('#password', validUser.password);
    await page.click('button:has-text("Login")');

    // Expect navigation to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Verify user avatar is visible indicating successful login
    const userAvatar = page.locator('img[alt="User avatar"]');
    await expect(userAvatar).toBeVisible();

    // Verify a welcome message contains the username
    const welcomeMsg = page.locator('text=Welcome,').first();
    await expect(welcomeMsg).toContainText(validUser.username);
  });

  test('should display an error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    // Attempt login with wrong password
    await page.fill('#username', validUser.username);
    await page.fill('#password', 'WrongPassword!');
    await page.click('button:has-text("Login")');

    // Expect error toast/message
    const errorToast = page.locator('.toast-error');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toHaveText(/invalid credentials/i);
  });
});