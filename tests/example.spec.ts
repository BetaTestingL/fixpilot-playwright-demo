import { test, expect } from '@playwright/test';

test.describe('Example page', () => {
  test('should load the homepage and display the correct title and header', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts (or fallback to a known URL)
    await page.goto('/');

    // Verify that the page title contains the word "Playwright"
    await expect(page).toHaveTitle(/Playwright/i);

    // Verify that the main header is visible and contains expected text
    const mainHeader = page.locator('h1');
    await expect(mainHeader).toBeVisible();
    await expect(mainHeader).toHaveText(/Playwright/i);
  });
});