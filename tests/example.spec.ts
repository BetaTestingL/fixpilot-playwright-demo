import { test, expect } from '@playwright/test';

/**
 * Example test that verifies the demo application loads correctly
 * and displays the expected main heading.
 *
 * Adjust the selectors and expected text if the application UI changes.
 */
test('home page loads and displays the main heading', async ({ page }) => {
  // Navigate to the base URL defined in Playwright config or fallback to localhost
  await page.goto('/');

  // Verify the page title contains the word "FixPilot"
  await expect(page).toHaveTitle(/FixPilot/i);

  // Locate the main heading (assumed to be an <h1> element)
  const mainHeading = page.locator('h1');

  // Ensure the heading is visible and contains the expected text
  await expect(mainHeading).toBeVisible();
  await expect(mainHeading).toHaveText(/FixPilot Demo/i);
});

/**
 * Additional sanity check to ensure the navigation menu is present.
 */
test('navigation bar is visible with expected links', async ({ page }) => {
  await page.goto('/');

  // Assume the navigation bar has a role of "navigation"
  const navBar = page.getByRole('navigation');
  await expect(navBar).toBeVisible();

  // Verify that common navigation links exist
  const homeLink = navBar.getByRole('link', { name: /home/i });
  const aboutLink = navBar.getByRole('link', { name: /about/i });
  const contactLink = navBar.getByRole('link', { name: /contact/i });

  await expect(homeLink).toBeVisible();
  await expect(aboutLink).toBeVisible();
  await expect(contactLink).toBeVisible();
});