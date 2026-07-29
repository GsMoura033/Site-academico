#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
DEST="/var/www/Meu-Site/public/academico"
git -C "$ROOT" pull --ff-only
rsync -a --delete --exclude='.git' --exclude='.gitignore' --exclude='deploy.sh' "$ROOT/" "$DEST/"
python3 - <<'PY'
from pathlib import Path
p = Path('/var/www/Meu-Site/public/academico/index.html')
html = p.read_text(encoding='utf-8')
if '<base ' not in html:
    html = html.replace('<head>', '<head>\n    <base href="/academico/">', 1)
    p.write_text(html, encoding='utf-8')
print('synced →', p.parent)
PY
pm2 restart meu-site
