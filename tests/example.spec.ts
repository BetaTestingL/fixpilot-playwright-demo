import { test, expect } from '@playwright/test';

test.describe('FixPilot Playwright Demo – Core UI Checks', () => {
  // Runs before each test in this describe block.
  test.beforeEach(async ({ page }) => {
    // Assumes the baseURL is defined in playwright.config.ts.
    await page.goto('/');
  });

  test('should display the correct page title', async ({ page }) => {
    // Verify that the document title contains the expected text.
    await expect(page).toHaveTitle(/FixPilot Demo/i);
  });

  test('should render the main heading', async ({ page }) => {
    // Assuming the main heading is an <h1> element with specific text.
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/Welcome to FixPilot/i);
  });

  test('should navigate to the About page via the navigation link', async ({ page }) => {
    // Click the navigation link that leads to the About page.
    const aboutLink = page.locator('nav >> text=About');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Verify that the URL changed to the expected path.
    await expect(page).toHaveURL(/.*\/about/);

    // Verify that the About page contains a heading.
    const aboutHeading = page.locator('h1');
    await expect(aboutHeading).toBeVisible();
    await expect(aboutHeading).toHaveText(/About FixPilot/i);
  });

  test('should open the Get Started modal when the button is clicked', async ({ page }) => {
    // Locate and click the "Get Started" button.
    const getStartedButton = page.locator('button:has-text("Get Started")');
    await expect(getStartedButton).toBeVisible();
    await getStartedButton.click();

    // Verify that a modal appears with expected content.
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const modalTitle = modal.locator('h2');
    await expect(modalTitle).toHaveText(/Get Started/i);
  });
});