import { test, expect } from '@playwright/test';

test.describe('Demo Application – Example Tests', () => {
  // Navigate to the home page before each test.
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/FixPilot Demo/i);
  });

  test('should navigate to the About page via the navigation link', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /about/i });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/about/i);
  });

  test('should submit the Contact form successfully', async ({ page }) => {
    const contactLink = page.getByRole('link', { name: /contact/i });
    await expect(contactLink).toBeVisible();
    await contactLink.click();

    await expect(page).toHaveURL(/.*\/contact/);

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'Hello, this is a test message.');
    await page.click('button[type="submit"]');

    const successAlert = page.locator('[role="alert"]').filter({ hasText: /thank you/i });
    await expect(successAlert).toBeVisible();
  });

  test('should display a list of items on the Dashboard', async ({ page }) => {
    const dashboardLink = page.getByRole('link', { name: /dashboard/i });
    await expect(dashboardLink).toBeVisible();
    await dashboardLink.click();

    await expect(page).toHaveURL(/.*\/dashboard/);

    const itemCards = page.locator('.item-card');
    // Verify that at least one item card is rendered.
    await expect(itemCards.first()).toBeVisible();
  });
});