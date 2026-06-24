import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('should display the about heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /about us/i });
    await expect(heading).toBeVisible();
  });

  test('should contain the company description', async ({ page }) => {
    const description = page.locator('section[data-test-id="company-description"]');
    await expect(description).toBeVisible();
    await expect(description).toContainText('FixPilot is a platform that');
  });

  test('should have a back‑to‑home link', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /home/i });
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL('/');
  });
});