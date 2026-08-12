# OGC Developer Site

OGC Developer website built with **Pug** templates, **SCSS**, and static asset bundling.

## Prerequisites

- **Node.js** >= 18.x
- **npm** (comes with Node.js)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build the site
npm run build

# 3. Serve the built site (port 3000)
npm run serve
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm install` | Install all dependencies |
| `npm run build` | Clean the `dist/` folder and build the site |
| `npm run serve` | Serve the built site on `localhost:3000` |
| `npm run watch` | Watch mode — rebuild on file changes (`.pug`, `.scss`, assets, JS) |

## Project Structure

```
├── src/
│   ├── pug/                # Pug templates
│   │   ├── _layout.pug     # Shared layout (header, footer)
│   │   ├── index.pug       # Home page
│   │   ├── sprints.pug     # Sprints page
│   │   ├── blogs.pug       # Blogs page
│   │   ├── ows.pug         # OWS page
│   │   └── includes/       # Reusable Pug partials
│   │       ├── header.pug
│   │       ├── footer.pug
│   │       ├── cta.pug
│   │       └── corner-ribbon.pug
│   ├── scss/               # SCSS stylesheets
│   │   └── style.scss      # Main stylesheet (compiled to CSS)
│   ├── assets/             # Static assets (copied to dist/)
│   │   ├── images/         # Logos, sprint images, etc.
│   │   └── ...
│   └── js/                 # JavaScript files (copied to dist/assets/js/)
├── static/                 # Static files (root level)
├── scripts/
│   └── render-pug.js       # Build script (Pug → HTML, SCSS → CSS, copy assets)
├── dist/                   # Build output (gitignored)
└── package.json
```

## How It Works

The build process (`npm run build`) does the following in order:

1. **Cleans** the `dist/` directory (removes old build artifacts)
2. **Compiles SCSS** → `dist/assets/style.css`
3. **Compiles Pug** → HTML pages in `dist/`
4. **Copies static assets** (images, etc.) from `src/assets/` to `dist/assets/`
5. **Copies JavaScript** files from `src/js/` to `dist/assets/js/`

## Adding a New Page

1. Create a new Pug template in `src/pug/` (e.g., `newpage.pug`).
2. Add the route mapping to `scripts/render-pug.js` in the `pugPages` array:

   ```js
   const pugPages = [
     // ... existing entries
     { from: 'pug/newpage.pug', to: 'newpage.html' },
   ];
   ```

3. Rebuild with `npm run build`.

## Troubleshooting

**`EACCES: permission denied` on build** — This can happen if files in `dist/` become read-only (e.g., from a previous build). The build script now cleans `dist/` before each run. If the issue persists, manually remove the folder:

```bash
rm -rf dist/
npm run build
```
