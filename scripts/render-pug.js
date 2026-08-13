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

// ── Pug compilation ──────────────────────────────────────
const pugPages = [
  { from: 'pug/index.pug',    to: 'index.html' },
  { from: 'pug/sprints.pug',  to: 'sprints.html' },
  { from: 'pug/blogs.pug',    to: 'blogs.html' },
  { from: 'pug/ows.pug',      to: 'ows.html' },
];

function compilePug(fileMatch) {
  ensureDir(distDir);
  let compiled = 0;
  pugPages.forEach(({ from, to }) => {
    if (fileMatch && !from.includes(path.basename(fileMatch, '.pug'))) return;
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
      compiled++;
    } catch (e) {
      console.error(`  ✗ ${from}:`, e.message);
    }
  });
  return compiled;
}

// ── SCSS compilation ─────────────────────────────────────
function compileScss(fileMatch) {
  const scssDir = path.join(srcDir, 'scss');
  ensureDir(path.join(distDir, 'assets'));
  if (!fs.existsSync(scssDir)) { console.log('  ℹ No src/scss/'); return; }
  
  const files = fs.readdirSync(scssDir).filter(f => f.endsWith('.scss'));
  files.forEach(entry => {
    if (fileMatch && !entry.includes(path.basename(fileMatch, '.scss'))) return;
    try {
      const result = sass.compile(path.join(scssDir, entry));
      const css = result.css;
      fs.writeFileSync(path.join(distDir, 'assets', entry.replace('.scss', '.css')), css, 'utf8');
      console.log(`  ✓ assets/${entry.replace('.scss', '.css')}`);
    } catch (e) {
      console.error(`  ✗ ${entry}:`, e.message);
    }
  });
}

// ── Copy static assets ───────────────────────────────────
function copyFile(src, dst) {
  ensureDir(path.dirname(dst));
  const srcStat = fs.statSync(src);
  if (!fs.existsSync(dst) || srcStat.mtime > fs.statSync(dst).mtime) {
    fs.copyFileSync(src, dst);
  }
}

function copyDir(src, dst) {
  ensureDir(dst);
  fs.readdirSync(src).forEach(entry => {
    const sp = path.join(src, entry);
    const dp = path.join(dst, entry);
    fs.statSync(sp).isDirectory() ? copyDir(sp, dp) : copyFile(sp, dp);
  });
}

function copyAssets() {
  const srcAssets = path.join(srcDir, 'assets');
  const dstAssets = path.join(distDir, 'assets');
  if (fs.existsSync(srcAssets)) {
    copyDir(srcAssets, dstAssets);
    console.log('  ✓ assets/');
  }
}

function copyJs() {
  const jsSrc = path.join(srcDir, 'js');
  const jsDst = path.join(distDir, 'assets', 'js');
  if (fs.existsSync(jsSrc)) {
    ensureDir(jsDst);
    fs.readdirSync(jsSrc).filter(f => f.endsWith('.js')).forEach(f => {
      copyFile(path.join(jsSrc, f), path.join(jsDst, f));
    });
  }
}

// ── Full build (initial) ─────────────────────────────────
function build() {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  console.log('🧹 Cleaned dist/');
  compileScss();
  compilePug();
  copyAssets();
  copyJs();
  console.log('\n✅ Done\n');
}

// ── Incremental rebuild ──────────────────────────────────
function rebuild(type, filePath) {
  if (type === 'pug') {
    console.log('\n📝 Compiling Pug → HTML\n');
    compilePug(filePath);
  } else if (type === 'scss') {
    console.log('\n🎨 Compiling SCSS → CSS\n');
    compileScss(filePath);
  } else {
    console.log('\n📦 Copying assets\n');
    copyAssets();
    copyJs();
  }
}

// ── Static file server ──────────────────────────────────────
function startServer() {
  const PORT = 3000;
  
  // Kill any existing process on this port first
  try {
    const { execSync } = require('child_process');
    execSync(`lsof -ti:${PORT}`, { stdio: 'pipe' }).trim().split('\n').filter(Boolean).forEach(pid => {
      try { process.kill(Number(pid), 'SIGKILL'); } catch(e) {}
    });
  } catch(e) {} // no process on port

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

  server.listen(PORT, () => {
    console.log(`🌐  Serving dist/ on http://localhost:${PORT}`);
  });
}

// ── CLI ──────────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.includes('--watch') || args.includes('-w')) {
  console.log('👀 Watching for changes...\n');
  build();
  let timer;
  chokidar.watch('src', { ignored: /node_modules/, awaitWriteFinish: true })
    .on('change', (p) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(`\n🔄 change ${p}`);
        if (p.endsWith('.pug')) rebuild('pug', p);
        else if (p.endsWith('.scss')) rebuild('scss', p);
        else rebuild('assets');
      }, 300);
    })
    .on('add', (p) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(`\n🔄 add ${p}`);
        if (p.endsWith('.pug')) rebuild('pug', p);
        else if (p.endsWith('.scss')) rebuild('scss', p);
        else rebuild('assets');
      }, 300);
    });
  startServer();
} else {
  build();
}
