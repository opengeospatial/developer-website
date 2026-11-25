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

## Security: Vulnerability Scanning & SBOM

The [`trivy.yml`](.github/workflows/trivy.yml) workflow ("Check vulnerabilities") uses
[Trivy](https://trivy.dev/) via [`aquasecurity/trivy-action`](https://github.com/aquasecurity/trivy-action)
to scan the repository for security issues and to generate a
[SPDX](https://spdx.dev/) Bill of Materials (BOM) of the project's npm dependencies.

### What it scans

The workflow installs the npm dependencies and then runs `trivy fs` over the
repository with the `vuln`, `misconfig`, and `secret` scanners enabled:

- **Vulnerabilities** — known CVEs in the installed npm packages
  (`CRITICAL` and `HIGH` severities, unfixed findings ignored; the build fails
  when any are detected). Because all npm dependencies of this static site are
  `devDependencies`, [`trivy-config.yaml`](.github/workflows/trivy-config.yaml)
  sets `pkg.include-dev-deps: true` so they are not skipped.
- **Misconfigurations** — checks on configuration files found in the repository.
- **Secrets** — accidentally committed credentials, keys, or tokens.

The full dependency tree is scanned: the workflow runs `npm install` before
scanning, so `node_modules` is present.

### SBOM generation

The same Trivy run also produces an SPDX BOM of the installed dependencies:

| File | Format |
|---|---|
| [`sbom.spdx.json`](sbom.spdx.json) | SPDX SBOM (machine-readable) |
| [`sbom.spdx.md`](sbom.spdx.md) | Human-readable Markdown table generated from the SBOM |

Both files are committed to the repository (on pushes to the `full-refactor`
branch, after a timestamp normalization step so that consecutive runs with no
dependency changes produce an identical file) and are also uploaded as the
`sbom` workflow artifact (30-day retention).

### When it runs

The workflow triggers on:

| Event | Description |
|---|---|
| Push (any branch) | Runs on every push, except pushes that only change Markdown files |
| Pull request | Pull requests targeting the `full-refactor` branch |
| Release | When a release is published |
| Schedule | Daily at 08:00 UTC (keeps the scan current as new vulnerabilities are disclosed) |
| Workflow dispatch | Manually, from the GitHub Actions page |

Scheduled and manual runs report results and regenerate the SBOM artifacts, but
do not commit anything to the repository.

### Running the scan locally

```bash
npm install
trivy fs . --scanners vuln,misconfig,secret --severity CRITICAL,HIGH
```

For the SPDX BOM:

```bash
trivy fs . --format spdx-json --output sbom.spdx.json
```

## Troubleshooting

**`EACCES: permission denied` on build** — This can happen if files in `dist/` become read-only (e.g., from a previous build). The build script now cleans `dist/` before each run. If the issue persists, manually remove the folder:

```bash
rm -rf dist/
npm run build
```
