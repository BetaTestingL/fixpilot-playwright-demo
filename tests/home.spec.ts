import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('displays the correct title and meta description', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FixPilot Demo/i);
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('demo application');
  });

  test('has a functional hero carousel', async ({ page }) => {
    await page.goto('/');
    const firstSlide = page.getByTestId('carousel-slide-1');
    await expect(firstSlide).toBeVisible();

    // Move to next slide
    await page.getByRole('button', { name: /next/i }).click();
    const secondSlide = page.getByTestId('carousel-slide-2');
    await expect(secondSlide).toBeVisible();
  });
});