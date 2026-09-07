import {
  readdir,
  readFile,
  writeFile,
  mkdir,
  copyFile,
} from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { validateContent } from "../src/domain/content.js";
import { lstat, realpath, rm } from "node:fs/promises";
const root = fileURLToPath(new URL("../", import.meta.url)),
  out = join(root, "dist");
const content = Object.fromEntries(
  await Promise.all(
    ["scenes", "sources", "claims", "dialogue", "endings", "chapter"].map(
      async (key) => [
        key,
        JSON.parse(
          await readFile(join(root, "content", "mara", key + ".json"), "utf8"),
        ),
      ],
    ),
  ),
);
validateContent(content);
for (const source of content.sources)
  if (source.media)
    for (const key of ["path", "alternate", "captions"])
      if (source.media[key]) {
        if (!/^assets\/media\/[a-z0-9.-]+$/.test(source.media[key]))
          throw Error("Invalid media path");
        const bytes = await readFile(join(root, source.media[key]));
        if (bytes.length < 50) throw Error("Empty media");
      }
try {
  const stat = await lstat(out);
  if (
    stat.isSymbolicLink() ||
    (await realpath(out)) !== join(await realpath(root), "dist")
  )
    throw Error("Unsafe build output");
  await rm(out, { recursive: true });
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const entries = ["index.html", "styles.css", "src", "content", "assets"];
const manifest = {};
async function copy(rel) {
  const path = join(root, rel);
  let children;
  try {
    children = await readdir(path, { withFileTypes: true });
  } catch {
    const bytes = await readFile(path);
    await mkdir(dirname(join(out, rel)), { recursive: true });
    await copyFile(path, join(out, rel));
    manifest[rel] = {
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    };
    return;
  }
  for (const c of children) {
    if (c.isSymbolicLink()) throw Error("Symlinks are not release inputs");
    await copy(join(rel, c.name));
  }
}
for (const e of entries) await copy(e);
await writeFile(
  join(out, "build-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log(
  "Built",
  Object.keys(manifest).length,
  "files;",
  Object.values(manifest).reduce((n, f) => n + f.bytes, 0),
  "bytes",
);
