import { test, expect } from "@playwright/test";
import { ready, travel, inspect, completeFindings, finish } from "./helpers.js";
for (const disposition of ["Publish", "Bury", "Preserve"])
  for (const include of [false, true])
    test("complete " + disposition + " " + include, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await ready(page);
      await completeFindings(page);
      await finish(page, disposition, include);
      await page.reload();
      await expect(
        page.getByRole("button", { name: "Message from Elian" }),
      ).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "Speak with Elian" }),
      ).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "Revisit connection" }),
      ).toHaveCount(0);
      await page.getByRole("button", { name: "Read the aftermath" }).click();
      await expect(
        page.getByRole("heading", { name: "What the Archive keeps" }),
      ).toBeVisible();
      expect(errors).toEqual([]);
      await expect(page.locator("#save-status")).toHaveText(
        "Saved on this browser",
      );
    });
test("dialogue choice resumes and assurance cannot be erased", async ({
  page,
}) => {
  await ready(page);
  await page.getByRole("button", { name: "Message from Elian" }).click();
  await page
    .getByRole("button", {
      name: "I will keep that private context out of the packet.",
    })
    .click();
  await expect(page.getByText("Your reply: assurance recorded")).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("assurance recorded", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Return to scene", exact: true })
    .click();
  await page.getByRole("button", { name: "Message from Elian" }).click();
  await expect(
    page.getByRole("button", {
      name: "I can’t promise what the packet will contain yet.",
    }),
  ).toHaveCount(0);
});
test("responsive, enlarged text and keyboard controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await ready(page);
  await page.getByRole("button", { name: "Settings & save" }).click();
  await page.getByLabel("Reading size").selectOption("200");
  await page.getByLabel("Reduce motion").check();
  await page
    .getByRole("button", { name: "Return to scene", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Map", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Porchlight", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Porchlight", exact: true }),
  ).toBeVisible();
});
