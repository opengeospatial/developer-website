const sh = require('shelljs');
const upath = require('upath');

const destPath = upath.resolve(upath.dirname(__filename), '../dist');

// sh.rm('-rf', `${destPath}/*`)

// Note: this only removes these paths - use with caution!
sh.rm('-rf', `${destPath}/assets`)
sh.rm('-rf', `${destPath}/css`)
sh.rm('-rf', `${destPath}/js`)
sh.rm('-rf', `${destPath}/blogs.html`)
sh.rm('-rf', `${destPath}/index.html`)
sh.rm('-rf', `${destPath}/ows.html`)