import { test, expect } from '@playwright/test';

test.describe('Demo application sanity checks', () => {
  test('home page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Demo App/i);
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
  });

  test('navigation links are functional', async ({ page }) => {
    await page.goto('/');
    const links = [
      { name: /login/i, path: /\/login/ },
      { name: /about/i, path: /\/about/ },
      { name: /contact/i, path: /\/contact/ },
    ];

    for (const link of links) {
      await page.getByRole('link', { name: link.name }).click();
      await expect(page).toHaveURL(link.path);
      await page.goBack();
    }
  });

  test('footer contains expected copyright text', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText(/©\s*\d{4}\s+Demo App/i);
  });
});