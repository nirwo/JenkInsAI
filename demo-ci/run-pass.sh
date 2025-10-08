#!/usr/bin/env bash
set -euo pipefail
export FAIL_BUILD=false
npm ci
npm test
npm run build
