import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should have the correct title and main heading', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts
    await page.goto('/');

    // Assert that the page title contains the expected text
    await expect(page).toHaveTitle(/FixPilot Demo/i);

    // Assert that the main heading is visible and contains expected text
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/FixPilot Demo/i);
  });
});