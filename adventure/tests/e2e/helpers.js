import { expect } from "@playwright/test";
export async function ready(page, path = "/") {
  await page.goto(path);
  await expect(
    page.getByRole("heading", { name: "The Archive", exact: true }),
  ).toBeVisible();
}
export async function travel(page, name) {
  await page.getByRole("button", { name: "Map", exact: true }).click();
  await page.getByRole("button", { name: new RegExp("^" + name) }).click();
  await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
}
export async function inspect(page, name) {
  await page
    .getByRole("button", { name: new RegExp(name) })
    .first()
    .click();
  await expect(page.locator("#sheet")).toBeVisible();
  await page
    .getByRole("button", { name: "Return to scene", exact: true })
    .click();
}
export async function connect(page, a, b, claim) {
  await page
    .getByRole("button", { name: "Connect two sources", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "First source", exact: true })
    .selectOption(a);
  await page
    .getByRole("combobox", { name: "Second source", exact: true })
    .selectOption(b);
  await page.locator('input[name="claim"][value="' + claim + '"]').check();
  await page.getByRole("button", { name: "Present connection" }).click();
  await expect(
    page.getByRole("heading", { name: "Connection established" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Continue investigation", exact: true })
    .click();
}
export async function completeFindings(page) {
  await travel(page, "The Oracle");
  await inspect(page, "The confident summary");
  await inspect(page, "What the badge verifies");
  await connect(page, "mara.04", "mara.09.scope", "scope");
  await travel(page, "The Arbiter");
  await page.getByRole("button", { name: "Present Oracle request" }).click();
  await inspect(page, "Service appendix");
  await inspect(page, "The continuity commission");
  await connect(page, "mara.09.service", "mara.13", "commission");
  await travel(page, "The Archive");
  await inspect(page, "Elian’s private message");
  await inspect(page, "A redacted paper trace");
  await connect(page, "mara.10", "mara.14", "boundary");
}
export async function finish(page, disposition, include = false) {
  await page.getByRole("button", { name: "Decide the packet" }).click();
  await page
    .locator('input[name="disposition"][value="' + disposition + '"]')
    .check();
  await page
    .locator(
      'input[name="private"][value="' +
        (include ? "included" : "withheld") +
        '"]',
    )
    .check();
  await page.getByRole("button", { name: "Preview exact packet" }).click();
  await expect(
    page.getByRole("heading", { name: "Packet preview" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Confirm this decision" }).click();
  await expect(
    page.getByRole("heading", { name: "What the Archive keeps" }),
  ).toBeVisible();
}
