import { test, expect } from '@playwright/test';

test('example.com loads and displays the correct title', async ({ page }) => {
  // Navigate to a stable external page to guarantee test reliability
  await page.goto('https://example.com');

  // Verify that the page title contains the expected text
  await expect(page).toHaveTitle(/Example Domain/);
});