import { test, expect } from "@playwright/test";
import { ready, travel } from "./helpers.js";
test("voice decodes, seeks, closes paused and has equivalent", async ({
  page,
}) => {
  await ready(page);
  await page.getByRole("button", { name: "Before the silence" }).click();
  const audio = page.locator("audio");
  await audio.evaluate(async (m) => {
    await m.play();
  });
  await expect
    .poll(() => audio.evaluate((m) => m.currentTime))
    .toBeGreaterThan(0.1);
  await audio.evaluate((m) => (m.currentTime = 3));
  await expect
    .poll(() => audio.evaluate((m) => m.currentTime))
    .toBeGreaterThanOrEqual(3);
  await expect(
    page
      .getByText("People talk about being reachable", { exact: false })
      .first(),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Return to scene", exact: true })
    .click();
  await page.getByRole("button", { name: "✓ Before the silence" }).click();
  expect(await page.locator("audio").evaluate((m) => m.paused)).toBe(true);
});
test("video actually decodes, seeks and loads captions", async ({ page }) => {
  await ready(page);
  await travel(page, "Porchlight");
  await page
    .getByRole("button", { name: "The return · vertical video" })
    .click();
  const video = page.locator("video");
  await video.evaluate(async (m) => {
    m.muted = true;
    await m.play();
  });
  await expect
    .poll(() => video.evaluate((m) => m.currentTime))
    .toBeGreaterThan(0.1);
  expect(await video.evaluate((m) => m.videoWidth)).toBeGreaterThan(0);
  await video.evaluate((m) => {
    m.currentTime = 15;
    m.textTracks[0].mode = "showing";
  });
  await expect
    .poll(() => video.evaluate((m) => m.textTracks[0].cues?.length || 0))
    .toBeGreaterThan(0);
  await expect(
    page.getByText("Hello, the Porchlight.", { exact: false }).first(),
  ).toBeVisible();
});
test("unavailable media retains equivalent and meme context", async ({
  page,
}) => {
  await page.route("**/content/mara/sources.json", async (route) => {
    const response = await route.fetch();
    const sources = await response.json();
    sources.find((source) => source.id === "mara.07").media.path =
      "assets/media/missing-test-recording.wav";
    await route.fulfill({ response, json: sources });
  });
  await ready(page);
  await page.getByRole("button", { name: "Before the silence" }).click();
  await page.getByRole("button", { name: "Play recording" }).click();
  await expect(page.locator(".media-error")).toContainText("full transcript");
  await page
    .getByRole("button", { name: "Return to scene", exact: true })
    .click();
  await travel(page, "Porchlight");
  await page.getByRole("button", { name: "The door meme" }).click();
  await expect(page.locator(".evidence-excerpt")).toBeVisible();
  await page
    .getByRole("button", { name: "Follow the comeback source" })
    .click();
  await expect(
    page.getByRole("heading", { name: "The comeback post" }),
  ).toBeVisible();
});
