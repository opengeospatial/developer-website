## Docs folder

To be used for GitHub Pages.

## OGC API demonstrators using ReDoc

This folder contains demonstrators of use of ReDoc for publishing OGC API specifications.

*Do not edit the OpenAPI definitions in this folder.*


The following are instructions for how to publish OGC API definitions through GitHub Pages using ReDoc.

You can debug the OpenAPI definition on your local machine by using https://github.com/Redocly/create-openapi-repo


### OGC API - Features

An example of the result of the following process is at https://opengeospatial.github.io/architecture-dwg/api-features/index.html

1. Create a folder called 'docs' in the GitHub repository (https://github.com/opengeospatial/ogcapi-features)

2. Enable GitHub Pages on the repository, setting the 'docs' folder of the master branch as the source.

3. Create a folder called 'api' in the 'docs' folder.

4. Download the OpenAPI definition of OGC API - Features from SwaggerHub (https://app.swaggerhub.com/apis/cportele/ogcapi-features-1-example1/1.0.0) by going to 'Download API' on the menu, then 'YAML Unresolved'.

5. Copy the file `cportele-ogcapi-features-1-example1-1.0.0-swagger.yaml` to the 'api' folder that was created in Step 3.

6. Rename the `cportele-ogcapi-features-1-example1-1.0.0-swagger.yaml` file to `openapi.yaml`

7. Edit the contact, licence, and x-logo properties as shown at https://github.com/opengeospatial/architecture-dwg/blob/master/docs/api-features/openapi.yaml

8. Remove the server properties from the `openapi.yaml` file.

9. Download the index.html file from https://github.com/opengeospatial/architecture-dwg/blob/master/docs/api-features/index.html and place it in the 'api' folder

10. Edit the value of spec-url in index.html to reference https://opengeospatial.github.io/ogcapi-features/api/openapi.yaml.


### OGC API - Processes

An example of the result of the following process is at https://opengeospatial.github.io/architecture-dwg/api-processes/index.html

1. Create a folder called 'api' in the 'docs' folder of the GitHub repository (https://github.com/opengeospatial/wps-rest-binding/tree/master/docs)

2. Download the OpenAPI definition of OGC API - Processes from SwaggerHub (https://app.swaggerhub.com/apis/geoprocessing/WPS/1.0-draft.3) by going to 'Download API' on the menu, then 'YAML Unresolved'.

3. Copy the file `geoprocessing-WPS-1.0-draft.3-swagger.yaml` to the 'api' folder that was created in Step 1.

4. Rename the `geoprocessing-WPS-1.0-draft.3-swagger.yaml` file to `openapi.yaml`

5. Edit the contact, licence, and x-logo properties as shown at https://github.com/opengeospatial/architecture-dwg/blob/master/docs/api-processes/openapi.yaml

6. Remove the server properties from the `openapi.yaml` file.

7. Download the index.html file from https://github.com/opengeospatial/architecture-dwg/blob/master/docs/api-processes/index.html  and place it in the 'api' folder

8. Edit the value of spec-url element in index.html to reference https://opengeospatial.github.io/wps-rest-binding/api/openapi.yaml.


NOTE: On 2020-07-02, a number of errors were encountered when publishing the OpenAPI definition of OGC API - Processes.



### EDR API

An example of the result of the following process is at https://opengeospatial.github.io/architecture-dwg/api-edr/index.html

1. Create a folder called 'api' in the 'docs' folder of the GitHub repository (https://github.com/opengeospatial/Environmental-Data-Retrieval-API/tree/master/docs)

2. Download the OpenAPI definition of the EDR API from https://github.com/opengeospatial/Environmental-Data-Retrieval-API/tree/master/candidate-standard/openapi

3. Copy the file `EDR_OpenAPI.yaml` to the 'api' folder that was created in Step 1.

4. Rename the EDR_OpenAPI.yaml file to `openapi.yaml`

5. Edit the contact, licence, and x-logo properties as shown at https://github.com/opengeospatial/architecture-dwg/blob/master/docs/api-edr/openapi.yaml

6. Remove the server properties from the `openapi.yaml` file.

7. Download the index.html file from https://github.com/opengeospatial/architecture-dwg/blob/master/docs/api-edr/index.html  and place it in the 'api' folder

8. Edit the value of spec-url element in index.html to reference https://opengeospatial.github.io/Environmental-Data-Retrieval-API/api/openapi.yaml.



### OGC API - Styles

An example of the result of the following process is at https://opengeospatial.github.io/architecture-dwg/api-styles/index.html

1. Create a folder called 'docs' in the GitHub repository (https://github.com/opengeospatial/ogcapi-styles)

2. Enable GitHub Pages on the repository, setting the 'docs' folder of the master branch as the source.

3. Create a folder called 'api' in the 'docs' folder.

4. Download the OpenAPI definition of OGC API - Styles from SwaggerHub (https://app.swaggerhub.com/apis/cportele/opf-style-api/1.0.0) by going to 'Download API' on the menu, then 'YAML Unresolved'.

5. Copy the file `cportele-opf-style-api-1.0.0-swagger.yaml` to the 'api' folder that was created in Step 3.

6. Rename the `cportele-opf-style-api-1.0.0-swagger.yaml` file to openapi.yaml

7. Edit the contact, licence, and x-logo properties as shown at https://github.com/opengeospatial/architecture-dwg/blob/master/docs/api-styles/openapi.yaml

8. Remove the server properties from the `openapi.yaml` file.

9. Download the index.html file from https://github.com/opengeospatial/architecture-dwg/blob/master/docs/api-styles/index.html and place it in the 'api' folder

10. Edit the value of spec-url in index.html to reference https://opengeospatial.github.io/ogcapi-styles/api/openapi.yaml.

NOTE: On 2020-07-02, a number of errors were encountered when publishing the OpenAPI definition of OGC API - Styles.



