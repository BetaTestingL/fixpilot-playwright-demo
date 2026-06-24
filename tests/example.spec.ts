import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo – Core UI Checks', () => {
  // Navigate to the home page before each test.
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot/i);
  });

  test('should display the main heading', async ({ page }) => {
    const heading = page.locator('h1:has-text("FixPilot Demo")');
    await expect(heading).toBeVisible();
  });

  test('should show the primary call‑to‑action button', async ({ page }) => {
    const ctaButton = page.locator('button:has-text("Get Started")');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
  });
});