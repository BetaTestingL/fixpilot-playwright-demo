import { test, expect } from '@playwright/test';

test.describe('Example.com basic navigation', () => {
  test('should display correct page title and navigate to IANA', async ({ page }) => {
    // Navigate to the example domain
    await page.goto('https://example.com');

    // Verify the page title contains "Example Domain"
    await expect(page).toHaveTitle(/Example Domain/);

    // Locate the "More information..." link and ensure it is visible
    const moreInfoLink = page.getByRole('link', { name: 'More information...' });
    await expect(moreInfoLink).toBeVisible();

    // Click the link and verify navigation to the IANA page
    await moreInfoLink.click();
    await expect(page).toHaveURL('https://www.iana.org/domains/reserved');

    // Verify the heading on the IANA page
    const heading = page.locator('h1');
    await expect(heading).toHaveText('IANA-managed Reserved Domains');
  });
});