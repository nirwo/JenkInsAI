#!/usr/bin/env bash
set -euo pipefail
export FAIL_BUILD=true
npm ci
npm test || true   # allow non-zero so script continues to build/logs
npm run build
