import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  const validUser = {
    username: 'testuser',
    password: 'Password123!',
  };

  test.beforeEach(async ({ page }) => {
    // Directly navigate to the login page.
    await page.goto('/login');
  });

  test('should display login form elements', async ({ page }) => {
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should reject login with empty credentials', async ({ page }) => {
    await page.click('button[type="submit"]');
    const error = page.locator('[data-test-id="login-error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/username and password are required/i);
  });

  test('should reject login with invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'invalid');
    await page.fill('input[name="password"]', 'wrong');
    await page.click('button[type="submit"]');

    const error = page.locator('[data-test-id="login-error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/invalid username or password/i);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', validUser.username);
    await page.fill('input[name="password"]', validUser.password);
    await page.click('button[type="submit"]');

    // After successful login the user is redirected to the dashboard.
    await expect(page).toHaveURL(/\/dashboard/);
    const greeting = page.locator('[data-test-id="user-greeting"]');
    await expect(greeting).toBeVisible();
    await expect(greeting).toContainText(validUser.username);
  });
});