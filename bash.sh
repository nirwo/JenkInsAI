#!/usr/bin/env bash
# setup-demo-jenkins-npm.sh
# Creates a minimal npm project that can pass/fail on demand for Jenkins testing.

set -euo pipefail

# -------- Config --------
PROJECT_DIR="${1:-demo-ci}"
NODE_VERSION_HINT="Node 18+ recommended"
GIT_INIT_DEFAULT="true"

# -------- Helpers --------
say() { printf "\033[1;36m%s\033[0m\n" "$*"; }
warn() { printf "\033[1;33m[WARN]\033[0m %s\n" "$*"; }
err() { printf "\033[1;31m[ERR]\033[0m  %s\n" "$*"; }

# -------- Checks --------
command -v node >/dev/null 2>&1 || { err "node is required. $NODE_VERSION_HINT"; exit 1; }
command -v npm  >/dev/null 2>&1 || { err "npm is required."; exit 1; }

say "Using Node: $(node -v) / npm: $(npm -v)"
say "Creating project in: $PROJECT_DIR"



# -------- Files --------
say "Writing project files..."

# package.json
cat > package.json <<'EOF'
{
  "name": "demo-ci",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "jest --ci",
    "build": "node scripts/build.js",
    "lint": "echo \"(optional) add eslint here\" && exit 0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "jest-junit": "^16.0.0"
  }
}
EOF

# jest.config.js
cat > jest.config.js <<'EOF'
module.exports = {
  testEnvironment: "node",
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "reports/junit",
      outputName: "jest-junit.xml",
      suiteName: "demo-ci"
    }]
  ]
};
EOF

# src code
mkdir -p src __tests__ scripts reports/junit .vscode

cat > src/sum.js <<'EOF'
function sum(a, b) {
  return a + b;
}
module.exports = { sum };
EOF

cat > __tests__/sum.test.js <<'EOF'
const { sum } = require("../src/sum");

// FAIL_BUILD=true -> intentionally fail the assertion
const shouldFail = String(process.env.FAIL_BUILD || "").toLowerCase() === "true";

test("sum adds numbers", () => {
  const result = sum(2, 2);
  if (shouldFail) {
    // wrong on purpose to generate a red build
    expect(result).toBe(5);
  } else {
    expect(result).toBe(4);
  }
});
EOF

# simple build to create an artifact Jenkins can archive
cat > scripts/build.js <<'EOF'
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
EOF

# helpers
cat > run-pass.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
export FAIL_BUILD=false
npm ci
npm test
npm run build
EOF
chmod +x run-pass.sh

cat > run-fail.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
export FAIL_BUILD=true
npm ci
npm test || true   # allow non-zero so script continues to build/logs
npm run build
EOF
chmod +x run-fail.sh

# .gitignore
cat > .gitignore <<'EOF'
node_modules/
coverage/
dist/
reports/junit/*.xml
.npm/
EOF

# VSCode settings & tasks
cat > .vscode/extensions.json <<'EOF'
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
EOF

cat > .vscode/settings.json <<'EOF'
{
  "files.eol": "\n",
  "editor.formatOnSave": true,
  "jest.jestCommandLine": "npm test --",
  "jest.autoRun": "off"
}
EOF

cat > .vscode/tasks.json <<'EOF'
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Pass build (local)",
      "type": "shell",
      "command": "./run-pass.sh",
      "problemMatcher": []
    },
    {
      "label": "Fail build (local)",
      "type": "shell",
      "command": "./run-fail.sh",
      "problemMatcher": []
    }
  ]
}
EOF

# README
cat > README.md <<'EOF'
# demo-ci (Jenkins pass/fail demo)

Tiny npm project to generate **one green build** and **one red build** on demand using `FAIL_BUILD=true`.

## Local quickstart
```bash
./run-pass.sh   # green
./run-fail.sh   # red (tests fail on purpose)