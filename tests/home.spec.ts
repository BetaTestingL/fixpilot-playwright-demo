import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application root before each test
    await page.goto('/');
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/);
  });

  test('should render the main hero section', async ({ page }) => {
    const hero = page.locator('section[data-test-id="hero"]');
    await expect(hero).toBeVisible();
    await expect(hero).toContainText('Welcome to FixPilot');
  });

  test('should have a functional navigation menu', async ({ page }) => {
    const nav = page.locator('nav[data-test-id="main-nav"]');
    await expect(nav).toBeVisible();

    // Verify each top‑level link navigates correctly
    const links = [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
      { name: 'Contact', url: '/contact' },
    ];

    for (const { name, url } of links) {
      await nav.getByRole('link', { name }).click();
      await expect(page).toHaveURL(new RegExp(`${url}$`));
      // Return to home for the next iteration
      await page.goto('/');
    }
  });
});