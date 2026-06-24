import { test, expect } from '@playwright/test';

test.describe('User profile management', () => {
  test.beforeEach(async ({ page }) => {
    // Assume a helper endpoint that logs in the test user via API
    await page.context().addInitScript(() => {
      window.localStorage.setItem('authToken', 'test-token');
    });
    await page.goto('/profile');
  });

  test('profile page displays user information', async ({ page }) => {
    const nameField = page.getByLabel('Full Name');
    await expect(nameField).toBeVisible();
    await expect(nameField).toHaveValue(/Test User/i);
  });

  test('updating profile information persists after reload', async ({ page }) => {
    const nameField = page.getByLabel('Full Name');
    await nameField.fill('Updated User');

    await page.getByRole('button', { name: /save changes/i }).click();

    // Confirmation toast
    const toast = page.locator('[data-test-id="toast-success"]');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/profile updated/i);

    // Reload and verify persisted value
    await page.reload();
    await expect(nameField).toHaveValue('Updated User');
  });
});