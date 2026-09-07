import {
  readFile,
  readdir,
  realpath,
  lstat,
  mkdir,
  cp,
} from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

// Stage only this chapter. Existing root game bytes must match their release manifest.
const site = await realpath(resolve(process.argv[2] || "."));
const hosting = JSON.parse(
  await readFile(join(site, ".openai/hosting.json"), "utf8"),
);
if (
  hosting.project_id !== "appgprj_6a9e73d7a004819193d310d7c7cff891" ||
  hosting.static?.directory !== "out"
)
  throw Error("Unexpected Site target.");
const out = await realpath(join(site, "out"));
if (out !== join(site, "out")) throw Error("Output must not be redirected.");
const manifest = JSON.parse(
  await readFile(join(out, "build-manifest.json"), "utf8"),
);
async function verifyRoot() {
  for (const [name, expected] of Object.entries(manifest.files)) {
    const path = resolve(out, name);
    if (dirname(path) !== out) throw Error("Unexpected root manifest path.");
    const bytes = await readFile(path);
    if (
      bytes.length !== expected.bytes ||
      createHash("sha256").update(bytes).digest("hex") !== expected.sha256
    )
      throw Error("Previous game changed: " + name);
  }
}
await verifyRoot();
const target = join(out, "adventure");
await mkdir(target, { recursive: true });
if (
  (await lstat(target)).isSymbolicLink() ||
  (await realpath(target)) !== target
)
  throw Error("Chapter output is redirected.");
const dist = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
for (const entry of await readdir(dist))
  await cp(join(dist, entry), join(target, entry), { recursive: true });
await verifyRoot();
console.log(
  "Staged /adventure/; all " +
    Object.keys(manifest.files).length +
    " previous root game files match their recorded hashes.",
);
