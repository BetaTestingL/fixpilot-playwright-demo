import { test, expect } from '@playwright/test';

test.describe('Fixpilot Demo – Basic Smoke Tests', () => {
  // Navigate to the home page before each test.
  test.beforeEach(async ({ page }) => {
    // Assuming the Playwright config defines a baseURL.
    await page.goto('/');
  });

  test('should load the home page with the correct title', async ({ page }) => {
    // Verify that the page title contains the expected text.
    await expect(page).toHaveTitle(/Fixpilot/i);
  });

  test('should display the main heading', async ({ page }) => {
    const mainHeading = page.locator('h1');

    // The main heading must be visible and contain the expected text.
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('Welcome to Fixpilot Demo');
  });

  test('should have a functional "Get Started" button', async ({ page }) => {
    const getStartedButton = page.locator('button:has-text("Get Started")');

    // Ensure the button is visible and enabled.
    await expect(getStartedButton).toBeVisible();
    await expect(getStartedButton).toBeEnabled();

    // Click the button and verify navigation to the onboarding page.
    await getStartedButton.click();
    await expect(page).toHaveURL(/.*\/onboarding/);
    await expect(page.locator('h2')).toHaveText('Onboarding');
  });
});