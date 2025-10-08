const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "dist");
fs.mkdirSync(outDir, { recursive: true });

const html = `<!doctype html>
<html>
  <head><meta charset="utf-8"><title>demo-ci</title></head>
  <body>
    <h1>Build OK</h1>
    <p>Timestamp: ${new Date().toISOString()}</p>
  </body>
</html>`;
fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
console.log("Built dist/index.html");
