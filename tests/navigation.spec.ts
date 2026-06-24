import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  const baseUrl = process.env.PW_BASE_URL ?? 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/`);
  });

  test('should navigate to the About page via the navigation link', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /about/i });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Expect URL to contain /about
    await expect(page).toHaveURL(/\/about/);
    // Verify the page title reflects the navigation
    await expect(page).toHaveTitle(/about/i);
  });

  test('should navigate back to home using the logo link', async ({ page }) => {
    // Assume there is a logo that links back home
    const logoLink = page.getByRole('link', { name: /logo|home/i });
    await expect(logoLink).toBeVisible();
    await logoLink.click();

    await expect(page).toHaveURL(new RegExp(`^${baseUrl}/?$`));
    await expect(page).toHaveTitle(/home|welcome/i);
  });
});