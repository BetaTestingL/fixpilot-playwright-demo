import { test, expect } from '@playwright/test';

test.describe('Demo site basic flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page before each test
    await page.goto('https://example.com');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('main heading is visible and contains correct text', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');
  });

  test('navigation link leads to the IANA information page', async ({ page }) => {
    const moreInfoLink = page.locator('text=More information');
    await expect(moreInfoLink).toBeVisible();
    await moreInfoLink.click();

    // Verify that the URL changed to the expected domain
    await expect(page).toHaveURL(/.*iana\.org/);

    // Verify the target page header
    const ianaHeader = page.locator('h1');
    await expect(ianaHeader).toBeVisible();
    await expect(ianaHeader).toHaveText('IANA — IANA-managed Reserved Domains');
  });
});