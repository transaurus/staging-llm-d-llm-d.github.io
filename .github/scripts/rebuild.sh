#!/usr/bin/env bash
set -euo pipefail

# rebuild.sh for llm-d/llm-d.github.io
# Docusaurus 3.9.2, npm, Node 20+
# Runs on existing source tree (no clone). Installs deps and builds.

echo "[INFO] Node version: $(node -v)"
echo "[INFO] NPM version: $(npm -v)"

# --- Install dependencies ---
echo "[INFO] Installing dependencies..."
npm install

# --- Build ---
echo "[INFO] Building Docusaurus site..."
npm run build

echo "[DONE] Build complete."
