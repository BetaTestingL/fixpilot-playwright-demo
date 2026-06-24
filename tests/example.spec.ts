import { test, expect } from '@playwright/test';

test.describe('Demo site basic checks', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo home page before each test
    await page.goto('https://demo.fixpilot.com/');
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/);
  });

  test('should have a visible main navigation bar', async ({ page }) => {
    const navBar = page.locator('nav[data-test="main-nav"]');
    await expect(navBar).toBeVisible();
    await expect(navBar.locator('a')).toHaveCountGreaterThan(0);
  });

  test('should load the hero section with expected headline', async ({ page }) => {
    const heroHeadline = page.locator('h1[data-test="hero-headline"]');
    await expect(heroHeadline).toBeVisible();
    await expect(heroHeadline).toHaveText(/Welcome to FixPilot/i);
  });
});