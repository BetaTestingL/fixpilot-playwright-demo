import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display the login form', async ({ page }) => {
    await expect(page.locator('form#loginForm')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('should log in with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('testuser@example.com');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Successful login redirects to the dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('h1')).toHaveText(/dashboard/i);
  });

  test('should show an error message with invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();

    const alert = page.locator('[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText(/invalid credentials/i);
  });
});