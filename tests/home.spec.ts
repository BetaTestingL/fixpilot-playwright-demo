import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the root of the application before each test.
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to FixPilot Demo');
  });

  test('should have a functional navigation menu', async ({ page }) => {
    const navLinks = page.locator('nav >> a');
    await expect(navLinks).toHaveCountGreaterThan(0);

    // Verify that clicking the "About" link navigates to the correct page.
    await navLinks.filter({ hasText: 'About' }).click();
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.locator('h2')).toHaveText('About FixPilot');
  });
});