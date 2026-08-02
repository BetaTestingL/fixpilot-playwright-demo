import { test, expect } from "@playwright/test";

test.describe("Example Page", () => {
  test("should load the example page without errors", async ({ page }) => {
    // Navigate to the example page (relative URL)
    await page.goto("/example");

    // Verify that the URL contains the expected path
    await expect(page).toHaveURL(/example/);

    // Ensure the main content is visible
    await expect(page.getByRole("main")).toBeVisible();

    // Verify that no console errors were emitted during page load
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Assert that no console errors were captured
    expect(consoleErrors).toEqual([]);
  });
});