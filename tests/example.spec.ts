import { test, expect } from '@playwright/test';

test.describe('Demo site basic checks', () => {
  test('should load the home page and display the main heading', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts
    await page.goto('/');

    // Verify that the page title contains the expected text
    await expect(page).toHaveTitle(/FixPilot Demo/i);

    // Check that the main heading is visible and contains expected text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/Welcome to FixPilot Demo/i);
  });

  test('should navigate to the about page and verify content', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/about"]');

    // Verify URL contains /about
    await expect(page).toHaveURL(/.*\/about/);

    // Verify the about page header
    const aboutHeader = page.locator('h2', { hasText: 'About Us' });
    await expect(aboutHeader).toBeVisible();

    // Verify that a paragraph with expected text exists
    const paragraph = page.locator('p').first();
    await expect(paragraph).toContainText('FixPilot');
  });
});