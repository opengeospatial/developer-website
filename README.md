# OGC Developer Website

## Introduction
This repository hosts static code for version 2.0 of the OGC Developer Website. **Do not edit this code directly!** Checkout the source code on the `master` branch instead, and generate the static build from there, following the instructions on the ` README` file. 

## Install the gh-pages-v2 branch

This project uses `git subtree`. **Do not attempt to update it directly!** Do the changes on the source repository first, for instance [dev-ogc-org-sprint-landing-15](https://github.com/opengeospatial/dev-ogc-org-sprint-landing-15.git) and add it here:

` git subtree add --prefix sprints/15 https://github.com/opengeospatial/dev-ogc-org-sprint-landing-15.git gh-pages --squash` 

Keep it in sync with:
` git subtree pull --prefix sprints/15 https://github.com/opengeospatial/dev-ogc-org-sprint-landing-15.git gh-pages --squash` 

For the [sponsoring page](https://github.com/doublebyte1/sponsoring.git) first and update it with:

`git subtree pull --prefix sprints/sponsoring https://github.com/opengeospatial/dev-sprint-sponsoring.git gh-pages --squash`

Don't forget to commit & push the results.

## Intellectual Property Rights

The content of this repository is copyrighted by the Open Geospatial Consortium (OGC) and may be [licensed](https://github.com/opengeospatial/er_template/blob/master/LICENSE) for designated purposes.

Attention is drawn to the possibility that some of the elements of this document may be the subject of patent rights. The Open Geospatial Consortium shall not be held responsible for identifying any or all such patent rights.

Recipients of this document are requested to submit, with their comments, notification of any relevant patent claims or other intellectual property rights of which they may be aware that might be infringed by any implementation of the standard set forth in this document, and to provide supporting documentation.