// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("Sign up", async ({ page }) => {
    await page.goto("https://fascinating-syrniki-feed78.netlify.app/register");

    const randomID = Math.floor(Math.random() * 1000000);
    console.log("randomID", randomID);
    const userEmail = `testStudent_${randomID}@stud.noroff.no`;
    const userName = `testStudent_${randomID}`;
    const userPassword = `Pa55W0rd!1234`;

    await page.locator("input#reg-email").fill(userEmail);
    await page.locator("input#reg-name").fill(userName);
    await page.locator("input#reg-password").fill(userPassword);
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.locator("#register-message")).toContainText(
      "Registered! You can now log in."
    );
  });

  test("Sign in", async ({ page }) => {
    await page.goto(
      "https://fascinating-syrniki-feed78.netlify.app/login.html"
    );

    await page.locator("input#login-email").fill("Testuser123@stud.noroff.no");
    await page.locator("input#login-password").fill("Password123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#welcome-msg")).toContainText(
      "Hello, Testuser123"
    );
  });
});
