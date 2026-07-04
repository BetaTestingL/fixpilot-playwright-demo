import { test, expect } from '@playwright/test';

test.describe('Primary Button', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Adjust the URL to match the application under test.
    await page.goto('/');
  });

  test('toggles expected text on each click', async ({ page }) => {
    // Assuming the primary button has a data-test-id attribute.
    const primaryButton = page.getByTestId('primary-button');

    // Verify the button is visible.
    await expect(primaryButton).toBeVisible();

    // Initial state – expect the button to show "Start".
    await expect(primaryButton).toHaveText('Start');

    // First click – should change to "Stop".
    await primaryButton.click();
    await expect(primaryButton).toHaveText('Stop');

    // Second click – should revert back to "Start".
    await primaryButton.click();
    await expect(primaryButton).toHaveText('Start');
  });
});