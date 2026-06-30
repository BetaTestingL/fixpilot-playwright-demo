import { test, expect } from '@playwright/test';

test.describe('Example.com sanity checks', () => {
  test('should load the homepage and display the correct title', async ({ page }) => {
    // Navigate to the public example domain
    await page.goto('https://example.com');

    // Verify that the page title contains "Example Domain"
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should contain the expected heading and paragraph text', async ({ page }) => {
    await page.goto('https://example.com');

    // Assert that the main heading is present and has the correct text
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');

    // Assert that the paragraph contains the expected description
    const paragraph = page.locator('p');
    await expect(paragraph).toBeVisible();
    await expect(paragraph).toContainText('illustrative examples');
  });

  test('should navigate to the more information page when the link is clicked', async ({ page }) => {
    await page.goto('https://example.com');

    // Click the "More information..." link
    const moreInfoLink = page.locator('a', { hasText: 'More information' });
    await expect(moreInfoLink).toBeVisible();
    await moreInfoLink.click();

    // Verify that the new page loads and the URL is correct
    await expect(page).toHaveURL(/iana\.org/);
    await expect(page).toHaveTitle(/IANA — IANA-managed Reserved Domains/);
  });
});