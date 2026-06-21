import { test, expect } from '@playwright/test';

test('example page loads and displays expected content', async ({ page }) => {
  // Navigate to the base URL defined in playwright.config.ts
  await page.goto('/');

  // Verify that the main heading is present and contains expected text.
  const mainHeading = page.locator('h1');
  await expect(mainHeading).toHaveText(/welcome/i);
});