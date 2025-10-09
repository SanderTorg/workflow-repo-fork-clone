import { test, expect } from "@playwright/test";

test.describe("Registration", () => {
  const randomID = Math.floor(Math.random() * 1000000);
  const userEmail = `testStudent_${randomID}@stud.noroff.no`;
  const userName = `testStudent_${randomID}`;
  const userPassword = `Pa55W0rd!1234`;

  test.beforeEach(async ({ page }) => {
    // Runs before each test and fill in the form.
    await page.goto("");
    await page.getByRole("link", { name: "Register" }).click();
    await page.getByRole("textbox", { name: "Name" }).click();
    await page.getByRole("textbox", { name: "Name" }).fill(userName);
    await page.getByRole("textbox", { name: "Name" }).press("Tab");
    await page.getByRole("textbox", { name: "Email" }).fill(userEmail);
    await page.getByRole("textbox", { name: "Email" }).press("Tab");
    await page.getByRole("textbox", { name: "Password" }).fill(userPassword);
  });

  test("failed", async ({ page }) => {
    await page.route("**/auth/register", (route) =>
      route.fulfill({
        status: 400,
        json: { message: "Registration failed" },
      })
    );

    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByRole("alert")).toContainText("Registration failed");

    await expect(page.locator("body")).toMatchAriaSnapshot(`
    - banner:
      - navigation:
        - navigation:
          - link "Logo":
            - /url: /
          - link "Home":
            - /url: /
          - link "Login":
            - /url: /auth/login
          - link "Register":
            - /url: /auth/register
    - main:
      - heading "Register" [level=1]
      - alert: Registration failed
      - group:
        - textbox "Name": /${userName}/
        - textbox "Email": /${userEmail}/
        - textbox "Password": /${userPassword}/
        - button "Register"
    `);
  });

  test("successful", async ({ page }) => {
    const randomID = Math.floor(Math.random() * 1000000);
    const userEmail = `testStudent_${randomID}@stud.noroff.no`;
    const userName = `testStudent_${randomID}`;
    const userPassword = `Pa55W0rd!1234`;

    await page.goto("");
    await page.getByRole("link", { name: "Register" }).click();
    await page.getByRole("textbox", { name: "Name" }).click();
    await page.getByRole("textbox", { name: "Name" }).fill(userName);
    await page.getByRole("textbox", { name: "Name" }).press("Tab");
    await page.getByRole("textbox", { name: "Email" }).fill(userEmail);
    await page.getByRole("textbox", { name: "Email" }).press("Tab");
    await page.getByRole("textbox", { name: "Password" }).fill(userPassword);

    await page.route("**/auth/register", (route) =>
      route.fulfill({
        status: 201,
        json: { message: "Successfully created user" },
      })
    );

    await page.getByRole("button", { name: "Register" }).click();
    page.pause();
    await expect(page.getByRole("alert")).toContainText(
      "Registration successful!"
    );
  });
});
