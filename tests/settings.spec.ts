import { test, expect } from '@playwright/test';

test.describe('User Settings', () => {
  test.beforeEach(async ({ page }) => {
    // Log in
    await page.goto('/login');
    await page.getByLabel('Email').fill('testuser@example.com');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Navigate to Settings
    await page.getByRole('link', { name: /settings/i }).click();
    await expect(page).toHaveURL(/.*\/settings/);
  });

  test('should update profile information', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Test User Updated');
    await page.getByRole('button', { name: /save changes/i }).click();

    const toast = page.locator('.toast-success');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/profile updated/i);
  });

  test('should toggle email notifications', async ({ page }) => {
    const toggle = page.locator('input[name="emailNotifications"]');
    const currentlyChecked = await toggle.isChecked();
    await toggle.setChecked(!currentlyChecked);
    await page.getByRole('button', { name: /save changes/i }).click();

    const toast = page.locator('.toast-success');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/settings saved/i);
  });
});