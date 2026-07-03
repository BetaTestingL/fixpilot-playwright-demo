import { test, expect } from '@playwright/test';

test.describe('Authentication – Login', () => {
  const LOGIN_URL = '/login';
  const DASHBOARD_URL = '/dashboard';

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto(LOGIN_URL);

    // Fill in the login form
    await page.fill('input[name="email"]', 'test.user@example.com');
    await page.fill('input[name="password"]', 'CorrectPassword123!');
    await page.click('button[type="submit"]');

    // Verify navigation to the dashboard
    await expect(page).toHaveURL(new RegExp(`${DASHBOARD_URL}$`));
    await expect(page.locator('h1', { hasText: /dashboard/i })).toBeVisible();

    // Verify that the user’s name appears in the header
    const userMenu = page.getByRole('button', { name: /test\.user/i });
    await expect(userMenu).toBeVisible();
  });

  test('should show an error message with invalid credentials', async ({ page }) => {
    await page.goto(LOGIN_URL);

    await page.fill('input[name="email"]', 'test.user@example.com');
    await page.fill('input[name="password"]', 'WrongPassword');
    await page.click('button[type="submit"]');

    // The URL should stay on the login page
    await expect(page).toHaveURL(new RegExp(`${LOGIN_URL}$`));

    // Verify error toast/alert
    const errorAlert = page.locator('[role="alert"]', { hasText: /invalid credentials/i });
    await expect(errorAlert).toBeVisible();
  });

  test('should enforce required fields', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.click('button[type="submit"]');

    // Expect validation messages for both fields
    const emailError = page.locator('#email-error', { hasText: /required/i });
    const passwordError = page.locator('#password-error', { hasText: /required/i });
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });
});