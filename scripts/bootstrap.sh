#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
echo "[ProdigyOS] Bootstrapping from repo root: $(pwd)"

npm install
npm run dev
