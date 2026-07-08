import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo Application', () => {
  // Re‑use the base URL defined in playwright.config.ts
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading on the home page', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /fixpilot demo/i });
    await expect(heading).toBeVisible();
  });

  test('should navigate to the About page via the navigation link', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeader = page.getByRole('heading', { name: /about fixpilot/i });
    await expect(aboutHeader).toBeVisible();
  });

  test('should submit the contact form successfully', async ({ page }) => {
    await page.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL(/.*\/contact/);

    await page.getByLabel('Name').fill('QA Engineer');
    await page.getByLabel('Email').fill('qa@example.com');
    await page.getByLabel('Message').fill('Automated test message from Playwright.');

    await page.getByRole('button', { name: /submit/i }).click();

    const successMessage = page.getByText(/thank you for your message/i);
    await expect(successMessage).toBeVisible();
  });
});