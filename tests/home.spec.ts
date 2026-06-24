import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the root of the application.
    await page.goto('/');
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
  });

  test('should render the main heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /FixPilot Demo/i });
    await expect(heading).toBeVisible();
  });

  test('should have a functional navigation menu', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /About/i });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeading = page.getByRole('heading', { name: /About FixPilot/i });
    await expect(aboutHeading).toBeVisible();
  });
});