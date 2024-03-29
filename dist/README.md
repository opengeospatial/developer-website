# OGC Developer Website

## Introduction
This repository hosts static code for version 2.0 of the OGC Developer Website. **Do not edit this code directly!** Checkout the source code on the `master` branch instead, and generate the static build from there, following the instructions on the ` README` file. 

## Install the gh-pages-v2 branch

This project uses sub-modules for the code sprint micro websites. Clone with:

` git clone -b gh-pages-v2 --recurse-submodules https://github.com/opengeospatial/developer-website.git`

Add another module:

`git submodule add -b gh-pages-v2 https://github.com/opengeospatial/dev-ogc-org-sprint-landing-x.git sprints/x`

Update sub-modules with:

`git submodule foreach git pull origin gh-pages-v2`

Don't forget to commit & push the results.

## Intellectual Property Rights

The content of this repository is copyrighted by the Open Geospatial Consortium (OGC) and may be [licensed](https://github.com/opengeospatial/er_template/blob/master/LICENSE) for designated purposes.

Attention is drawn to the possibility that some of the elements of this document may be the subject of patent rights. The Open Geospatial Consortium shall not be held responsible for identifying any or all such patent rights.

Recipients of this document are requested to submit, with their comments, notification of any relevant patent claims or other intellectual property rights of which they may be aware that might be infringed by any implementation of the standard set forth in this document, and to provide supporting documentation.
