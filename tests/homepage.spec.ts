import { test, expect } from '@playwright/test';

test.describe('Homepage functionality', () => {
  const baseUrl = 'https://demo.fixpilot.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should navigate to the Features page via the top menu', async ({ page }) => {
    await page.getByRole('link', { name: /features/i }).click();
    await expect(page).toHaveURL(/.*\/features/);
    await expect(page.locator('h2[data-test="features-heading"]')).toHaveText(/Our Features/i);
  });

  test('should open the Get Started modal when CTA is clicked', async ({ page }) => {
    const ctaButton = page.locator('button[data-test="cta-get-started"]');
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    const modal = page.locator('[role="dialog"][data-test="get-started-modal"]');
    await expect(modal).toBeVisible();
    await expect(modal.locator('h3')).toHaveText(/Get Started/i);
    await modal.locator('button[data-test="modal-close"]').click();
    await expect(modal).toBeHidden();
  });
});