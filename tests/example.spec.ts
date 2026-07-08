import { test, expect } from '@playwright/test';

test.describe('Example demo tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts (defaults to http://localhost:3000)
    await page.goto('/');
  });

  test('homepage loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Playwright Demo/i);
    // Verify the main heading is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/FixPilot Playwright Demo/i);
  });

  test('navigation to about page works', async ({ page }) => {
    // Assume there is a navigation link with data-test-id="nav-about"
    await page.click('[data-test-id="nav-about"]');
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toHaveText(/About/i);
  });
});