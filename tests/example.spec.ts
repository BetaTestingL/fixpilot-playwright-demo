import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo – Basic UI checks', () => {
  test('home page loads with correct title and main heading', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts
    await page.goto('/');

    // Verify the page title contains the expected text
    await expect(page).toHaveTitle(/FixPilot/i);

    // Verify the main heading is visible and contains expected text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/FixPilot Demo/i);
  });

  test('navigation to the about page works and displays expected content', async ({ page }) => {
    // Start from the home page
    await page.goto('/');

    // Click on the navigation link to the About page (assumed selector)
    const aboutLink = page.locator('nav >> text=About');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Verify URL contains /about
    await expect(page).toHaveURL(/\/about/);

    // Verify the About page heading
    const aboutHeading = page.locator('h1');
    await expect(aboutHeading).toBeVisible();
    await expect(aboutHeading).toHaveText(/About FixPilot/i);
  });
});