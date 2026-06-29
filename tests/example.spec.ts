import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo – Example Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL defined in playwright.config.ts (or fallback to localhost)
    await page.goto('/');
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
  });

  test('should navigate to dashboard after clicking Get Started', async ({ page }) => {
    const getStartedButton = page.getByRole('button', { name: /get started/i });
    await expect(getStartedButton).toBeVisible();
    await getStartedButton.click();

    await expect(page).toHaveURL(/.*\/dashboard/);
    const header = page.getByRole('heading', { level: 1 });
    await expect(header).toContainText(/dashboard/i);
  });

  test('should submit the contact form successfully', async ({ page }) => {
    // Navigate to the contact page
    await page.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL(/.*\/contact/);

    // Fill out the form
    await page.getByLabel('Name').fill('QA Engineer');
    await page.getByLabel('Email').fill('qa@example.com');
    await page.getByLabel('Message').fill('This is an automated test message.');

    // Submit the form
    await page.getByRole('button', { name: /submit/i }).click();

    // Verify success notification
    const successToast = page.locator('.toast-success');
    await expect(successToast).toBeVisible();
    await expect(successToast).toContainText(/thank you for your message/i);
  });
});