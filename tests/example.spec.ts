import { test, expect } from '@playwright/test';

test.describe('Demo site basic checks', () => {
  test('homepage has correct title', async ({ page }) => {
    // Navigate to a stable public page that is part of the demo
    await page.goto('https://example.com/');
    await expect(page).toHaveTitle('Example Domain');
  });

  test('homepage contains expected heading', async ({ page }) => {
    await page.goto('https://example.com/');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Example Domain');
  });

  test('navigation to more information works', async ({ page }) => {
    await page.goto('https://example.com/');
    const moreLink = page.locator('text=More information');
    await expect(moreLink).toBeVisible();
    await moreLink.click();
    // The link points to an external IANA page; verify the URL pattern
    await expect(page).toHaveURL(/.*iana\.org/);
  });
});