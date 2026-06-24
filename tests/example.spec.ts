import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo – core user flows', () => {
  // Runs before each test in this file.
  test.beforeEach(async ({ page }) => {
    // The baseURL is defined in playwright.config.ts; navigating to '/' lands on the home page.
    await page.goto('/');
  });

  test('home page shows correct title and main heading', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/);
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('Welcome to FixPilot Demo');
  });

  test('user can navigate to the About page via the top navigation', async ({ page }) => {
    const aboutNavLink = page.locator('nav >> text=About');
    await expect(aboutNavLink).toBeVisible();
    await aboutNavLink.click();

    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeader = page.locator('h2');
    await expect(aboutHeader).toBeVisible();
    await expect(aboutHeader).toHaveText('About FixPilot');
  });

  test('contact form can be submitted successfully', async ({ page }) => {
    const contactNavLink = page.locator('nav >> text=Contact');
    await expect(contactNavLink).toBeVisible();
    await contactNavLink.click();

    await expect(page).toHaveURL(/.*\/contact/);

    // Fill out the contact form – selectors are based on data-test-id attributes.
    await page.fill('[data-test-id="contact-name"]', 'John Doe');
    await page.fill('[data-test-id="contact-email"]', 'john.doe@example.com');
    await page.fill('[data-test-id="contact-message"]', 'Automated test message from Playwright.');

    // Submit the form.
    await page.click('[data-test-id="contact-submit"]');

    // Verify success feedback.
    const successToast = page.locator('[data-test-id="toast-success"]');
    await expect(successToast).toBeVisible();
    await expect(successToast).toHaveText('Your message has been sent');
  });
});