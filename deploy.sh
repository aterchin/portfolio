#!/usr/bin/env bash
# deploy.sh — run this ON THE VPS, from the app root (<APP_PATH>).
#
# output: 'standalone' does NOT include public/ or .next/static in its
# output automatically (this trips a lot of people up) — Next's docs call
# this out explicitly. Both have to be copied into .next/standalone by hand
# after every build, or the site comes up with no images/fonts/CSS.

set -euo pipefail

echo "→ Pulling latest..."
git pull

echo "→ Installing dependencies..."
npm ci

echo "→ Building..."
npm run build

echo "→ Copying static assets into standalone output..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

echo "→ Reloading PM2 process..."
if pm2 describe portfolio > /dev/null 2>&1; then
  pm2 reload ecosystem.config.js
else
  pm2 start ecosystem.config.js
  pm2 save
fi

echo "→ Done."
