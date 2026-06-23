import { test, expect } from '@playwright/test';

/**
 * Verify that the Playwright documentation homepage loads correctly
 * and displays the expected title.
 */
test('Playwright docs homepage should have correct title', async ({ page }) => {
  // Navigate to the Playwright documentation site
  await page.goto('https://playwright.dev');

  // The main heading contains the word "Playwright"
  const mainHeading = page.locator('h1:has-text("Playwright")');
  await expect(mainHeading).toBeVisible();

  // Verify the page title includes "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});

/**
 * Ensure that the "Get Started" button on the homepage navigates
 * to the getting‑started guide.
 */
test('Get Started button navigates to the getting‑started guide', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Click the "Get Started" button in the hero section
  const getStartedButton = page.locator('a:has-text("Get Started")');
  await expect(getStartedButton).toBeVisible();
  await getStartedButton.click();

  // The URL should now contain the getting‑started path
  await expect(page).toHaveURL(/.*\/docs\/intro/);

  // Verify the page contains the expected heading
  const introHeading = page.locator('h1:has-text("Getting started")');
  await expect(introHeading).toBeVisible();
});