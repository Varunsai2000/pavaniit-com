#!/usr/bin/env bash
# Renders public/og-image.png and the app icon/favicons from the HTML
# sources in this folder with headless Google Chrome. Run: tools/render-images.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT
render() { # <source.html> <output.png> <width> <height>
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --user-data-dir="$PROFILE" --force-device-scale-factor=1 \
    --virtual-time-budget=8000 --window-size="$3,$4" \
    --screenshot="$2" "file://$1" >/dev/null 2>&1
  echo "wrote $2"
}
render "$ROOT/tools/og-image.html" "$ROOT/public/og-image.png" 1200 630
render "$ROOT/tools/icon.html" "$ROOT/public/icon-512.png" 512 512
sips -z 192 192 "$ROOT/public/icon-512.png" --out "$ROOT/public/icon-192.png" >/dev/null && echo "wrote $ROOT/public/icon-192.png"
sips -z 180 180 "$ROOT/public/icon-512.png" --out "$ROOT/public/apple-touch-icon.png" >/dev/null && echo "wrote $ROOT/public/apple-touch-icon.png"
sips -z 32 32 "$ROOT/public/icon-512.png" --out "$ROOT/public/favicon-32.png" >/dev/null && echo "wrote $ROOT/public/favicon-32.png"
