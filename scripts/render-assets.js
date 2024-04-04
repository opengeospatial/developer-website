'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    
    sh.cp('-R', sourcePath, destPath)

    const cname = upath.resolve(upath.dirname(__filename), '../CNAME');
    sh.cp('-R', cname, destPath)

    const readmeIn = upath.resolve(upath.dirname(__filename), '../README-dist.md');
    const readmeOut = upath.resolve(upath.dirname(__filename), '../dist/README.md');
    sh.cp('-R', readmeIn, readmeOut)

    const sprintsIn = upath.resolve(upath.dirname(__filename), '../dist/sprints.html');
    const sprintsOut = upath.resolve(upath.dirname(__filename), '../dist/sprints/index.html');
    sh.cp('-R', sprintsIn, sprintsOut)

};