# Family Tree Builder Scaffold

This repository reorganizes the MapMyRoots family-tree builder into a clean static structure. Legacy scripts are isolated so they can be replaced gradually.

## Getting Started

1. Open `public/index.html` directly in a browser, or run a dev server:
   ```
   npx vite
   ```
2. Legacy scripts live in `src/legacy/` and are loaded from `src/main.js`.
3. Global styles are in `styles/`.

## Directory Layout
```
public/          # static HTML entry
src/
  hooks/         # small modern helpers
  legacy/        # original JS modules (temporary)
styles/          # extracted CSS
```

## TODO
- Replace legacy modules with modern equivalents.
- Patch `tree.js` to allow border-based node coloring.
- Improve SVG/Canvas exporter to support scaling.

