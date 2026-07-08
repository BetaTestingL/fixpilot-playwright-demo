import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the landing page before each test
    await page.goto('/');
  });

  test('should display login page when clicking the login link', async ({ page }) => {
    await page.getByRole('link', { name: /login/i }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });

  test('should allow a user to log in with valid credentials', async ({ page }) => {
    await page.getByRole('link', { name: /login/i }).click();

    await page.getByLabel('Email').fill('testuser@example.com');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Expect to be redirected to the dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
  });

  test('should show an error message for invalid credentials', async ({ page }) => {
    await page.getByRole('link', { name: /login/i }).click();

    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();

    const errorMessage = page.locator('.notification.error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/invalid credentials/i);
  });
});