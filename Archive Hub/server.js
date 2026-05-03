const http = require("http");
const fs = require("fs");
const path = require("path");

const hubRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "..");
const routeRoots = {
  "/case001/": path.join(workspaceRoot, "Case 001 - The Door Is Real"),
  "/case002/": path.join(workspaceRoot, "Case 002 - The Half Synthetic Community"),
  "/case003/": path.join(workspaceRoot, "Case 003 - The Human Premium"),
  "/case004/": path.join(workspaceRoot, "Case 004 - The Lost Archive")
};
const port = Number(process.env.PORT || 4179);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
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

  let filePath = path.join(root, localPath);

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
