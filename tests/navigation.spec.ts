import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ];

  for (const { label, path } of navLinks) {
    test(`should navigate to ${label} page`, async ({ page }) => {
      await page.click(`nav >> text=${label}`);
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      // Verify that the main heading matches the page.
      const heading = page.locator('h1, h2');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(new RegExp(label, 'i'));
    });
  }
});