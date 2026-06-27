import { test, expect } from '@playwright/test';

test.describe('Demo site basic checks', () => {
  // Adjust the URL to match the application under test.
  const baseUrl = process.env.BASE_URL || 'https://example.com';

  test('should load the home page and display the correct title', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveURL(baseUrl);
    await expect(page).toHaveTitle(/example/i);
  });

  test('should contain a visible main heading', async ({ page }) => {
    await page.goto(baseUrl);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/example/i);
  });

  test('should have a functional navigation link to the About page', async ({ page }) => {
    await page.goto(baseUrl);
    const aboutLink = page.getByRole('link', { name: /about/i });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeader = page.locator('h1');
    await expect(aboutHeader).toContainText(/about/i);
  });
});