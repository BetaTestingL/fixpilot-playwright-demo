import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should load with correct title and heading', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Verify the page title
    await expect(page).toHaveTitle(/Fixpilot Demo/);

    // Verify the main heading is visible and contains expected text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('Welcome to Fixpilot Demo');

    // Verify the primary call‑to‑action button is present
    const ctaButton = page.getByRole('button', { name: /Get Started/i });
    await expect(ctaButton).toBeVisible();
  });

  test('should navigate to the About page via the navigation menu', async ({ page }) => {
    await page.goto('/');

    // Click the "About" link in the top navigation
    const aboutLink = page.getByRole('link', { name: /About/i });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Verify URL and page content
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeading = page.locator('h1');
    await expect(aboutHeading).toHaveText('About Fixpilot');
  });
});