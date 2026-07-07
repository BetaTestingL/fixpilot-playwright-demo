import { test, expect } from '@playwright/test';

test.describe('Basic sanity checks', () => {
  test('should render static content correctly', async ({ page }) => {
    // Arrange: set a simple HTML page
    const html = `
      <html>
        <head><title>Test Page</title></head>
        <body>
          <h1 data-test-id="main-heading">Hello Playwright</h1>
          <button data-test-id="action-btn">Click me</button>
        </body>
      </html>
    `;
    await page.setContent(html);

    // Act & Assert: verify the heading text
    const heading = page.locator('[data-test-id="main-heading"]');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello Playwright');

    // Act & Assert: verify the button is enabled and clickable
    const button = page.locator('[data-test-id="action-btn"]');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    // Click the button and ensure no navigation occurs (placeholder for future logic)
    await button.click();
    await expect(page).toHaveURL('about:blank'); // page.setContent loads about:blank internally
  });
});