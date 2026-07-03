import { test, expect } from '@playwright/test';

test.describe('Global Navigation', () => {
  const NAV_ITEMS = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Projects', path: '/projects' },
    { name: 'Reports', path: '/reports' },
    { name: 'Settings', path: '/settings' },
  ];

  test.beforeEach(async ({ page }) => {
    // Log in once for all navigation tests
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test.user@example.com');
    await page.fill('input[name="password"]', 'CorrectPassword123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard$/);
  });

  for (const item of NAV_ITEMS) {
    test(`should navigate to ${item.name} page via top menu`, async ({ page }) => {
      await page.getByRole('link', { name: new RegExp(item.name, 'i') }).click();
      await expect(page).toHaveURL(new RegExp(`${item.path}$`));
      await expect(page.locator('h1')).toContainText(item.name);
    });
  }

  test('should highlight the active navigation item', async ({ page }) => {
    await page.getByRole('link', { name: /projects/i }).click();
    const activeLink = page.locator('nav a.active', { hasText: /projects/i });
    await expect(activeLink).toBeVisible();
  });
});