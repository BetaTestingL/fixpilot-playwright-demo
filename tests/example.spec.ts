import { test, expect } from '@playwright/test';

test.describe('Demo application basic flow', () => {
  test('should load the home page and display the correct title', async ({ page }) => {
    // Navigate to the root of the application
    await page.goto('/');

    // Verify the page title contains the expected text
    await expect(page).toHaveTitle(/FixPilot Demo/);
  });

  test('should navigate to the About page via the main navigation', async ({ page }) => {
    await page.goto('/');

    // Click the "About" link in the navigation bar
    await page.click('nav >> text=About');

    // Verify URL and page content
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.locator('h1')).toHaveText('About Us');
  });

  test('should display the hero banner with the expected welcome message', async ({ page }) => {
    await page.goto('/');

    const heroBanner = page.locator('.hero-banner');

    // Ensure the hero banner is visible and contains the correct text
    await expect(heroBanner).toBeVisible();
    await expect(heroBanner).toContainText('Welcome to FixPilot');
  });
});