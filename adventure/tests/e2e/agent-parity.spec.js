import { test, expect } from "@playwright/test";
import { ready, travel } from "./helpers.js";
test("tool adapter shares committed state and filters hidden content (test registry)", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.testRegistry = {};
    Object.defineProperty(document, "modelContext", {
      value: {
        registerTool(tool, { signal }) {
          window.testRegistry[tool.name] = tool;
          signal.addEventListener(
            "abort",
            () => delete window.testRegistry[tool.name],
          );
        },
      },
    });
  });
  await ready(page);
  await expect
    .poll(() => page.evaluate(() => Object.keys(window.testRegistry).length))
    .toBe(6);
  const read = () =>
    page.evaluate(() => window.testRegistry.read_investigation.execute({}));
  expect((await read()).state.sources).toEqual([]);
  expect((await read()).state.claims).toEqual([]);
  const bad = await page.evaluate(() =>
    window.testRegistry.act_in_investigation.execute({
      command: { type: "inspect", id: "mara.14" },
    }),
  );
  expect(bad.error).toBeTruthy();
  await travel(page, "The Oracle");
  const result = await page.evaluate(() =>
    window.testRegistry.act_in_investigation.execute({
      command: { type: "inspect", id: "mara.04" },
    }),
  );
  expect(result.storage).toBe("saved");
  await expect(
    page.getByRole("button", { name: "✓ The confident summary" }),
  ).toBeVisible();
  await page.reload();
  await expect
    .poll(() => page.evaluate(() => Object.keys(window.testRegistry).length))
    .toBe(6);
  expect((await read()).state.inspected).toContain("mara.04");
  const extra = await page.evaluate(() =>
    window.testRegistry.read_investigation.execute({ extra: true }),
  );
  expect(extra.error).toBeTruthy();
});
