import { test, expect } from '@playwright/test';

test.describe('FixPilot Playwright Demo – Core UI Checks', () => {
  test('should load the home page and display the main heading', async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts
    await page.goto('/');

    // Verify that the page loads without errors
    await expect(page).toHaveURL(/\/$/);

    // Expect the main heading to be visible and contain expected text
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText('FixPilot Demo');
  });

  test('should have a functional navigation menu', async ({ page }) => {
    await page.goto('/');

    // Assume there is a navigation link to the "About" page
    const aboutLink = page.getByRole('link', { name: /about/i });
    await expect(aboutLink).toBeVisible();

    // Click the link and verify navigation
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about/);

    // Verify the About page header
    const aboutHeader = page.locator('h1');
    await expect(aboutHeader).toContainText('About FixPilot');
  });

  test('should submit the contact form successfully', async ({ page }) => {
    await page.goto('/contact');

    // Fill out the contact form (assumed selectors)
    await page.fill('input[name="name"]', 'Playwright Tester');
    await page.fill('input[name="email"]', 'tester@example.com');
    await page.fill('textarea[name="message"]', 'This is an automated test message.');

    // Submit the form
    await page.click('button[type="submit"]');

    // Expect a success notification
    const successToast = page.locator('[role="alert"]');
    await expect(successToast).toBeVisible();
    await expect(successToast).toContainText('Thank you for your message');
  });
});