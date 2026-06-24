import { test, expect } from '@playwright/test';

test.describe('Static Pages – About', () => {
  test('should load the About page with correct meta information', async ({ page }) => {
    await page.goto('/about');

    // Verify URL.
    await expect(page).toHaveURL(/.*\/about/);

    // Verify page title.
    await expect(page).toHaveTitle(/About.*FixPilot/i);

    // Verify main heading.
    const heading = page.locator('h1:has-text("About")');
    await expect(heading).toBeVisible();

    // Verify that the company description paragraph exists.
    const description = page.locator('p.company-description');
    await expect(description).toBeVisible();
    await expect(description).toContainText('FixPilot');
  });

  test('should have functional external links', async ({ page }) => {
    await page.goto('/about');

    // Example external link to the documentation.
    const docsLink = page.locator('a[href="https://docs.fixpilot.com"]');
    await expect(docsLink).toBeVisible();

    // Open link in a new tab and verify the target URL.
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      docsLink.click({ modifiers: ['Control'] }), // Open in new tab.
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage).toHaveURL('https://docs.fixpilot.com/');
    await expect(newPage.locator('h1')).toContainText('Documentation');
  });
});