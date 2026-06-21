import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  const validUser = {
    email: 'test.user@example.com',
    password: 'Password123!',
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should allow a user to log in with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', validUser.email);
    await page.fill('input[name="password"]', validUser.password);
    await page.click('button:has-text("Sign In")');

    // After successful login, the user is redirected to the dashboard.
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('h1')).toHaveText('Dashboard');
    await expect(page.locator('text=Welcome,')).toContainText('Welcome, Test User');
  });

  test('should display an error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button:has-text("Sign In")');

    const errorMessage = page.locator('[role="alert"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/invalid email or password/i);
  });

  test('should retain the "Remember me" option state', async ({ page }) => {
    const rememberMeCheckbox = page.locator('input[name="remember"]');
    await rememberMeCheckbox.check();
    await expect(rememberMeCheckbox).toBeChecked();

    await page.fill('input[name="email"]', validUser.email);
    await page.fill('input[name="password"]', validUser.password);
    await page.click('button:has-text("Sign In")');

    // After login, revisit the login page to ensure the checkbox state persisted.
    await page.goto('/login');
    await expect(rememberMeCheckbox).toBeChecked();
  });
});