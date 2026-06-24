import { test, expect } from '@playwright/test';

test.describe('Demo Application Core Flow', () => {
  test('should load the home page and display the main heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/$/);
    const heading = page.getByRole('heading', { name: /welcome to fixpilot demo/i });
    await expect(heading).toBeVisible();
  });

  test('should navigate to the About page via the top navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/.*\/about/);
    const aboutHeader = page.getByRole('heading', { name: /about fixpilot/i });
    await expect(aboutHeader).toBeVisible();
  });

  test('should submit the contact form successfully', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL(/.*\/contact/);

    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john.doe@example.com');
    await page.getByLabel('Message').fill('This is a test message from Playwright.');

    await page.getByRole('button', { name: /send message/i }).click();

    const successToast = page.getByRole('alert').filter({ hasText: /thank you for your message/i });
    await expect(successToast).toBeVisible();
  });
});