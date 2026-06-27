import { test, expect } from '@playwright/test';

test.describe('Example.com sanity checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should navigate to IANA when clicking the "More information" link', async ({ page }) => {
    await page.click('text=More information');
    await expect(page).toHaveURL(/https:\/\/www\.iana\.org\/domains\/example/);
    await expect(page.locator('h1')).toHaveText('Example Domains');
  });
});