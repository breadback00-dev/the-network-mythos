import { test, expect } from "@playwright/test";
import { ready, travel, inspect } from "./helpers.js";

test("export, confirmed reset, and confirmed import restore the chosen location", async ({
  page,
}) => {
  await ready(page);
  await travel(page, "Porchlight");
  await page.getByRole("button", { name: "Settings & save" }).click();
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export current progress" }).click();
  const download = await downloadEvent;
  const path = await download.path();
  await page.getByRole("button", { name: "Start a new investigation" }).click();
  await page.getByRole("button", { name: "Confirm new investigation" }).click();
  await expect(
    page.getByRole("heading", { name: "The Archive", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Settings & save" }).click();
  await page.locator("#import-file").setInputFiles(path);
  await expect(
    page.getByRole("heading", {
      name: "Replace with this saved investigation?",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Confirm import" }).click();
  await expect(
    page.getByRole("heading", { name: "Porchlight", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Porchlight", exact: true }),
  ).toBeVisible();
});
test("stale tab cannot overwrite and legacy keys survive", async ({
  page,
  context,
}) => {
  await ready(page);
  await page.evaluate(() =>
    localStorage.setItem("network.archive.state", "legacy-test"),
  );
  const second = await context.newPage();
  await ready(second);
  await travel(page, "Porchlight");
  await second.getByRole("button", { name: "Map", exact: true }).click();
  await second.getByRole("button", { name: "The Oracle", exact: true }).click();
  await expect(
    second.getByRole("heading", { name: "Newer progress in another tab" }),
  ).toBeVisible();
  await second.getByRole("button", { name: "Reload latest progress" }).click();
  await expect(
    second.getByRole("heading", { name: "Porchlight", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem("network.archive.state")),
  ).toBe("legacy-test");
});
test("corrupt and future imports leave progress unchanged", async ({
  page,
}) => {
  await ready(page);
  await page.getByRole("button", { name: "Settings & save" }).click();
  for (const content of [
    "not json",
    JSON.stringify({ schema: 99 }),
    "x".repeat(100001),
  ]) {
    await page.locator("#import-file").setInputFiles({
      name: "bad.json",
      mimeType: "application/json",
      buffer: Buffer.from(content),
    });
    await expect(page.locator("#dialog-notice")).not.toHaveText("");
  }
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "The Archive", exact: true }),
  ).toBeVisible();
});
test("real aborted write preserves previous save and honest status", async ({
  page,
}) => {
  await ready(page);
  await page.evaluate(() => {
    const original = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (...args) {
      if (this.name === "saves")
        throw new DOMException("Quota reached", "QuotaExceededError");
      return original.apply(this, args);
    };
  });
  await page.getByRole("button", { name: "Map", exact: true }).click();
  await page.getByRole("button", { name: "Porchlight", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Progress could not be saved" }),
  ).toBeVisible();
  await expect(page.locator("#save-status")).toHaveText("Not saved");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "The Archive", exact: true }),
  ).toBeVisible();
});
test("session-only and reset cancellation", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "indexedDB", {
      get() {
        throw new DOMException("Storage denied", "SecurityError");
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Continue session only" }).click();
  await travel(page, "Porchlight");
  await expect(page.locator("#save-status")).toContainText("Session only");
  await page.getByRole("button", { name: "Settings & save" }).click();
  await page.getByRole("button", { name: "Start a new investigation" }).click();
  await page.getByRole("button", { name: "Cancel and return" }).click();
  await expect(
    page.getByRole("heading", { name: "Porchlight", exact: true }),
  ).toBeVisible();
});
