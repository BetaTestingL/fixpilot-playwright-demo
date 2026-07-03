import { test, expect } from '@playwright/test';

test.describe('Demo application – core flow', () => {
  test('loads the home page and shows the welcome banner', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts
    await page.goto('/');

    // Verify the page title contains the expected text
    await expect(page).toHaveTitle(/FixPilot Demo/i);

    // Check that the main heading is present and contains the word "Welcome"
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/welcome/i);
  });

  test('navigates to the About page via the top navigation', async ({ page }) => {
    await page.goto('/');

    // Click the navigation link that leads to the About page
    await page.getByRole('link', { name: /about/i }).click();

    // Ensure the URL changed to the About page
    await expect(page).toHaveURL(/.*\/about/);

    // Verify the About page header is displayed
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toBeVisible();
    await expect(aboutHeader).toHaveText(/about/i);
  });
});