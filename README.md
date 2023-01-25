# OGC Developer Website

## Introduction
This repository hosts the source of the OGC Developer Website https://developer.ogc.org

## Install the gh-pages branch

This project uses sub-modules. Clone with:

` git clone -b gh-pages --recurse-submodules https://github.com/opengeospatial/developer-website.git`

Update sub-modules with:

`git submodule foreach git pull origin gh-pages`

The sponsoring page was installed using `git subtree`. **Do not attempt to update it directly!** Do the changes on the [source repository](https://github.com/doublebyte1/sponsoring.git) first and update it with:

`git subtree pull --prefix sprints/sponsoring https://github.com/doublebyte1/sponsoring.git gh-pages --squash`

## Intellectual Property Rights

The content of this repository is copyrighted by the Open Geospatial Consortium (OGC) and may be [licensed](https://github.com/opengeospatial/er_template/blob/master/LICENSE) for designated purposes.

Attention is drawn to the possibility that some of the elements of this document may be the subject of patent rights. The Open Geospatial Consortium shall not be held responsible for identifying any or all such patent rights.

Recipients of this document are requested to submit, with their comments, notification of any relevant patent claims or other intellectual property rights of which they may be aware that might be infringed by any implementation of the standard set forth in this document, and to provide supporting documentation.
