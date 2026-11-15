#!/usr/bin/env bash
# Renders og-image.png and apple-touch-icon.png from the HTML sources in this
# folder using headless Google Chrome. Run from anywhere: tools/render-images.sh
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

render "$ROOT/tools/og-image.html" "$ROOT/og-image.png" 1200 630
render "$ROOT/tools/apple-touch-icon.html" "$ROOT/apple-touch-icon.png" 180 180
