import { test, expect } from '@playwright/test';

test('example.com loads and displays the correct title', async ({ page }) => {
  // Navigate to the target page
  await page.goto('https://example.com');

  // Verify that the page title contains "Example Domain"
  await expect(page).toHaveTitle(/Example Domain/);
});