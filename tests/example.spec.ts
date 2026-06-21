import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo Application', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts (e.g., http://localhost:3000)
    await page.goto('/');
  });

  test('homepage displays correct title', async ({ page }) => {
    // Verify that the page title contains the product name.
    await expect(page).toHaveTitle(/FixPilot/i);
  });

  test('homepage contains main heading', async ({ page }) => {
    // Assuming the main heading has a role of heading level 1.
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/welcome to fixpilot/i);
  });

  test('navigation to About page works', async ({ page }) => {
    // Assume there is a navigation link with text "About".
    await page.getByRole('link', { name: /about/i }).click();

    // Verify URL contains /about and the page has an appropriate heading.
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeading = page.getByRole('heading', { name: /about fixpilot/i });
    await expect(aboutHeading).toBeVisible();
  });

  test('footer contains copyright information', async ({ page }) => {
    // Assume the footer has a test id of "site-footer".
    const footer = page.locator('[data-test-id="site-footer"]');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(/©\s*\d{4}\s*FixPilot/i);
  });
});