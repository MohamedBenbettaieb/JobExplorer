import { test, expect } from "@playwright/test";

test("can search for jobs and see results", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Location").fill("United States");

  await page.locator("text=Search").click();

  await page.waitForSelector("text=/.* - .*/");

  const jobCards = await page.locator("text=/.* - .*/").all();
  expect(jobCards.length).toBeGreaterThan(0);

  for (const card of jobCards) {
    const parent = await card.locator("..");
    await expect(parent).toContainText(/.+/);
  }
});
