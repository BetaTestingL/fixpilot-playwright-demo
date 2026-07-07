import { test, expect } from '@playwright/test';

test.describe('Homepage UI validation', () => {
  const baseURL = process.env.BASE_URL ?? 'https://playwright.dev';

  test('hero section displays expected heading and CTA', async ({ page }) => {
    await page.goto(baseURL);

    // Hero heading – assume an <h1> with a specific text.
    const heroHeading = page.getByRole('heading', { level: 1, name: /Fast and reliable end-to-end testing/i });
    await expect(heroHeading).toBeVisible();

    // Call‑to‑action button – assume text "Get Started".
    const ctaButton = page.getByRole('link', { name: /Get Started/i });
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', /.*\/docs\/intro/);
  });

  test('footer contains legal links', async ({ page }) => {
    await page.goto(baseURL);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const privacyLink = footer.getByRole('link', { name: /Privacy/i });
    await expect(privacyLink).toBeVisible();

    const termsLink = footer.getByRole('link', { name: /Terms/i });
    await expect(termsLink).toBeVisible();
  });
});