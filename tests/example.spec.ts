import { test, expect } from '@playwright/test';

test.describe('Demo Application – Core UI Tests', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL defined in Playwright config.
    await page.goto('/');
    // Ensure the page has loaded without a network error.
    await expect(page).toHaveURL(/.*\/$/);
  });

  test('example page loads without errors', async ({ page }) => {
    // Verify that the main heading is present and visible.
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();

    // Optionally, check that the page title matches expectations.
    await expect(page).toHaveTitle(/Demo Application/i);
  });

  test('critical UI elements are visible and interactable', async ({ page }) => {
    // Button – assumed selector.
    const startButton = page.locator('button#start');
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();

    // Click the button and verify a side‑effect (e.g., a modal appears).
    await startButton.click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Input field – assumed selector.
    const searchInput = page.locator('input[name="search"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();

    // Interact with the input and assert the value.
    const testValue = 'Playwright';
    await searchInput.fill(testValue);
    await expect(searchInput).toHaveValue(testValue);
  });
});