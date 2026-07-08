import { test, expect } from '@playwright/test';

test.describe('Global navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to the About page from the main menu', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { name: /about us/i })).toBeVisible();
  });

  test('should highlight the active menu item', async ({ page }) => {
    await page.getByRole('link', { name: /dashboard/i }).click();
    const activeMenuItem = page.locator('[data-test-id="nav-item"].active', { hasText: /dashboard/i });
    await expect(activeMenuItem).toBeVisible();
  });

  test('should preserve scroll position when navigating back', async ({ page }) => {
    // Go to a long list page
    await page.getByRole('link', { name: /items/i }).click();
    await expect(page).toHaveURL(/\/items/);

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    const scrollYBefore = await page.evaluate(() => window.scrollY);
    expect(scrollYBefore).toBeGreaterThan(0);

    // Navigate to another page and back
    await page.getByRole('link', { name: /home/i }).click();
    await page.goBack();

    const scrollYAfter = await page.evaluate(() => window.scrollY);
    expect(scrollYAfter).toBe(scrollYBefore);
  });
});