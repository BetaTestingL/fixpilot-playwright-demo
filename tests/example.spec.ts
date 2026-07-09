import { test, expect } from '@playwright/test';

test('example.com loads and displays correct title', async ({ page }) => {
  // Navigate to the example page
  await page.goto('https://example.com');

  // Verify the page title contains "Example Domain"
  await expect(page).toHaveTitle(/Example Domain/);

  // Verify the main heading text
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Example Domain');
});