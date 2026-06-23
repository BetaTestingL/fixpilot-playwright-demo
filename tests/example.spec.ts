import { test, expect } from '@playwright/test';

/**
 * High‑priority smoke test that validates the core demo workflow.
 *
 * The test suite assumes that the Playwright test runner is configured
 * with a `baseURL` (e.g. via `playwright.config.ts`). If no `baseURL`
 * is provided, the tests fall back to `http://localhost:3000`, which is
 * the default address used by the demo application.
 *
 * The selectors used below are based on the current implementation of
 * the FixPilot demo app:
 *   • The main heading (`h1`) contains the text “FixPilot Demo”.
 *   • The navigation link to the “About” page has the data‑testid
 *     attribute `nav-about`.
 *   • The About page displays a heading (`h2`) with the text “About”.
 *
 * Adjust the selectors if the UI changes, but keep the assertions
 * expressive and deterministic.
 */

const DEFAULT_BASE_URL = 'http://localhost:3000';

test.describe('FixPilot Demo – Core Workflow', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    // Resolve the base URL from the test configuration or use the default.
    const baseURL = testInfo.project.use.baseURL ?? DEFAULT_BASE_URL;
    await page.goto(baseURL);
  });

  test('homepage displays the correct title and heading', async ({ page }) => {
    // Verify the browser title contains the product name.
    await expect(page).toHaveTitle(/FixPilot/i);

    // Verify the main heading is present and contains the expected text.
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText(/FixPilot Demo/i);
  });

  test('navigation to the About page works and displays expected content', async ({ page }) => {
    // Click the About navigation link.
    const aboutNavLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutNavLink).toBeVisible();
    await aboutNavLink.click();

    // Ensure the URL reflects the navigation.
    await expect(page).toHaveURL(/.*\/about/);

    // Verify the About page heading.
    const aboutHeading = page.locator('h2');
    await expect(aboutHeading).toBeVisible();
    await expect(aboutHeading).toHaveText(/About/i);
  });

  test('footer contains the expected copyright notice', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // The demo footer should contain the current year and the company name.
    const currentYear = new Date().getFullYear().toString();
    await expect(footer).toContainText(`© ${currentYear} FixPilot`);
  });
});