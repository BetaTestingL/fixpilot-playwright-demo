import { test, expect } from '@playwright/test';

test.describe('Example page tests', () => {
  test('should load Playwright homepage and have correct title', async ({ page }) => {
    // Navigate to the official Playwright documentation site
    await page.goto('https://playwright.dev');

    // Verify that the page title contains the word "Playwright"
    await expect(page).toHaveTitle(/Playwright/);
  });
});