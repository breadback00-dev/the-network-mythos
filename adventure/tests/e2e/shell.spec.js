import { test, expect } from "@playwright/test";

test("stalled chapter request reaches retry without touching the save", async ({
  page,
}) => {
  await page.route("**/content/mara/chapter.json", () => {});
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "The Archive could not open" }),
  ).toBeVisible({ timeout: 16000 });
  await expect(
    page.getByRole("button", { name: "Retry loading" }),
  ).toBeVisible();
});
import { ready, travel } from "./helpers.js";
for (const path of ["/", "/adventure/"])
  test("static scene " + path, async ({ page }) => {
    await ready(page, path);
    await travel(page, "Porchlight");
  });
test("data retry", async ({ page }) => {
  await page.route("**/content/mara/scenes.json", (r) => r.abort());
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Retry loading" }),
  ).toBeVisible();
  await page.unroute("**/content/mara/scenes.json");
  await page.getByRole("button", { name: "Retry loading" }).click();
  await expect(
    page.getByRole("heading", { name: "The Archive", exact: true }),
  ).toBeVisible();
});
