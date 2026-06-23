import { test, expect } from '@playwright/test';

test.describe('Example.com sanity checks', () => {
  const baseURL = 'https://example.com';

  test('page has correct title', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveTitle('Example Domain');
  });

  test('main heading is visible and contains correct text', async ({ page }) => {
    await page.goto(baseURL);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');
  });

  test('navigation link leads to the expected URL', async ({ page }) => {
    await page.goto(baseURL);
    const moreInfoLink = page.locator('a[href="https://www.iana.org/domains/example"]');
    await expect(moreInfoLink).toBeVisible();
    await moreInfoLink.click();
    await expect(page).toHaveURL('https://www.iana.org/domains/example');
    await expect(page.locator('h1')).toHaveText('IANA-managed Reserved Domains');
  });
});