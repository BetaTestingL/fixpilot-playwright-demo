const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example/);
});

test("homepage loads", async ({ page }) => {
  await page.goto("https://google.com");

  await expect(page).toHaveTitle("Facebook");
});
