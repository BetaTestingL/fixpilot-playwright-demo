import { test, expect } from '@playwright/test';

test.describe('Example spec', () => {
  test('should load the home page and display the main heading', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts
    await page.goto('/');

    // Verify the page title contains an expected keyword (adjust as needed for the actual app)
    await expect(page).toHaveTitle(/FixPilot|Demo|Playwright/i);

    // Assume the main heading has a data-test-id attribute for reliable selection
    const mainHeading = page.locator('[data-test-id="main-heading"]');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/welcome/i);
  });
});