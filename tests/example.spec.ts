import { test, expect } from '@playwright/test';

test.describe('FixPilot Demo', () => {
  // Navigate to the base URL before each test.
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /fixpilot demo/i });
    await expect(heading).toBeVisible();
  });

  test('should have a functional "Get Started" button', async ({ page }) => {
    const getStartedBtn = page.getByRole('button', { name: /get started/i });
    await expect(getStartedBtn).toBeEnabled();

    await getStartedBtn.click();

    // Expect navigation to a welcome page (adjust the URL pattern if needed).
    await expect(page).toHaveURL(/.*\/welcome/);

    const welcomeHeader = page.getByRole('heading', { name: /welcome/i });
    await expect(welcomeHeader).toBeVisible();
  });
});