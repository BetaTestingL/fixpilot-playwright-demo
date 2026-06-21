import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Docs', path: '/docs' },
    { label: 'Contact', path: '/contact' },
  ];

  for (const { label, path } of navLinks) {
    test(`should navigate to ${label} page`, async ({ page }) => {
      await page.click(`nav >> text=${label}`);
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.locator('h1')).toBeVisible();
    });
  }
});