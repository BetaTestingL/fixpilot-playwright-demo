import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot/i);
  });

  test('should show the main hero section', async ({ page }) => {
    const hero = page.locator('[data-test-id="hero-section"]');
    await expect(hero).toBeVisible();
    await expect(hero).toContainText('Welcome to FixPilot');
  });

  test('navigation links should be functional', async ({ page }) => {
    const aboutLink = page.locator('nav >> text=About');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.locator('h1')).toHaveText('About FixPilot');
  });
});