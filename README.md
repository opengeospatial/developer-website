# OGC Developer Website

## Introduction
This repository hosts the source of the OGC Developer Website https://developer.ogc.org

Currently, the website is served from the [gh-pages](https://github.com/opengeospatial/developer-website/tree/gh-pages) branch.

## Version 2.0
This is now the main version.

Install:

`npm install`

Run locally (includes development server):

`npm start`

Generate static build:

`npm run build`

Publish to GitHub Pages with:

`git subtree push --prefix dist origin gh-pages-v2`

Forced update:

`git push origin `git subtree split --prefix dist master`:gh-pages-v2 --force`

If you just want to copy static files to the `api` folder, copy them to the `api` root folder and then run:

`npm run build`

`git subtree push --prefix dist origin gh-pages-v2`

(don't forget to commit/push the changes to the master branchs, as well)

## Intellectual Property Rights

The content of this repository is copyrighted by the Open Geospatial Consortium (OGC) and may be [licensed](https://github.com/opengeospatial/er_template/blob/master/LICENSE) for designated purposes.

Attention is drawn to the possibility that some of the elements of this document may be the subject of patent rights. The Open Geospatial Consortium shall not be held responsible for identifying any or all such patent rights.

Recipients of this document are requested to submit, with their comments, notification of any relevant patent claims or other intellectual property rights of which they may be aware that might be infringed by any implementation of the standard set forth in this document, and to provide supporting documentation.