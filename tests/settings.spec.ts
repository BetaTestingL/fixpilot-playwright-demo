import { test, expect } from '@playwright/test';

test.describe('User Settings', () => {
  const SETTINGS_URL = '/settings';

  test.beforeEach(async ({ page }) => {
    // Assume the user is already authenticated; reuse the login flow.
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test.user@example.com');
    await page.fill('input[name="password"]', 'CorrectPassword123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard$/);
  });

  test('should allow the user to update their display name', async ({ page }) => {
    await page.goto(SETTINGS_URL);
    await expect(page).toHaveURL(/.*\/settings$/);

    const nameInput = page.locator('input[name="displayName"]');
    await nameInput.fill('Test User Updated');
    await page.click('button', { hasText: /save changes/i });

    // Confirmation toast
    const toast = page.locator('[role="status"]', { hasText: /settings saved/i });
    await expect(toast).toBeVisible();

    // Verify persisted value by reloading the page
    await page.reload();
    await expect(nameInput).toHaveValue('Test User Updated');
  });

  test('should toggle email notifications', async ({ page }) => {
    await page.goto(SETTINGS_URL);
    const toggle = page.locator('input[name="emailNotifications"]');
    const initialState = await toggle.isChecked();

    // Flip the toggle
    await toggle.setChecked(!initialState);
    await page.click('button', { hasText: /save changes/i });

    const toast = page.locator('[role="status"]', { hasText: /settings saved/i });
    await expect(toast).toBeVisible();

    // Verify the new state persists after reload
    await page.reload();
    await expect(toggle).toBeChecked(!initialState);
  });
});