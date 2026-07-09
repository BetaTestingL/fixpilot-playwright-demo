import { test, expect } from '@playwright/test';

test.describe('Home page visual and functional checks', () => {
  const homeUrl = 'https://demo.fixpilot.com';

  test.beforeEach(async ({ page }) => {
    await page.goto(homeUrl);
  });

  test('should match the baseline screenshot', async ({ page }) => {
    // Capture a screenshot of the hero section and compare with baseline
    const hero = page.locator('#hero-section');
    await expect(hero).toBeVisible();

    await expect(hero).toHaveScreenshot('hero-section.png', {
      maxDiffPixelRatio: 0.01, // allow up to 1% pixel difference
    });
  });

  test('should open the "Get Started" modal when the CTA button is clicked', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /get started/i });
    await ctaButton.click();

    const modal = page.locator('#get-started-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Create your first project');
  });

  test('should have functional footer links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const privacyLink = footer.getByRole('link', { name: /privacy policy/i });
    await privacyLink.click();
    await expect(page).toHaveURL(/.*\/privacy/);
    await expect(page.locator('h1')).toHaveText(/privacy policy/i);
  });
});