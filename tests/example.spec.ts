import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo – Core UI checks', () => {
  // Navigate to the home page before each test
  test.beforeEach(async ({ page }) => {
    // The baseURL can be defined in playwright.config.ts; fallback to localhost if not set
    const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
    await page.goto(baseURL);
  });

  test('homepage loads with correct title and header', async ({ page }) => {
    // Verify the page title contains the product name
    await expect(page).toHaveTitle(/FixPilot/i);

    // Verify the main heading is visible and has the expected text
    const mainHeader = page.locator('h1');
    await expect(mainHeader).toBeVisible();
    await expect(mainHeader).toHaveText(/welcome to fixpilot/i);
  });

  test('navigation menu is functional', async ({ page }) => {
    // Assume a navigation bar with links identified by data-test attributes
    const docsLink = page.locator('[data-test=nav-docs]');
    await expect(docsLink).toBeVisible();
    await docsLink.click();

    // After navigation, verify URL and page content
    await expect(page).toHaveURL(/.*\/docs/);
    const docsHeader = page.locator('h2', { hasText: /documentation/i });
    await expect(docsHeader).toBeVisible();
  });

  test('primary action button triggers expected behavior', async ({ page }) => {
    // Assume a primary CTA button with a data-test attribute
    const ctaButton = page.locator('[data-test=cta-primary]');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveText(/get started/i);
    await ctaButton.click();

    // Expect a modal to appear after clicking the CTA
    const modal = page.locator('[role=dialog]');
    await expect(modal).toBeVisible();
    const modalTitle = modal.locator('h3');
    await expect(modalTitle).toHaveText(/welcome aboard/i);
  });
});