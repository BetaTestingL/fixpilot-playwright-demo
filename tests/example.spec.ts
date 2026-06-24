import { test, expect } from '@playwright/test';

test.describe('Example suite', () => {
  test('should load the Playwright homepage and have the correct title', async ({ page }) => {
    // Navigate to the Playwright homepage
    await page.goto('https://playwright.dev');

    // Verify the page title contains "Playwright"
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should navigate to the Docs page and verify the main heading', async ({ page }) => {
    // Start from the homepage
    await page.goto('https://playwright.dev');

    // Click the "Docs" link in the top navigation
    await page.getByRole('link', { name: 'Docs' }).click();

    // Ensure the URL now points to the docs section
    await expect(page).toHaveURL(/.*\/docs/);

    // Verify that the main heading on the docs landing page contains expected text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toContainText('Getting started');
  });
});