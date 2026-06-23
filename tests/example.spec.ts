import { test, expect } from '@playwright/test';

test.describe('Demo application end‑to‑end tests', () => {
  // Base URL is taken from the Playwright config (or defaults to http://localhost:3000)
  const baseURL = process.env.BASE_URL ?? 'http://localhost:3000';

  test('homepage loads and displays the correct title', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveURL(baseURL + '/');
    await expect(page).toHaveTitle(/FixPilot Demo/i);
  });

  test('navigation to the About page works', async ({ page }) => {
    await page.goto(baseURL);
    // Assume there is a navigation link with the text "About"
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.locator('h1')).toHaveText(/about us/i);
  });

  test('user can submit the contact form successfully', async ({ page }) => {
    await page.goto(`${baseURL}/contact`);
    // Fill out the contact form – selectors are assumed based on common naming conventions
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright.');
    // Assume the submit button has a role of button and text "Send"
    await page.getByRole('button', { name: /send/i }).click();

    // Verify success notification appears
    const successToast = page.locator('[role="alert"] >> text=Thank you');
    await expect(successToast).toBeVisible({ timeout: 5000 });
  });
});