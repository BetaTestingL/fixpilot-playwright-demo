import { test, expect } from '@playwright/test';

test('example test placeholder', async ({ page }) => {
  // This test ensures the test runner is correctly configured.
  // It navigates to the home page and checks the title.
  await page.goto('/');
  await expect(page).toHaveTitle(/FixPilot Demo/i);
});