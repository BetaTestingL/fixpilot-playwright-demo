import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the root of the application before each test.
    await page.goto('/');
  });

  test('should display the correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/welcome to fixpilot demo/i);
  });

  test('should navigate to the About page via the main navigation link', async ({ page }) => {
    const aboutLink = page.locator('a[data-test-id="about-link"]');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Verify URL contains /about and the page heading is correct.
    await expect(page).toHaveURL(/\/about/);
    const aboutHeading = page.locator('h1');
    await expect(aboutHeading).toBeVisible();
    await expect(aboutHeading).toHaveText(/about/i);
  });
});