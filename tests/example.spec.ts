import { test, expect } from '@playwright/test';

test.describe('Demo Application Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the root of the demo app before each test.
    await page.goto('/');
  });

  test('has the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/);
  });

  test('primary button is present and enabled', async ({ page }) => {
    const primaryButton = page.getByTestId('primary-button');
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toBeEnabled();
  });
});