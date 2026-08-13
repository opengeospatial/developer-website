const pug = require('pug');
const sass = require('sass');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const http = require('http');
const mime = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
  '.json': 'application/json',
};

const srcDir  = path.resolve(__dirname, '..', 'src');
const distDir = path.resolve(__dirname, '..', 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ── Clean dist ────────────────────────────────────────────
function cleanDist() {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  console.log('🧹 Cleaned dist/');
}

// ── Pug compilation ──────────────────────────────────────
const pugPages = [
  { from: 'pug/index.pug',    to: 'index.html' },
  { from: 'pug/sprints.pug',  to: 'sprints.html' },
  { from: 'pug/blogs.pug',    to: 'blogs.html' },
  { from: 'pug/ows.pug',      to: 'ows.html' },
];

function compilePug() {
  console.log('\n📝 Compiling Pug → HTML\n');
  ensureDir(distDir);
  pugPages.forEach(({ from, to }) => {
    const pugFile   = path.join(srcDir, from);
    const outFile   = path.join(distDir, to);
    try {
      const fn = pug.compile(fs.readFileSync(pugFile, 'utf8'), {
        filename: pugFile,
        basedir: path.join(srcDir, 'pug'),
        pretty: true,
      });
      ensureDir(path.dirname(outFile));
      fs.writeFileSync(outFile, fn({}), 'utf8');
      console.log(`  ✓ ${to}`);
    } catch (e) {
      console.error(`  ✗ ${from}:`, e.message);
    }
  });
}

// ── SCSS compilation ─────────────────────────────────────
function compileScss() {
  console.log('\n🎨 Compiling SCSS → CSS\n');
  const scssDir = path.join(srcDir, 'scss');
  ensureDir(path.join(distDir, 'assets'));

  if (!fs.existsSync(scssDir)) { console.log('  ℹ No src/scss/'); return; }
  fs.readdirSync(scssDir).filter(f => f.endsWith('.scss')).forEach(entry => {
    try {
      const result = sass.compile(path.join(scssDir, entry));
      fs.writeFileSync(path.join(distDir, 'assets', entry.replace('.scss', '.css')), result.css, 'utf8');
      console.log(`  ✓ assets/${entry.replace('.scss', '.css')}`);
    } catch (e) {
      console.error(`  ✗ ${entry}:`, e.message);
    }
  });
}

// ── Copy static assets ───────────────────────────────────
function copyDir(src, dst) {
  ensureDir(dst);
  fs.readdirSync(src).forEach(entry => {
    const sp = path.join(src, entry);
    const dp = path.join(dst, entry);
    fs.statSync(sp).isDirectory() ? copyDir(sp, dp) : (ensureDir(path.dirname(dp)), fs.copyFileSync(sp, dp));
  });
}

function copyAssets() {
  console.log('\n📦 Copying assets\n');
  const srcAssets = path.join(srcDir, 'assets');
  const dstAssets = path.join(distDir, 'assets');
  if (fs.existsSync(srcAssets)) {
    copyDir(srcAssets, dstAssets);
    console.log('  ✓ assets/');
  } else {
    console.log('  ℹ No src/assets/');
  }
}

function copyJs() {
  console.log('📜 Copying JS\n');
  const jsSrc = path.join(srcDir, 'js');
  const jsDst = path.join(distDir, 'assets', 'js');
  if (fs.existsSync(jsSrc)) {
    ensureDir(jsDst);
    fs.readdirSync(jsSrc).filter(f => f.endsWith('.js')).forEach(f => {
      fs.copyFileSync(path.join(jsSrc, f), path.join(jsDst, f));
      console.log(`  ✓ assets/js/${f}`);
    });
  } else {
    console.log('  ℹ No src/js/');
  }
}

// ── Build ────────────────────────────────────────────────
function build() {
  cleanDist();
  compileScss();
  compilePug();
  copyAssets();
  copyJs();
  console.log('\n✅ Done\n');
}


// ── Static file server ──────────────────────────────────────
function startServer() {
  const server = http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mime[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
        return;
      }
      res.writeHead(200, {'Content-Type': mimeType});
      res.end(data);
    });
  });

  server.listen(3000, () => {
    console.log('🌐  Serving dist/ on http://localhost:3000');
  });
}

// ── CLI ──────────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.includes('--watch') || args.includes('-w')) {
  console.log('👀 Watching for changes...\n');
  build();
  let timer;
  chokidar.watch([
    path.join(srcDir, '**/*.pug'),
    path.join(srcDir, '**/*.scss'),
    path.join(srcDir, 'assets/**/*'),
    path.join(srcDir, 'js/**/*'),
  ], { ignored: /node_modules/ }).on('all', (ev, p) => {
    clearTimeout(timer);
    timer = setTimeout(() => { console.log(`\n🔄 ${ev} ${p}`); build(); }, 300);
  });
  startServer();
} else {
  build();
}
