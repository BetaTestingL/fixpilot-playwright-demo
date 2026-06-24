import { test, expect } from '@playwright/test';

test.describe('FixPilot Playwright Demo – Core Flow', () => {
  // Base URL is taken from Playwright config (e.g., http://localhost:3000)
  const mainHeading = 'h1';
  const getStartedLink = 'Get Started';

  test('homepage loads and displays the main heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator(mainHeading)).toBeVisible();
    await expect(page.locator(mainHeading)).toHaveText(/FixPilot Demo/i);
  });

  test('navigation to documentation works via Get Started link', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: getStartedLink });
    await expect(link).toBeVisible();
    await link.click();

    // Assuming the docs page URL ends with /docs
    await expect(page).toHaveURL(/\/docs$/);
    await expect(page.locator('h1')).toHaveText(/Documentation/i);
  });

  test('interactive component behaves correctly', async ({ page }) => {
    // Example of interacting with a demo widget – a toggle button
    await page.goto('/');
    const toggleButton = page.getByRole('button', { name: /toggle feature/i });
    await expect(toggleButton).toBeVisible();

    // Verify initial state
    await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

    // Click to enable
    await toggleButton.click();
    await expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

    // Click again to disable
    await toggleButton.click();
    await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
  });
});