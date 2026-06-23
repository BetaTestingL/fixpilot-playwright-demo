import { test, expect } from '@playwright/test';

test.describe('User Settings', () => {
  test.use({ storageState: 'storageState.json' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('h1')).toContainText('Account Settings');
  });

  test('should update profile information', async ({ page }) => {
    const nameInput = page.locator('input[name="fullName"]');
    const phoneInput = page.locator('input[name="phone"]');
    const saveButton = page.locator('button', { hasText: 'Save Changes' });

    await nameInput.fill('Jane Doe');
    await phoneInput.fill('555-123-4567');
    await saveButton.click();

    const successToast = page.locator('.toast-success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText(/profile updated successfully/i);
  });

  test('should change password with proper validation', async ({ page }) => {
    await page.click('button', { hasText: 'Change Password' });

    const currentPwd = page.locator('input[name="currentPassword"]');
    const newPwd = page.locator('input[name="newPassword"]');
    const confirmPwd = page.locator('input[name="confirmPassword"]');
    const submitBtn = page.locator('button', { hasText: 'Update Password' });

    // Attempt with mismatched confirmation
    await currentPwd.fill('CorrectPassword123');
    await newPwd.fill('NewSecurePass!1');
    await confirmPwd.fill('MismatchPass!2');
    await submitBtn.click();

    await expect(page.locator('#confirmPasswordError')).toHaveText('Passwords do not match');

    // Correct flow
    await confirmPwd.fill('NewSecurePass!1');
    await submitBtn.click();

    const toast = page.locator('.toast-success');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/password updated/i);
  });

  test('should toggle email notifications', async ({ page }) => {
    const toggle = page.locator('input[name="emailNotifications"]');
    const saveBtn = page.locator('button', { hasText: 'Save Settings' });

    const initialState = await toggle.isChecked();
    await toggle.setChecked(!initialState);
    await saveBtn.click();

    const toast = page.locator('.toast-success');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/settings saved/i);
  });
});