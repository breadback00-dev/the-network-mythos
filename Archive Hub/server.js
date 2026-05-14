const http = require("http");
const fs = require("fs");
const path = require("path");

const hubRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4179);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function discoverCases() {
  const routeRoots = {};
  try {
    const entries = fs.readdirSync(workspaceRoot, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const match = entry.name.match(/^Case (\d+) - /i);
      if (!match) continue;
      const num = match[1].padStart(3, "0");
      const routeKey = `/case${num}/`;
      routeRoots[routeKey] = path.join(workspaceRoot, entry.name);
    }
  } catch (e) {
    console.error("Case discovery failed:", e.message);
  }
  return routeRoots;
}

const routeRoots = discoverCases();
console.log("Discovered cases:", Object.keys(routeRoots).join(", "));

function buildCasesIndex() {
  const index = [];
  for (const [, caseRoot] of Object.entries(routeRoots)) {
    const dataPath = path.join(caseRoot, "case-data.json");
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      index.push({ id: data.id, title: data.title });
    } catch {
      // Skip cases with missing or malformed case-data.json.
    }
  }
  return JSON.stringify(index);
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);

  if (urlPath === "/cases/index.json") {
    res.writeHead(200, { "Content-Type": mimeTypes[".json"] });
    res.end(buildCasesIndex());
    return;
  }

  let root = hubRoot;
  let localPath = urlPath === "/" ? "/index.html" : urlPath;

  for (const [prefix, routeRoot] of Object.entries(routeRoots)) {
    if (urlPath === prefix || urlPath.startsWith(prefix)) {
      root = routeRoot;
      localPath = urlPath.slice(prefix.length - 1);
      if (localPath === "/" || localPath === "/prototype/") {
        localPath = "/prototype/index.html";
      }
      break;
    }
  }

  const filePath = path.join(root, localPath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Archive Hub running at http://127.0.0.1:${port}/`);
});
