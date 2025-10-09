// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Venues");
});

test("get started link", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/index.html");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test.skip("Description", async ({ page }) => {
  await page.goto("https://www.vg.no/");
  const metaDescription = page.locator('meta[name="description"]');

  const descriptionContent = await metaDescription.getAttribute("content");

  // Expects page to have a heading with the name of Installation.
  await expect(descriptionContent).toBe(
    "Siste nytt hvert minutt på Norges største nettsted. Nyheter fra Norge og verden, sport og underholdning."
  );

  await page.getByRole("button", { name: "Godta alle" }).click();
});
