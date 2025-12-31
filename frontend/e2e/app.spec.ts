import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display hero section", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(
      page.getByRole("heading", { name: /discover your perfect course/i })
    ).toBeVisible();
  });

  test("should display navigation links", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.getByRole("link", { name: /explore/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /scholarships/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
  });

  test("should navigate to explore page", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.click('a:has-text("Explore")');
    await expect(page).toHaveURL(/.*explore/);
    await expect(page.getByRole("heading", { name: /explore courses/i })).toBeVisible();
  });

  test("should display feature cards", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.getByText("Search & Discover")).toBeVisible();
    await expect(page.getByText("Find Scholarships")).toBeVisible();
    await expect(page.getByText("Compare & Review")).toBeVisible();
  });
});

test.describe("Explore Page", () => {
  test("should display search bar", async ({ page }) => {
    await page.goto("http://localhost:3000/explore");
    await expect(page.getByPlaceholder("Search courses...")).toBeVisible();
  });

  test("should display platform filter", async ({ page }) => {
    await page.goto("http://localhost:3000/explore");
    const select = page.locator("select");
    await expect(select).toBeVisible();
  });
});
