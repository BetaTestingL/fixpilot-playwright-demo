import { test, expect } from '@playwright/test';

test.describe('FixPilot Playwright Demo – Smoke Tests', () => {
  test('homepage loads with correct title and main heading', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts (or fallback to localhost)
    await page.goto('/');

    // Verify the page title contains an expected keyword
    await expect(page).toHaveTitle(/FixPilot|Demo|Playwright/i);

    // Verify the main heading is visible and contains expected text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText(/FixPilot|Demo|Playwright/i);
  });

  test('navigation to the about page works and displays expected content', async ({ page }) => {
    await page.goto('/');

    // Click on a link that leads to the About page – adjust selector as needed
    const aboutLink = page.locator('a[href*="about"], text=About');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Ensure the URL contains /about
    await expect(page).toHaveURL(/\/about/i);

    // Verify the About page header is present
    const aboutHeader = page.locator('h1');
    await expect(aboutHeader).toBeVisible();
    await expect(aboutHeader).toContainText(/About/i);
  });
});