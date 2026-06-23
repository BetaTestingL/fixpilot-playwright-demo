import { test, expect } from '@playwright/test';

/**
 * Example test that demonstrates basic Playwright usage.
 * This file replaces the previous JavaScript version with a TypeScript implementation.
 */
test.describe('Demo application basic checks', () => {
  test.beforeEach(async ({ page }) => {
    // Start each test from the home page.
    await page.goto('/');
  });

  test('should load the home page and display the main heading', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/welcome to fixpilot demo/i);
  });

  test('should navigate to the contact page and verify the contact form', async ({ page }) => {
    const contactLink = page.locator('a[data-test-id="contact-link"]');
    await expect(contactLink).toBeVisible();
    await contactLink.click();

    await expect(page).toHaveURL(/\/contact/);
    const contactForm = page.locator('form[data-test-id="contact-form"]');
    await expect(contactForm).toBeVisible();

    // Verify that the form contains expected fields.
    await expect(contactForm.locator('input[name="name"]')).toBeVisible();
    await expect(contactForm.locator('input[name="email"]')).toBeVisible();
    await expect(contactForm.locator('textarea[name="message"]')).toBeVisible();
  });
});